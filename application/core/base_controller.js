/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-16
 * Time: 下午10:10
 * To change this template use File | Settings | File Templates.
 */
require (MODEL + "user_model.js");
function BaseController(){
    var _self = this;
    _self._req;
    _self._res;
    this.init = function(req, res){
        _self._req = req;
        _self._res = res;
    };

    //显示一个html文件
    this.displayHtml = function(htmlName){
        var file = Module.fs.readFileSync(VIEW + htmlName);
        _self._res.end(file);
    };

    //指定显示一个jade文件
    this.displayJade = function(jadeName, json){
        _self._res.render(jadeName,json);
    };

    //返回json数据到客户端
    this.returnError = function(code,msg,dataJson){
        _self._res.send({"code":code, "msg":msg, "data":dataJson});
    };
}
global.BaseController = BaseController;