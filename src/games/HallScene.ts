import { ui } from "../ui/layaMaxUI";
import g_evnetM from "../common/EventManager";
import PlatfM from "../platforms/PlatformManager";
import g_uiM from "./UiManager";

export default class HallScene extends ui.HallSceneUI {

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

    openBox(isopen: boolean = true) {
    }

    openIngame(isopen: boolean = false) {
        g_uiM.gamescene.visible = true
        g_uiM.hallscene.visible = false
    }

    initMouseEvent() {
        // this.img_set.on(Laya.Event.CLICK, this, this.openSet);
        // this.img_skin.on(Laya.Event.CLICK, this, this.openSkin);
        // this.img_signin.on(Laya.Event.CLICK, this, this.openSignin);
        // // this.img_start.on(Laya.Event.CLICK, this, this.startGame)
        // this.img_tjzm.on(Laya.Event.CLICK, this, this.installShortcut);
        // this.img_limit.on(Laya.Event.CLICK, this, this.openLimitSkin)

        g_evnetM.AddEvent("jili_vedio_back", this, this.advBack);
        g_evnetM.AddEvent("open_mainui", this, this.openBox);
        g_evnetM.AddEvent("game_onshow", this, this.gameOnshow);
        g_evnetM.AddEvent("update_lvl", this, this.updateLvl);
        g_evnetM.AddEvent("install_shortcut_success", this, this.installShortcutSuccess);

        PlatfM.Jsb.listenOnshow();
    }

    openSet(e: Laya.Event) {
    }

    openSkin() {
    }

    openSignin(e: Laya.Event) {
    }

    openLimitSkin() {
    }

    gameOnshow(isShow: boolean) {
    }

    installShortcut() {
        PlatfM.Jsb.installShortcut();
    }

    checkShortcut() {
    }

    installShortcutSuccess() {
    }

    initGame() {
        g_evnetM.DispatchEvent("update_dmd")
        g_evnetM.DispatchEvent("update_lvl")

        PlatfM.Jsb.reportMonitor();
        this.checkShortcut()

        this.openIngame()
    }

    startGame() {
    }


    loadGame() {
    }

    advBack(isSuccess: boolean) {
    }

    updateLvl() {
    }
}
