/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-9
 * Time: 下午10:35
 * To change this template use File | Settings | File Templates.
 */
var app = module.export = Module.express.createServer(),
    RedisStore = require('connect-redis')(Module.express),
    Permissions = {"loginPageAct":true,"loginAct":true,"signUpPageAct":true,"signUpAct":true};
global.io = Module.sio.listen(app);
//系统配置，express数据配置
var systemConfig = function(){
    app.configure(function(){
        app.use(Module.express.bodyParser());
        app.use(Module.express.cookieParser());
        app.use(Module.express.methodOverride());
        app.use(Module.express.session({ secret: "keyboard cat", store: new RedisStore }));
        app.use(app.router);//要放在bodyParser之后，处理post
        app.use(function(req, res, next) {
            if(/\.ejs$/.test(req.url)) {
                next();
                return ;
            }
            res.sendfile(BASE_DIR + req.url);
        });

        //设定静态资源文件夹
        app.use(Module.express.static(BASE_DIR + "/view"));
        app.set('view engine', 'jade');
        app.use(Module.express.static(PUBLIC));
    });
};

//服务器启动，开始监听端口
var listenPort = function(){
    app.listen(3000, function(){
        var addr = app.address();
        console.log('app listening on http://127.0.0.1：' + addr.port);
    });

}

exports.getActionInfo = function(){
    systemConfig();
    app.get('/:key', function(req, res){
        callUrlRequest(req, res);
    });
    app.post('/:key', function(req, res){
        callUrlRequest(req, res);
    });
    listenPort();
};

function callUrlRequest(req, res){
    //获取配置，如果配置信息不变，直接获取
    var routerMsg = initVar.routerConfig ? initVar.routerConfig : getUrlConf(),
        key = req.params.key,
        fun = (req.query.c ? req.query.c : "loginPage")+ "Act";
    var session = checkSession(req, fun);
    //去除NodeJs自带请求数据
    if(key == "favicon.ico"){return;};
    if(session == 0){
        res.redirect('/index');
        return;
    }
    console.log("[key:"+ key +"] " + "[class:" + routerMsg[key].cla + "] " + "[controller:" + fun +"]");
    require(CON + routerMsg[key].con);
    var controllerObj = eval("new " + routerMsg[key].cla);
    controllerObj.init(req, res);
    controllerObj[fun].call();
}

//获取url配置信息，读取配置文件
function getUrlConf(){
    var routerMsg = {};
    try{
        var str = Module.fs.readFileSync(CONF + 'router.json','utf8');
        routerMsg = JSON.parse(str);
    }catch(e){
        Module.sys.debug("JSON parse configs/hot_deployer.json fails")
    }
    initVar.routerConfig = routerMsg;
    return routerMsg;
}

//判断用户是否登录
function checkSession(req, fun){
   if(Permissions[fun]){
       if(req.session.username && req.session.username != ''){
            return 2;
       }
        return 1;
   }
   return req.session.username && req.session.username != '' ? 1 : 0;
}