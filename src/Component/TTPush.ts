import { ui } from "../ui/layaMaxUI";
import PubUtils from "../common/PubUtils";
import PlatfM from "../platforms/PlatformManager";

export default class TTPush extends ui.ttPushUI {
    public chouti: any;
    public home: any;
    public homeUI: any;
    public appId: string = "ttdbb1ad0c448b3d1e";
    /**当前轮播游戏 */
    public pushNum: number = 0;
    /**当前游戏轮播次数 */
    public tweenNum: number = 0;
    /**互推数据 */
    public pushIcon: any;
    /**主UI页 */
    public game: any;
    /**左互推 */
    public setIntervalLeft: any;
    /**右互推 */
    public setIntervalRight: any;
    public windowWidth: number;
    public windowHeight: number;

    public time_lines: Array<Laya.TimeLine> = [];

    constructor() {
        super();
        this.windowWidth = tt.getSystemInfoSync().windowWidth;
        this.windowHeight = tt.getSystemInfoSync().windowHeight;
    }

    /**加载互推 */
    addPush(pushIcon, game) {
        this.pushIcon = pushIcon;
        this.game = game;

        PubUtils.registerScaleListener(this.hide_share, this, this.hideShare, 1.2, false);
        PubUtils.registerTouchListenner(this.btn_share, this, null, null, this.videoShare);
        PubUtils.registerTouchListenner(this.btn_bgShare, this, null, null, this.videoShare);
        PubUtils.registerTouchListenner(this.btn_video, this, null, null, this.videoShare);

        // if (PlatfM.Jsb.isIos() || !PlatfM.Jsb.ifPush()) return;
        // game.tt_CarouselPush.visible = true;
        // this.addCarouselPush();
        // this.addLeft_push();
        // this.addRight_push();
        // this.addBottom_push();

        // PubUtils.registerScaleListener(this.game.tt_CarouselPush, this, this.TTnavigateToMiniGame, 1.2, false);

        // this.left_list_push.selectEnable = true;
        // this.left_list_push.selectHandler = Laya.Handler.create(this, this.TTnavigateToMiniGame, null, false);
        // this.right_list_push.selectEnable = true;
        // this.right_list_push.selectHandler = Laya.Handler.create(this, this.TTnavigateToMiniGame, null, false);
        // this.bottom_list_push.selectEnable = true;
        // this.bottom_list_push.selectHandler = Laya.Handler.create(this, this.TTnavigateToMiniGame, null, false);
    }

    /**加载轮播互推 */
    addCarouselPush() {
        this.game.tt_iconPush.skin = `push/${this.pushIcon[this.pushNum]}.png`;
        this.pushNum++;
        if (this.pushNum > 9) this.pushNum = 0;
        this.tween_push(this.game);
        setTimeout(() => {
            this.addCarouselPush();
        }, 1000 * 4.8)

        this.game.tt_CarouselPush.visible = true;
    }

    /**加载左互推 */
    addLeft_push() {
        // let arr = [].concat(this.pushIcon);
        // let leftArr = [];
        // for (let i = 0; i < 3; i++) {
        //     var num = Math.floor(Math.random() * arr.length);
        //     leftArr.push(arr[num]);
        //     arr.splice(num, 1);
        // }
        // let Result = [];
        // leftArr.forEach((item, index) => {
        //     Result.push({
        //         img_bg: `push/${item}.png`,
        //     });
        // });
        // this.left_list_push.array = Result;
        // this.setIntervalLeft = setTimeout(() => {
        //     this.addLeft_push();
        // }, 3000);
    }

    /**加载右互推 */
    addRight_push() {
        // let arr = [].concat(this.pushIcon);
        // let rightArr = [];
        // for (let i = 0; i < 3; i++) {
        //     var num = Math.floor(Math.random() * arr.length);
        //     rightArr.push(arr[num]);
        //     arr.splice(num, 1);
        // }
        // let Result = [];
        // rightArr.forEach((item, index) => {
        //     Result.push({
        //         img_bg: `push/${item}.png`,
        //     });
        // });
        // this.right_list_push.array = Result;
        // this.setIntervalLeft = setTimeout(() => {
        //     this.addRight_push();
        // }, 3000);
    }

    /**加载底部互推 */
    addBottom_push() {
        // let Result = [];
        // this.pushIcon.forEach((item, index) => {
        //     Result.push({
        //         img_bg: `push/${item}.png`,
        //     })
        // });
        // this.bottom_list_push.array = Result;
        // if (this.pushIcon.length > 7) {
        //     this.goHome();
        // }

        // this.bottom_push.y = (720 / this.windowWidth) * this.windowHeight - this.bottom_push.height;
        // console.log('this.windowWidth-', this.windowWidth, 'this.windowHeight-', this.windowHeight, 'this.bottom_push.height-', this.bottom_push.height, 'this.bottom_push.y', this.bottom_push.y);

    }

    /** 头条互推轮播缓动序列*/
    tween_push(game) {
        this.tweenNum++;
        if (this.tweenNum > 4) return this.tweenNum = 0;
        Laya.Tween.to(game.tt_CarouselPush, { rotation: 30 }, 200, null, Laya.Handler.create(this, this.tween_1, [game]));
    }
    tween_1(game) {
        Laya.Tween.to(game.tt_CarouselPush, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween_2, [game]));
    }
    tween_2(game) {
        Laya.Tween.to(game.tt_CarouselPush, { rotation: -30 }, 200, null, Laya.Handler.create(this, this.tween_3, [game]), 400);
    }
    tween_3(game) {
        Laya.Tween.to(game.tt_CarouselPush, { rotation: 0 }, 200, null, Laya.Handler.create(this, this.tween_push, [game]));
    }

    /**底部互推轮播 */
    goHome() {
        // let val = (10 + this.pushIcon.length * 110) - this.width;
        // Laya.Tween.to(this.push_scrollBar, { value: val }, 5000, null, Laya.Handler.create(this, this.comeHome));
    }
    comeHome() {
        // Laya.Tween.to(this.push_scrollBar, { value: 0 }, 5000, null, Laya.Handler.create(this, this.goHome));
    }

    /** 跳转小游戏*/
    TTnavigateToMiniGame() {
        if (PlatfM.Jsb.isIos()) return;
        // 打开互跳弹窗
        tt.showMoreGamesModal({
            appLaunchOptions: [
                {
                    appId: 'ttdbb1ad0c448b3d1e',
                    query: "foo=bar&baz=qux"
                }
            ],
            success(res) {
                console.log('success', res.errMsg)
            },
            fail(res) {
                console.log('fail', res.errMsg)
            }
        })
    }

    /**隐藏分享 */
    hideShare() {
        console.log('隐藏分享');
        this.shareBox.visible = false;
        PlatfM.Jsb.hideBannder();
        Laya.timer.once(1000 * 0.5, this, () => {
            PlatfM.Jsb.openInterstitial();
        })
    }

    /** 分享录制视频*/
    private videoShare() {
        // this.hideShare();
        // 打点 点击录屏
        PlatfM.Jsb.TTDotEvent('ShareScreenClick');
        PlatfM.Jsb.onShare(this.game);
    }

    onCloseClick() {
        this.visible = false;
        // this.bg.visible = false;
        // this.left_push.visible = false;
        // this.right_push.visible = false;
        // this.bottom_push.visible = false;
        this.shareBox.visible = false;
    }
}

declare module tt {
    export function showMoreGamesModal(obj: any): void;
    export function getSystemInfoSync(): any;
}