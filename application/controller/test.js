/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-14
 * Time: 上午10:03
 * To change this template use File | Settings | File Templates.
 */
/*
 *
 */
var test = {
    _req : null,
    _res : null,
    init : function(req, res){
        this._req = req;
        this._res = res;
        console.log("test is ok");
    },
    test : function(){
        console.log("test function");
        this._res.redirect('/chat');
    }
};

global.test = test;