import JsbBase from "./JsbBase";
import { baiduErrCode, AdvertType } from "../common/StructMap";

export default class JsbBaiDuMiGame extends JsbBase {
    //16973059  百度得appid 
    //appkey xuudXCPj3nUFwPVj4p91HS8hzXtkWlGH

    public banner_id: string = "6476169";

    public app_id: string = "f3d5a53f";

    public video_id: string = "6476170";

    private _banner: _bannerAd;

    private _video: _videoAd;

    public isCachedVideo: boolean = false;

    public system_info: _getSystemInfoSync;
    public init() {
        this.system_info = swan.getSystemInfoSync();
        console.log("初始化小游戏信息");
        console.log(JSON.stringify(this.system_info));
    }

    openAdvert(type: AdvertType) {
        switch (type) {
            case AdvertType.OpenScreen: {
                this.loadRewardVide();
                break;
            }
            case AdvertType.Banner: {
                this.openBannerView();
                break;
            }
            case AdvertType.ExcitationVideo: {
                this.showRewardVideo();
                break;
            }
        }
    }

    public openSplashAd() {
        setTimeout(() => {
            this.openBannerView();
        }, 5 * 1000);

        this.loadRewardVide();
    }

    //---------------------------------------------- banner -------------------------------------
    public openBannerView() {
        if (this._banner) {
            this._banner.hide();
            this._banner.destroy();
            this._banner = null;
        }

        let bw = 300;
        let bh = 50;

        let banner = swan.createBannerAd({
            adUnitId: this.banner_id,
            appSid: this.app_id,
            style: {
                width: this.system_info.windowWidth,
                top: this.system_info.windowHeight,
                left: 0
            }
        });

        let self = this;
        function loadOver() {
            console.log("加载完成");
            banner.show();
        }

        banner.onLoad(loadOver);

        function loadErr(err) {
            console.log("加载失败");
            console.log(JSON.stringify(err));
            let code = err["errCode"];
            if (code == baiduErrCode.c200000 ||
                code == baiduErrCode.c201000 ||
                code == baiduErrCode.c3010002 ||
                code == baiduErrCode.c3010003 ||
                code == baiduErrCode.c3010004 ||
                code == baiduErrCode.c3010010) {
                self.clearBanner();
                setTimeout(() => {
                    //1分钟后重新缓存广告 
                    self.openBannerView();
                }, 60 * 1000);
            }
        }

        banner.onError(loadErr);

        function onResize(size) {
            console.log(size);
        }

        banner.style.height = banner.style.width / bw * bh;

        banner.onResize(onResize);

        this._banner = banner;
    }

    public clearBanner() {
        if (this._banner) {
            this._banner.destroy();
            this._banner = null;
        }
    }
    //---------------------------------------------- banner -------------------------------------


    //---------------------------------------------- video -------------------------------------
    public loadRewardVide() {

        if (this._video) {
            this._video.load();
            return;
        }

        let video = swan.createRewardedVideoAd({
            adUnitId: this.video_id,
            appSid: this.app_id
        });

        video.load();

        let self = this;
        function loadOver() {
            // video.offLoad(loadOver);
            console.log("视频加载完成");
            self.isCachedVideo = true;
        }

        video.onLoad(loadOver);

        function loadErr(err) {
            console.log("视频加载失败");
            console.log(JSON.stringify(err));
            // video.offError(loadErr);

            let code = err.errCode;
            if (code == baiduErrCode.c200000 ||
                code == baiduErrCode.c201000 ||
                code == baiduErrCode.c3010002 ||
                code == baiduErrCode.c3010003 ||
                code == baiduErrCode.c3010004 ||
                code == baiduErrCode.c3010008 ||
                code == baiduErrCode.c3010009) {
                self.clearRewardVideo();
                setTimeout(() => {
                    self.loadRewardVide();
                }, 60 * 1000);
            }
        }
        video.onError(loadErr);

        function close(res) {
            console.log("视频关闭");
            if (res.isEnded) {
                console.log("发放奖励");
                AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",1");
            } else {
                console.log("视频未看完   不发放奖励");
                AndroidToJs.CallJs("Advertisement", AdvertType.ExcitationVideo + ",0");
            }

            self.clearRewardVideo();

            self.loadRewardVide();
            // video.offClose(close);
        }

        video.onClose(close);

        this._video = video;
    }

    public showRewardVideo() {
        if (this.isCachedVideo) {
            let self = this;

            this._video.show().then()
                .catch(err => {
                    console.log(err);
                    setTimeout(() => {
                        self.loadRewardVide();
                    }, 60 * 1000);
                });;
            this.isCachedVideo = false;
        }
    }

    public clearRewardVideo() {

    }

    public getIsCachedVideo() {
        return this.isCachedVideo;
    }
    //---------------------------------------------- video -------------------------------------

    public openVibrateShort() {
        swan.vibrateShort({
            success: () => {

            },
            fail: () => {

            }
        });
    }

    public openVibrateLong() {
        swan.vibrateLong({
            success: () => {

            },
            fail: () => {

            }
        });
    }


}
