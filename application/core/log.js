/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-3-21
 * Time: 下午10:54
 * To change this template use File | Settings | File Templates.
 */
var dateTime = getClientTime();

/*
 * 新增日志处理，日志以日期为单位和错误类型为单位进行划分（错误、警告、流水日志）
 * 参数：错误码，错误信息，需要展示的json数据
 * 日志格式: [time] [错误级别] [错误信息] [提示信息]
 */
exports.addLog = function(errorCode, myErrorMsg, errorJson){
    var errorMsg = initVar.errorConfig ? initVar.errorConfig[errorCode] : getTableConfigFromJson(errorCode),
        filePath = LOG + getDayTime() + "_" +errorMsg.errorFile,
        resultBuffer = "[" + dateTime + "]" + " [" + errorMsg.errorLevel + "]" + " [" + errorMsg.errorMsg +"] " + " [" + myErrorMsg +"] " ;
    Module.fs.lstat(filePath, function callBack(err, stats){
        if(err){
            Module.fs.createWriteStream(filePath);
        } else {
            resultBuffer = Module.fs.readFileSync(filePath) + "\r\n" + resultBuffer;
        }
        Module.fs.writeFile(filePath,resultBuffer,function(err){
            if(err) throw err;
            console.log('has finished');
        });
        return true;
    });
}

//获取数据库表的配置信息
function getTableConfigFromJson(errorCode){
    var errorMsg = {};
    try{
        var str = Module.fs.readFileSync(CONF + 'error.json','utf8');
        errorMsg = JSON.parse(str);
    }catch(e){
        Module.sys.debug("JSON parse error.json fails")
    }
    initVar.errorConfig = errorMsg;
    return errorMsg[errorCode];
}

//获取当前时间
function getClientTime(){
    var date = new Date();
    return  date.toLocaleTimeString();
}

//获取当前日期
function getDayTime(){
    var date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}