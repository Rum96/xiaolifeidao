import g_evnetM from "../common/EventManager";
import PubUtils from "../common/PubUtils";
import g_constD from "./ConstData";
import g_tipM from "../common/TipManger";
import HallScene from "./HallScene";
import GoldView from "../common/GoldView";
import LoadView from "../common/LoadView";
import g_sceneM from "./SceneManager";
import g_playerD from "./PlayerData";
import globalFun from "../common/GlobalFunc";
import PlatfM from "../platforms/PlatformManager";
import { AdvertType } from "../common/StructMap";
import GameScene from "./GameScene";

class UiManager {
    static readonly Instance: UiManager = new UiManager;

    isDoubleStart: boolean = false; //是否双倍开局
    isSkinUsePop: boolean = true; //皮肤试用是否弹出

    onshowType: number = 0;

    isHaveLimit: boolean = true
    lookAdvNum: number = 0
    isNormal: boolean = false

    isSoundOn: boolean = true;
    isMusicOn: boolean = true;
    isShakeOn: boolean = true;

    soundArr: any[] = [];

    hallscene: HallScene;
    gamescene: GameScene;
    goldView: GoldView;
    loadView: LoadView;
    // setsDlg: SetDlg;
    // skinDlg: SkinDlg;
    // signinDlg: SigninDlg;
    // skinUseDlg: SkinUseDlg;
    // winDlg: WinDlg;
    // loseDlg: LoseDlg;
    // recomDlg: RecommendDlg;
    // sudokuDlg: SudokuPushDlg
    // nativeView: NativeView;
    // unlockskinDlg: UnlockSkinDlg;
    // limitSkinDlg: LimitSkinDlg;
    // getSkinDlg: GetSkinDlg;
    // advTipDlg: AdvTipDlg;
    // gameTip: GameTip
    // freeupDlg: FreeUpDlg


    initEvent() {
        g_evnetM.AddEvent("add_load_view", this, this.addLoadView);
        g_evnetM.AddEvent("load_scene_over", this, this.delLoadView);
        g_evnetM.AddEvent("play_music", this, this.playBGM);
        g_evnetM.AddEvent("stop_music", this, this.stopBGM);
        g_evnetM.AddEvent("Advertisement", this, this.jiliVideoBack)
    }

    init() {
        g_constD.stageW = Laya.stage.width;
        g_constD.stageH = Laya.stage.height;
        this.creatDlg();
        if (g_constD.isDY) this.ttVersion()
    }

    shakeScreen(isShort: boolean) {
        if (!this.isShakeOn) return;
        if (isShort) PlatfM.Jsb.openVibrateShort();
        else PlatfM.Jsb.openVibrateLong()
    }

    playBGM() {
        PlatfM.Jsb.playMusic(g_constD.BGM, 0);
    }

    stopBGM() {
        PlatfM.Jsb.stopMusic();
    }

    playSound(url: string, loop: boolean = false) {
        if (!this.isSoundOn) return
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
        if (loop) this.soundArr.push(sound);
    }

    stopSound(url: string) {
        if (!this.isSoundOn) return
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
        if (!this.loadView) return;
        this.loadView.destroy();
        this.loadView = null;
    }

    // 头条版本的特殊处理
    ttVersion() {
        // this.skinUseDlg = Laya.stage.addChild(new SkinUseTTDlg) as SkinUseDlg
        // this.skinUseDlg.zOrder = 240;

        // this.getSkinDlg = Laya.stage.addChild(new GetSkinDlg) as GetSkinDlg;
        // this.getSkinDlg.zOrder = 360;

        // this.advTipDlg = Laya.stage.addChild(new AdvTipDlg) as AdvTipDlg;
        // this.advTipDlg.zOrder = 370
    }

    creatDlg() {
        this.hallscene = Laya.stage.addChild(new HallScene) as HallScene;
        this.hallscene.zOrder = 100;

        this.goldView = Laya.stage.addChild(new GoldView) as GoldView;
        this.goldView.zOrder = 250
        this.goldView.pos(500, 147)

        // this.setsDlg = Laya.stage.addChild(new SetDlg) as SetDlg;
        // this.setsDlg.zOrder = 260;

        // this.skinDlg = Laya.stage.addChild(new SkinDlg) as SkinDlg;
        // this.skinDlg.zOrder = 220;

        // this.signinDlg = Laya.stage.addChild(new SigninDlg) as SigninDlg;
        // this.signinDlg.zOrder = 230;

        // if (!g_constD.isDY) {
        //     this.skinUseDlg = Laya.stage.addChild(new SkinUseDlg) as SkinUseDlg;
        //     this.skinUseDlg.zOrder = 240;
        // }

        // this.winDlg = Laya.stage.addChild(new WinDlg) as WinDlg;
        // this.winDlg.zOrder = 180;

        // this.unlockskinDlg = Laya.stage.addChild(new UnlockSkinDlg) as UnlockSkinDlg;
        // this.unlockskinDlg.zOrder = 300;

        // this.limitSkinDlg = Laya.stage.addChild(new LimitSkinDlg) as LimitSkinDlg;
        // this.limitSkinDlg.zOrder = 350;

        // this.gameTip = Laya.stage.addChild(new GameTip) as GameTip
        // this.gameTip.zOrder = 150

        // this.freeupDlg = Laya.stage.addChild(new FreeUpDlg) as FreeUpDlg
        // this.freeupDlg.zOrder = 280

        // // this.loseDlg = Laya.stage.addChild(new LoseDlg) as LoseDlg;
        // // this.loseDlg.zOrder = 190;

        // this.nativeView = Laya.stage.addChild(new NativeView) as NativeView;
        // this.nativeView.zOrder = 320;
    }

