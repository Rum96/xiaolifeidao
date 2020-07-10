import g_evnetM from "../common/EventManager";
import { ErrorCode, AdvertType } from "../common/StructMap";
import JsbBase from "./JsbBase";

export default class JsbQQMinniGame extends JsbBase {

    audio: InnerAudioContext;

    public BannerId: string = "3355b250ef168e6d730424114fa2879c";

    public RewardedVideoId: string = "2920a9b5239925f27519ef53e2c3c996";

    public InsertId: string = "	6636bff66b78e719f8d2822e021ed27d";

    public bannerAd: _qqBanner;

    public videoAd: _qqVideo;

    public isCachedVideo: boolean = false;

    public systemInfo: _qqSystemInfoSync;

    public isBannerChange: boolean = false;

    public init() {
        g_evnetM.AddEvent("Active", this, this.onActiveHandle);

        try {
            this.systemInfo = qq.getSystemInfoSync();
            console.log(this.systemInfo);
        } catch (e) {
            qq.getSystemInfo({
                success(res: _qqSystemInfoSync) {
                    this.systemInfo = res;
                }
            });
        }
    }

    public openVibrateLong() {
        qq.vibrateShort({
            fail: (res) => {
                qq.vibrateLong({});
            },
        })
    }

    public playMusic(url: string, loop: number = 0) {
        if (this.audio == null) {
            const audio = qq.createInnerAudioContext();
            audio.src = Laya.URL.basePath + "/" + url; // src 可以设置 http(s) 的路径，本地文件路径或者代码包文件路径
            audio.autoplay = false;
            audio.loop = true;
            var playSound = function () {
                // console.log("播放音效");
                audio.play();
                audio.offCanplay(playSound);
            };
            audio.onCanplay(playSound);
            this.audio = audio;
        } else {
            this.audio.play();
        }
    }

    public onActiveHandle() {
        if (this.audio) {
            this.audio.play();
        }
    }

    public stopMusic() {
        if (this.audio) {
            this.audio.pause();
        }
    }

    public playSound(url: string, loop: boolean = false): any {
        // console.log("playSound -------- " + url);

        let audio = qq.createInnerAudioContext();
        audio.src = Laya.URL.basePath + "/" + url;
        audio.autoplay = false;

        let playSound = function () {
            audio.play();
            audio.offCanplay(playSound);
        };

        audio.onCanplay(playSound);

        // let stopSound = function () {
        //     audio.onStop(stopSound);
        //     audio.destroy();
        // }
        // audio.onStop(stopSound);
        return audio
    }

    public openAdvert(type: AdvertType) {
        switch (type) {
            case AdvertType.OpenScreen: {
                setTimeout(() => {
                    this.openBanner();
                }, 2 * 1000);

                this.loadRewardVideo();
                break;
            }
            case AdvertType.ExcitationVideo: {
                this.showRewardVideo();
                break;
            }
        }
    }

    public openBanner() {
        if (this.bannerAd) return;
        console.log("openBanner");
        let w = 900;
        let h = 60;
        let c = h / w;

        let banner = qq.createBannerAd({
            adUnitId: this.BannerId,
            style: {
                width: 300, height: 72, left: 0, top: this.systemInfo.windowHeight
            }
        });
        this.bannerAd = banner;
        banner.onResize((size: Laya.Size) => {
            // bannerAd.style.top = 76;              
            // bannerAd.style.left = 320;
            console.log(size);
            if (!this.isBannerChange) {
                this.isBannerChange = true;
                // banner.style.width = this.systemInfo.windowWidth;
                // banner.style.height = banner.style.width * c;
                banner.style.top = this.systemInfo.windowHeight - size.height;

                banner.style.left = this.systemInfo.windowWidth / 2 - size.width / 2;
                // console.log(banner.style.width, banner.style.height, banner.style.top);
            }
        });

        banner.onLoad(() => {
            console.log("banner onLoad ---");
            banner.show();
        });


        banner.onError((res) => {
            console.log("banner加载失败    " + JSON.stringify(res));
            if (res.errCode == ErrorCode.c1004 || res.errCode == ErrorCode.c1003) {
                this.clearBanner();
                setTimeout(() => {
                    this.openBanner();
                }, 10 * 1000);
            }
        });
    }

    public clearBanner() {
        if (this.bannerAd) {
            this.bannerAd.destroy();
            this.bannerAd = null;
        }
    }

    public loadRewardVideo() {
        if (this.videoAd == null) {
            console.log("loadRewardVideo");
            let video = qq.createRewardedVideoAd({ adUnitId: this.RewardedVideoId });

            video.onClose((res) => {
                if (res.isEnded) {
                    AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",1");
                    console.log("发放奖励");
                } else {
                    AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",0");
                }

                setTimeout(() => {
                    this.loadRewardVideo();
                }, 2 * 1000);
            })

            video.onError((res) => {
                console.log("video加载失败    " + JSON.stringify(res));
                if (res.errCode == ErrorCode.c1004 || res.errCode == ErrorCode.c1003) {
                    this.clearRewardVideo();
                    setTimeout(() => {
                        this.loadRewardVideo();
                    }, 10 * 1000);
                }
            });

            video.onLoad(() => {
                console.log("video 加载成功");
                this.isCachedVideo = true;
            });
            this.videoAd = video;
        } else {
            this.videoAd.load();
        }

    }

    public showRewardVideo() {
        this.isCachedVideo = false;
        this.videoAd.show();
    }

    public clearRewardVideo() {
        // if(this.videoAd){
        //     this.videoAd.
        // }
    }

    public getIsCachedVideo() {
        return this.isCachedVideo;
    }
}
