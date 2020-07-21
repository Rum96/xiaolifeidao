import g_evnetM from "../common/EventManager";
import g_constD from "./ConstData";
import g_playerD from "./PlayerData";
import g_uiM from "./UiManager";
import globalFun from "../common/GlobalFunc";
import PlatfM from "../platforms/PlatformManager";
import { PlatfT } from "../common/StructMap";
import CutterNode from "./CutterNode";

class SceneManager {
    static readonly Instance: SceneManager = new SceneManager;

    isGamimg: boolean = true;
    cutterNode: CutterNode

    _hitFlag = 0
    _x1 = 0
    _x2 = g_constD.stageW
    _y1 = 0
    _y2 = g_constD.stageH
    _speed = 1000

    initEvevt() {
    }

    init() {
        this.cutterNode = Laya.stage.addChild(new CutterNode) as CutterNode
        this.cutterNode.pos(360, 1000)
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


    rotateCutter(angle: number) {
        this.cutterNode.rotation += angle
    }

    cutterFly(angle: number) {
        let flyAngle = 90 - angle
        if (flyAngle > 180) flyAngle = flyAngle - 360;
        else if (flyAngle < -180) flyAngle = flyAngle + 360;
        this.goFly({ x: this.cutterNode.x, y: this.cutterNode.y }, -globalFun.angleToRad(flyAngle));
    }

    goFly(lastPos, rad) {
        if (this._hitFlag == 4) {
            console.log("飞刀碰撞到底部，结束飞行")
            return
        }
        var data: any = this.getNextPos(lastPos, rad);
        if (!data) return;
        var nextRad = this.getNextRad(rad);
        this.cutterNode.rotation = 90 + data.angle;

        let targetPos = new Laya.Point(360, 470)
        let tgx = targetPos.x
        let tgy = targetPos.y
        let cr = 180 / 2
        let ftween = Laya.Tween.to(this.cutterNode, { x: data.x, y: data.y, update: new Laya.Handler(this, ()=> {
            let cx = this.cutterNode.x
            let cy = this.cutterNode.y
            let d = (cx - tgx) * (cx - tgx) + (cy - tgy) * (cy - tgy)
            if (d < cr * cr) {
                console.log("命中目标")
                ftween.clear()
            }
        })}, data.time, null, Laya.Handler.create(this, this.goFly, [data, nextRad]));
    }

    //获取下一个碰撞点
    getNextPos(lastPos, rad) {
        var sin = Math.sin(rad);
        var cos = Math.cos(rad);
        var data: any = {};
        var angle = globalFun.radToAngle(rad);

        var bool1 = rad > -Math.PI / 2 && rad < Math.PI / 2;
        var bool2 = rad > 0;

        var tns = (rad > 0 && rad < Math.PI / 2) || (rad > -Math.PI && rad < -Math.PI / 2) ? -1 : 1;

        var d1 = Math.abs((lastPos.x - this._x1) / cos);
        var d2 = Math.abs((this._x2 - lastPos.x) / cos);
        var d3 = Math.abs((lastPos.y - this._y1) / sin);
        var d4 = Math.abs((this._y2 - lastPos.y) / sin);

        var p1 = { x: this._x1, y: lastPos.y + tns * Math.abs(d1 * sin) }; //左边交点
        var p2 = { x: this._x2, y: lastPos.y - tns * Math.abs(d2 * sin) }; //右边交点
        var p3 = { x: lastPos.x + tns * Math.abs(d3 * cos), y: this._y1 }; //上边交点
        var p4 = { x: lastPos.x - tns * Math.abs(d4 * cos), y: this._y2 }; //下边交点

        var distance;
        if (p1.y < this._y2 && p1.y > this._y1 && !bool1) {
            data = p1;
            distance = d1;
            this._hitFlag = 1;
        } else if (p2.y < this._y2 && p2.y > this._y1 && bool1) {
            data = p2;
            distance = d2;
            this._hitFlag = 2;
        } else if (p3.x < this._x2 && p3.x > this._x1 && !bool2) {
            data = p3;
            distance = d3;
            this._hitFlag = 3;
        } else if (p4.x < this._x2 && p4.x > this._x1 && bool2) {
            data = p4;
            distance = d4;
            this._hitFlag = 4;
        } else {
            console.log("子弹路径异常！！！");
            this.cutterNode.destroy();
            return;
        }

        data.time = distance / this._speed * 1000;
        data.angle = angle;

        return data;
    }

    //碰撞后的反射角
    getNextRad(rad) {
        if (this._hitFlag == 1 || this._hitFlag == 2) {
            return rad > 0 ? (Math.PI - rad) : (-Math.PI - rad);
        }
        return -rad;
    }
}

var g_sceneM: SceneManager = SceneManager.Instance;
export default g_sceneM;
