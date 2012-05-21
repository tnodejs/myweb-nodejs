/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-15
 * Time: 下午8:55
 * To change this template use File | Settings | File Templates.
 */
var UserController = {
    _req : null,
    _res : null,
    _user : new UserModel(),
    init : function(req, res){
        this._req = req;
        this._res = res;
    },
    checkSession : function(){
        var loginJson = this._req.body.v;
        this._user.checkUser(loginJson.username,loginJson.password,function(result){
            console.log(result);
            if(result){
                this._req.session.username = loginJson.username;
            }
            return;
        });
    }
};
global.UserController = UserController;