    // openFreeUp(isOpen: boolean, utype?: number) {
    //     if (!this.freeupDlg) return
    //     this.freeupDlg.visible = isOpen
    //     this.dialogAni(this.freeupDlg, isOpen)
    //     if (isOpen) this.freeupDlg.updateUi(utype)
    // }

    // openGetSkin(isOpen: boolean, sid?: number) {
    //     if (!this.advTipDlg) return
    //     this.getSkinDlg.visible = isOpen
    //     if (isOpen) this.getSkinDlg.updateUI(sid)
    // }

    // openAdvTip(isOpen: boolean) {
    //     if (!this.advTipDlg) return
    //     this.advTipDlg.visible = isOpen;
    //     this.dialogAni(this.advTipDlg, isOpen)
    // }

    // openLimit(isOpen: boolean) {
    //     if (!this.limitSkinDlg) return
    //     if (!this.isHaveLimit) return
    //     this.limitSkinDlg.visible = isOpen
    //     if (isOpen) this.limitSkinDlg.updateUI()
    // }

    // openUnlockDlg(isOpen: boolean, sid?: number) {
    //     this.unlockskinDlg.visible = isOpen
    //     // g_uiM.dialogAni(this.unlockskinDlg, isOpen)
    //     if (isOpen && sid) this.unlockskinDlg.updateUI(sid)
    // }

    // openNative(isOpen: boolean) {
    //     if (isOpen && !this.nativeView.isAdOk) {
    //         g_evnetM.DispatchEvent("open_mainui")
    //         return
    //     }
    //     if (isOpen) {
    //         PlatfM.Jsb.hideBanner()
    //     }
    //     this.nativeView.visible = isOpen;
    // }

    // openWin(isOpen: boolean) {
    //     if (isOpen) {
    //         this.winDlg.updateGold(true)
    //     }
    //     this.winDlg.visible = isOpen;
    //     if (this.sudokuDlg) this.openSudoku(isOpen);
    // }

    // openLose(isOpen: boolean) {
    //     if (isOpen) {
    //         this.winDlg.updateGold(false)
    //     }
    //     this.winDlg.visible = isOpen;
    //     if (this.sudokuDlg) this.openSudoku(isOpen);
    // }

    // openSet(isOpen: boolean) {
    //     this.setsDlg.visible = isOpen;
    //     g_uiM.dialogAni(this.setsDlg, isOpen)
    // }

    // openSkin(isOpen: boolean) {
    //     isOpen && this.skinDlg.updateUI()
    //     this.skinDlg.visible = isOpen;
    //     // g_uiM.dialogAni(this.skinDlg, isOpen)
    // }

    // openSignin(isOpen: boolean) {
    //     this.signinDlg.visible = isOpen;
    //     g_uiM.dialogAni(this.signinDlg, isOpen)
    // }

    // openSkinUseDlg(isOpen: boolean, isPop: boolean = true) {
    //     if (isOpen) {
    //         // 打点 开局皮肤试用
    //         PlatfM.Jsb.TTDotEvent('SkinTry');
    //         this.skinUseDlg.updateSkin();
    //     }
    //     this.skinUseDlg.visible = isOpen;
    //     if (isPop) this.dialogAni(this.skinUseDlg, isOpen)
    // }

    // openSudoku(isOpen: boolean) {
    //     if (this.sudokuDlg) this.sudokuDlg.visible = isOpen;
    // }

    // creatHutuiDlg() {
    //     this.recomDlg = Laya.stage.addChild(new RecommendDlg) as RecommendDlg;
    //     this.recomDlg.zOrder = 205;

    //     // this.sudokuDlg = Laya.stage.addChild(new SudokuPushDlg) as SudokuPushDlg;
    //     // this.sudokuDlg.zOrder = 350;
    //     // this.sudokuDlg.mouseThrough = true;
    //     // this.openSudoku(false);

