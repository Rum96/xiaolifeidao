import JsbBase from "./JsbBase";
import VideoCom from "../Component/VideoCom";
import TTPush from "../Component/TTPush";
import g_constD from "../games/ConstData";
import { AdvertType, SwitchType } from "../common/StructMap";

const pushIcon = ['fklfsicon', 'qqtkicon', 'qqbwticon', 'hdcqdzzicon', 'jyfsjicon', 'nydricon', 'qqtkericon1', 'gdfsicon', 'qqxqgicon', 'qqqjtericon'];
export default class JsbTouTiao extends JsbBase {

    /** banner广告id */
    public BannerId: string = "3c7186jbd8j1d8p916";
    /** banner广告 */
    public bannerAd: any = null;
    /**激励视频id */
    public RewardedVideoId: string = "g5g4e6iddg095dthpo";
    /**激励视频 */
    public videoAd: any = null;
    /**插屏id */
    public InterstitialId: string = "27ajo6kd034f2crj93";
    /**插屏 */
    public InterstitialAd: any = null;
    /**有没有激励视频 */
    public isCachedVideo: boolean = false;
    /**广告加载失败后加载次数 */
    public BannerErrCount: number = 0;
    public VoideErrCount: number = 0;
    public ErrZCount: number = 3;

    public game: any = null;
    public windowWidth: number;
    public windowHeight: number;
    /**互推页 */
    public pushView: any;
    public excitationHandler: Laya.Handler;

    /**游戏开始时间 */
    public GameStartTime: any;
    /**游戏结束时间 */
    public GameOverTime: any;
    /**开始加载时间 */
    public StartLoadingTime: any;
    /**加载到游戏主页面时间 */
    public LoadInterfaceTime: any;
    /**是否新玩家 */
    public newPlayer: boolean = true;

    // public initApp(){
    //     console.log("初始化.......");
    //     this.openSplashAd();
    //     tt.onHide(() => {
    //         console.log('小游戏隐藏到后台')
    //     })
    //     tt.onShow(() => {
    //         console.log('小游戏回到前台')
    //     })
    // }
    openAdvert(type: AdvertType, handler?: Laya.Handler) {
        switch (type) {
            case AdvertType.OpenScreen: {
                this.openSplashAd();
                break;
            }
            case AdvertType.ExcitationVideo: {
                this.excitationHandler = handler;
                this.openVideoAdvert();
                break;
            }
        }
    }
    /**震动 */
    openVibrate(){
        // if (GameConst.FLAG_VIBRATE == SwitchType.Off) return;
        this.openVibrateShort();
    }
    /**短震动 */
    openVibrateShort() {
        tt.vibrateShort({
            success(res) {
                // console.log(`${res}`);
                console.log('短震动');
            },
            fail(res) {
                console.log(`vibrateShort调用失败`);
            }
        });
    }
    /**长震动 */
    openVibrateLong() {
        tt.vibrateLong({
            success(res) {
                // console.log(`${res}`);
                console.log('长震动');
            },
            fail(res) {
                console.log(`vibrateShort调用失败`);
            }
        })
    }

