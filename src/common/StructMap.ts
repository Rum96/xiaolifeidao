export enum PlatfT {
    /** 浏览器平台 */
    none,
    /** 安卓平台 */
    android,
    /** oppo平台 */
    ooMG,
    /** 头条平台 */
    ttMG,
    /** 百度平台 */
    bdMG,
    /** vivo平台 */
    vvMG,
    /** qq平台 */
    qqMG,
    /** 微信平台 */
    wxMG,
    /** 小米平台 */
    xmMG,
}

export enum AdvType {
    normal,
    sbkaishi,
    signFanbei,
    skinGet,
    skinGold,
    skinUse,
    sblingqu,
    atackUp,
    speedUp,
    limitSkin
}

export enum ErrorCode {
    /**
     * 后端接口调用失败
     */
    c1000 = 1000,

    /**
     * 参数错误
     */
    c1001,

    /**
     * 广告单元无效
     */
    c1002,

    /**
     * 内部错误
     */
    c1003,

    /**
     * 无合适的广告
     */
    c1004,

    /**
     * 广告组件审核中
     */
    c1005,

    /**
     * 	广告组件被驳回
     */
    c1006,

    /**
     * 广告组件被封禁
     */
    c1007,

    /**
     * 广告单元已关闭
     */
    c1008,


}

export enum baiduErrCode {
    //appSid 缺失
    c103010 = 103010,
    //错误，MSSP 未收录
    c103011 = 103011,
    // 无效，MSSP 上未生效 
    c103012 = 103012,
    //无效，渠道 ID 信息错误
    c103020 = 103020,
    //缺失
    c107000 = 107000,
    //未收录
    c107001 = 107001,
    //未启用
    c107002 = 107002,
    //与 appSid 不匹配
    c107003 = 107003,
    //无广告返回
    c200000 = 200000,
    //无广告数据
    c201000 = 201000,
    //广告组件挂载失败
    c3010000 = 3010000,
    //广告请求失败
    c3010002 = 3010002,
    //网络连接错误
    c3010003 = 3010003,
    //没有可以展示的广告
    c3010004 = 3010004,
    //广告正在拉取中，不能重复请求
    c3010005 = 3010005,
    //广告正在展示中，不能请求广告
    c3010006 = 3010006,
    //广告请求参数为空
    c3010007 = 3010007,
    //激励视频播放地址为空
    c3010008 = 3010008,
    //激励视频重复初始化错误
    c3010009 = 3010009,
    //没有可以展示的 banner 广告
    c3010010 = 3010010,

}

export const enum AdvertType {
    None,

    /**
     * 原生信息流
     */
    NativeMsgFlow,

    /**
     * banner 广告
     */
    Banner,

    /**
     * 插屏广告
     */
    TableScreen,

    /**
     * 原生广告
     */
    Native,

    /**
     * 激励视频广告
     */
    ExcitationVideo,

    /**
     * 全屏视频广告
     */
    FullScreenVideo,

    /**
     * Draw竖版视频信息流广告
     */
    DrawFeedVideo,

    /**
     * 开屏广告
     */
    OpenScreen,
}

export const enum SwitchType {
    None,
    /**
     * 开
     */
    On,
    /**
     * 关
     */
    Off
}