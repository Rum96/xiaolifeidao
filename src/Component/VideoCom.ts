import PlatfM from "../platforms/PlatformManager";
import g_tipM from "../common/TipManger";
import g_playerD from "../games/PlayerData";
import g_evnetM from "../common/EventManager";

export default class VideoCom extends Laya.Script {
    public isOp: boolean = false;
    /** 是否在录制中*/
    public isRecord: boolean = false;

    public recorder: any;

    public curTimer: number = 0;

    public owner: Laya.Image;

    public norSkin: string = "img/btn_video1.png";

    public videoSkin: string = "img/btn_video2.png";

    public videoRes: any;
    /**0,停止录制,1,开始录制 */
    public playType: any = true;

    uiScene: any;

    isClick: any = true;

    /** 是否玩家主动录制*/
    public isInitiative: boolean = true;

    constructor() { super(); }
    // onStart() {
    //     console.log("录屏啦啦啦啦啦啦啦")
    // }
    //onEnable
    onStart(): void {
        this.owner.on(Laya.Event.CLICK, this, this.onResetVideoClick);
        console.log("加载录屏啦啦啦啦啦啦啦")
        this.recorder = tt.getGameRecorderManager();

        this.recorder.onStart(res => {
            this.isOp = false;
            console.log("开始录屏");
            // do somethine;
        })

        this.recorder.onStop(res => {
            this.isOp = false;
            this.owner.skin = this.norSkin;
            this.isRecord = false;
            console.log("停止录屏-------------------- " + res.videoPath);
            this.videoRes = res;
            this.showShare();
            this.isInitiative = true;
            this.playType = true;
        })

        this.recorder.onError((err) => {
            console.log("播放错误" + err);
        })
    }

    onDisable(): void {
        this.owner.off(Laya.Event.CLICK, this, this.onResetVideoClick);
    }

    onResetVideoClick() {
        console.log("onResetVideoClick  isOp = " + this.isOp + "  isRecord = " + this.isRecord + 'playType = ' + this.playType + 'this.isInitiative' + this.isInitiative);
        if (this.isInitiative) {
            if (!this.isClick) return;
            if (this.isOp) return;
            this.isOp = true;
            if (this.isRecord) {
                if (this.curTimer >= 3 * 1000) {
                    //在录制中   打开分享
                    this.owner.skin = this.norSkin;
                    this.recorder.stop();
                }
                else {
                    console.log("不足3秒,停止失败,3秒后自动停止")
                    // g_tipManger.showTip("不足3秒,无法停止,3秒后自动停止!", 1 * 1000);
                    g_tipM.showTip("不足3秒,无法停止,3秒后自动停止!");
                    this.isClick = false;
                    setTimeout(() => {
                        this.isClick = true;
                        this.owner.skin = this.norSkin;
                        this.recorder.stop();
                    }, 1000 * 3);
                    this.isOp = false;
                    return;
                }
            } else {
                this.playType = false
                this.owner.skin = this.videoSkin;
                this.recorder.start({
                    duration: 300,
                })
            }
            this.isRecord = !this.isRecord;
        } else {
            if (this.playType) {
                this.playType = false
                this.owner.skin = this.videoSkin;
                this.recorder.start({
                    duration: 300,
                });
            } else {
                this.isClick = false;
                this.isClick = true;
                this.owner.skin = this.norSkin;
                this.recorder.stop();
                this.isOp = false;
                this.playType = true;
            }
        }
    }

    onUpdate() {
        if (this.isRecord) {
            this.curTimer += Laya.timer.delta;
        } else {
            this.curTimer = 0;
        }
    }

    /** 分享*/
    share(type) {
        console.log("分享视频")
        const info = tt.getSystemInfoSync();
        let isToutiao = false;
        if (info.appName.toUpperCase() == 'TOUTIAO') {
            isToutiao = true;
            console.log("平台为头条,分享为挑战视频");
        }
        try {
            tt.shareAppMessage({
                channel: "video",
                templateId: '4753mnqbdjo7ca6iff',
                desc: '枪与火的街头，才是男人的真快乐！',
                imageUrl: '',
                query: '',
                extra: {
                    videoPath: this.videoRes.videoPath,
                    videoTopics: ['枪火街头', '抖音小游戏', '热门', '射击游戏', '这个视频有点料'],
                    createChallenge: isToutiao
                },
                success() {
                    console.log('分享视频成功');
                    if (type) {
                        console.log('分享发放奖励');
                        // 打点 录屏分享
                        PlatfM.Jsb.TTDotEvent('ShareScreen');
                        /**加500金币 */
                        g_playerD.diamond += 200;
                        g_evnetM.DispatchEvent("update_dmd");
                        g_tipM.showTip("分享成功,获得200金币!");
                        PlatfM.Jsb.hideShare();
                    } else {
                        console.log('分享不发放奖励');
                    }
                },
                fail(e) {
                    console.log('分享视频失败' + JSON.stringify(e));
                    g_tipM.showTip("分享失败,未获得奖励!");
                }
            })
        } catch (e) {
            console.log("recorder.onStop  " + e);
        }
    }

    isPlay(game, type) {
        if (type) {
            this.isInitiative = false;
        }
        this.uiScene = game;
        this.playType = type;
    }

    /**弹出分享弹窗 */
    showShare() {
        PlatfM.Jsb.showBannder();
        PlatfM.Jsb.showPush(4);
    }
}

declare module tt {
    export function getGameRecorderManager(): any;
    export function shareAppMessage(obj: any): any;
    export function getSystemInfoSync(): any;
}