    /**加载广告 */
    openSplashAd() {
        this.addCollect();
        if (this.TTappName() != 'DOUYIN') {
            this.openBanner();
        }
        if (typeof tt.createRewardedVideoAd == "function") {
            this.loadVideo();
        }
        // this.showContact();
    }
    /**加载banner广告 */
    openBanner() {
        this.clearBanner();
        if (this.BannerErrCount >= this.ErrZCount) return console.log("加载超时-----banner");
        if (this.bannerAd == null) {
            // 创建一个居于屏幕底部正中的广告
            let windowWidth = tt.getSystemInfoSync().windowWidth;
            let windowHeight = tt.getSystemInfoSync().windowHeight;
            this.windowWidth = windowWidth;
            this.windowHeight = windowHeight;
            console.log('windowWidth-----' + windowWidth, 'windowHeight-----' + windowHeight);

            var targetBannerAdWidth = 200;
            if (targetBannerAdWidth > windowWidth) {
                targetBannerAdWidth = windowWidth - 40;
            }
            let bannerAd = tt.createBannerAd({
                adUnitId: this.BannerId,
                style: {
                    width: targetBannerAdWidth,
                    top: windowHeight - (targetBannerAdWidth / 16 * 9), // 根据系统约定尺寸计算出广告高度
                    left: (windowWidth - targetBannerAdWidth) / 2
                },
            });
            // // 尺寸调整时会触发回调
            // // 注意：如果在回调里再次调整尺寸，要确保不要触发死循环！！！
            bannerAd.onResize(size => {
                if (targetBannerAdWidth != size.width) {
                    targetBannerAdWidth = size.width;
                    bannerAd.style.left = (windowWidth - size.width) / 2;
                    bannerAd.style.top = windowHeight - (size.height + 20);
                }
                console.log("广告宽高---", size.width, size.height, 'left,top---', bannerAd.style.left, bannerAd.style.top);
            });

            bannerAd.onLoad(() => {
                console.log("banner 加载成功");
            });

            bannerAd.onError((err) => {
                console.log("bannerAd 加载失败" + JSON.stringify(err));
                this.BannerErrCount++;
                Laya.timer.once(1000 * 60, this, () => {
                    this.openBanner();
                })
            })

            this.bannerAd = bannerAd;
        }
    }
    /**去除banner广告 */
    clearBanner() {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    }
    getIsCachedVideo() {
        return this.isCachedVideo;
    }
    /**加载激励视频广告 */
    loadVideo() {
        if (this.VoideErrCount >= this.ErrZCount) return console.log("加载超时-----video");
        console.log("loadVideo =-===================================");
        if (this.videoAd == null) {
            let videoAd = tt.createRewardedVideoAd({
                adUnitId: this.RewardedVideoId,
            })

            this.videoAd = videoAd;
            // videoAd.load();

            videoAd.onLoad(() => {
                console.log("激励视频  加载成功 -- ");
                this.isCachedVideo = true;
            })

            videoAd.onError((err) => {
                console.log("激励视频加载失败 -- " + JSON.stringify(err));
                this.VoideErrCount++;
                setTimeout(() => {
                    this.loadVideo();
                }, 1000 * 60);
            });

            videoAd.onClose(res => {
                if (res.isEnded) {
                    // 给予奖励
                    console.log('激励视频广告完成，发放奖励');
                    // (<any>window).NativeCon.revivalResult("1");
                    AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",1");
                    // this.continueMusic();
                    // this.runRewardHandler(1);
                    // this.loadVideo();
                } else {
                    console.log('激励视频广告取消关闭，不发放奖励');
                    // (<any>window).NativeCon.revivalResult("0");
                    AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",0");
                    // this.continueMusic();
                    // this.runRewardHandler(0);
                    // this.loadVideo();
                }
            });
        } else {
            // 可以手动加载一次
            this.videoAd.load()
                .then(() => {
                    this.isCachedVideo = true;
                    console.log('手动加载成功');
                }).catch(err => {
                    console.log('广告组件出现问题', err);

                    setTimeout(() => {
                        this.loadVideo();
                    }, 1000 * 60);
                });;
        }
    }

    /**播放激励视频广告 */
    openVideoAdvert() {
        if (this.videoAd) {
            this.videoAd.show()
                .then(() => {
                    console.log('openRewardVideo  广告显示成功');
                })
                .catch(err => {
                    console.log('openRewardVideo  广告组件出现问题', err);
                    setTimeout(() => {
                        this.loadVideo();
                    }, 1000 * 60);
                });
        }
    }
    public runRewardHandler(value: number) {
        if (this.excitationHandler) {
            this.excitationHandler.runWith(value);
        }
        this.excitationHandler = undefined;
    }

    /**加载插屏广告 */
    public openInterstitial() {
        const isToutiaio = tt.getSystemInfoSync().appName === "Toutiao";
        // 插屏广告仅今日头条安卓客户端支持
        if (isToutiaio) {
            this.InterstitialAd = tt.createInterstitialAd({
                adUnitId: this.InterstitialId
            });
            this.InterstitialAd
                .load()
                .then(() => {
                    this.InterstitialAd.show();
                    console.log('插屏广告加载并显示成功');
                })
                .catch(err => {
                    console.log(err);
                });
            this.InterstitialAd.onClose(() => {
                console.log('销毁插屏广告实例')
                this.InterstitialAd.destroy();
            })
        }
    }
    /** 广告隐藏*/
    hideBannder() {
        console.log("广告隐藏")
        if (this.bannerAd) {
            this.bannerAd.hide();
        }
    }
    /** 广告显示*/
    showBannder() {
        console.log("广告显示")
        if (this.bannerAd) {
            this.bannerAd.show();
        }
    }

    /** 判断是否ios*/
    isIos() {
        const systemInfo = tt.getSystemInfoSync();
        console.log('systemInfo.plaft---', systemInfo.plaft);
        return systemInfo.plaft == 'ios';
    }

    /** 录制开关*/
    videoPlay(game, type) {
        if(game) this.game = game;
        let video_com = this.game.btn_camera.getComponent(VideoCom);
        if (type) {
            console.log("开始游戏,开始录制")
            video_com.isPlay(this.game, type);
            video_com.onResetVideoClick();
            this.game.btn_camera.visible = false;
        } else {
            //停止录制
            console.log("结束游戏,停止录制")
            video_com.isPlay(this.game, type);
            video_com.onResetVideoClick();
            this.game.btn_camera.visible = true;
        }
    }

    /** 分享*/
    onShare(game) {
        console.log("分享");
        if (game.btn_camera.visible) {
            let video_com = game.btn_camera.getComponent(VideoCom);
            video_com.share(1);
        }
    }

    /** 是不是胖子*/
    isFat() {
        return (this.windowHeight / this.windowWidth) < 1.9;
    }

    /** 是否支持互推*/
    ifPush() {
        return typeof tt.showMoreGamesModal == "function"
    }

    /**加载互推 */
    public loadPush(game) {
        // if (!pushIcon || pushIcon.length == 0) return;
        console.log('加载互推');
        this.game = game;
        this.pushView = new TTPush();
        this.pushView.addPush(pushIcon, game);
        Laya.stage.addChild(this.pushView);
    }

    /**显示互推 */
    public showPush(type) {
        this.pushView.visible = true;

        if (this.ifPush() && !this.isIos()) {
            if (type == 1) {
                console.log('显示左互推');
                this.pushView.left_push.visible = true;
            } else if (type == 2) {
                console.log('显示右互推');
                this.pushView.right_push.visible = true;
            } else if (type == 3) {
                console.log('显示底部互推');
                this.pushView.bottom_push.visible = true;
            }
        };
        if (type == 4) {
            console.log('显示分享');
            this.pushView.shareBox.visible = true;
            // this.showBannder();
        }
    }

    /**隐藏互推 */
    public hidePush() {
        console.log('隐藏互推');
        this.pushView.visible = false;
        if (!this.ifPush() || this.isIos()) return;
        this.pushView.left_push.visible = false;
        this.pushView.right_push.visible = false;
        this.pushView.bottom_push.visible = false;
    }

    /**移动轮播互推 */
    public moveCarouselPush(type) {
        if (!this.ifPush() || this.isIos()) return;
        if (type) {
            console.log('移位轮播互推');
            Laya.Tween.to(this.game.tt_CarouselPush, { y: 260 }, 200);
            Laya.Tween.to(this.game.btn_camera, { y: 340 }, 200);
        } else {
            console.log('归位轮播互推');
            Laya.Tween.to(this.game.tt_CarouselPush, { y: 360 }, 200);
            Laya.Tween.to(this.game.btn_camera, { y: 440 }, 200);
        }

    }

    /** 添加到我的小程序*/
    addCollect() {
        if (typeof tt.showFavoriteGuide != "function") return;
        tt.showFavoriteGuide({
            type: "bar",
            content: "一键添加到我的小程序",
            position: "bottom",
            success(res) {
                console.log("引导组件展示成功-----" + res);
            },
            fail(res) {
                console.log("引导组件展示失败-----" + res);
            }
        });
    }
    /** 显示提示信息*/
    showTip(tip) {
        tt.showToast({
            title: tip,
            duration: 2000,
            success(res) {
                console.log(`${res}`);
            },
            fail(res) {
                console.log(`showToast调用失败`);
            }
        });
    }

    /** 头条平台类别*/
    TTappName() {
        const info = tt.getSystemInfoSync();
        console.log('头条app' + info.appName);
        return info.appName.toUpperCase();
    }

    /**创建客服按钮 */
    showContact(){
        if (typeof tt.createContactButton != "function") return console.log('不支持客服按钮');
        console.log('创建客服按钮');
        
        const button = tt.createContactButton({
            type: "image", // image | text
            image: "push/btn_kefu.png",
            // text: "客服",
            style: {
              left: 14,
              top: 130,
              width: 53,
              height: 57,
            //   lineHeight: 40,
            //   backgroundColor: "#ffffff",
            //   textAlign: "center",
            //   fontSize: 16,
            //   borderRadius: 4,
            //   borderColor: "#ffffff",
              borderWidth: 0,
            //   textColor: "#ffffff"
            },
            success(res) {
              console.log("创建客服按钮成功", res);
            },
            fail(res) {
              console.log("创建客服按钮失败", res);
            },
            complete(res) {
              console.log("create complete", res);
            }
          });
          
          // 点击事件
        //   button.handleClick() {
        //     console.log("点击客服按钮");
        //   }
          button.show(); // 显示按钮
        //   button.hide(); // 隐藏按钮
    }
    /** 是否显示互推*/
    isShowPush() {
        if (typeof tt.showMoreGamesModal == "function" && !this.isIos()) {
            console.log('支持互推');
            return true;
        } else {
            console.log('不支持互推');
            return false;
        }
    }
    /** 获取是否支持打开小游戏*/
    public checkIsMiGame(callback: Function) {
        if (this.isShowPush()) {
            callback(SwitchType.On);
        } else {
            callback(SwitchType.Off);
        }
    }
    openGame(name: string) {
        this.pushView.TTnavigateToMiniGame()
    }
    /**事件打点 */
    TTDotEvent(name: string, num?) {
        num = g_constD.nowLvlTimes;
        if (typeof tt.reportAnalytics != "function") return console.log('不支持事件打点');
        console.log(name + '---' + num + '---' + this.newPlayer + '---事件打点');
        switch (name) {
            case 'startLoading': {
                let time = new Date();
                this.StartLoadingTime = time.getTime();
                console.log('开始加载时间-------', this.StartLoadingTime);
                tt.reportAnalytics(name, {
                    checkpoint: num + '',
                    newPlayer: this.newPlayer
                });
                break;
            }
            case 'loadedend': {
                let time = new Date();
                this.LoadInterfaceTime = time.getTime();
                let Duration = (this.LoadInterfaceTime - this.StartLoadingTime) / 1000;
                console.log('加载到游戏主页面时间-------', this.LoadInterfaceTime, '-------时长-------', Duration);
                tt.reportAnalytics(name, {
                    checkpoint: num + '',
                    newPlayer: this.newPlayer,
                    gameDuration: Duration + '',
                });
                break;
            }
            case 'gameStart': {
                let time = new Date();
                this.GameStartTime = time.getTime();
                console.log('开始游戏时间-------', this.GameStartTime);
                tt.reportAnalytics(name, {
                    checkpoint: num + '',
                    newPlayer: this.newPlayer
                });
                break;
            }
            case 'gameComplete': {
                let time = new Date();
                this.GameOverTime = time.getTime();
                let Duration = (this.GameOverTime - this.GameStartTime) / 1000;
                console.log('结束游戏时间-------', this.GameOverTime, '-------时长-------', Duration);
                tt.reportAnalytics(name, {
                    checkpoint: num + '',
                    newPlayer: this.newPlayer,
                    gameDuration: Duration + '',
                });
                break;
            }
            default: {
                tt.reportAnalytics(name, {
                    checkpoint: num + '',
                    newPlayer: this.newPlayer
                });
            }
        }
    }

    /**获取是否是新玩家 */
    getIsNewPlayer(type) {
        let data: any = {};
        let lastDate = new Date();
        data.lastTime = lastDate.getTime();
        this.TTStorage('registerTime', type, data);
    }
    /**本地缓存 */
    TTStorage(key, type, data?) {
        let self = this;
        if (type) {
            tt.getStorage({
                key: key,
                success(res) {
                    console.log(`get---` + key + '---' + res.data);
                    if (key == "registerTime") {
                        if (res.data) {
                            console.log('获取到数据，比较登录时间,res.data.lastTime---'+res.data.lastTime);
                            let nowDate = new Date();
                            let nowTime = nowDate.getTime();
                            if (self.isSameDate(res.data.lastTime, nowTime)){
                                console.log('不是新玩家');
                                self.newPlayer = false;
                            }
                        }
                    }
                },
                fail(res) {
                    console.log(`getStorage调用失败` + res);
                    if (key == "registerTime") {
                        console.log('没获取到数据,是新玩家,记录一下');
                        self.getIsNewPlayer(0);
                    }
                }
            });
        } else {
            // console.log('缓存data---'+data+'----data.lastTime---'+ data.lastTime);
            tt.setStorage({
                key: key,
                data: data,
                success(res) {
                    console.log(`set---` + key + '---' + res);
                },
                fail(res) {
                    console.log(`setStorage调用失败`);
                }
            });
        }
    }

    /**是否是新的一天 */
    isSameDate(lastTimestamp, nowTimestamp) {
        let intervalTime = nowTimestamp - lastTimestamp;//这次和上次的间隔时间戳
        let intervalDay = ((intervalTime / 1000) / 3600) / 24;//这次和上次的间隔天数
        let nowTime = new Date(nowTimestamp);//这次的时间
        let lastTime = new Date(lastTimestamp);//上次的时间
        let nowDay = nowTime.getDate();//这次分享是几号
        let lastDay = lastTime.getDate();//上次分享是几号
        if (intervalDay >= 1) {
            return true;
        } else {
            if (nowDay != lastDay) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**隐藏分享  */
    hideShare(){
        this.pushView.hideShare();
    }
}

declare module tt {
    export function showMoreGamesModal(obj: any): void;
    export function vibrateShort(obj: _vibrateTTShortObject): void;
    export function vibrateLong(obj: _vibrateTTShortObject): void;
    export function createBannerAd(obj: any): any;
    export function getSystemInfoSync(): any;
    export function onHide(obj: any): any;
    export function onShow(obj: any): any;
    export function createRewardedVideoAd(obj: any): any;
    export function showFavoriteGuide(obj: any): any;
    export function showToast(obj: any): any;
    export function createInterstitialAd(obj: any): any;
    export function createContactButton(obj: any): any;
    export function reportAnalytics(key, obj: any): any;
    export function getStorage(obj: any): any;
    export function setStorage(obj: any): any;
}
interface _vibrateTTShortObject {
    /**
     * 接口调用成功的回调函数
     */
    success: (res) => void;

    /**
     * 接口调用失败的回调函数
     */
    fail: (res) => void;
}