class ConstData {
    static readonly Instance: ConstData = new ConstData;

    isDY: boolean = false; //是否是抖音平台特殊ui
    isTT: boolean = false; //是否是抖音平台
    isCdnFenbao: boolean = false; //是否进行cdn分包加载
    isPlatfFenbao: boolean = false; //是否需要使用平台的分包

    nowLvl: number = 1; //实际关卡，有轮回
    totalLvl: number = 20; //总共关卡数
    nowLvlTimes: number = 1; //显示关卡
    winGold: number = 0;

    advType: number = 0

    stageW: number = 720;
    stageH: number = 1280;

    pushId: string = ""
    isListActive: boolean = false
    isLunboActive: boolean = false
    isJiugongActive: boolean = false


    BGM = "res/music/music_bgm.mp3";
    sound_win = "res/music/sound_win.mp3";
    sound_goldbomb = "res/music/sound_goldbomb.mp3"
    sound_unlock = "res/music/sound_unlock.mp3"

    goldStorageName: string = "gungang_gold";
    dmdStorageName: string = "gungang_dmd";

    lvlStorageName: string = "gungang_lvl";
    lvlTimesStorageName: string = "gungang_lvl_times";

    ownerSkinsStorageName: string = "gungang_skins";
    equipSkinIdStorageName: string = "gungang_equip_skin_id";
    
    ownerGunsStorageName: string = "gungang_owner_guns";
    equipGunIdStorageName: string = "gungang_equip_gun_id";
    
    signDayStorageName: string = "gungang_sign_day";


    shootTimeStorageName: string = "gungang_shoot_time_lvl";
    shootAtackStorageName: string = "gungang_shoot_atack_lvl";
}

var g_constD = ConstData.Instance;
export default g_constD;