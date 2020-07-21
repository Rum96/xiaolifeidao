import GameConfig from "./GameConfig";
import g_evnetM from "./common/EventManager";
import g_sceneM from "./games/SceneManager";
import g_playerD from "./games/PlayerData";
import g_constD from "./games/ConstData";
import PubUtils from "./common/PubUtils";
import g_uiM from "./games/UiManager";
import DownFunc from "./downFunc/DownFunc";
import PlatfM from "./platforms/PlatformManager";
import { PlatfT, SwitchType, AdvertType } from "./common/StructMap";

class Main {
	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();

		// Laya.Stat.show();

		//关闭多点触控
		Laya.MouseManager.multiTouchEnabled = false;

		g_evnetM.init();
		g_sceneM.initEvevt();
		g_uiM.initEvent()


		PlatfM.init(PlatfT.none);
		// PlatfM.init(PlatfT.ooMG);
		// PlatfM.init(PlatfT.ttMG);
		// PlatfM.init(PlatfT.vvMG);
		// PlatfM.init(PlatfT.xmMG);
		// PlatfM.init(PlatfT.qqMG);

		// g_constD.isDY = PlatfM.plaft == PlatfT.ttMG
		g_constD.isTT = PlatfM.plaft == PlatfT.ttMG
		g_constD.isCdnFenbao = PlatfM.plaft == PlatfT.qqMG || g_constD.isTT

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, ()=> {
			//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
			Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.checkIsFenbao))
		}), Laya.ResourceVersion.FILENAME_VERSION);
	}

	downloadComplete(): void {
		if (PlatfM.plaft == PlatfT.vvMG && g_constD.isPlatfFenbao) {
			this.platformFenbao()
		} else {
			this.loadConfigFirst()
		}
	}

	//先加载可能提前用到的小文件
	loadConfigFirst() {
		let loadArr = [
			// "res/config/signin.json",
			// "res/config/skins.json",
			// "res/config/fire.json",
			// "res/config/bossdata.json",

			"res/atlas/img.atlas",
			"res/atlas/comp.atlas",
			// "res/atlas/icon.atlas",
			// "res/atlas/push.atlas",
			// "res/atlas/xyx.atlas",
		]
		Laya.loader.create(loadArr, new Laya.Handler(this, this.loadConfigLast))
	}

	loadConfigLast() {
		// 打点 开始加载,获取游戏资源,加载游戏场景
		// PlatfM.Jsb.TTDotEvent('startLoading');
		// g_evnetM.DispatchEvent("add_load_view");

		let loadArr = [
			// "res/game/LayaScene_Demo_1/Conventional/Demo_1.ls",
			// "res/game/LayaScene_player/Conventional/player.lh",
			// "res/game/LayaScene_zidan/Conventional/zidan.lh",

			// "res/config/signin.json",
			// "res/config/skins.json",
			// "res/config/fire.json",
			// "res/config/bossdata.json",
			"res/atlas/push.atlas"
		]

		let soundArr = [
			// g_constD.BGM,
			// g_constD.sound_win,
			// g_constD.sound_unlock,
			// g_constD.sound_goldbomb,
			// g_constD.sound_shoot,
			// g_constD.sound_shoot2,
		]

		if (PlatfM.plaft != PlatfT.vvMG && PlatfM.plaft != PlatfT.bdMG) {
			loadArr = loadArr.concat(soundArr);
		}

		Laya.loader.create(loadArr, new Laya.Handler(this, this.onConfigLoaded), new Laya.Handler(this, (num)=> {
			// console.log("pppppppppp", num)
			g_evnetM.DispatchEvent("update_loading", +num)
		}))
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景
		// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		
		g_playerD.init();
		g_sceneM.init();
		g_uiM.init();
		

		this.platformInit()

		Laya.timer.once(100, this, ()=> {
			// 打点 加载完成
			PlatfM.Jsb.TTDotEvent('loadedend');
			g_evnetM.DispatchEvent("load_scene_over");
		})
	}

	//初始化平台互推广告等
	platformInit() {
		PlatfM.initData();

		PlatfM.Jsb.checkIsMiGame((type:SwitchType) => {
			// if(type != SwitchType.On) return
			// let url = "https://kuaizhiyou.com.cn/fenfa/global.json";
			// if(PlatfM.plaft == PlatfT.ttMG){
			// 	url = "https://kuaizhiyou.com.cn/fenfa_gd/json/global.json";
			// }
			// PubUtils.GetNetJson(url, (res: any[])=> {
			// 	if (!res) return
			// 	// console.log("jjjjjjjjjjjj", JSON.stringify(res))
			// 	for (let i = 0; i < res.length; ++i) {
			// 		let datai = res[i];
			// 		if (!datai) continue
			// 		if (datai.id != g_constD.pushId) continue
			// 		g_constD.isListActive = datai.list_is_active == "1"
			// 		g_constD.isLunboActive = datai.lunbo_is_active == "1"
			// 		g_constD.isJiugongActive = datai.jiugong_is_active == "1"
			// 		break;
			// 	}
			// })
			// g_uiM.creatHutuiDlg();
		})

		if (PlatfM.plaft == PlatfT.vvMG) {
			Laya.timer.once(3 * 1000, this, () => {
				PlatfM.Jsb.openAdvert(AdvertType.OpenScreen);
			});
		} else {
			PlatfM.Jsb.openAdvert(AdvertType.OpenScreen);
		}
	}

	// 适用于平台自己的分包加载
	platformFenbao() {
		g_evnetM.AddEvent("vivo_loadSubpackage_success", this, this.loadConfigFirst)
		const loadTask = qg.loadSubpackage({
			name: 'game',
			success: function(info) {
				// 分包加载成功后通过 success 回调
				g_evnetM.DispatchEvent("vivo_loadSubpackage_success")
				console.log("3333333333333333333")
			},
			fail: function(info) {
				// 分包加载失败通过 fail 回调
				console.log("444444444444444444444")
			},
			complete: function(){
				// 不关分包加载成功还是失败都会执行此回调
				console.log("555555555555555555555")
			}
		})

		loadTask.onProgressUpdate(res => {
			console.log('下载进度', res.progress)
			console.log('已经下载的数据长度', res.totalBytesWritten)
			console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
		})
	}

	// -------- cdn分包下载函数 -------- //

	checkIsFenbao() {
		// 打点 开始加载,获取游戏资源,加载游戏场景
		PlatfM.Jsb.TTDotEvent('startLoading');
		g_evnetM.DispatchEvent("add_load_view");

		if (g_constD.isCdnFenbao) {
			DownFunc.initVar(PlatfM.plaft)
			Laya.URL.basePath = DownFunc.reUrl + "/cache/"
			g_evnetM.AddEvent("unzip_ok", this, this.downloadComplete)
			Laya.loader.load(DownFunc.unZipPath + "version.json", new Laya.Handler(this, (json)=> {
				if (json) DownFunc.resVersion = json["version"]
				// this.downloadComplete()
				this.checkZipDown()
			}))
		} else {
			this.downloadComplete()
		}
	}

	checkZipDown() {
		let that = this
		DownFunc.isDirExist(DownFunc.unZipPath, function(isExist) {
			if (!isExist) {
				//如果不存在，则建立目录并下载zip
				console.log("目录不存在，建立目录并下载zip")
				DownFunc.isDirExist(DownFunc.reUrl + "/cache", function(isInExist) {
					if (isInExist) {
						console.log("cache存在，直接建立unzippath")
						DownFunc.mkdir(DownFunc.unZipPath, that.downZip)
					} else {
						console.log("cache不存在，先建立cache")
						DownFunc.mkdir(DownFunc.reUrl + "/cache", function() {
							console.log("建立cache完成，开始建立unzippath")
							DownFunc.mkdir(DownFunc.unZipPath, that.downZip)
						})
					}
				})
			} else {
				let cv = DownFunc.codeVersion
				let rv = DownFunc.resVersion
				let isversion = cv == rv
				if (!isversion) {
					//目录存在，但是版本不一样，删包，下载
					console.log("目录存在，但是版本不一样，删包，下载")
					that.clearDownloads()
					setTimeout(() => {
						that.downZip()
					}, 1000);
				} else {
					//目录存在，且版本一样，直接进入游戏
					console.log("目录存在，且版本一样，直接进入游戏")
					that.downloadComplete()
				}
			}
		})
	}
	
	downZip() {
		console.log("开始下载zip")
		DownFunc.downFile(function(isSuccess) {
			if (isSuccess) {
				console.log("下载文件完成，开始解压")
				g_evnetM.DispatchEvent("upzip_start")
				DownFunc.unzipOneFile(function(isOk) {
					if (isOk) {
						console.log("解压完成，删除zip包")
						DownFunc.unlink(DownFunc.localZipPath, function(isDel) {
							if (isDel) {
								console.log("删除zip文件成功, 开始游戏")
								g_evnetM.DispatchEvent("unzip_ok")
							}
						})
					}
				})
			}
		})
	}

	clearDownloads() {
		console.log("版本更新，删除文件夹内容")
		let deletePath = DownFunc.reUrl + "/cache/res"
		DownFunc.removefiles(deletePath)
	}
}
//激活启动类
new Main();
