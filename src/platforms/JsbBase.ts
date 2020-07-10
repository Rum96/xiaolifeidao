import { AdvertType, SwitchType } from "../common/StructMap";

export default class JsbBase {

    public init() {

    };

    /**
     * 打开 开屏
     */
    public openSplashAd() {

    }

    public getIsCachedVideo(): boolean {
        return false;
    }

    public openRewardVideo() {

    }

    hideBanner() {}
    
    showBanner() {}

    /**
     * 使手机发生较短时间的振动。
     * 某些机型在不支持短振动时会
     */
    public openVibrateShort() {

    }

    /**
     * 使手机发生较长时间的振动。
     */
    public openVibrateLong() {

    }

    public openVibrate() {
    }

    /**
     * 发送到桌面
     */
    public sendDesktop(func: Function) {

    }

    public showInstertView() {

    }

    public hasShortcutInstalled(callBack: Function) {

    }

    /**
     * 获取是否支持创建桌面快捷方式
     */
    public getIsDesktop() {
        return false;
    }

    public openAdvert(type: AdvertType) {
        // AndroidToJs.CallJs("Advertisement", type + "," + 1);

    }

    public playMusic(url: string, loop: number = 0) {
        if (url == "") return console.log("playMusic   背景音乐播放失败  = " + url);
        Laya.SoundManager.playMusic(url, loop);
    }

    public stopMusic() {
        Laya.SoundManager.stopMusic();
    }

    public playSound(url: string, loop: boolean = false): any {
        let p = loop ? 0 : 1;
        return Laya.SoundManager.playSound(url, p);
    }

    /**
     * 打开其他小游戏
     * @param name 
     */
    public openGame(name: string) {
        console.log(name);
    }

    /**
     * 获取是否支持打开小游戏
     */
    public checkIsMiGame(callback: Function) {
        callback(SwitchType.Off);
    }

    public getHeight(): number {
        return Laya.Browser.height;
    }

    public exitGame(){
        
    }

    //监听是否切后台
    listenOnshow() {}

    //创建桌面图标
    installShortcut() {}

    //判断是否有桌面图标
    isInstllShortcut(callback: Laya.Handler) {}

    //上报数据
    reportMonitor() {}

    //原生广告模块
    initNative() {}
    showNative(adId) {}
    clickNative(adId) {}
    destroyNative() {}

    /** (头条)录制开关,game(scene),type(0,1)*/
    public videoPlay(game, type) {

    }
    /** (头条)录制视频分享,game(scene)*/
    onShare(game) {

    }
    /** 是否IOS*/
    public isIos() {
        return false;
    }
    /** 是否抖音*/
    public isDY() {
        return false;
    }
    /** 是不是胖子*/
    public isFat() {
        return false;
    }
    /** 是否支持互推*/
    public ifPush() {
        return false;
    }
    /**隐藏广告 */
    public hideBannder() {
    }
    /**显示广告 */
    public showBannder() {

    }
    /** 头条加载互推*/
    public loadPush(view) {

    }
    /** 头条显示互推*/
    public showPush(type) {

    }
    /** 头条隐藏互推*/
    public hidePush() {

    }
    /** 头条移动轮播互推*/
    public moveCarouselPush(type) {

    }
    /** 头条平台类别*/
    public TTappName() {
        return 'DOUYIN';
    }
    /** 加载插屏广告*/
    public openInterstitial() {

    }
    /**事件打点 */
    TTDotEvent(name: string){

    }
    /**隐藏分享 */
    public hideShare() {

    }
}
