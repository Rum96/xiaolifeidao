import g_evnetM from "../common/EventManager";
import JsbBase from "./JsbBase";
import { AdvertType } from "../common/StructMap";

export default class JsbXiaoMiGame extends JsbBase {
    AppId: string = "2882303761518444393"
    OpenScreenId: string = "12345";
    RewardedVideoId: string = "12345";
    InsertId: string = "12345";
    BannerId: string = "12345";

    isCachedVideo: boolean = false;
    insertAd: any = null;
    isCachedInsert: boolean = false;
    isShowIntertView: boolean = true;
    BannerErrCount: number = 0;
    VoideErrCount: number = 0;
    InsertErrCount: number = 0;
    ErrZCount: number = 3;
    bannerAd: _BannerAd;
    videoAd: any;
    nativeAd: _NativeAd;
    audio: any;

    
    openAdvert(type: AdvertType) {
        switch (type) {
            case AdvertType.OpenScreen: {
                console.log("初始化");
                this.openSplashAd();
                break;
            }

            case AdvertType.ExcitationVideo: {
                this.showRewardVideo();
                break;
            }

            case AdvertType.TableScreen: {
                this.showInstertView();
                break;
            }
        }
    }

    openSplashAd() {
        Laya.timer.once(20 * 1000, this, () => {
            this.openBannerView();
        })
        this.loadInsert();
        this.loadRewardVide();
    }

    //-------------------------------插屏  start ----------------------------------------

    loadInsert() {
        console.log("loadInsert   加载插屏");
        if (this.InsertErrCount >= this.ErrZCount) return console.log("加载超时-----loadInsert");

        if (this.insertAd == null) {
            let insertAd = qg.createInterstitialAd({
                adUnitId: this.InsertId
            });

            console.log("插屏11111111111111111");

            insertAd.onLoad(() => {
                console.log('插屏广告加载成功');
                this.isCachedInsert = true;
                this.InsertErrCount = 0;
            });

            insertAd.onError((err) => {
                this.InsertErrCount++;
                console.log("插屏打开失败");
                console.log(JSON.stringify(err));
                this.clearInsert();
                setTimeout(() => {
                    this.loadInsert();
                }, 1000 * 60);
            });

            insertAd.onClose(() => {
                console.log("插屏关闭");
                this.clearInsert();
                setTimeout(() => {
                    this.loadInsert();
                }, 1000 * 60);
            });


            this.insertAd = insertAd;
        } else {
            console.log("插屏22222222222222222");
            this.insertAd.load().then(() => {
                console.log("重新加载插屏成功");
                this.isCachedInsert = true;
                this.InsertErrCount = 0;
            }).catch((err) => {
                console.log("重新加载插屏失败");
                console.log(JSON.stringify(err));
                this.InsertErrCount++;

                this.clearInsert();
                setTimeout(() => {
                    this.loadInsert();

                }, 1000 * 60);
            })
        }
    }

    clearInsert() {
        this.isCachedInsert = false;
        this.insertAd = null;
    }

    showInstertView() {
        console.log("显示插屏")
        if (this.insertAd) {
            this.insertAd.show().catch(() => {
                this.insertAd.load().then(() => {
                    this.insertAd.show();
                })
            })
        }
    }

    //-------------------------------插屏  end ----------------------------------------


    //-------------------------------激励视频  start ----------------------------------------