    //     Laya.timer.once(1000, this, () => {
    //         g_evnetM.DispatchEvent("open_lunbo_minigame", true)
    //     })
    // }

    setLocalLvl(lvl: number) {
        PubUtils.SetLocalData(g_constD.lvlStorageName, lvl);
    }

    setLocalLvlTimes(times: number) {
        PubUtils.SetLocalData(g_constD.lvlTimesStorageName, times);
    }

    setLocalDmd(dmd: number) {
        PubUtils.SetLocalData(g_constD.dmdStorageName, dmd);
    }

    setLocalGold(gold: number) {
        PubUtils.SetLocalData(g_constD.goldStorageName, gold);
    }

    setLocalEquipSkinId(id: number) {
        PubUtils.SetLocalData(g_constD.equipSkinIdStorageName, id);
    }

    setLocalOwnedSkin(skinArr: number[]) {
        let skin = "";
        for (let i = 0; i < skinArr.length; ++i) {
            if (i == 0) {
                skin += skinArr[i];
            } else {
                skin += ("|" + skinArr[i]);
            }
        }
        PubUtils.SetLocalData(g_constD.ownerSkinsStorageName, skin);
    }

    setLocalEquipGunId(id: number) {
        PubUtils.SetLocalData(g_constD.equipGunIdStorageName, id);
    }

    setLocalSignDayAndTime(day: string) {
        PubUtils.SetLocalData(g_constD.signDayStorageName, day);
    }

    setLocalShootTimeLvl(lvl: number) {
        PubUtils.SetLocalData(g_constD.shootTimeStorageName, lvl);
    }

    setLocalShootAtackLvl(lvl: number) {
        PubUtils.SetLocalData(g_constD.shootAtackStorageName, lvl);
    }

    // 请求打开激励视频
    openJiliVideo(type: number) {
        if (PlatfM.Jsb.getIsCachedVideo()) {
            g_constD.advType = type;
            if (this.isMusicOn) this.stopBGM();
            PlatfM.Jsb.openAdvert(AdvertType.ExcitationVideo);
            return true
        } else {
            g_tipM.showTip("视频正在准备中！");
            return false
        }
    }

    // 激励视频观看返回
    jiliVideoBack(data: string) {
        let arr = data.split(",");
        let success = +arr[1];
        let type = +arr[0];
        if (this.isMusicOn) g_evnetM.DispatchEvent("play_music");
        let isSuccess = type == AdvertType.ExcitationVideo && success == 1
        g_evnetM.DispatchEvent("jili_vedio_back", [isSuccess])
    }

    firstInstallShortcut() {
        this.hallscene.installShortcut();
    }

    checkLevelUnlock() {
        // let lvl = g_constD.nowLvlTimes
        // let skindata = g_playerD.skinData
        // for (let i = 0; i < skindata.length; ++i) {
        //     let skindatai = skindata[i];
        //     let unlocklvl = +skindatai.level_unlock
        //     let isunlock = unlocklvl == (lvl - 1) && unlocklvl != 0
        //     if (!isunlock) continue
        //     let sid = +skindatai.id
        //     if (g_playerD.ownerSkins.indexOf(sid) != -1) break
        //     this.openUnlockDlg(true, sid);
        //     break
        // }
    }

    // 随机交换按钮位置
    buttonExchange(btn1: Laya.Sprite, btn2: Laya.Sprite) {
        let rand = globalFun.getRandom(0, 100)
        if (rand % 2 == 0) return
        let x1 = btn1.x
        let y1 = btn1.y
        let x2 = btn2.x
        let y2 = btn2.y
        btn1.pos(x2, y2)
        btn2.pos(x1, y1)
    }

    // 弹窗打开关闭动画
    dialogAni(node: Laya.Sprite, isOpen: boolean, time: number = 200) {
        node.visible = true
        let black = node.getChildByName("img_black") as Laya.Image;
        if (isOpen) {
            black && black.scale(4, 4);
            if (time) {
                node.scale(0.3, 0.3);
                Laya.Tween.to(node, { scaleX: 1.2, scaleY: 1.2 }, time, null, new Laya.Handler(this, ()=> {
                    Laya.Tween.to(node, { scaleX: 1, scaleY: 1 }, 100, null, null, null, true);
                }), null, true);
            } else {
                node.scale(1, 1)
            }
        } else {
            if (time) {
                node.scale(1, 1);
                Laya.Tween.to(node, { scaleX: 0.2, scaleY: 0.2 }, time, null, new Laya.Handler(this, () => {
                    node.visible = false;
                }), null, true);
                black && black.scale(0.1, 0.1);
            } else {
                node.visible = false;
            }
        }
    }

    gameWin() {
        console.log("winnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
    }

    gameLose() {
        console.log("loseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    }
}

var g_uiM: UiManager = UiManager.Instance;
export default g_uiM;
