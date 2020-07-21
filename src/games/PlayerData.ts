import PubUtils from "../common/PubUtils";
import g_constD from "./ConstData";
import g_sceneM from "./SceneManager";
import g_uiM from "./UiManager";

class PlayerData {
    static readonly Instance: PlayerData = new PlayerData;

    diamond: number = 0; //玩家钻石

    signDay: number = 0; //签到天数
    signTime: number = 0; //上次签到时间

    ownerSkins = [0]; //拥有的皮肤
    equipsId: number = 0; //当前装备皮肤的id
    freesId: number = 0; //当前皮肤试用的皮肤id
    skinData: SkinData[] = []; //皮肤数据
    siginData: SigninData[] = []; //签到数据
    freeSkinData: SkinData[] = []; //部分关卡免费试用的皮肤数据
    fireData: any[] = [];
    bossData: any[] = []
    // turnplateData: any[] = []


    init() {
        // //道具
        // let dmd = +PubUtils.GetLocalData(g_constD.dmdStorageName);
		// if (dmd) g_playerD.diamond = dmd;
        // let nowLvl = +PubUtils.GetLocalData(g_constD.lvlStorageName);
		// if (nowLvl) g_constD.nowLvl = nowLvl;
		// let nowLvlTimes = +PubUtils.GetLocalData(g_constD.lvlTimesStorageName);
        // if (nowLvlTimes) g_constD.nowLvlTimes = nowLvlTimes;

        // //皮肤
        // this.skinData = Laya.loader.getRes("res/config/skins.json");
        // this.skinData.splice(0, 1);
        // let ownedSkinStr = PubUtils.GetLocalData(g_constD.ownerSkinsStorageName) as string;
		// if (ownedSkinStr) {
		// 	let ownedSkin = ownedSkinStr.split("|");
		// 	for (let i = 0; i < ownedSkin.length; ++i) {
		// 		g_playerD.ownerSkins[i] = +ownedSkin[i];
		// 	}
		// }
		// let equipsId  = +PubUtils.GetLocalData(g_constD.equipSkinIdStorageName);
        // if (equipsId) g_playerD.equipsId = equipsId;
        
        // //签到
        // this.siginData = Laya.loader.getRes("res/config/signin.json");
        // this.siginData.splice(0, 1);
        // let signDayStr = PubUtils.GetLocalData(g_constD.signDayStorageName) as string;
		// if (signDayStr) {
		// 	let signDayArr = signDayStr.split("|");
		// 	let signDay = +signDayArr[0];
		// 	let signTime = +signDayArr[1];
		// 	this.signDay = signDay;
		// 	this.signTime = signTime;
        // }

        // for (let i = 0; i < this.skinData.length; ++i) {
        //     let datai = this.skinData[i]
        //     let utype = +datai.unlock_type
        //     if (utype == 0 || utype == 1) continue
        //     this.freeSkinData.push(datai)
        // }
    }

    switchSkin(sid: number) {
        this.equipsId = sid;
        g_uiM.setLocalEquipSkinId(sid);
        g_sceneM.selectSkin();
    }

    unlockSkin(sid: number) {
        if (!sid) return
        this.switchSkin(sid)
        if (this.ownerSkins.indexOf(sid) > -1) return
        this.ownerSkins.push(sid);
        g_uiM.setLocalOwnedSkin(this.ownerSkins);
    }
}

let g_playerD: PlayerData = PlayerData.Instance;
export default g_playerD;


export class SkinData {
    skin_try_weight: string;
    id: string;
    name: string;
    skin_res_name: string;
    unlock_type: string;
    unlock_need: string;
    skin_try_icon: string;
    level_unlock: string;
}

export class SigninData {
    icon_scale: string;
    id: string;
    name: string;
    reward_gold: string;
    reward_skinid: string;
    destext: string;
    destext_double: string;
    signin_icon: string;
}