    loadRewardVide() {
        if (qg.createRewardedVideoAd == null) return;

        if (this.VoideErrCount >= this.ErrZCount) return console.log("加载超时-----video");

        if (this.videoAd == null) {
            let videoAd = qg.createRewardedVideoAd({ adUnitId: this.RewardedVideoId });

            videoAd.onLoad(() => {
                console.log('激励视频加载成功');
                this.isCachedVideo = true;
                this.VoideErrCount = 0;
            });
            let self = this;
            videoAd.onError((err) => {
                console.log("激励视频播放失败" + JSON.stringify(err));
                AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",0");
                this.VoideErrCount++;

                setTimeout(() => {
                    this.loadRewardVide();
                }, 1000 * 60);
            });

            videoAd.onClose((res) => {
                if (res && res.isEnded) {
                    console.log("正常播放结束，可以下发游戏奖励");

                    // AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo, 1);
                    AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",1");
                } else {
                    console.log("播放中途退出，不下发游戏奖励");
                    // AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo, 0);
                    AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",0");
                }
                //vivo 小游戏禁止同时间请求多次
                // if (HoleConfig.FLAG_MUSIC == SwitchType.On) {
                //     this.playMusic(Resources.bg_mp3, 0);
                // }
                setTimeout(() => {
                    this.loadRewardVide();
                }, 1000 * 60);
            });

            this.videoAd = videoAd;
        } else {
            this.videoAd.load().then(() => {
                console.log("激励视频广告加载成功");
                this.isCachedVideo = true;
                this.VoideErrCount = 0;
            }).catch(err => {
                console.log("激励视频广告加载失败", err);

                this.VoideErrCount++;

                setTimeout(() => {
                    this.loadRewardVide();
                }, 1000 * 60);
            });
        }
    }

    getIsCachedVideo(): boolean {
        console.log("getIsCachedVideo" + this.isCachedVideo);
        return this.isCachedVideo;
    }

    showRewardVideo() {
        if (this.videoAd && this.isCachedVideo) {
            this.isCachedVideo = false;
            this.videoAd.show();
        }
    }

    clearRewardVideo() {}

    //-------------------------------激励视频  end ----------------------------------------


    //-------------------------------banner  start ----------------------------------------

    openBannerView() {
        this.clearBanner();
        console.log("bbbbbbbbbbbbbb, 请求加载banner广告")
        if (this.BannerErrCount >= this.ErrZCount) return console.log("加载超时-----banner");

        if (this.bannerAd == null) {

            //不设置style默认在顶部显示，布局起始位置为屏幕左上角
            var bannerAd = qg.createBannerAd({
                adUnitId: this.BannerId,
            });
            // bannerAd.show();

            bannerAd.onLoad(() => {
                console.log('Banner广告加载成功');
                // bannerAd.show().then(() => console.log('banner 广告显示'));
                this.BannerErrCount = 0;
            });

            bannerAd.onError((err) => {
                console.log("Banner广告加载失败");
                console.log(JSON.stringify(err));
                this.BannerErrCount++;
            });

            bannerAd.show().then(() => console.log('banner 广告显示'));

            // bannerAd.onClose(() => {
            //     console.log("bannerAd 关闭");

            //     setTimeout(() => {
            //         this.openBannerView();
            //     }, 1000 * 60);
            // });

            this.bannerAd = bannerAd;
        }
    }

    clearBanner() {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    }

    //-------------------------------banner  end ----------------------------------------


    public openVibrate() {
        qg.vibrateShort({
            success: () => {
                console.log("openVibrate   success");
                // console.log(JSON.stringify(res));
            },
            fail: () => {
                console.log("openVibrate   fail");
                // console.log(JSON.stringify(res));
            },
            complete: () => {
                console.log("openVibrate   complete");
                // console.log(JSON.stringify(res));
            }
        });
    }

    public openVibrateShort() {
        qg.vibrateShort({
            success: () => {
                console.log("openVibrateShort   success");
                // console.log(JSON.stringify(res));
            },
            fail: () => {
                console.log("openVibrateShort   fail");
                // console.log(JSON.stringify(res));
            },
            complete: () => {
                console.log("openVibrateShort   complete");
                // console.log(JSON.stringify(res));
            }
        });
    }

    public openVibrateLong() {
        qg.vibrateLong({
            success: (res) => {
                console.log("openVibrateLong   success");
                console.log(JSON.stringify(res));
            },
            fail: (res) => {
                console.log("openVibrateLong   fail");
                console.log(JSON.stringify(res));
            },
            complete: (res) => {
                console.log("openVibrateLong   complete");
                console.log(JSON.stringify(res));
            }
        });
    }

    public playMusic(url: string, loop: number = 0) {
        if (this.audio == null) {
            var audio = qg.createInnerAudioContext();
            audio.loop = loop == 0;
            audio.volume = 1;
            audio.autoplay = false;
            var playSound = function () {
                audio.play();
                audio.offCanplay(playSound);
            };
            audio.onCanplay(playSound);
            audio.src = url;
            this.audio = audio;
        } else {
            this.audio.play();
        }
    }

    public stopMusic() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    public playSound(url: string, loop: boolean = false) {
        var audio = qg.createInnerAudioContext();
        audio.loop = loop;
        audio.volume = 0.7;
        audio.autoplay = false;
        var playSound = function () {
            audio.play();
            audio.offCanplay(playSound);
        };
        audio.onCanplay(playSound);
        audio.src = url;
        return audio;
    }

    //监听是否切后台
    listenOnshow() {
        qg.onShow(function () {
            console.log("game onshow")
            g_evnetM.DispatchEvent("game_onshow", true)
        })
        qg.onHide(function() {
            console.log("game onhide")
            g_evnetM.DispatchEvent("game_onshow", false)
        })
    }

    //创建桌面图标
    installShortcut() { }

    //判断是否有桌面图标
    isInstllShortcut(callback: Laya.Handler) { }


    reportMonitor() {}
}