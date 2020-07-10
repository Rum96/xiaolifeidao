import g_evnetM from "../common/EventManager"
import { PlatfT } from "../common/StructMap"

namespace DownFunc {
    export var fstt
    export var localZipPath
    export var unZipPath
    export var downUrl
    export var redownUrl
    export var reUrl
    export var codeVersion = "1.0.2" //代码版本号，是每次发布版本手动更改
    export var resVersion //本地资源版本号，是读取version.json获得
    export var gamename = "gunGang"

    var downloadFile: Function
    var statusCode: number = 200


    // 初始化tt平台变量
    export function initVar(platf: PlatfT) {
        if (platf == PlatfT.ttMG) {
            fstt = tt.getFileSystemManager()
            reUrl = tt.env.USER_DATA_PATH
            redownUrl = "https://kuaizhiyou.com.cn/TTchannel/"
            downloadFile = tt.downloadFile
        } else if (platf == PlatfT.qqMG) {
            fstt = qq.getFileSystemManager()
            reUrl = qq.env.USER_DATA_PATH
            redownUrl = "https://www.joylandgame.cn/qq/"
            downloadFile = qq.downloadFile
        }
        downUrl = redownUrl + gamename + "/" + gamename + "_" + codeVersion + ".zip"
        unZipPath = reUrl + "/cache/res/"
        localZipPath = reUrl + "/cache/res/" + gamename + "_" + codeVersion + ".zip"
    }
    
    // 判断文件/目录是否存在
    export function isDirExist(path, callBack?) {
        fstt.access({
            path: path,
            success() {
                if (callBack) {
                    callBack(true)
                }
            },
            fail() {
                if (callBack) {
                    callBack(false)
                }
            },
            complete() { }
        })
    }

    // 下载文件
    export function downFile(callBcak?) {
        var desPath = localZipPath
        var sourcePath = downUrl
        console.log("开始下载", sourcePath, desPath)
        let downloadTask: any = downloadFile({
            url: sourcePath,
            filePath: desPath,
            success(res) {
                console.log("下载成功", res)
                if (res.statusCode === statusCode) {
                    if (callBcak) callBcak(true)
                }
            },
            fail(evt) {
                console.log("下载失败" + evt.errMsg)
                if (callBcak) callBcak(false)
            }
        })
        // var count = 0;
        //wxfile://usr/cache/res/test.zip
        downloadTask.onProgressUpdate((res) => {
            // globalFun.log('下载进度', sourcePath, res.progress)
            // globalFun.log('已经下载的数据长度', res.totalBytesWritten)
            // globalFun.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
            g_evnetM.DispatchEvent("down_progress", [res])
        })
    }

    //解压文件
    export function unzipOneFile(callBack?) {
        fstt.unzip({
            zipFilePath: localZipPath,
            targetPath: unZipPath,
            success(evt) {
                console.log('解压完毕')
                if (callBack) callBack(true)
            },
            fail(evt) {
                console.log('解压取消' + evt.errMsg, localZipPath)
                if (callBack) callBack(false)
            }
        })
    }

    //建立文件夹
    export function mkdir(path, callBack?) {
        fstt.mkdir({
            dirPath: path,
            success: function() { 
                if (callBack) callBack()
            },
            fail: function(errMsg) { 
                console.log("建立文件夹失败", errMsg)
            },
            complete: function() { 
                console.log("建立文件夹complete")  
            }
        })
    }

    //递归删除文件
    export function removefiles(filePath) {
        getFileList(filePath, function(fileList) {
            if (!fileList) return
            // console.log("文件列表：", fileList)
            for (let i = 0; i < fileList.length; ++i) {
                let filei = fileList[i]
                if (filei.indexOf(".") > -1) {
                    unlink(filePath+"/"+filei)
                } else {
                    removefiles(filePath+"/"+filei)
                }
            }
        })
    }

    //删除文件
    export function unlink(filePath, callBack?) {
        fstt.unlink({
            filePath: filePath,
            success: function() { 
                if (callBack) callBack(true)
            },
            fail: function(errMsg) { 
                console.log("删除文件失败", errMsg)
            },
            complete: function() { 
                console.log("删除文件complete")
            }
        })
    }

    //目录下的文件列表
    export function getFileList(path, callBack?) {
        fstt.readdir({
            dirPath: path,
            success: function(data) {
                if (callBack) callBack(data.files)
            },
            fail: function(errMsg) {
                console.log("读取文件夹失败", errMsg)
            }
        })
    }
}

export default DownFunc