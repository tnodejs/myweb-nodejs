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
    this.displayHtml = function(htmlName){
        var file = fs.readFileSync(VIEW + htmlName);
        _self._res.end(file);
    };

    this.displayJade = function(jadeName, json){
        _self._res.render(jadeName,json);
    };
}
global.BaseController = BaseController;