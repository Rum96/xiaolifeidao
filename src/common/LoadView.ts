import { ui } from "../ui/layaMaxUI";
import g_evnetM from "./EventManager";

export default class LoadView extends ui.LoadViewUI {
    constcW: number
    loadtype: number = 0

    onEnable() {
        g_evnetM.AddEvent("update_loading", this, this.updatePrg)
        g_evnetM.AddEvent("down_progress", this, this.downTip)
        g_evnetM.AddEvent("upzip_start", this, this.unzipTip)

        this.constcW = this.img_prg2.width - 20
        this.label_loadtext.text = ""
        this.img_prg2.width = 1
    }

    downTip(res) {
        if (this.loadtype != 1) this.loadtype = 1
        this.img_prg2.width = Math.floor(res.progress/100 * this.constcW)
        let np = Math.floor(res.totalBytesWritten / 1024 / 1024 * 10) / 10
        let ap = Math.floor(res.totalBytesExpectedToWrite / 1024 / 1024 * 10) / 10
        this.label_loadtext.text = "资源下载中(" + np + "M/" + ap + "M)"
    }

    unzipTip() {
        this.label_loadtext.text = "资源解压中。。。";
    }

    updatePrg(num: number) {
        if (this.loadtype != 2) {
            this.loadtype = 2
            this.label_loadtext.text = "资源加载中。。。";
        }
        this.img_prg2.width = Math.floor(num*this.constcW)
    }
}