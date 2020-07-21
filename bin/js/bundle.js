(function () {
    'use strict';

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1600;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "LoadView.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class EventManager {
        init() {
            this.cusEvent = new Laya.EventDispatcher();
        }
        AddEvent(eventName, caller, handle) {
            this.cusEvent.on(eventName, caller, handle);
        }
        DispatchEvent(eventName, data) {
            this.cusEvent.event(eventName, data);
        }
        SubEvent(eventName, caller, handle) {
            this.cusEvent.off(eventName, caller, handle);
        }
    }
    EventManager.Instance = new EventManager();
    var g_evnetM = EventManager.Instance;

    class ConstData {
        constructor() {
            this.isDY = false;
            this.isTT = false;
            this.isCdnFenbao = false;
            this.isPlatfFenbao = false;
            this.nowLvl = 1;
            this.totalLvl = 20;
            this.nowLvlTimes = 1;
            this.winGold = 0;
            this.advType = 0;
            this.stageW = 720;
            this.stageH = 1280;
            this.pushId = "";
            this.isListActive = false;
            this.isLunboActive = false;
            this.isJiugongActive = false;
            this.BGM = "res/music/music_bgm.mp3";
            this.sound_win = "res/music/sound_win.mp3";
            this.sound_goldbomb = "res/music/sound_goldbomb.mp3";
            this.sound_unlock = "res/music/sound_unlock.mp3";
            this.goldStorageName = "gungang_gold";
            this.dmdStorageName = "gungang_dmd";
            this.lvlStorageName = "gungang_lvl";
            this.lvlTimesStorageName = "gungang_lvl_times";
            this.ownerSkinsStorageName = "gungang_skins";
            this.equipSkinIdStorageName = "gungang_equip_skin_id";
            this.ownerGunsStorageName = "gungang_owner_guns";
            this.equipGunIdStorageName = "gungang_equip_gun_id";
            this.signDayStorageName = "gungang_sign_day";
            this.shootTimeStorageName = "gungang_shoot_time_lvl";
            this.shootAtackStorageName = "gungang_shoot_atack_lvl";
        }
    }
    ConstData.Instance = new ConstData;
    var g_constD = ConstData.Instance;

    class JsbBase {
        init() {
        }
        ;
        openSplashAd() {
        }
        getIsCachedVideo() {
            return false;
        }
        openRewardVideo() {
        }
        hideBanner() { }
        showBanner() { }
        openVibrateShort() {
        }
        openVibrateLong() {
        }
        openVibrate() {
        }
        sendDesktop(func) {
        }
        showInstertView() {
        }
        hasShortcutInstalled(callBack) {
        }
        getIsDesktop() {
            return false;
        }
        openAdvert(type) {
        }
        playMusic(url, loop = 0) {
            if (url == "")
                return console.log("playMusic   背景音乐播放失败  = " + url);
            Laya.SoundManager.playMusic(url, loop);
        }
        stopMusic() {
            Laya.SoundManager.stopMusic();
        }
        playSound(url, loop = false) {
            let p = loop ? 0 : 1;
            return Laya.SoundManager.playSound(url, p);
        }
        openGame(name) {
            console.log(name);
        }
        checkIsMiGame(callback) {
            callback(2);
        }
        getHeight() {
            return Laya.Browser.height;
        }
        exitGame() {
        }
        listenOnshow() { }
        installShortcut() { }
        isInstllShortcut(callback) { }
        reportMonitor() { }
        initNative() { }
        showNative(adId) { }
        clickNative(adId) { }
        destroyNative() { }
        videoPlay(game, type) {
        }
        onShare(game) {
        }
        isIos() {
            return false;
        }
        isDY() {
            return false;
        }
        isFat() {
            return false;
        }
        ifPush() {
            return false;
        }
        hideBannder() {
        }
        showBannder() {
        }
        loadPush(view) {
        }
        showPush(type) {
        }
        hidePush() {
        }
        moveCarouselPush(type) {
        }
        TTappName() {
            return 'DOUYIN';
        }
        openInterstitial() {
        }
        TTDotEvent(name) {
        }
        hideShare() {
        }
    }

    class JsbAndroid extends JsbBase {
        constructor() {
            super();
            this.bridge = null;
            this.bridgeJsb = null;
            this.bridge = PlatformClass.createClass("jsb.JsbAndroid");
        }
        openAdvert(type) {
            switch (type) {
                case 8: {
                    this.openSplashAd();
                    break;
                }
                case 5: {
                    this.openRewardVideo();
                    break;
                }
                case 3: {
                    this.showInstertView();
                    break;
                }
            }
        }
        openSplashAd() {
            this.bridge.call("openSplashActivity");
        }
        getIsCachedVideo() {
            return this.bridge.call("getIsCachedVideo");
        }
        openRewardVideo() {
            this.bridge.call("openRewardVideo");
        }
        getIsInstertView() {
            return true;
        }
        showInstertView() {
            this.bridge.call("showInterstital");
        }
        openVibrateLong() {
            this.bridge.call("openVibrate", 200);
        }
        exitGame() {
            this.bridge.call("exitGame");
        }
    }

    class JsbOppoMiniGame extends JsbBase {
        constructor() {
            super(...arguments);
            this.AppId = "30289156";
            this.OpenScreenId = "187391";
            this.BannerId = "187387";
            this.RewardedVideoId = "187394";
            this.InsertId = "187389";
            this.nativeId = "187392";
            this.isCachedVideo = false;
            this.insertAd = null;
            this.isCachedInsert = false;
            this.isShowIntertView = true;
            this.BannerErrCount = 0;
            this.VoideErrCount = 0;
            this.InsertErrCount = 0;
            this.ErrZCount = 3;
            this.is_auto_close_banner = true;
            this.insertCnt = 8;
            this.bannerCnt = 5;
            this.insertCd = false;
        }
        openAdvert(type) {
            switch (type) {
                case 8: {
                    console.log("初始化");
                    this.openSplashAd();
                    break;
                }
                case 5: {
                    this.showRewardVideo();
                    break;
                }
                case 3: {
                    this.showInstertView();
                    break;
                }
            }
        }
        openSplashAd() {
            this.initFlag();
            this.initOppoAd();
        }
        initFlag() {
            let day = new Date().getDate();
            let localday = PubUtils.GetLocalData("curDay");
            if (localday == null || localday == "" || day != localday) {
                console.log("初始化广告次数参数");
                PubUtils.SetLocalData("curDay", day);
                PubUtils.SetLocalData("instertCount", this.insertCnt);
                PubUtils.SetLocalData("bannerCount", this.bannerCnt);
            }
        }
        openRewardVideo() {
            this.showRewardVideo();
        }
        getIntertCount() {
            let c = PubUtils.GetLocalData("instertCount");
            return +c || 0;
        }
        subInstertCount() {
            let c = this.getIntertCount();
            if (c == 0)
                return;
            c--;
            PubUtils.SetLocalData("instertCount", c);
        }
        initOppoAd() {
            let self = this;
            qg.initAdService({
                appId: this.AppId,
                isDebug: false,
                success: (res) => {
                    Laya.timer.once(10 * 1000, self, () => {
                        self.openBannerView();
                    });
                    this.loadRewardVide();
                    self.loadInsert();
                },
                fail: (res) => {
                },
                complete: (res) => {
                }
            });
        }
        openBannerView() {
            this.clearBanner();
            if (this.BannerErrCount >= this.ErrZCount)
                return console.log("加载超时-----banner");
            let self = this;
            if (this.bannerAd == null) {
                let bannerAd = qg.createBannerAd({ posId: this.BannerId });
                bannerAd.onShow(() => {
                    console.log('banner 广告显示');
                    this.BannerErrCount = 0;
                });
                bannerAd.onHide(() => {
                    console.log("是否是用户自己关闭baner", this.is_auto_close_banner);
                    if (this.is_auto_close_banner) {
                        this.subBannerCount();
                    }
                    this.is_auto_close_banner = true;
                });
                bannerAd.onError(function (err) {
                    console.log("banner 打开失败   " + JSON.stringify(err));
                    self.BannerErrCount++;
                    bannerAd.offError(null);
                });
                this.bannerAd = bannerAd;
                this.showBanner();
            }
        }
        clearBanner() {
            if (this.bannerAd) {
                this.bannerAd.offError(() => {
                });
                this.bannerAd.offHide(() => {
                });
                this.bannerAd.offShow(() => {
                });
                this.bannerAd = null;
            }
        }
        hideBanner() {
            console.log("隐藏banner广告");
            this.is_auto_close_banner = false;
            Laya.timer.once(1000, this, () => {
                this.is_auto_close_banner = true;
            });
            this.bannerAd.hide();
        }
        showBanner() {
            let count = this.getBannerCount();
            if (count == 0) {
                console.log("banner达到玩家关闭上限");
                return;
            }
            this.bannerAd && this.bannerAd.show();
        }
        subBannerCount() {
            let c = this.getBannerCount();
            if (c == 0)
                return;
            c--;
            PubUtils.SetLocalData("bannerCount", c);
        }
        getBannerCount() {
            let c = PubUtils.GetLocalData("bannerCount");
            console.log("banner剩余次数", c + ",", +c);
            return +c || 0;
        }
        loadRewardVide() {
            if (this.VoideErrCount >= this.ErrZCount)
                return console.log("加载超时-----video");
            this.clearRewardVideo();
            if (this.videoAd == null) {
                let videoAd = qg.createRewardedVideoAd({ posId: this.RewardedVideoId });
                videoAd.load();
                videoAd.onLoad(() => {
                    console.log('激励视频加载成功');
                    this.isCachedVideo = true;
                    this.VoideErrCount = 0;
                });
                let self = this;
                videoAd.onError((err) => {
                    console.log("激励视频打开失败" + JSON.stringify(err));
                    AndroidToJs.CallJs("Advertisement", 5 + "," + 0);
                    this.clearRewardVideo();
                    this.VoideErrCount++;
                    Laya.timer.once(1000 * 60, self, () => {
                        this.loadRewardVide();
                    });
                });
                videoAd.onVideoStart(() => {
                    console.log('激励视频 开始播放');
                });
                videoAd.onClose((res) => {
                    if (res.isEnded) {
                        console.log('激励视频广告完成，发放奖励');
                        AndroidToJs.CallJs("Advertisement", 5 + ",1");
                    }
                    else {
                        console.log('激励视频广告取消关闭，不发放奖励');
                        AndroidToJs.CallJs("Advertisement", 5 + ",0");
                    }
                    this.clearRewardVideo();
                    setTimeout(() => {
                        this.loadRewardVide();
                    }, 200);
                });
                this.videoAd = videoAd;
            }
        }
        showRewardVideo() {
            if (this.videoAd && this.isCachedVideo) {
                this.isCachedVideo = false;
                this.videoAd.show();
            }
        }
        clearRewardVideo() {
            if (this.videoAd) {
                this.videoAd.offError(() => { });
                this.videoAd.offLoad(() => { });
                this.videoAd.offRewarded(() => { });
                this.videoAd.offVideoStart(() => { });
                this.videoAd.destroy();
                this.videoAd = null;
            }
        }
        getIsCachedVideo() {
            return this.isCachedVideo;
        }
        loadInsert() {
        }
        isInsertCd() {
            let bol = this.insertCd;
            if (!this.insertCd) {
                this.insertCd = true;
                Laya.timer.once(60 * 1000, this, () => {
                    this.insertCd = false;
                });
            }
            return bol;
        }
        insertNone() {
            AndroidToJs.CallJs("no_insert_play_push", null);
        }
        showInstertView() {
            if (this.InsertErrCount >= this.ErrZCount)
                return console.log("加载超时-----loadInsert");
            let count = this.getIntertCount();
            if (count == 0) {
                this.insertNone();
                console.log("插屏广告达到当日上限");
                return;
            }
            if (this.isInsertCd()) {
                this.insertNone();
                console.log("插屏广告冷却中");
                return;
            }
            if (this.insertAd == null) {
                console.log("showInstarview 加载插屏");
                let self = this;
                let insertAd = qg.createInsertAd({
                    posId: this.InsertId
                });
                this.insertAd = insertAd;
                insertAd.load();
                insertAd.onLoad(() => {
                    console.log('插屏广告加载');
                    self.isCachedInsert = true;
                    self.InsertErrCount = 0;
                    insertAd.show();
                });
                insertAd.onShow(() => {
                    console.log('插屏广告展示');
                    self.InsertErrCount = 0;
                    this.subInstertCount();
                    self.clearInsert();
                });
                insertAd.onError((err) => {
                    self.InsertErrCount++;
                    console.log("插屏打开失败" + JSON.stringify(err));
                    Laya.timer.once(1000 * 60, self, () => {
                        self.clearInsert();
                    });
                });
            }
            else {
                console.log("showInstertView ---------- 清理上次的对象");
                this.insertAd.destroy();
                this.insertAd = null;
            }
        }
        clearInsert() {
            if (this.insertAd) {
                this.insertAd.offError();
                this.insertAd.offLoad();
                this.insertAd.offShow();
                this.insertAd = null;
            }
            this.isCachedInsert = false;
        }
        openVibrate() {
            qg.vibrateShort({
                success: () => {
                    console.log("openVibrate   success");
                },
                fail: () => {
                    console.log("openVibrate   fail");
                },
                complete: () => {
                    console.log("openVibrate   complete");
                }
            });
        }
        openVibrateShort() {
            qg.vibrateShort({
                success: () => {
                    console.log("openVibrateShort   success");
                },
                fail: () => {
                    console.log("openVibrateShort   fail");
                },
                complete: () => {
                    console.log("openVibrateShort   complete");
                }
            });
        }
        openVibrateLong() {
            qg.vibrateLong({
                success: () => {
                    console.log("openVibrateLong   success");
                },
                fail: () => {
                    console.log("openVibrateLong   fail");
                },
                complete: () => {
                    console.log("openVibrateLong   complete");
                }
            });
        }
        playMusic(url, loop = 0) {
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
            }
            else {
                this.audio.play();
            }
        }
        stopMusic() {
            if (this.audio) {
                this.audio.pause();
            }
        }
        playSound(url, loop = false) {
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
        checkIsMiGame(callback) {
            qg.getSystemInfo({
                success: (res) => {
                    if (res.platformVersion >= 1044) {
                        callback(1);
                    }
                    else {
                        callback(2);
                    }
                },
                fail: () => {
                },
                complete: () => {
                }
            });
        }
        openGame(name) {
            qg.navigateToMiniGame({
                pkgName: name
            });
        }
        sendDesktop(func) {
            console.log("-sendDesktop-------------------");
            qg.installShortcut({
                success: function (res) {
                    console.log("sendDesktop   success");
                    console.log(JSON.stringify(res));
                    func(1);
                },
                fail: function (err) {
                    console.log("sendDesktop   err");
                    console.log(JSON.stringify(err));
                    func(0);
                },
                complete: function (res) {
                    console.log("sendDesktop   complete");
                    console.log(JSON.stringify(res));
                }
            });
        }
        getIsDesktop() {
            return true;
        }
        hasShortcutInstalled(callback) {
            qg.getSystemInfo({
                success: (res) => {
                    if (res.platformVersion >= 1044) {
                        qg.hasShortcutInstalled({
                            success: (res) => {
                                callback(res);
                            },
                            fail: () => {
                            },
                            complete: () => {
                            }
                        });
                    }
                    else {
                        callback(0);
                    }
                },
                fail: () => { },
                complete: () => { }
            });
        }
        listenOnshow() {
            qg.onShow(function () {
                console.log("game onshow");
                g_evnetM.DispatchEvent("game_onshow", true);
            });
            qg.onHide(function () {
                console.log("game onhide");
                g_evnetM.DispatchEvent("game_onshow", false);
            });
        }
        initNative() {
            let nativeAd = qg.createNativeAd({
                adUnitId: this.nativeId
            });
            nativeAd.load();
            nativeAd.onLoad((res) => {
                g_evnetM.DispatchEvent("native_load_success", res);
            });
            nativeAd.onError((err) => {
                console.log("原生广告加载失败", err);
                g_evnetM.DispatchEvent("native_load_fail");
            });
            this.nativeAd = nativeAd;
        }
        showNative(adId) {
            console.log("原生广告显示");
            this.nativeAd.reportAdShow({
                adId: adId
            });
        }
        clickNative(adId) {
            console.log("原生广告点击");
            this.nativeAd.reportAdClick({
                adId: adId
            });
        }
        destroyNative() {
            this.nativeAd.destroy();
        }
        installShortcut() {
            qg.hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        qg.installShortcut({
                            success: function () {
                                g_evnetM.DispatchEvent("install_shortcut_success");
                            },
                            fail: function (err) { },
                            complete: function () { }
                        });
                    }
                },
                fail: function (err) { },
                complete: function () { }
            });
        }
        isInstllShortcut(callback) {
            qg.hasShortcutInstalled({
                success: function (res) {
                    callback.runWith(res);
                },
                fail: function (err) { },
                complete: function () { }
            });
        }
        reportMonitor() {
            if (qg.getSystemInfoSync().platformVersionCode >= 1060)
                qg.reportMonitor('game_scene', 0);
        }
    }

    var View = Laya.View;
    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class CutterNodeUI extends View {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(CutterNodeUI.uiView);
            }
        }
        CutterNodeUI.uiView = { "type": "View", "props": { "y": 115, "x": 19, "width": 38, "height": 115, "anchorY": 1, "anchorX": 0.5 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 57, "x": 19, "width": 115, "skin": "img/cutter.png", "rotation": 90, "height": 38, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }], "loadList": ["img/cutter.png"], "loadList3D": [] };
        ui.CutterNodeUI = CutterNodeUI;
        REG("ui.CutterNodeUI", CutterNodeUI);
        class GameSceneUI extends Scene {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(GameSceneUI.uiView);
            }
        }
        GameSceneUI.uiView = { "type": "Scene", "props": { "width": 720, "height": 1600 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 470, "x": 360, "var": "img_target", "skin": "img/target.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }], "loadList": ["img/target.png"], "loadList3D": [] };
        ui.GameSceneUI = GameSceneUI;
        REG("ui.GameSceneUI", GameSceneUI);
        class goldViewUI extends View {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(goldViewUI.uiView);
            }
        }
        goldViewUI.uiView = { "type": "View", "props": { "width": 220, "height": 70 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 35, "x": 110, "width": 220, "var": "img_bg", "sizeGrid": "0,79,0,81", "height": 64, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 4 }, { "type": "Image", "props": { "y": 35, "x": 30, "var": "icon_gold", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 5 }, { "type": "FontClip", "props": { "y": 35, "x": 103, "var": "label_dmd", "value": "33", "sheet": "1234567890", "anchorY": 0.5, "anchorX": 0.3 }, "compId": 6 }], "loadList": [], "loadList3D": [] };
        ui.goldViewUI = goldViewUI;
        REG("ui.goldViewUI", goldViewUI);
        class HallSceneUI extends Scene {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(HallSceneUI.uiView);
            }
        }
        HallSceneUI.uiView = { "type": "Scene", "props": { "width": 720, "height": 1600 }, "loadList": [], "loadList3D": [] };
        ui.HallSceneUI = HallSceneUI;
        REG("ui.HallSceneUI", HallSceneUI);
        class LoadViewUI extends Scene {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(LoadViewUI.uiView);
            }
        }
        LoadViewUI.uiView = { "type": "Scene", "props": { "width": 720, "height": 1280 }, "compId": 2, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "var": "img_bg", "skin": "loading/img_loading_bg.png", "height": 1600 }, "compId": 16 }, { "type": "Label", "props": { "y": 1058, "x": 360, "var": "label_loadtext", "text": "资源加载中,请稍后！", "fontSize": 36, "font": "Microsoft YaHei", "color": "#ffffff", "bold": true, "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }, { "type": "Image", "props": { "y": 947, "x": 135, "width": 450, "var": "img_prg1", "skin": "loading/img_jdt_bg.png", "sizeGrid": "16,90,18,50" }, "compId": 18 }, { "type": "Image", "props": { "y": 951, "x": 141, "width": 438, "var": "img_prg2", "skin": "loading/img_jdt.png", "sizeGrid": "16,53,11,38", "height": 40 }, "compId": 19 }, { "type": "Image", "props": { "y": 499, "x": 360, "var": "img_logo", "skin": "loading/img_logo.png", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 33 }], "loadList": ["loading/img_loading_bg.png", "loading/img_jdt_bg.png", "loading/img_jdt.png", "loading/img_logo.png"], "loadList3D": [] };
        ui.LoadViewUI = LoadViewUI;
        REG("ui.LoadViewUI", LoadViewUI);
        class TipViewUI extends View {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(TipViewUI.uiView);
            }
        }
        TipViewUI.uiView = { "type": "View", "props": { "width": 720, "height": 100 }, "compId": 2, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 720, "height": 100, "bgColor": "#000000", "alpha": 0.7 }, "compId": 5 }, { "type": "Label", "props": { "y": 50, "x": 360, "var": "tip_label", "text": "label", "fontSize": 30, "font": "SimHei", "color": "#ffffff", "anchorY": 0.5, "anchorX": 0.5 }, "compId": 3 }], "loadList": [], "loadList3D": [] };
        ui.TipViewUI = TipViewUI;
        REG("ui.TipViewUI", TipViewUI);
        class ttPushUI extends View {
            constructor() {
                super();
            }
            createChildren() {
                super.createChildren();
                this.createView(ttPushUI.uiView);
            }
        }
        ttPushUI.uiView = { "type": "View", "props": { "zOrder": 1000, "width": 720, "visible": false, "mouseThrough": true, "hitTestPrior": false, "height": 1280 }, "compId": 2, "child": [{ "type": "Box", "props": { "visible": false, "var": "shareBox" }, "compId": 65, "child": [{ "type": "Box", "props": { "width": 720, "height": 1600, "bgColor": "#000000", "alpha": 0.8 }, "compId": 66 }, { "type": "Image", "props": { "y": 300, "x": 42, "var": "share", "skin": "push/img_share_bg.png", "scaleY": 0.9, "scaleX": 0.9 }, "compId": 46, "child": [{ "type": "Image", "props": { "y": 108, "x": 56, "width": 600, "var": "btn_bgShare", "skin": "push/bg_share.png", "height": 300 }, "compId": 72 }, { "type": "Image", "props": { "y": 160, "x": 262, "var": "btn_video", "skin": "push/img_play.png" }, "compId": 67 }, { "type": "Image", "props": { "y": 414, "x": 300, "skin": "img/img_gold.png" }, "compId": 70 }, { "type": "Label", "props": { "y": 424, "x": 360, "text": "+200", "fontSize": 36, "font": "SimSun", "color": "#fff", "bold": true }, "compId": 71 }, { "type": "Image", "props": { "y": 541, "x": 201, "var": "btn_share", "skin": "img/btn_yellow.png" }, "compId": 48, "child": [{ "type": "Sprite", "props": { "y": 32, "x": 49, "texture": "img/txt_7.png" }, "compId": 69 }] }, { "type": "Image", "props": { "y": 670, "x": 285, "var": "hide_share", "skin": "push/txt_nothanks.png" }, "compId": 68 }] }] }], "loadList": ["push/img_share_bg.png", "push/bg_share.png", "push/img_play.png", "img/img_gold.png", "img/btn_yellow.png", "img/txt_7.png", "push/txt_nothanks.png"], "loadList3D": [] };
        ui.ttPushUI = ttPushUI;
        REG("ui.ttPushUI", ttPushUI);
    })(ui || (ui = {}));

    class TipManger {
        showTip(str, time = 2 * 1000) {
            let view = new ui.TipViewUI();
            Laya.stage.addChild(view);
            view.zOrder = 500;
            view.tip_label.text = str;
            view.y = Laya.stage.height / 2 - view.height / 2;
            if (time != 0) {
                let t = Laya.Tween.to(view, { alpha: 0.1 }, time);
                Laya.timer.once(time, this, () => {
                    this.tween.clear();
                    view.destroy();
                });
                this.tween = t;
            }
        }
    }
    TipManger._instance = new TipManger;
    let g_tipM = TipManger._instance;

    class VideoCom extends Laya.Script {
        constructor() {
            super();
            this.isOp = false;
            this.isRecord = false;
            this.curTimer = 0;
            this.norSkin = "img/btn_video1.png";
            this.videoSkin = "img/btn_video2.png";
            this.playType = true;
            this.isClick = true;
            this.isInitiative = true;
        }
        onStart() {
            this.owner.on(Laya.Event.CLICK, this, this.onResetVideoClick);
            console.log("加载录屏啦啦啦啦啦啦啦");
            this.recorder = tt.getGameRecorderManager();
            this.recorder.onStart(res => {
                this.isOp = false;
                console.log("开始录屏");
            });
            this.recorder.onStop(res => {
                this.isOp = false;
                this.owner.skin = this.norSkin;
                this.isRecord = false;
                console.log("停止录屏-------------------- " + res.videoPath);
                this.videoRes = res;
                this.showShare();
                this.isInitiative = true;
                this.playType = true;
            });
            this.recorder.onError((err) => {
                console.log("播放错误" + err);
            });
        }
        onDisable() {
            this.owner.off(Laya.Event.CLICK, this, this.onResetVideoClick);
        }
        onResetVideoClick() {
            console.log("onResetVideoClick  isOp = " + this.isOp + "  isRecord = " + this.isRecord + 'playType = ' + this.playType + 'this.isInitiative' + this.isInitiative);
            if (this.isInitiative) {
                if (!this.isClick)
                    return;
                if (this.isOp)
                    return;
                this.isOp = true;
                if (this.isRecord) {
                    if (this.curTimer >= 3 * 1000) {
                        this.owner.skin = this.norSkin;
                        this.recorder.stop();
                    }
                    else {
                        console.log("不足3秒,停止失败,3秒后自动停止");
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
                }
                else {
                    this.playType = false;
                    this.owner.skin = this.videoSkin;
                    this.recorder.start({
                        duration: 300,
                    });
                }
                this.isRecord = !this.isRecord;
            }
            else {
                if (this.playType) {
                    this.playType = false;
                    this.owner.skin = this.videoSkin;
                    this.recorder.start({
                        duration: 300,
                    });
                }
                else {
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
            }
            else {
                this.curTimer = 0;
            }
        }
        share(type) {
            console.log("分享视频");
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
                            PlatfM.Jsb.TTDotEvent('ShareScreen');
                            g_playerD.diamond += 200;
                            g_evnetM.DispatchEvent("update_dmd");
                            g_tipM.showTip("分享成功,获得200金币!");
                            PlatfM.Jsb.hideShare();
                        }
                        else {
                            console.log('分享不发放奖励');
                        }
                    },
                    fail(e) {
                        console.log('分享视频失败' + JSON.stringify(e));
                        g_tipM.showTip("分享失败,未获得奖励!");
                    }
                });
            }
            catch (e) {
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
        showShare() {
            PlatfM.Jsb.showBannder();
            PlatfM.Jsb.showPush(4);
        }
    }

    class TTPush extends ui.ttPushUI {
        constructor() {
            super();
            this.appId = "ttdbb1ad0c448b3d1e";
            this.pushNum = 0;
            this.tweenNum = 0;
            this.time_lines = [];
            this.windowWidth = tt.getSystemInfoSync().windowWidth;
            this.windowHeight = tt.getSystemInfoSync().windowHeight;
        }
        addPush(pushIcon, game) {
            this.pushIcon = pushIcon;
            this.game = game;
            PubUtils.registerScaleListener(this.hide_share, this, this.hideShare, 1.2, false);
            PubUtils.registerTouchListenner(this.btn_share, this, null, null, this.videoShare);
            PubUtils.registerTouchListenner(this.btn_bgShare, this, null, null, this.videoShare);
            PubUtils.registerTouchListenner(this.btn_video, this, null, null, this.videoShare);
        }
        addCarouselPush() {
            this.game.tt_iconPush.skin = `push/${this.pushIcon[this.pushNum]}.png`;
            this.pushNum++;
            if (this.pushNum > 9)
                this.pushNum = 0;
            this.tween_push(this.game);
            setTimeout(() => {
                this.addCarouselPush();
            }, 1000 * 4.8);
            this.game.tt_CarouselPush.visible = true;
        }
        addLeft_push() {
        }
        addRight_push() {
        }
        addBottom_push() {
        }
        tween_push(game) {
            this.tweenNum++;
            if (this.tweenNum > 4)
                return this.tweenNum = 0;
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
        goHome() {
        }
        comeHome() {
        }
        TTnavigateToMiniGame() {
            if (PlatfM.Jsb.isIos())
                return;
            tt.showMoreGamesModal({
                appLaunchOptions: [
                    {
                        appId: 'ttdbb1ad0c448b3d1e',
                        query: "foo=bar&baz=qux"
                    }
                ],
                success(res) {
                    console.log('success', res.errMsg);
                },
                fail(res) {
                    console.log('fail', res.errMsg);
                }
            });
        }
        hideShare() {
            console.log('隐藏分享');
            this.shareBox.visible = false;
            PlatfM.Jsb.hideBannder();
            Laya.timer.once(1000 * 0.5, this, () => {
                PlatfM.Jsb.openInterstitial();
            });
        }
        videoShare() {
            PlatfM.Jsb.TTDotEvent('ShareScreenClick');
            PlatfM.Jsb.onShare(this.game);
        }
        onCloseClick() {
            this.visible = false;
            this.shareBox.visible = false;
        }
    }

    const pushIcon = ['fklfsicon', 'qqtkicon', 'qqbwticon', 'hdcqdzzicon', 'jyfsjicon', 'nydricon', 'qqtkericon1', 'gdfsicon', 'qqxqgicon', 'qqqjtericon'];
    class JsbTouTiao extends JsbBase {
        constructor() {
            super(...arguments);
            this.BannerId = "3c7186jbd8j1d8p916";
            this.bannerAd = null;
            this.RewardedVideoId = "g5g4e6iddg095dthpo";
            this.videoAd = null;
            this.InterstitialId = "27ajo6kd034f2crj93";
            this.InterstitialAd = null;
            this.isCachedVideo = false;
            this.BannerErrCount = 0;
            this.VoideErrCount = 0;
            this.ErrZCount = 3;
            this.game = null;
            this.newPlayer = true;
        }
        openAdvert(type, handler) {
            switch (type) {
                case 8: {
                    this.openSplashAd();
                    break;
                }
                case 5: {
                    this.excitationHandler = handler;
                    this.openVideoAdvert();
                    break;
                }
            }
        }
        openVibrate() {
            this.openVibrateShort();
        }
        openVibrateShort() {
            tt.vibrateShort({
                success(res) {
                    console.log('短震动');
                },
                fail(res) {
                    console.log(`vibrateShort调用失败`);
                }
            });
        }
        openVibrateLong() {
            tt.vibrateLong({
                success(res) {
                    console.log('长震动');
                },
                fail(res) {
                    console.log(`vibrateShort调用失败`);
                }
            });
        }
        openSplashAd() {
            this.addCollect();
            if (this.TTappName() != 'DOUYIN') {
                this.openBanner();
            }
            if (typeof tt.createRewardedVideoAd == "function") {
                this.loadVideo();
            }
        }
        openBanner() {
            this.clearBanner();
            if (this.BannerErrCount >= this.ErrZCount)
                return console.log("加载超时-----banner");
            if (this.bannerAd == null) {
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
                        top: windowHeight - (targetBannerAdWidth / 16 * 9),
                        left: (windowWidth - targetBannerAdWidth) / 2
                    },
                });
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
                    });
                });
                this.bannerAd = bannerAd;
            }
        }
        clearBanner() {
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        getIsCachedVideo() {
            return this.isCachedVideo;
        }
        loadVideo() {
            if (this.VoideErrCount >= this.ErrZCount)
                return console.log("加载超时-----video");
            console.log("loadVideo =-===================================");
            if (this.videoAd == null) {
                let videoAd = tt.createRewardedVideoAd({
                    adUnitId: this.RewardedVideoId,
                });
                this.videoAd = videoAd;
                videoAd.onLoad(() => {
                    console.log("激励视频  加载成功 -- ");
                    this.isCachedVideo = true;
                });
                videoAd.onError((err) => {
                    console.log("激励视频加载失败 -- " + JSON.stringify(err));
                    this.VoideErrCount++;
                    setTimeout(() => {
                        this.loadVideo();
                    }, 1000 * 60);
                });
                videoAd.onClose(res => {
                    if (res.isEnded) {
                        console.log('激励视频广告完成，发放奖励');
                        AndroidToJs.CallJs("Advertisement", 5 + ",1");
                    }
                    else {
                        console.log('激励视频广告取消关闭，不发放奖励');
                        AndroidToJs.CallJs("Advertisement", 5 + ",0");
                    }
                });
            }
            else {
                this.videoAd.load()
                    .then(() => {
                    this.isCachedVideo = true;
                    console.log('手动加载成功');
                }).catch(err => {
                    console.log('广告组件出现问题', err);
                    setTimeout(() => {
                        this.loadVideo();
                    }, 1000 * 60);
                });
                ;
            }
        }
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
        runRewardHandler(value) {
            if (this.excitationHandler) {
                this.excitationHandler.runWith(value);
            }
            this.excitationHandler = undefined;
        }
        openInterstitial() {
            const isToutiaio = tt.getSystemInfoSync().appName === "Toutiao";
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
                    console.log('销毁插屏广告实例');
                    this.InterstitialAd.destroy();
                });
            }
        }
        hideBannder() {
            console.log("广告隐藏");
            if (this.bannerAd) {
                this.bannerAd.hide();
            }
        }
        showBannder() {
            console.log("广告显示");
            if (this.bannerAd) {
                this.bannerAd.show();
            }
        }
        isIos() {
            const systemInfo = tt.getSystemInfoSync();
            console.log('systemInfo.plaft---', systemInfo.plaft);
            return systemInfo.plaft == 'ios';
        }
        videoPlay(game, type) {
            if (game)
                this.game = game;
            let video_com = this.game.btn_camera.getComponent(VideoCom);
            if (type) {
                console.log("开始游戏,开始录制");
                video_com.isPlay(this.game, type);
                video_com.onResetVideoClick();
                this.game.btn_camera.visible = false;
            }
            else {
                console.log("结束游戏,停止录制");
                video_com.isPlay(this.game, type);
                video_com.onResetVideoClick();
                this.game.btn_camera.visible = true;
            }
        }
        onShare(game) {
            console.log("分享");
            if (game.btn_camera.visible) {
                let video_com = game.btn_camera.getComponent(VideoCom);
                video_com.share(1);
            }
        }
        isFat() {
            return (this.windowHeight / this.windowWidth) < 1.9;
        }
        ifPush() {
            return typeof tt.showMoreGamesModal == "function";
        }
        loadPush(game) {
            console.log('加载互推');
            this.game = game;
            this.pushView = new TTPush();
            this.pushView.addPush(pushIcon, game);
            Laya.stage.addChild(this.pushView);
        }
        showPush(type) {
            this.pushView.visible = true;
            if (this.ifPush() && !this.isIos()) {
                if (type == 1) {
                    console.log('显示左互推');
                    this.pushView.left_push.visible = true;
                }
                else if (type == 2) {
                    console.log('显示右互推');
                    this.pushView.right_push.visible = true;
                }
                else if (type == 3) {
                    console.log('显示底部互推');
                    this.pushView.bottom_push.visible = true;
                }
            }
            ;
            if (type == 4) {
                console.log('显示分享');
                this.pushView.shareBox.visible = true;
            }
        }
        hidePush() {
            console.log('隐藏互推');
            this.pushView.visible = false;
            if (!this.ifPush() || this.isIos())
                return;
            this.pushView.left_push.visible = false;
            this.pushView.right_push.visible = false;
            this.pushView.bottom_push.visible = false;
        }
        moveCarouselPush(type) {
            if (!this.ifPush() || this.isIos())
                return;
            if (type) {
                console.log('移位轮播互推');
                Laya.Tween.to(this.game.tt_CarouselPush, { y: 260 }, 200);
                Laya.Tween.to(this.game.btn_camera, { y: 340 }, 200);
            }
            else {
                console.log('归位轮播互推');
                Laya.Tween.to(this.game.tt_CarouselPush, { y: 360 }, 200);
                Laya.Tween.to(this.game.btn_camera, { y: 440 }, 200);
            }
        }
        addCollect() {
            if (typeof tt.showFavoriteGuide != "function")
                return;
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
        TTappName() {
            const info = tt.getSystemInfoSync();
            console.log('头条app' + info.appName);
            return info.appName.toUpperCase();
        }
        showContact() {
            if (typeof tt.createContactButton != "function")
                return console.log('不支持客服按钮');
            console.log('创建客服按钮');
            const button = tt.createContactButton({
                type: "image",
                image: "push/btn_kefu.png",
                style: {
                    left: 14,
                    top: 130,
                    width: 53,
                    height: 57,
                    borderWidth: 0,
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
            button.show();
        }
        isShowPush() {
            if (typeof tt.showMoreGamesModal == "function" && !this.isIos()) {
                console.log('支持互推');
                return true;
            }
            else {
                console.log('不支持互推');
                return false;
            }
        }
        checkIsMiGame(callback) {
            if (this.isShowPush()) {
                callback(1);
            }
            else {
                callback(2);
            }
        }
        openGame(name) {
            this.pushView.TTnavigateToMiniGame();
        }
        TTDotEvent(name, num) {
            num = g_constD.nowLvlTimes;
            if (typeof tt.reportAnalytics != "function")
                return console.log('不支持事件打点');
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
        getIsNewPlayer(type) {
            let data = {};
            let lastDate = new Date();
            data.lastTime = lastDate.getTime();
            this.TTStorage('registerTime', type, data);
        }
        TTStorage(key, type, data) {
            let self = this;
            if (type) {
                tt.getStorage({
                    key: key,
                    success(res) {
                        console.log(`get---` + key + '---' + res.data);
                        if (key == "registerTime") {
                            if (res.data) {
                                console.log('获取到数据，比较登录时间,res.data.lastTime---' + res.data.lastTime);
                                let nowDate = new Date();
                                let nowTime = nowDate.getTime();
                                if (self.isSameDate(res.data.lastTime, nowTime)) {
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
            }
            else {
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
        isSameDate(lastTimestamp, nowTimestamp) {
            let intervalTime = nowTimestamp - lastTimestamp;
            let intervalDay = ((intervalTime / 1000) / 3600) / 24;
            let nowTime = new Date(nowTimestamp);
            let lastTime = new Date(lastTimestamp);
            let nowDay = nowTime.getDate();
            let lastDay = lastTime.getDate();
            if (intervalDay >= 1) {
                return true;
            }
            else {
                if (nowDay != lastDay) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        hideShare() {
            this.pushView.hideShare();
        }
    }

    class JsbVivoMiGame extends JsbBase {
        constructor() {
            super(...arguments);
            this.AppId = "100006007";
            this.OpenScreenId = "";
            this.BannerId = "";
            this.RewardedVideoId = "";
            this.InsertId = "";
            this.nativeId = "";
            this.BannerErrCount = 0;
            this.VoideErrCount = 0;
            this.InsertErrCount = 0;
            this.ErrZCount = 3;
            this.isCachedVideo = false;
            this.isCachedInsert = false;
        }
        openSplashAd() {
            this.initOppoAd();
        }
        initOppoAd() {
            console.log("initOppoAd ");
            Laya.timer.once(10 * 1000, this, () => {
                this.openBannerView();
            });
            console.log("---------------------------------------------------");
            this.loadInsert();
            this.loadRewardVide();
        }
        openVibrate() {
            qg.vibrateLong({
                success: () => {
                    console.log("openVibrateLong   success");
                },
                fail: () => {
                    console.log("openVibrateLong   fail");
                },
                complete: () => {
                    console.log("openVibrateLong   complete");
                }
            });
        }
        openAdvert(type) {
            switch (type) {
                case 8: {
                    this.initOppoAd();
                    break;
                }
                case 5: {
                    this.showRewardVideo();
                    break;
                }
                case 3: {
                    this.showInstertView();
                    break;
                }
            }
        }
        openBannerView() {
            this.clearBanner();
            if (this.BannerErrCount >= this.ErrZCount)
                return console.log("加载超时-----banner");
            if (this.bannerAd == null) {
                var bannerAd = qg.createBannerAd({
                    posId: this.BannerId,
                    style: {}
                });
                bannerAd.show();
                bannerAd.onLoad(() => {
                    console.log('Banner广告加载成功');
                    bannerAd.show();
                    this.BannerErrCount = 0;
                });
                bannerAd.onError((err) => {
                    console.log("Banner广告加载失败");
                    console.log(JSON.stringify(err));
                    this.BannerErrCount++;
                });
                bannerAd.onClose(() => {
                    console.log("bannerAd 关闭");
                    setTimeout(() => {
                        this.openBannerView();
                    }, 1000 * 60);
                });
                this.bannerAd = bannerAd;
            }
        }
        clearBanner() {
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        loadRewardVide() {
            if (qg.createRewardedVideoAd == null)
                return;
            if (this.VoideErrCount >= this.ErrZCount)
                return console.log("加载超时-----video");
            if (this.videoAd == null) {
                let videoAd = qg.createRewardedVideoAd({ posId: this.RewardedVideoId });
                videoAd.onLoad(() => {
                    console.log('激励视频加载成功');
                    this.isCachedVideo = true;
                    this.VoideErrCount = 0;
                });
                let self = this;
                videoAd.onError((err) => {
                    console.log("激励视频播放失败" + JSON.stringify(err));
                    AndroidToJs.CallJs("Advertisement", 5 + ",0");
                    this.VoideErrCount++;
                    setTimeout(() => {
                        this.loadRewardVide();
                    }, 1000 * 60);
                });
                videoAd.onClose((res) => {
                    if (res && res.isEnded) {
                        console.log("正常播放结束，可以下发游戏奖励");
                        AndroidToJs.CallJs("Advertisement", 5 + ",1");
                    }
                    else {
                        console.log("播放中途退出，不下发游戏奖励");
                        AndroidToJs.CallJs("Advertisement", 5 + ",0");
                    }
                    setTimeout(() => {
                        this.loadRewardVide();
                    }, 1000 * 60);
                });
                this.videoAd = videoAd;
            }
            else {
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
        getIsCachedVideo() {
            console.log("getIsCachedVideo" + this.isCachedVideo);
            return this.isCachedVideo;
        }
        showRewardVideo() {
            if (this.videoAd && this.isCachedVideo) {
                this.stopMusic();
                this.isCachedVideo = false;
                this.videoAd.show();
            }
        }
        clearRewardVideo() {
        }
        loadInsert() {
            console.log("loadInsert   加载插屏");
            if (this.InsertErrCount >= this.ErrZCount)
                return console.log("加载超时-----loadInsert");
            if (this.insertAd == null) {
                let insertAd = qg.createInterstitialAd({
                    posId: this.InsertId
                });
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
            }
            else {
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
                });
            }
        }
        clearInsert() {
            this.isCachedInsert = false;
            this.insertAd = null;
        }
        showInstertView() {
            console.log("显示插屏");
            if (this.insertAd) {
                this.insertAd.show().catch(() => {
                    this.insertAd.load().then(() => {
                        this.insertAd.show();
                    });
                });
            }
        }
        sendDesktop(func) {
            if (qg.installShortcut) {
                qg.installShortcut({
                    success: function (res) {
                        console.log("sendDesktop   success");
                        console.log(JSON.stringify(res));
                        func(1);
                    },
                    fail: function (err) {
                        console.log("sendDesktop   success");
                        console.log(JSON.stringify(err));
                        func(0);
                    },
                    complete: function (res) {
                        console.log("sendDesktop   success");
                        console.log(JSON.stringify(res));
                    }
                });
            }
            else {
                func(1);
            }
        }
        hasShortcutInstalled(callBack) {
            console.log("hasShortcutInstalled");
            if (qg.hasShortcutInstalled) {
                qg.hasShortcutInstalled({
                    success: function (status) {
                        if (status) {
                            console.log('已创建');
                            callBack(1);
                        }
                        else {
                            console.log('未创建');
                            callBack(0);
                        }
                    },
                    fail: () => {
                    },
                    complete: () => {
                    }
                });
            }
            else {
                callBack(0);
            }
        }
        getIsDesktop() {
            return typeof qg.installShortcut === "function";
        }
        playMusic(url, loop = 0) {
            if (this.audio == null) {
                var audio = qg.createInnerAudioContext();
                audio.loop = loop == 0;
                audio.volume = 1;
                audio.autoplay = false;
                audio.src = url;
                this.audio = audio;
            }
            this.audio.play();
        }
        stopMusic() {
            if (this.audio) {
                this.audio.pause();
            }
        }
        playSound(url, loop = false) {
            var audio = qg.createInnerAudioContext();
            audio.loop = loop;
            audio.volume = 0.7;
            audio.autoplay = false;
            audio.src = url;
            audio.play();
            return audio;
        }
        openVibrateShort() {
            qg.vibrateShort({
                success: () => {
                    console.log("openVibrateShort   success");
                },
                fail: () => {
                    console.log("openVibrateShort   fail");
                },
                complete: () => {
                    console.log("openVibrateShort   complete");
                }
            });
        }
        openVibrateLong() {
            qg.vibrateLong({
                success: () => {
                    console.log("openVibrateLong   success");
                },
                fail: () => {
                    console.log("openVibrateLong   fail");
                },
                complete: () => {
                    console.log("openVibrateLong   complete");
                }
            });
        }
        listenOnshow() {
            qg.onShow(function () {
                console.log("game onshow");
                g_evnetM.DispatchEvent("game_onshow", true);
            });
            qg.onHide(function () {
                console.log("game onhide");
                g_evnetM.DispatchEvent("game_onshow", false);
            });
        }
        initNative() {
            if (this.nativeId == "")
                return;
            if (!this.nativeAd) {
                let nativeAd = qg.createNativeAd({
                    posId: this.nativeId
                });
                this.nativeAd = nativeAd;
                console.log("创建nativead ddddddddddddddddddddddd");
                this.nativeAd.onLoad((res) => {
                    g_evnetM.DispatchEvent("native_load_success", res);
                });
            }
            let adLoad = this.nativeAd.load();
            console.log("adLoad aaaaaaaaaaaaaaaaaaaaa", typeof adLoad);
            adLoad && adLoad.then((res) => {
                console.log("native successsssssssssssssssssssssssssss", res);
            }).catch(err => {
                console.log('加载失败', JSON.stringify(err));
                g_evnetM.DispatchEvent("native_load_fail");
            });
        }
        showNative(adId) {
            if (this.nativeId == "")
                return;
            console.log("原生广告显示");
            this.nativeAd.reportAdShow({
                adId: adId
            });
        }
        clickNative(adId) {
            if (this.nativeId == "")
                return;
            console.log("原生广告点击");
            this.nativeAd.reportAdClick({
                adId: adId
            });
        }
        destroyNative() {
            this.nativeAd = null;
        }
        installShortcut() {
            qg.hasShortcutInstalled({
                success: function (res) {
                    if (res == false) {
                        qg.installShortcut({
                            success: function () {
                                g_evnetM.DispatchEvent("install_shortcut_success");
                            },
                            fail: function (err) { },
                            complete: function () { }
                        });
                    }
                },
                fail: function (err) { },
                complete: function () { }
            });
        }
        isInstllShortcut(callback) {
            qg.hasShortcutInstalled({
                success: function (res) {
                    callback.runWith(res);
                },
                fail: function (err) { },
                complete: function () { }
            });
        }
    }

    var PlatfT;
    (function (PlatfT) {
        PlatfT[PlatfT["none"] = 0] = "none";
        PlatfT[PlatfT["android"] = 1] = "android";
        PlatfT[PlatfT["ooMG"] = 2] = "ooMG";
        PlatfT[PlatfT["ttMG"] = 3] = "ttMG";
        PlatfT[PlatfT["bdMG"] = 4] = "bdMG";
        PlatfT[PlatfT["vvMG"] = 5] = "vvMG";
        PlatfT[PlatfT["qqMG"] = 6] = "qqMG";
        PlatfT[PlatfT["wxMG"] = 7] = "wxMG";
        PlatfT[PlatfT["xmMG"] = 8] = "xmMG";
    })(PlatfT || (PlatfT = {}));
    var AdvType;
    (function (AdvType) {
        AdvType[AdvType["normal"] = 0] = "normal";
        AdvType[AdvType["sbkaishi"] = 1] = "sbkaishi";
        AdvType[AdvType["signFanbei"] = 2] = "signFanbei";
        AdvType[AdvType["skinGet"] = 3] = "skinGet";
        AdvType[AdvType["skinGold"] = 4] = "skinGold";
        AdvType[AdvType["skinUse"] = 5] = "skinUse";
        AdvType[AdvType["sblingqu"] = 6] = "sblingqu";
        AdvType[AdvType["atackUp"] = 7] = "atackUp";
        AdvType[AdvType["speedUp"] = 8] = "speedUp";
        AdvType[AdvType["limitSkin"] = 9] = "limitSkin";
    })(AdvType || (AdvType = {}));
    var ErrorCode;
    (function (ErrorCode) {
        ErrorCode[ErrorCode["c1000"] = 1000] = "c1000";
        ErrorCode[ErrorCode["c1001"] = 1001] = "c1001";
        ErrorCode[ErrorCode["c1002"] = 1002] = "c1002";
        ErrorCode[ErrorCode["c1003"] = 1003] = "c1003";
        ErrorCode[ErrorCode["c1004"] = 1004] = "c1004";
        ErrorCode[ErrorCode["c1005"] = 1005] = "c1005";
        ErrorCode[ErrorCode["c1006"] = 1006] = "c1006";
        ErrorCode[ErrorCode["c1007"] = 1007] = "c1007";
        ErrorCode[ErrorCode["c1008"] = 1008] = "c1008";
    })(ErrorCode || (ErrorCode = {}));
    var baiduErrCode;
    (function (baiduErrCode) {
        baiduErrCode[baiduErrCode["c103010"] = 103010] = "c103010";
        baiduErrCode[baiduErrCode["c103011"] = 103011] = "c103011";
        baiduErrCode[baiduErrCode["c103012"] = 103012] = "c103012";
        baiduErrCode[baiduErrCode["c103020"] = 103020] = "c103020";
        baiduErrCode[baiduErrCode["c107000"] = 107000] = "c107000";
        baiduErrCode[baiduErrCode["c107001"] = 107001] = "c107001";
        baiduErrCode[baiduErrCode["c107002"] = 107002] = "c107002";
        baiduErrCode[baiduErrCode["c107003"] = 107003] = "c107003";
        baiduErrCode[baiduErrCode["c200000"] = 200000] = "c200000";
        baiduErrCode[baiduErrCode["c201000"] = 201000] = "c201000";
        baiduErrCode[baiduErrCode["c3010000"] = 3010000] = "c3010000";
        baiduErrCode[baiduErrCode["c3010002"] = 3010002] = "c3010002";
        baiduErrCode[baiduErrCode["c3010003"] = 3010003] = "c3010003";
        baiduErrCode[baiduErrCode["c3010004"] = 3010004] = "c3010004";
        baiduErrCode[baiduErrCode["c3010005"] = 3010005] = "c3010005";
        baiduErrCode[baiduErrCode["c3010006"] = 3010006] = "c3010006";
        baiduErrCode[baiduErrCode["c3010007"] = 3010007] = "c3010007";
        baiduErrCode[baiduErrCode["c3010008"] = 3010008] = "c3010008";
        baiduErrCode[baiduErrCode["c3010009"] = 3010009] = "c3010009";
        baiduErrCode[baiduErrCode["c3010010"] = 3010010] = "c3010010";
    })(baiduErrCode || (baiduErrCode = {}));

    class JsbQQMinniGame extends JsbBase {
        constructor() {
            super(...arguments);
            this.BannerId = "3355b250ef168e6d730424114fa2879c";
            this.RewardedVideoId = "2920a9b5239925f27519ef53e2c3c996";
            this.InsertId = "	6636bff66b78e719f8d2822e021ed27d";
            this.isCachedVideo = false;
            this.isBannerChange = false;
        }
        init() {
            g_evnetM.AddEvent("Active", this, this.onActiveHandle);
            try {
                this.systemInfo = qq.getSystemInfoSync();
                console.log(this.systemInfo);
            }
            catch (e) {
                qq.getSystemInfo({
                    success(res) {
                        this.systemInfo = res;
                    }
                });
            }
        }
        openVibrateLong() {
            qq.vibrateShort({
                fail: (res) => {
                    qq.vibrateLong({});
                },
            });
        }
        playMusic(url, loop = 0) {
            if (this.audio == null) {
                const audio = qq.createInnerAudioContext();
                audio.src = Laya.URL.basePath + "/" + url;
                audio.autoplay = false;
                audio.loop = true;
                var playSound = function () {
                    audio.play();
                    audio.offCanplay(playSound);
                };
                audio.onCanplay(playSound);
                this.audio = audio;
            }
            else {
                this.audio.play();
            }
        }
        onActiveHandle() {
            if (this.audio) {
                this.audio.play();
            }
        }
        stopMusic() {
            if (this.audio) {
                this.audio.pause();
            }
        }
        playSound(url, loop = false) {
            let audio = qq.createInnerAudioContext();
            audio.src = Laya.URL.basePath + "/" + url;
            audio.autoplay = false;
            let playSound = function () {
                audio.play();
                audio.offCanplay(playSound);
            };
            audio.onCanplay(playSound);
            return audio;
        }
        openAdvert(type) {
            switch (type) {
                case 8: {
                    setTimeout(() => {
                        this.openBanner();
                    }, 2 * 1000);
                    this.loadRewardVideo();
                    break;
                }
                case 5: {
                    this.showRewardVideo();
                    break;
                }
            }
        }
        openBanner() {
            if (this.bannerAd)
                return;
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
            banner.onResize((size) => {
                console.log(size);
                if (!this.isBannerChange) {
                    this.isBannerChange = true;
                    banner.style.top = this.systemInfo.windowHeight - size.height;
                    banner.style.left = this.systemInfo.windowWidth / 2 - size.width / 2;
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
        clearBanner() {
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        loadRewardVideo() {
            if (this.videoAd == null) {
                console.log("loadRewardVideo");
                let video = qq.createRewardedVideoAd({ adUnitId: this.RewardedVideoId });
                video.onClose((res) => {
                    if (res.isEnded) {
                        AndroidToJs.CallJs("Advertisement", 5 + ",1");
                        console.log("发放奖励");
                    }
                    else {
                        AndroidToJs.CallJs("Advertisement", 5 + ",0");
                    }
                    setTimeout(() => {
                        this.loadRewardVideo();
                    }, 2 * 1000);
                });
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
            }
            else {
                this.videoAd.load();
            }
        }
        showRewardVideo() {
            this.isCachedVideo = false;
            this.videoAd.show();
        }
        clearRewardVideo() {
        }
        getIsCachedVideo() {
            return this.isCachedVideo;
        }
    }

    class JsbBaiDuMiGame extends JsbBase {
        constructor() {
            super(...arguments);
            this.banner_id = "6476169";
            this.app_id = "f3d5a53f";
            this.video_id = "6476170";
            this.isCachedVideo = false;
        }
        init() {
            this.system_info = swan.getSystemInfoSync();
            console.log("初始化小游戏信息");
            console.log(JSON.stringify(this.system_info));
        }
        openAdvert(type) {
            switch (type) {
                case 8: {
                    this.loadRewardVide();
                    break;
                }
                case 2: {
                    this.openBannerView();
                    break;
                }
                case 5: {
                    this.showRewardVideo();
                    break;
                }
            }
        }
        openSplashAd() {
            setTimeout(() => {
                this.openBannerView();
            }, 5 * 1000);
            this.loadRewardVide();
        }
        openBannerView() {
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
        clearBanner() {
            if (this._banner) {
                this._banner.destroy();
                this._banner = null;
            }
        }
        loadRewardVide() {
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
                console.log("视频加载完成");
                self.isCachedVideo = true;
            }
            video.onLoad(loadOver);
            function loadErr(err) {
                console.log("视频加载失败");
                console.log(JSON.stringify(err));
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
                    AndroidToJs.CallJs("Advertisement", 5 + ",1");
                }
                else {
                    console.log("视频未看完   不发放奖励");
                    AndroidToJs.CallJs("Advertisement", 5 + ",0");
                }
                self.clearRewardVideo();
                self.loadRewardVide();
            }
            video.onClose(close);
            this._video = video;
        }
        showRewardVideo() {
            if (this.isCachedVideo) {
                let self = this;
                this._video.show().then()
                    .catch(err => {
                    console.log(err);
                    setTimeout(() => {
                        self.loadRewardVide();
                    }, 60 * 1000);
                });
                ;
                this.isCachedVideo = false;
            }
        }
        clearRewardVideo() {
        }
        getIsCachedVideo() {
            return this.isCachedVideo;
        }
        openVibrateShort() {
            swan.vibrateShort({
                success: () => {
                },
                fail: () => {
                }
            });
        }
        openVibrateLong() {
            swan.vibrateLong({
                success: () => {
                },
                fail: () => {
                }
            });
        }
    }

    class JsbXiaoMiGame extends JsbBase {
        constructor() {
            super(...arguments);
            this.AppId = "2882303761518444393";
            this.OpenScreenId = "12345";
            this.RewardedVideoId = "12345";
            this.InsertId = "12345";
            this.BannerId = "12345";
            this.isCachedVideo = false;
            this.insertAd = null;
            this.isCachedInsert = false;
            this.isShowIntertView = true;
            this.BannerErrCount = 0;
            this.VoideErrCount = 0;
            this.InsertErrCount = 0;
            this.ErrZCount = 3;
        }
        openAdvert(type) {
            switch (type) {
                case 8: {
                    console.log("初始化");
                    this.openSplashAd();
                    break;
                }
                case 5: {
                    this.showRewardVideo();
                    break;
                }
                case 3: {
                    this.showInstertView();
                    break;
                }
            }
        }
        openSplashAd() {
            Laya.timer.once(20 * 1000, this, () => {
                this.openBannerView();
            });
            this.loadInsert();
            this.loadRewardVide();
        }
        loadInsert() {
            console.log("loadInsert   加载插屏");
            if (this.InsertErrCount >= this.ErrZCount)
                return console.log("加载超时-----loadInsert");
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
            }
            else {
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
                });
            }
        }
        clearInsert() {
            this.isCachedInsert = false;
            this.insertAd = null;
        }
        showInstertView() {
            console.log("显示插屏");
            if (this.insertAd) {
                this.insertAd.show().catch(() => {
                    this.insertAd.load().then(() => {
                        this.insertAd.show();
                    });
                });
            }
        }
        loadRewardVide() {
            if (qg.createRewardedVideoAd == null)
                return;
            if (this.VoideErrCount >= this.ErrZCount)
                return console.log("加载超时-----video");
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
                    AndroidToJs.CallJs("Advertisement", 5 + ",0");
                    this.VoideErrCount++;
                    setTimeout(() => {
                        this.loadRewardVide();
                    }, 1000 * 60);
                });
                videoAd.onClose((res) => {
                    if (res && res.isEnded) {
                        console.log("正常播放结束，可以下发游戏奖励");
                        AndroidToJs.CallJs("Advertisement", 5 + ",1");
                    }
                    else {
                        console.log("播放中途退出，不下发游戏奖励");
                        AndroidToJs.CallJs("Advertisement", 5 + ",0");
                    }
                    setTimeout(() => {
                        this.loadRewardVide();
                    }, 1000 * 60);
                });
                this.videoAd = videoAd;
            }
            else {
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
        getIsCachedVideo() {
            console.log("getIsCachedVideo" + this.isCachedVideo);
            return this.isCachedVideo;
        }
        showRewardVideo() {
            if (this.videoAd && this.isCachedVideo) {
                this.isCachedVideo = false;
                this.videoAd.show();
            }
        }
        clearRewardVideo() { }
        openBannerView() {
            this.clearBanner();
            console.log("bbbbbbbbbbbbbb, 请求加载banner广告");
            if (this.BannerErrCount >= this.ErrZCount)
                return console.log("加载超时-----banner");
            if (this.bannerAd == null) {
                var bannerAd = qg.createBannerAd({
                    adUnitId: this.BannerId,
                });
                bannerAd.onLoad(() => {
                    console.log('Banner广告加载成功');
                    this.BannerErrCount = 0;
                });
                bannerAd.onError((err) => {
                    console.log("Banner广告加载失败");
                    console.log(JSON.stringify(err));
                    this.BannerErrCount++;
                });
                bannerAd.show().then(() => console.log('banner 广告显示'));
                this.bannerAd = bannerAd;
            }
        }
        clearBanner() {
            if (this.bannerAd) {
                this.bannerAd.destroy();
                this.bannerAd = null;
            }
        }
        openVibrate() {
            qg.vibrateShort({
                success: () => {
                    console.log("openVibrate   success");
                },
                fail: () => {
                    console.log("openVibrate   fail");
                },
                complete: () => {
                    console.log("openVibrate   complete");
                }
            });
        }
        openVibrateShort() {
            qg.vibrateShort({
                success: () => {
                    console.log("openVibrateShort   success");
                },
                fail: () => {
                    console.log("openVibrateShort   fail");
                },
                complete: () => {
                    console.log("openVibrateShort   complete");
                }
            });
        }
        openVibrateLong() {
            qg.vibrateLong({
                success: () => {
                    console.log("openVibrateLong   success");
                },
                fail: () => {
                    console.log("openVibrateLong   fail");
                },
                complete: () => {
                    console.log("openVibrateLong   complete");
                }
            });
        }
        playMusic(url, loop = 0) {
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
            }
            else {
                this.audio.play();
            }
        }
        stopMusic() {
            if (this.audio) {
                this.audio.pause();
            }
        }
        playSound(url, loop = false) {
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
        listenOnshow() {
            qg.onShow(function () {
                console.log("game onshow");
                g_evnetM.DispatchEvent("game_onshow", true);
            });
            qg.onHide(function () {
                console.log("game onhide");
                g_evnetM.DispatchEvent("game_onshow", false);
            });
        }
        installShortcut() { }
        isInstllShortcut(callback) { }
        reportMonitor() { }
    }

    class PlatfM {
        static init(plaft) {
            this.plaft = plaft;
            let jsb;
            if (plaft == PlatfT.none) {
                jsb = new JsbBase();
            }
            else if (plaft == PlatfT.android) {
                jsb = new JsbAndroid();
            }
            else if (plaft == PlatfT.ooMG) {
                jsb = new JsbOppoMiniGame();
            }
            else if (plaft == PlatfT.ttMG) {
                jsb = new JsbTouTiao();
            }
            else if (plaft == PlatfT.vvMG) {
                jsb = new JsbVivoMiGame();
            }
            else if (plaft == PlatfT.qqMG) {
                jsb = new JsbQQMinniGame();
            }
            else if (plaft == PlatfT.bdMG) {
                jsb = new JsbBaiDuMiGame();
            }
            else if (plaft == PlatfT.xmMG) {
                jsb = new JsbXiaoMiGame();
            }
            jsb.init();
            this.Jsb = jsb;
        }
        static initData() {
            let userid = PubUtils.GetLocalData("uuid");
            if (userid != null && userid != "") {
                this.userid = userid;
            }
            else {
                this.userid = PubUtils.generateUUID();
                PubUtils.SetLocalData("uuid", this.userid);
            }
        }
    }

    var Vector3 = Laya.Vector3;
    var Event = Laya.Event;
    class PubUtils {
        static getAllCollisonSprite3D(node) {
            let list = [];
            for (let i = 0; i < node.numChildren; i++) {
                let child = node.getChildAt(i);
                if (child) {
                    if (child.numChildren == 0) {
                        list.push(child);
                    }
                    else {
                        let body = child.getComponent(Laya.Rigidbody3D);
                        if (body) {
                            list.push(child);
                        }
                        list = list.concat(this.getAllCollisonSprite3D(child));
                    }
                }
            }
            return list;
        }
        static Vec2Sub(v1, v2) {
            let v = new Laya.Vector2();
            v.x = v1.x - v2.x;
            v.y = v1.y - v2.y;
            return v;
        }
        static Vec3Sub(v1, v2) {
            let v = new Laya.Vector3();
            v.x = v1.x - v2.x;
            v.y = v1.y - v2.y;
            v.z = v1.z - v2.z;
            return v;
        }
        static copyVec3ToNew(v) {
            let p = new Vector3();
            p.x = v.x, p.y = v.y;
            p.z = v.z;
            return p;
        }
        static getVec3Dis(pos1, pos2) {
            return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.z - pos2.z, 2));
        }
        static vector3ToAngle(pos1, pos2) {
            let disV = new Laya.Vector3();
            Laya.Vector3.subtract(pos1, pos2, disV);
            let atan2 = Math.atan2(disV.z, disV.x);
            let angle = atan2 / Math.PI * 180;
            if (angle <= 0) {
                angle += 360;
            }
            return angle;
        }
        static pointsTurnVector3(spos, epos) {
            let disV = new Laya.Vector3();
            Laya.Vector3.subtract(spos, epos, disV);
            Laya.Vector3.normalize(disV, disV);
            return disV;
        }
        static GetLocalData(key) {
            try {
                if (PlatfM.plaft == PlatfT.vvMG) {
                    return qg.getStorageSync({ key: key });
                }
                else if (PlatfM.plaft == PlatfT.xmMG) {
                    localStorage.getItem(key);
                }
                else {
                    return Laya.LocalStorage.getItem(key);
                }
            }
            catch (e) {
                return null;
            }
        }
        static SetLocalData(key, data) {
            if (PlatfM.plaft == PlatfT.vvMG) {
                qg.setStorageSync({ "key": key, "value": data });
            }
            else if (PlatfM.plaft == PlatfT.xmMG) {
                localStorage.setItem(key, data);
            }
            else {
                Laya.LocalStorage.setItem(key, data);
            }
        }
        static registerScaleListener(node, caller, clickFunc, scale, isSwallow = false) {
            let isTouch = false;
            this.registerTouchListenner(node, caller, () => {
                node.scale(scale, scale);
                isTouch = true;
            }, () => {
            }, (event) => {
                node.scale(1, 1);
                if (isTouch) {
                    clickFunc.call(caller, event);
                }
            }, () => {
                isTouch = false;
                node.scale(1, 1);
            }, isSwallow);
        }
        static registerTouchListenner(node, caller, startFunc = null, moveFunc = null, endFunc = null, outFunc = null, isSwallow = false) {
            if (typeof startFunc === "function") {
                node.on(Event.MOUSE_DOWN, this, (event) => {
                    if (isSwallow) {
                        event.stopPropagation();
                    }
                    startFunc.call(caller, event);
                });
            }
            if (typeof moveFunc === "function") {
                node.on(Event.MOUSE_MOVE, this, (event) => {
                    if (isSwallow) {
                        event.stopPropagation();
                    }
                    moveFunc.call(caller, event);
                });
            }
            if (typeof endFunc === "function") {
                node.on(Event.MOUSE_UP, this, (event) => {
                    if (isSwallow) {
                        event.stopPropagation();
                    }
                    endFunc.call(caller, event);
                });
            }
            if (typeof outFunc === "function") {
                node.on(Event.MOUSE_OUT, this, (event) => {
                    if (isSwallow) {
                        event.stopPropagation();
                    }
                    outFunc.call(caller, event);
                });
            }
        }
        static clearTouchListenner(node) {
            node.offAll(Laya.Event.MOUSE_DOWN);
            node.offAll(Laya.Event.MOUSE_MOVE);
            node.offAll(Laya.Event.MOUSE_UP);
            node.offAll(Laya.Event.MOUSE_OUT);
        }
        static getDelta() {
            if (Laya.timer.delta >= 200)
                return 0;
            return Laya.timer.delta / 1000;
        }
        static checkRayAllCollison(scene, shape, from_pos, to_pos, frome_type, to_type) {
            let hits = [];
            scene.physicsSimulation.shapeCastAll(shape, from_pos, to_pos, hits, new Laya.Quaternion(), new Laya.Quaternion(), frome_type, to_type);
            return hits;
        }
        static eularToQuaternion(xx, yy, zz) {
            let X = xx / 180 * Math.PI;
            let Y = yy / 180 * Math.PI;
            let Z = zz / 180 * Math.PI;
            let x = Math.cos(Y / 2) * Math.sin(X / 2) * Math.cos(Z / 2) + Math.sin(Y / 2) * Math.cos(X / 2) * Math.sin(Z / 2);
            let y = Math.sin(Y / 2) * Math.cos(X / 2) * Math.cos(Z / 2) - Math.cos(Y / 2) * Math.sin(X / 2) * Math.sin(Z / 2);
            let z = Math.cos(Y / 2) * Math.cos(X / 2) * Math.sin(Z / 2) - Math.sin(Y / 2) * Math.sin(X / 2) * Math.cos(Z / 2);
            let w = Math.cos(Y / 2) * Math.cos(X / 2) * Math.cos(Z / 2) + Math.sin(Y / 2) * Math.sin(X / 2) * Math.sin(Z / 2);
            let quataion = new Laya.Quaternion(x, y, z, w);
            return quataion;
        }
        static quaternioneToEular(q) {
            let xx = Math.asin(2 * (q.w * q.y - q.z * q.z)) * 57.3;
            let yy = Math.atan2(2 * (q.x * q.w + q.y * q.z), 1 - 2 * (q.x * q.x + q.y * q.y)) * 57.3;
            let zz = Math.atan2(2 * (q.w * q.z + q.x * q.y), 1 - 2 * (q.z * q.z + q.y * q.y)) * 57.3;
            return new Laya.Vector3(xx, yy, zz);
        }
        static vector3Add(v1, v2) {
            let v = new Laya.Vector3();
            v.x = v1.x + v2.x;
            v.y = v1.y + v2.y;
            v.z = v1.z + v2.z;
            return v;
        }
        static vector3Sub(v1, v2) {
            let v = new Laya.Vector3();
            Laya.Vector3.subtract(v1, v2, v);
            return v;
        }
        static MoveTowards(current, target, maxDistanceDelta) {
            let toVector_x = target.x - current.x;
            let toVector_y = target.y - current.y;
            let toVector_z = target.z - current.z;
            let sqdist = toVector_x * toVector_x + toVector_y * toVector_y + toVector_z * toVector_z;
            if (sqdist == 0 || sqdist <= maxDistanceDelta * maxDistanceDelta)
                return target;
            let dist = Math.sqrt(sqdist);
            return new Vector3(current.x + toVector_x / dist * maxDistanceDelta, current.y + toVector_y / dist * maxDistanceDelta, current.z + toVector_z / dist * maxDistanceDelta);
        }
        static RotateTowards(from, to, maxDegreesDelta) {
            let angle = this.Angle(from, to);
            if (angle == 0.0)
                return to;
            let q = new Laya.Quaternion();
            Laya.Quaternion.slerp(from, to, Math.min(1.0, maxDegreesDelta / angle), q);
            return q;
        }
        static Angle(a, b) {
            let dot = this.Dot(a, b);
            return this.IsEqualUsingDot(dot) ? 0.0 : Math.acos(Math.min(Math.abs(dot), 1.0)) * 2.0 * this.Rad2Deg;
        }
        static IsEqualUsingDot(dot) {
            return dot > 1.0 - this.kEpsilon;
        }
        static get Rad2Deg() {
            return 1 / Math.PI * 2 / 360;
        }
        static Dot(a, b) {
            return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
        }
        static generateUUID() {
            let d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now();
            }
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            console.log(uuid);
            return uuid;
        }
        static GetNetJson(url, complete, err = null) {
            let xh = new Laya.HttpRequest();
            xh.once(Laya.Event.COMPLETE, this, complete);
            if (err) {
                xh.once(Laya.Event.ERROR, this, err);
            }
            xh.send(url, "", "get", "json", ["Cache-Control", "no-cache"]);
        }
        static DataDocking(url, param) {
            let xh = new Laya.HttpRequest();
            xh.http.open("POST", url);
            xh.http.setRequestHeader("Content-Type", "application/json");
            xh.http.send(param);
        }
    }
    PubUtils.kEpsilon = 0.000001;

    class HallScene extends ui.HallSceneUI {
        onEnable() {
            this.initMouseEvent();
            this.init();
        }
        init() {
            Laya.timer.once(100, this, this.initGame);
            Laya.timer.once(500, this, this.playBGM);
        }
        playBGM() {
            g_evnetM.DispatchEvent("play_music");
        }
        openBox(isopen = true) {
        }
        openIngame(isopen = false) {
            g_uiM.gamescene.visible = true;
            g_uiM.hallscene.visible = false;
        }
        initMouseEvent() {
            g_evnetM.AddEvent("jili_vedio_back", this, this.advBack);
            g_evnetM.AddEvent("open_mainui", this, this.openBox);
            g_evnetM.AddEvent("game_onshow", this, this.gameOnshow);
            g_evnetM.AddEvent("update_lvl", this, this.updateLvl);
            g_evnetM.AddEvent("install_shortcut_success", this, this.installShortcutSuccess);
            PlatfM.Jsb.listenOnshow();
        }
        openSet(e) {
        }
        openSkin() {
        }
        openSignin(e) {
        }
        openLimitSkin() {
        }
        gameOnshow(isShow) {
        }
        installShortcut() {
            PlatfM.Jsb.installShortcut();
        }
        checkShortcut() {
        }
        installShortcutSuccess() {
        }
        initGame() {
            g_evnetM.DispatchEvent("update_dmd");
            g_evnetM.DispatchEvent("update_lvl");
            PlatfM.Jsb.reportMonitor();
            this.checkShortcut();
            this.openIngame();
        }
        startGame() {
        }
        loadGame() {
        }
        advBack(isSuccess) {
        }
        updateLvl() {
        }
    }

    class GoldView extends ui.goldViewUI {
        onEnable() {
            g_evnetM.AddEvent("update_dmd", this, this.updateDmd);
        }
        updateDmd(time) {
            g_uiM.setLocalDmd(g_playerD.diamond);
            if (!time)
                this.label_dmd.value = "" + g_playerD.diamond;
            else {
                let addgold = { gold: +this.label_dmd.value };
                Laya.Tween.to(addgold, { gold: g_playerD.diamond, update: new Laya.Handler(this, () => {
                        this.label_dmd.value = "" + Math.floor(addgold.gold);
                    }) }, time);
            }
        }
    }

    class LoadView extends ui.LoadViewUI {
        constructor() {
            super(...arguments);
            this.loadtype = 0;
        }
        onEnable() {
            g_evnetM.AddEvent("update_loading", this, this.updatePrg);
            g_evnetM.AddEvent("down_progress", this, this.downTip);
            g_evnetM.AddEvent("upzip_start", this, this.unzipTip);
            this.constcW = this.img_prg2.width - 20;
            this.label_loadtext.text = "";
            this.img_prg2.width = 1;
        }
        downTip(res) {
            if (this.loadtype != 1)
                this.loadtype = 1;
            this.img_prg2.width = Math.floor(res.progress / 100 * this.constcW);
            let np = Math.floor(res.totalBytesWritten / 1024 / 1024 * 10) / 10;
            let ap = Math.floor(res.totalBytesExpectedToWrite / 1024 / 1024 * 10) / 10;
            this.label_loadtext.text = "资源下载中(" + np + "M/" + ap + "M)";
        }
        unzipTip() {
            this.label_loadtext.text = "资源解压中。。。";
        }
        updatePrg(num) {
            if (this.loadtype != 2) {
                this.loadtype = 2;
                this.label_loadtext.text = "资源加载中。。。";
            }
            this.img_prg2.width = Math.floor(num * this.constcW);
        }
    }

    var globalFun;
    (function (globalFun) {
        function copyVec3ToNew(v) {
            let p = new Laya.Vector3();
            p.x = v.x, p.y = v.y;
            p.z = v.z;
            return p;
        }
        globalFun.copyVec3ToNew = copyVec3ToNew;
        function vector3Add(v1, v2) {
            let v = new Laya.Vector3();
            v.x = v1.x + v2.x;
            v.y = v1.y + v2.y;
            v.z = v1.z + v2.z;
            return v;
        }
        globalFun.vector3Add = vector3Add;
        function vector3Sub(v1, v2) {
            let v = new Laya.Vector3();
            Laya.Vector3.subtract(v1, v2, v);
            return v;
        }
        globalFun.vector3Sub = vector3Sub;
        function vector3Mid(v1, v2) {
            let v = new Laya.Vector3();
            Laya.Vector3.lerp(v1, v2, 0.5, v);
            return v;
        }
        globalFun.vector3Mid = vector3Mid;
        function getRandom(n1, n2) {
            var s = Math.random();
            return Math.ceil(n1 + s * (n2 - n1));
        }
        globalFun.getRandom = getRandom;
        function getObjLen(obj) {
            let n = 0;
            for (let i in obj) {
                n++;
            }
            return n;
        }
        globalFun.getObjLen = getObjLen;
        function radToAngle(rad) {
            return rad / Math.PI * 180.0;
        }
        globalFun.radToAngle = radToAngle;
        function angleToRad(angle) {
            return angle * Math.PI / 180.0;
        }
        globalFun.angleToRad = angleToRad;
        function compute3Reflex(I, N) {
            let mi = this.copyVec3ToNew(I);
            let mn = this.copyVec3ToNew(N);
            Laya.Vector3.normalize(mi, mi);
            Laya.Vector3.normalize(mn, mn);
            let r = new Laya.Vector3();
            Laya.Vector3.multiply(mi, mn, r);
            Laya.Vector3.multiply(r, mn, r);
            Laya.Vector3.scale(r, 2, r);
            Laya.Vector3.subtract(mi, r, r);
            Laya.Vector3.normalize(r, r);
            return r;
        }
        globalFun.compute3Reflex = compute3Reflex;
        function angleToVector3(angle) {
            let speedX = Math.sin(angle * Math.PI / 180);
            let speedZ = Math.cos(angle * Math.PI / 180);
            let v = new Laya.Vector3();
            v.x = speedX;
            v.z = speedZ;
            Laya.Vector3.normalize(v, v);
            return v;
        }
        globalFun.angleToVector3 = angleToVector3;
    })(globalFun || (globalFun = {}));
    var globalFun$1 = globalFun;

    class GameScene extends ui.GameSceneUI {
        constructor() {
            super(...arguments);
            this.isMouseDown = false;
        }
        onEnable() {
            this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            this.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
            this.on(Laya.Event.MOUSE_UP, this, this.onMouseUp);
            this.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut);
            this.visible = false;
        }
        onMouseDown(e) {
            if (!g_sceneM.isGamimg)
                return;
            this.lastX = e.stageX;
            this.lastY = e.stageY;
            this.isMouseDown = true;
        }
        onMouseMove(e) {
            if (!g_sceneM.isGamimg || !this.isMouseDown)
                return;
            let stageX = e.stageX;
            let stageY = e.stageY;
            let diffX = stageX - this.lastX;
            let diffY = stageY - this.lastY;
            this.lastX = stageX;
            this.lastY = stageY;
            let rad = Math.atan2(-diffY, -diffX);
            let angle = diffX;
            g_sceneM.rotateCutter(angle);
        }
        onMouseUp() {
            if (!g_sceneM.isGamimg || !this.isMouseDown)
                return;
            this.isMouseDown = false;
            g_sceneM.cutterFly(g_sceneM.cutterNode.rotation);
        }
        onMouseOut() {
            this.onMouseUp();
        }
    }

    class UiManager {
        constructor() {
            this.isDoubleStart = false;
            this.isSkinUsePop = true;
            this.onshowType = 0;
            this.isHaveLimit = true;
            this.lookAdvNum = 0;
            this.isNormal = false;
            this.isSoundOn = true;
            this.isMusicOn = true;
            this.isShakeOn = true;
            this.soundArr = [];
        }
        initEvent() {
            g_evnetM.AddEvent("add_load_view", this, this.addLoadView);
            g_evnetM.AddEvent("load_scene_over", this, this.delLoadView);
            g_evnetM.AddEvent("play_music", this, this.playBGM);
            g_evnetM.AddEvent("stop_music", this, this.stopBGM);
            g_evnetM.AddEvent("Advertisement", this, this.jiliVideoBack);
        }
        init() {
            g_constD.stageW = Laya.stage.width;
            g_constD.stageH = Laya.stage.height;
            this.creatDlg();
            if (g_constD.isDY)
                this.ttVersion();
        }
        shakeScreen(isShort) {
            if (!this.isShakeOn)
                return;
            if (isShort)
                PlatfM.Jsb.openVibrateShort();
            else
                PlatfM.Jsb.openVibrateLong();
        }
        playBGM() {
        }
        stopBGM() {
        }
        playSound(url, loop = false) {
            if (!this.isSoundOn)
                return;
            if (loop) {
                for (let i = 0; i < this.soundArr.length; ++i) {
                    let sound = this.soundArr[i];
                    let src = sound.url || sound.src;
                    if (src.indexOf(url) > -1) {
                        sound.play();
                        return;
                    }
                }
            }
            let sound = PlatfM.Jsb.playSound(url, loop);
            if (loop)
                this.soundArr.push(sound);
        }
        stopSound(url) {
            if (!this.isSoundOn)
                return;
            for (let i = 0; i < this.soundArr.length; ++i) {
                let sound = this.soundArr[i];
                let src = sound.url || sound.src;
                if (src.indexOf(url) > -1) {
                    sound.pause();
                }
            }
        }
        addLoadView() {
            this.loadView = new LoadView();
            Laya.stage.addChild(this.loadView);
            this.loadView.zOrder = 2000;
        }
        delLoadView() {
            if (!this.loadView)
                return;
            this.loadView.destroy();
            this.loadView = null;
        }
        ttVersion() {
        }
        creatDlg() {
            this.hallscene = Laya.stage.addChild(new HallScene);
            this.hallscene.zOrder = 100;
            this.gamescene = Laya.stage.addChild(new GameScene);
            this.gamescene.zOrder = 80;
            this.goldView = Laya.stage.addChild(new GoldView);
            this.goldView.zOrder = 250;
            this.goldView.pos(500, 147);
        }
        setLocalLvl(lvl) {
            PubUtils.SetLocalData(g_constD.lvlStorageName, lvl);
        }
        setLocalLvlTimes(times) {
            PubUtils.SetLocalData(g_constD.lvlTimesStorageName, times);
        }
        setLocalDmd(dmd) {
            PubUtils.SetLocalData(g_constD.dmdStorageName, dmd);
        }
        setLocalGold(gold) {
            PubUtils.SetLocalData(g_constD.goldStorageName, gold);
        }
        setLocalEquipSkinId(id) {
            PubUtils.SetLocalData(g_constD.equipSkinIdStorageName, id);
        }
        setLocalOwnedSkin(skinArr) {
            let skin = "";
            for (let i = 0; i < skinArr.length; ++i) {
                if (i == 0) {
                    skin += skinArr[i];
                }
                else {
                    skin += ("|" + skinArr[i]);
                }
            }
            PubUtils.SetLocalData(g_constD.ownerSkinsStorageName, skin);
        }
        setLocalEquipGunId(id) {
            PubUtils.SetLocalData(g_constD.equipGunIdStorageName, id);
        }
        setLocalSignDayAndTime(day) {
            PubUtils.SetLocalData(g_constD.signDayStorageName, day);
        }
        setLocalShootTimeLvl(lvl) {
            PubUtils.SetLocalData(g_constD.shootTimeStorageName, lvl);
        }
        setLocalShootAtackLvl(lvl) {
            PubUtils.SetLocalData(g_constD.shootAtackStorageName, lvl);
        }
        openJiliVideo(type) {
            if (PlatfM.Jsb.getIsCachedVideo()) {
                g_constD.advType = type;
                if (this.isMusicOn)
                    this.stopBGM();
                PlatfM.Jsb.openAdvert(5);
                return true;
            }
            else {
                g_tipM.showTip("视频正在准备中！");
                return false;
            }
        }
        jiliVideoBack(data) {
            let arr = data.split(",");
            let success = +arr[1];
            let type = +arr[0];
            if (this.isMusicOn)
                g_evnetM.DispatchEvent("play_music");
            let isSuccess = type == 5 && success == 1;
            g_evnetM.DispatchEvent("jili_vedio_back", [isSuccess]);
        }
        firstInstallShortcut() {
            this.hallscene.installShortcut();
        }
        checkLevelUnlock() {
        }
        buttonExchange(btn1, btn2) {
            let rand = globalFun$1.getRandom(0, 100);
            if (rand % 2 == 0)
                return;
            let x1 = btn1.x;
            let y1 = btn1.y;
            let x2 = btn2.x;
            let y2 = btn2.y;
            btn1.pos(x2, y2);
            btn2.pos(x1, y1);
        }
        dialogAni(node, isOpen, time = 200) {
            node.visible = true;
            let black = node.getChildByName("img_black");
            if (isOpen) {
                black && black.scale(4, 4);
                if (time) {
                    node.scale(0.3, 0.3);
                    Laya.Tween.to(node, { scaleX: 1.2, scaleY: 1.2 }, time, null, new Laya.Handler(this, () => {
                        Laya.Tween.to(node, { scaleX: 1, scaleY: 1 }, 100, null, null, null, true);
                    }), null, true);
                }
                else {
                    node.scale(1, 1);
                }
            }
            else {
                if (time) {
                    node.scale(1, 1);
                    Laya.Tween.to(node, { scaleX: 0.2, scaleY: 0.2 }, time, null, new Laya.Handler(this, () => {
                        node.visible = false;
                    }), null, true);
                    black && black.scale(0.1, 0.1);
                }
                else {
                    node.visible = false;
                }
            }
        }
        gameWin() {
            console.log("winnnnnnnnnnnnnnnnnnnnnnnnnnnnn");
        }
        gameLose() {
            console.log("loseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        }
    }
    UiManager.Instance = new UiManager;
    var g_uiM = UiManager.Instance;

    class PlayerData {
        constructor() {
            this.diamond = 0;
            this.signDay = 0;
            this.signTime = 0;
            this.ownerSkins = [0];
            this.equipsId = 0;
            this.freesId = 0;
            this.skinData = [];
            this.siginData = [];
            this.freeSkinData = [];
            this.fireData = [];
            this.bossData = [];
        }
        init() {
        }
        switchSkin(sid) {
            this.equipsId = sid;
            g_uiM.setLocalEquipSkinId(sid);
            g_sceneM.selectSkin();
        }
        unlockSkin(sid) {
            if (!sid)
                return;
            this.switchSkin(sid);
            if (this.ownerSkins.indexOf(sid) > -1)
                return;
            this.ownerSkins.push(sid);
            g_uiM.setLocalOwnedSkin(this.ownerSkins);
        }
    }
    PlayerData.Instance = new PlayerData;
    let g_playerD = PlayerData.Instance;
    class SkinData {
    }
    class SigninData {
    }

    class CutterNode extends ui.CutterNodeUI {
        onEnable() { }
    }

    class SceneManager {
        constructor() {
            this.isGamimg = true;
            this._hitFlag = 0;
            this._x1 = 0;
            this._x2 = g_constD.stageW;
            this._y1 = 0;
            this._y2 = g_constD.stageH;
            this._speed = 1000;
        }
        initEvevt() {
        }
        init() {
            this.cutterNode = Laya.stage.addChild(new CutterNode);
            this.cutterNode.pos(360, 1000);
        }
        selectSkin(sid) {
            if (!sid)
                sid = g_playerD.equipsId;
        }
        destroyScene() {
            this.resetVar();
        }
        resetVar() {
        }
        freeSkinUsing() {
            let fskindata = g_playerD.freeSkinData;
            let num = Math.floor(g_constD.nowLvlTimes / 5) % fskindata.length;
            let sid = +fskindata[num].id;
            g_playerD.freesId = sid;
            this.selectSkin(sid);
        }
        loadScene() {
            let lvl = g_constD.nowLvl;
            let totalLvl = g_constD.totalLvl;
            if (lvl > totalLvl) {
                lvl = g_constD.nowLvl = 1;
                g_uiM.setLocalLvl(lvl);
            }
        }
        reloadScene() {
        }
        initScene() {
            this.loadScene();
        }
        rotateCutter(angle) {
            this.cutterNode.rotation += angle;
        }
        cutterFly(angle) {
            let flyAngle = 90 - angle;
            if (flyAngle > 180)
                flyAngle = flyAngle - 360;
            else if (flyAngle < -180)
                flyAngle = flyAngle + 360;
            this.goFly({ x: this.cutterNode.x, y: this.cutterNode.y }, -globalFun$1.angleToRad(flyAngle));
        }
        goFly(lastPos, rad) {
            if (this._hitFlag == 4) {
                console.log("飞刀碰撞到底部，结束飞行");
                return;
            }
            var data = this.getNextPos(lastPos, rad);
            if (!data)
                return;
            var nextRad = this.getNextRad(rad);
            this.cutterNode.rotation = 90 + data.angle;
            let targetPos = new Laya.Point(360, 470);
            let tgx = targetPos.x;
            let tgy = targetPos.y;
            let cr = 180 / 2;
            let ftween = Laya.Tween.to(this.cutterNode, { x: data.x, y: data.y, update: new Laya.Handler(this, () => {
                    let cx = this.cutterNode.x;
                    let cy = this.cutterNode.y;
                    let d = (cx - tgx) * (cx - tgx) + (cy - tgy) * (cy - tgy);
                    if (d < cr * cr) {
                        console.log("命中目标");
                        ftween.clear();
                    }
                }) }, data.time, null, Laya.Handler.create(this, this.goFly, [data, nextRad]));
        }
        getNextPos(lastPos, rad) {
            var sin = Math.sin(rad);
            var cos = Math.cos(rad);
            var data = {};
            var angle = globalFun$1.radToAngle(rad);
            var bool1 = rad > -Math.PI / 2 && rad < Math.PI / 2;
            var bool2 = rad > 0;
            var tns = (rad > 0 && rad < Math.PI / 2) || (rad > -Math.PI && rad < -Math.PI / 2) ? -1 : 1;
            var d1 = Math.abs((lastPos.x - this._x1) / cos);
            var d2 = Math.abs((this._x2 - lastPos.x) / cos);
            var d3 = Math.abs((lastPos.y - this._y1) / sin);
            var d4 = Math.abs((this._y2 - lastPos.y) / sin);
            var p1 = { x: this._x1, y: lastPos.y + tns * Math.abs(d1 * sin) };
            var p2 = { x: this._x2, y: lastPos.y - tns * Math.abs(d2 * sin) };
            var p3 = { x: lastPos.x + tns * Math.abs(d3 * cos), y: this._y1 };
            var p4 = { x: lastPos.x - tns * Math.abs(d4 * cos), y: this._y2 };
            var distance;
            if (p1.y < this._y2 && p1.y > this._y1 && !bool1) {
                data = p1;
                distance = d1;
                this._hitFlag = 1;
            }
            else if (p2.y < this._y2 && p2.y > this._y1 && bool1) {
                data = p2;
                distance = d2;
                this._hitFlag = 2;
            }
            else if (p3.x < this._x2 && p3.x > this._x1 && !bool2) {
                data = p3;
                distance = d3;
                this._hitFlag = 3;
            }
            else if (p4.x < this._x2 && p4.x > this._x1 && bool2) {
                data = p4;
                distance = d4;
                this._hitFlag = 4;
            }
            else {
                console.log("子弹路径异常！！！");
                this.cutterNode.destroy();
                return;
            }
            data.time = distance / this._speed * 1000;
            data.angle = angle;
            return data;
        }
        getNextRad(rad) {
            if (this._hitFlag == 1 || this._hitFlag == 2) {
                return rad > 0 ? (Math.PI - rad) : (-Math.PI - rad);
            }
            return -rad;
        }
    }
    SceneManager.Instance = new SceneManager;
    var g_sceneM = SceneManager.Instance;

    var DownFunc;
    (function (DownFunc) {
        DownFunc.codeVersion = "1.0.2";
        DownFunc.gamename = "gunGang";
        var downloadFile;
        var statusCode = 200;
        function initVar(platf) {
            if (platf == PlatfT.ttMG) {
                DownFunc.fstt = tt.getFileSystemManager();
                DownFunc.reUrl = tt.env.USER_DATA_PATH;
                DownFunc.redownUrl = "https://kuaizhiyou.com.cn/TTchannel/";
                downloadFile = tt.downloadFile;
            }
            else if (platf == PlatfT.qqMG) {
                DownFunc.fstt = qq.getFileSystemManager();
                DownFunc.reUrl = qq.env.USER_DATA_PATH;
                DownFunc.redownUrl = "https://www.joylandgame.cn/qq/";
                downloadFile = qq.downloadFile;
            }
            DownFunc.downUrl = DownFunc.redownUrl + DownFunc.gamename + "/" + DownFunc.gamename + "_" + DownFunc.codeVersion + ".zip";
            DownFunc.unZipPath = DownFunc.reUrl + "/cache/res/";
            DownFunc.localZipPath = DownFunc.reUrl + "/cache/res/" + DownFunc.gamename + "_" + DownFunc.codeVersion + ".zip";
        }
        DownFunc.initVar = initVar;
        function isDirExist(path, callBack) {
            DownFunc.fstt.access({
                path: path,
                success() {
                    if (callBack) {
                        callBack(true);
                    }
                },
                fail() {
                    if (callBack) {
                        callBack(false);
                    }
                },
                complete() { }
            });
        }
        DownFunc.isDirExist = isDirExist;
        function downFile(callBcak) {
            var desPath = DownFunc.localZipPath;
            var sourcePath = DownFunc.downUrl;
            console.log("开始下载", sourcePath, desPath);
            let downloadTask = downloadFile({
                url: sourcePath,
                filePath: desPath,
                success(res) {
                    console.log("下载成功", res);
                    if (res.statusCode === statusCode) {
                        if (callBcak)
                            callBcak(true);
                    }
                },
                fail(evt) {
                    console.log("下载失败" + evt.errMsg);
                    if (callBcak)
                        callBcak(false);
                }
            });
            downloadTask.onProgressUpdate((res) => {
                g_evnetM.DispatchEvent("down_progress", [res]);
            });
        }
        DownFunc.downFile = downFile;
        function unzipOneFile(callBack) {
            DownFunc.fstt.unzip({
                zipFilePath: DownFunc.localZipPath,
                targetPath: DownFunc.unZipPath,
                success(evt) {
                    console.log('解压完毕');
                    if (callBack)
                        callBack(true);
                },
                fail(evt) {
                    console.log('解压取消' + evt.errMsg, DownFunc.localZipPath);
                    if (callBack)
                        callBack(false);
                }
            });
        }
        DownFunc.unzipOneFile = unzipOneFile;
        function mkdir(path, callBack) {
            DownFunc.fstt.mkdir({
                dirPath: path,
                success: function () {
                    if (callBack)
                        callBack();
                },
                fail: function (errMsg) {
                    console.log("建立文件夹失败", errMsg);
                },
                complete: function () {
                    console.log("建立文件夹complete");
                }
            });
        }
        DownFunc.mkdir = mkdir;
        function removefiles(filePath) {
            getFileList(filePath, function (fileList) {
                if (!fileList)
                    return;
                for (let i = 0; i < fileList.length; ++i) {
                    let filei = fileList[i];
                    if (filei.indexOf(".") > -1) {
                        unlink(filePath + "/" + filei);
                    }
                    else {
                        removefiles(filePath + "/" + filei);
                    }
                }
            });
        }
        DownFunc.removefiles = removefiles;
        function unlink(filePath, callBack) {
            DownFunc.fstt.unlink({
                filePath: filePath,
                success: function () {
                    if (callBack)
                        callBack(true);
                },
                fail: function (errMsg) {
                    console.log("删除文件失败", errMsg);
                },
                complete: function () {
                    console.log("删除文件complete");
                }
            });
        }
        DownFunc.unlink = unlink;
        function getFileList(path, callBack) {
            DownFunc.fstt.readdir({
                dirPath: path,
                success: function (data) {
                    if (callBack)
                        callBack(data.files);
                },
                fail: function (errMsg) {
                    console.log("读取文件夹失败", errMsg);
                }
            });
        }
        DownFunc.getFileList = getFileList;
    })(DownFunc || (DownFunc = {}));
    var DownFunc$1 = DownFunc;

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.MouseManager.multiTouchEnabled = false;
            g_evnetM.init();
            g_sceneM.initEvevt();
            g_uiM.initEvent();
            PlatfM.init(PlatfT.none);
            g_constD.isTT = PlatfM.plaft == PlatfT.ttMG;
            g_constD.isCdnFenbao = PlatfM.plaft == PlatfT.qqMG || g_constD.isTT;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, () => {
                Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.checkIsFenbao));
            }), Laya.ResourceVersion.FILENAME_VERSION);
        }
        downloadComplete() {
            if (PlatfM.plaft == PlatfT.vvMG && g_constD.isPlatfFenbao) {
                this.platformFenbao();
            }
            else {
                this.loadConfigFirst();
            }
        }
        loadConfigFirst() {
            let loadArr = [
                "res/atlas/img.atlas",
                "res/atlas/comp.atlas",
            ];
            Laya.loader.create(loadArr, new Laya.Handler(this, this.loadConfigLast));
        }
        loadConfigLast() {
            let loadArr = [
                "res/atlas/push.atlas"
            ];
            let soundArr = [];
            if (PlatfM.plaft != PlatfT.vvMG && PlatfM.plaft != PlatfT.bdMG) {
                loadArr = loadArr.concat(soundArr);
            }
            Laya.loader.create(loadArr, new Laya.Handler(this, this.onConfigLoaded), new Laya.Handler(this, (num) => {
                g_evnetM.DispatchEvent("update_loading", +num);
            }));
        }
        onConfigLoaded() {
            g_playerD.init();
            g_sceneM.init();
            g_uiM.init();
            this.platformInit();
            Laya.timer.once(100, this, () => {
                PlatfM.Jsb.TTDotEvent('loadedend');
                g_evnetM.DispatchEvent("load_scene_over");
            });
        }
        platformInit() {
            PlatfM.initData();
            PlatfM.Jsb.checkIsMiGame((type) => {
            });
            if (PlatfM.plaft == PlatfT.vvMG) {
                Laya.timer.once(3 * 1000, this, () => {
                    PlatfM.Jsb.openAdvert(8);
                });
            }
            else {
                PlatfM.Jsb.openAdvert(8);
            }
        }
        platformFenbao() {
            g_evnetM.AddEvent("vivo_loadSubpackage_success", this, this.loadConfigFirst);
            const loadTask = qg.loadSubpackage({
                name: 'game',
                success: function (info) {
                    g_evnetM.DispatchEvent("vivo_loadSubpackage_success");
                    console.log("3333333333333333333");
                },
                fail: function (info) {
                    console.log("444444444444444444444");
                },
                complete: function () {
                    console.log("555555555555555555555");
                }
            });
            loadTask.onProgressUpdate(res => {
                console.log('下载进度', res.progress);
                console.log('已经下载的数据长度', res.totalBytesWritten);
                console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite);
            });
        }
        checkIsFenbao() {
            PlatfM.Jsb.TTDotEvent('startLoading');
            g_evnetM.DispatchEvent("add_load_view");
            if (g_constD.isCdnFenbao) {
                DownFunc$1.initVar(PlatfM.plaft);
                Laya.URL.basePath = DownFunc$1.reUrl + "/cache/";
                g_evnetM.AddEvent("unzip_ok", this, this.downloadComplete);
                Laya.loader.load(DownFunc$1.unZipPath + "version.json", new Laya.Handler(this, (json) => {
                    if (json)
                        DownFunc$1.resVersion = json["version"];
                    this.checkZipDown();
                }));
            }
            else {
                this.downloadComplete();
            }
        }
        checkZipDown() {
            let that = this;
            DownFunc$1.isDirExist(DownFunc$1.unZipPath, function (isExist) {
                if (!isExist) {
                    console.log("目录不存在，建立目录并下载zip");
                    DownFunc$1.isDirExist(DownFunc$1.reUrl + "/cache", function (isInExist) {
                        if (isInExist) {
                            console.log("cache存在，直接建立unzippath");
                            DownFunc$1.mkdir(DownFunc$1.unZipPath, that.downZip);
                        }
                        else {
                            console.log("cache不存在，先建立cache");
                            DownFunc$1.mkdir(DownFunc$1.reUrl + "/cache", function () {
                                console.log("建立cache完成，开始建立unzippath");
                                DownFunc$1.mkdir(DownFunc$1.unZipPath, that.downZip);
                            });
                        }
                    });
                }
                else {
                    let cv = DownFunc$1.codeVersion;
                    let rv = DownFunc$1.resVersion;
                    let isversion = cv == rv;
                    if (!isversion) {
                        console.log("目录存在，但是版本不一样，删包，下载");
                        that.clearDownloads();
                        setTimeout(() => {
                            that.downZip();
                        }, 1000);
                    }
                    else {
                        console.log("目录存在，且版本一样，直接进入游戏");
                        that.downloadComplete();
                    }
                }
            });
        }
        downZip() {
            console.log("开始下载zip");
            DownFunc$1.downFile(function (isSuccess) {
                if (isSuccess) {
                    console.log("下载文件完成，开始解压");
                    g_evnetM.DispatchEvent("upzip_start");
                    DownFunc$1.unzipOneFile(function (isOk) {
                        if (isOk) {
                            console.log("解压完成，删除zip包");
                            DownFunc$1.unlink(DownFunc$1.localZipPath, function (isDel) {
                                if (isDel) {
                                    console.log("删除zip文件成功, 开始游戏");
                                    g_evnetM.DispatchEvent("unzip_ok");
                                }
                            });
                        }
                    });
                }
            });
        }
        clearDownloads() {
            console.log("版本更新，删除文件夹内容");
            let deletePath = DownFunc$1.reUrl + "/cache/res";
            DownFunc$1.removefiles(deletePath);
        }
    }
    new Main();

}());
