/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-3-21
 * Time: 下午10:54
 * To change this template use File | Settings | File Templates.
 */
var dateTime = getClientTime();

exports.addLog = function(errorCode, errorJson){
    var errorMsg = getTableConfigFromJson(errorCode),
        filePath = LOG + getDayTime() + "_" +errorMsg.errorFile,
        resultBuffer = "[" + dateTime + "]" + " [" + errorMsg.errorMsg + "]" + " [" + errorMsg.errorLevel +"]";
    fs.lstat(filePath, function callBack(err, stats){
        if(err){
            fs.createWriteStream(filePath);
        }
        fs.writeFile(filePath,resultBuffer,function(err){
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
        var str = fs.readFileSync('../../conf/error.json','utf8');
        errorMsg = JSON.parse(str);
    }catch(e){
        util.debug("JSON parse error.json fails")
    }
    return errorMsg[errorCode];
}

function getClientTime(){
    var date = new Date();
    return  date.getTime();
}

function getDayTime(){
    var date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}