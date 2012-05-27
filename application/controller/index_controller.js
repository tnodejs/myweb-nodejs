/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-16
 * Time: 下午9:27
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-14
 * Time: 下午1:17
 * To change this template use File | Settings | File Templates.
 */
require(CORE + "base_controller.js");

function IndexController() {
    var _parent = Object.getPrototypeOf(this);
    var _self=this;
    this._obj = new UserModel();

    this.loginPageAct = function(){
        if(Module.Session.username){
            _parent.displayJade(VIEW + 'chat',{username:Module.Session.username});
        } else {
            _parent.displayHtml("main_view.html");
        }
    };

    this.toMainPageAct = function(){
        _parent.displayJade(VIEW + 'chat',{username:Module.Session.username});
    };

    this.loginAct = function(){
        var loginJson = _parent._req.body.v;
        _self._obj.checkUser(loginJson.username,loginJson.password,function(result){
            if(result.length > 0){
                Module.Session.username = loginJson.username;
                _parent._res.send({"code":"0", "msg":"success", "data":""});
                return;
            }
            _parent._res.send({"code":"-1", "msg":"no user", "data":""});
            return;
        });
    };

    this.signUpAct = function(){
        var signJson = _parent._req.body.v;
        _self._obj.addNewUser(signJson,function(result){
            if(result == 0){
                _parent._res.send({"code":"-1", "msg":"sign up error", "data":""});
            } else {
                Module.Session.username = signJson.username;
                _parent._res.send({"code":"0", "msg":"success", "data":""});
            }
        })
    }
};

IndexController.prototype = new BaseController();
global.IndexController = IndexController;
