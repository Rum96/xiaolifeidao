import g_evnetM from "../common/EventManager";
import g_constD from "./ConstData";
import g_playerD from "./PlayerData";
import g_uiM from "./UiManager";
import globalFun from "../common/GlobalFunc";
import PlatfM from "../platforms/PlatformManager";
import { PlatfT } from "../common/StructMap";

class SceneManager {
    static readonly Instance: SceneManager = new SceneManager;

    isGamimg: boolean = false;
    isMouseDown: boolean = false;

    initEvevt() {
    }

    init() {
    }

    selectSkin(sid?: number) {
        if (!sid) sid = g_playerD.equipsId;
    }


    destroyScene() {
        this.resetVar();
    }

    resetVar() {
    }

    freeSkinUsing() {
        let fskindata = g_playerD.freeSkinData
        let num = Math.floor(g_constD.nowLvlTimes / 5) % fskindata.length
        let sid = +fskindata[num].id
        g_playerD.freesId = sid
        this.selectSkin(sid)
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
}

var g_sceneM: SceneManager = SceneManager.Instance;
export default g_sceneM;
