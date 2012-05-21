/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-9
 * Time: 下午10:35
 * To change this template use File | Settings | File Templates.
 */
var app = module.export = express.createServer();

//system config
var systemConfig = function(){
    app.configure(function(){
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use(express.methodOverride());
        app.use(app.router);//要放在bodyParser之后，处理post
        app.use(function(req, res, next) {
            if(/\.ejs$/.test(req.url)) {
                next();
                return ;
            }
            res.sendfile(BASE_DIR + req.url);
        });
        app.use(express.static(BASE_DIR + "/view"));
        app.set('view engine', 'jade');
        app.use(express.static(PUBLIC));
    });
};

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
    var routerMsg = getUrlConf();
    var key = req.params.key;
    var session = checkSession(req, key);
    if(key == "favicon.ico"){return;};
    if(session == 0){
        res.redirect('/index');
        return;
    }
    console.log("[key:"+ key +"] " + "[class:" + routerMsg[key].cla + "] " + "[controller:" + routerMsg[key].fun +"]");
    require(CON + routerMsg[key].con);
    var controllerObj = eval("new " + routerMsg[key].cla);
    controllerObj.init(req, res);
    controllerObj[routerMsg[key].fun].call();
}

function getUrlConf(){
    var routerMsg = {};
    try{
        var str = fs.readFileSync(CONF + 'router.json','utf8');
        routerMsg = JSON.parse(str);
    }catch(e){
        sys.debug("JSON parse configs/hot_deployer.json fails")
    }
    return routerMsg;
}

//判断用户是否登录
function checkSession(req, key){
   if(key == "index" || key == "login"){
       if(Session.username && Session.username != ''){
            return 2;
       }
        return 1;
   }
   return Session.username && Session.username != '' ? 1 : 0;
}