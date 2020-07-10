import { ui } from "../ui/layaMaxUI";
import g_evnetM from "./EventManager";
import g_playerD from "../games/PlayerData";
import g_uiM from "../games/UiManager";

export default class GoldView extends ui.goldViewUI {
    onEnable() {
        g_evnetM.AddEvent("update_dmd", this, this.updateDmd);
    }
    
    updateDmd(time?: number) {
        g_uiM.setLocalDmd(g_playerD.diamond);
        if (!time) this.label_dmd.value = "" + g_playerD.diamond;
        else {
            let addgold = {gold: +this.label_dmd.value}
            Laya.Tween.to(addgold, {gold: g_playerD.diamond, update: new Laya.Handler(this, ()=> {
                this.label_dmd.value = "" + Math.floor(addgold.gold);
            })}, time)
        }
        // g_uiM.gameui.updateUpUI()
    }
}