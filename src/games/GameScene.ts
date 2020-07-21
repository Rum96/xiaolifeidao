import { ui } from "../ui/layaMaxUI";
import g_sceneM from "./SceneManager";
import globalFun from "../common/GlobalFunc";

export default class GameScene extends ui.GameSceneUI {
    isMouseDown: boolean = false;
    lastX: number
    lastY: number

    onEnable() {
        this.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown)
        this.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove)
        this.on(Laya.Event.MOUSE_UP, this, this.onMouseUp)
        this.on(Laya.Event.MOUSE_OUT, this, this.onMouseOut)

        this.visible = false
    }

    onMouseDown(e: Laya.Event) {
        if (!g_sceneM.isGamimg) return
        this.lastX = e.stageX
        this.lastY = e.stageY
        this.isMouseDown = true
    }

    onMouseMove(e: Laya.Event) {
        if (!g_sceneM.isGamimg || !this.isMouseDown) return
        let stageX = e.stageX
        let stageY = e.stageY
        let diffX = stageX - this.lastX
        let diffY = stageY - this.lastY
        this.lastX = stageX
        this.lastY = stageY
        let rad = Math.atan2(-diffY, -diffX)
        let angle = diffX //globalFun.radToAngle(rad)
        g_sceneM.rotateCutter(angle)
    }

    onMouseUp() {
        if (!g_sceneM.isGamimg || !this.isMouseDown) return
        this.isMouseDown = false
        g_sceneM.cutterFly(g_sceneM.cutterNode.rotation)
    }

    onMouseOut() {
        this.onMouseUp()
    }
}