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
require(LIB + "email.js");

function IndexController() {
    var _parent = Object.getPrototypeOf(this);
    var _self=this;
    this._obj = new UserModel();

    this.loginPageAct = function(){
        if(_parent._req.session.username){
            _parent.displayJade(VIEW + 'chat',{username:_parent._req.session.username});
        } else {
            _parent.displayJade(VIEW + 'main_view');
        }
    };

    this.toMainPageAct = function(){
        var time = 0;
        _parent.displayJade(VIEW + 'chat',{username:_parent._req.session.username});
        io.sockets.on('connection', function (socket){
            var name = _parent._req.session.username;
            if(!initVar.usersWS[name]){
                initVar.usersWS[name] = socket;
            }
            var refresh_online = function(){
                var n = [];
                for (var i in initVar.usersWS){
                    n.push(i);
                }
                io.sockets.emit('online list', n);//所有人广播
            }
            refresh_online();
            //确保每次发送一个socket消息
            if(time > 0){
                return;
            }
            socket.broadcast.emit('system message', '【'+name + '】回来了，大家赶紧去找TA聊聊~~');

            //公共信息
            socket.on('public message',function(msg, fn){
                socket.broadcast.emit('public message', name, msg);
                fn(true);
            });

            //私人@信息
            socket.on('private message',function(to, msg, fn){
                var target = initVar.usersWS[to];
                if (target) {
                    fn(true);
                    target.emit('private message', name+'[私信]', msg);
                }
                else {
                    fn(false)
                    socket.emit('message error', to, msg);
                }
            });

            //掉线，断开链接处理
            socket.on('disconnect', function(){
                delete initVar.usersWS[name];
                session = null;
                socket.broadcast.emit('system message', '【'+name + '】无声无息地离开了。。。');
                refresh_online();
            });
            time++;

        });

    };

    this.loginAct = function(){
        var loginJson = _parent._req.body.v;
        _self._obj.checkUser(loginJson.username,loginJson.password,function(result){
            if(result.length > 0){
                _parent._req.session.username = loginJson.username;
                if(!result[0].f_state){
                    _parent.returnError("1", "success, but not email confirm", "");
                    return;
                }
                _parent.returnError("0", "success", "");
                return;
            }
            _parent.returnError("-1", "no user", "");
            return;
        });
    };

    this.loginOutAct = function(){
        var username = _parent._req.session.username;
        _parent._req.session.destroy(function(err){
            console.log(username);
        });
        _parent.displayHtml("main_view.html");
    }

    this.signUpAct = function(){
        var signJson = _parent._req.body.v,
            mail = require('nodemailer');
        mail.SMTP = {
            host: 'smtp.qq.com',
            port: 25,
            use_authentication: true,
            user: '492383469@qq.com',
            pass: '*************'
        };
        var resetJson = {
            "f_uname"       : signJson.username,
            "f_nick_name"  : signJson.nick_name,
            "f_email"       : radomStr + "_" + signJson.email,
            "f_password"    : signJson.password,
            "f_state"       : 0
        };
        _self._obj.addNewUser(resetJson,function(result){
            if(result == 0){
                _parent.returnError("-1", "sign up error", "");
            } else {
                var codeArray = resetJson.f_email.split('_'),
                    emailAddress = codeArray[1];
                mail.send_mail(
                    {
                        sender:'492383469@qq.com', //发送邮件的地址
                        to : emailAddress, //发给谁
                        subject:Email_Config.getSubject(), //主题
                        html:Email_Config.getHtml(resetJson.f_email) //如果要发送html
                    },
//回调函数，用户判断发送是否成功，如果失败，输出失败原因。
                    function(error,success){
                        if(!error){
                            console.log('message success');
                        }else{
                            console.log('failed'+error);
                        }
                    });
                _parent._req.session.username = signJson.username;
                _parent.displayJade(VIEW + 'email_page',{email:signJson.email});
                //_parent.returnError("0", "success", "");
            }
        })
        return;
    }

    this.signUpPageAct = function(){
        _parent.displayJade(VIEW + 'register');
    }

    this.emailPageAct = function(){
        _parent.displayJade(VIEW + 'email_page',{email:'492383469@qq.com'});
    }

    this.emailConfirmAct = function(){
        var verificationCode = _parent._req.query.m,
            codeArray = verificationCode.split('_'),
            emailAddress = codeArray[1];
        _self._obj.confirmEmailCode(verificationCode, function(result){
            if(result.length>0){
                _self._obj.updateUser(result[0].f_uid, {'f_state':1,'f_email': emailAddress}, function(result){
                    if(result){
                        _parent.returnError("0", "confirm success","");
                        return;
                    } else {
                        _parent.returnError("-1", "confirm failed","");
                        return;
                    }

                });
            } else {
                _parent.returnError("-2", "no sign up email","");
            }
        });
        //_parent.displayJade(VIEW + 'test',{username:"test"});
    }
};

var Email_Config = {
    getSubject   : function(){return "node聊天室欢迎您"},
    getHtml     : function(radomStr){return "<div>" +
        "欢迎注册node聊天室，请点击以下链接完成注册" +
        "<a target='_blank' href='http://127.0.0.1:3000/index?c=emailConfirm&m="+radomStr+"'>" +
        "http://127.0.0.1:3000/index?c=emailConfirm&m="+radomStr+"</a>" +
        "</div>"
    }
}

var Word_Config = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var radomStr =  getRadomStr();

function getRadomStr(){
    return Word_Config.charAt(Math.floor(Math.random()*52))+
        Word_Config.charAt(Math.floor(Math.random()*52)) +
        Word_Config.charAt(Math.floor(Math.random()*52))+
        Word_Config.charAt(Math.floor(Math.random()*52));
}
IndexController.prototype = new BaseController();
global.IndexController = IndexController;
