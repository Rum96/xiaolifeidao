import JsbBase from "./JsbBase";
import JsbAndroid from "./JsbAndroid";
import JsbOppoMiniGame from "./JsbOppoMiniGame";
import JsbTouTiao from "./JsbTouTiao";
import JsbVivoMiGame from "./JsbVivoMiGame";
import JsbQQMinniGame from "./JsbQQMinniGame";
import JsbBaiDuMiGame from "./JsbBaiDuMiGame";
import PubUtils from "../common/PubUtils";
import JsbXiaoMiGame from "./JsbXiaoMiGame";
import { PlatfT } from "../common/StructMap";

export default class PlatfM {
    static Jsb: JsbBase;

    static plaft: PlatfT;

    static userid: string;

    static init(plaft: PlatfT) {
        this.plaft = plaft;
        let jsb
        if (plaft == PlatfT.none) {
            jsb = new JsbBase()
        } else if (plaft == PlatfT.android) {
            jsb = new JsbAndroid();
        } else if (plaft == PlatfT.ooMG) {
            jsb = new JsbOppoMiniGame();
        } else if (plaft == PlatfT.ttMG) {
            jsb = new JsbTouTiao();
        } else if (plaft == PlatfT.vvMG) {
            jsb = new JsbVivoMiGame();
        } else if (plaft == PlatfT.qqMG) {
            jsb = new JsbQQMinniGame();
        } else if (plaft == PlatfT.bdMG) {
            jsb = new JsbBaiDuMiGame();
        } else if (plaft == PlatfT.xmMG) {
            jsb = new JsbXiaoMiGame()
        }

        jsb.init();
        this.Jsb = jsb;
    }

    static initData() {
        let userid = PubUtils.GetLocalData("uuid");
        if (userid != null && userid != "") {
            this.userid = userid;
        } else {
            this.userid = PubUtils.generateUUID();
            PubUtils.SetLocalData("uuid", this.userid);
        }
    }
}


