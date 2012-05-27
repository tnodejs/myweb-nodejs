/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-4-9
 * Time: 下午10:21
 * To change this template use File | Settings | File Templates.
 */
//========================全局变量定义===============================
global.BASE_DIR = __dirname;
global.APP      = global.BASE_DIR + "/application/";
global.CON      = global.APP + "/controller/";
global.CORE     = global.APP + "/core/";
global.MODEL    = global.APP + "/model/";
global.CONF     = global.BASE_DIR + "/conf/";
global.LOG      = global.BASE_DIR + "/log/";
global.PUBLIC   = global.BASE_DIR + "/public/";
global.VIEW     = global.BASE_DIR + "/view/";


/**
 * modules引入
 */
global.Module = {
    express : require('express'),
    sio : require('socket.io'),
    fs : require('fs'),
    path : require('path'),
    url : require('url'),
    parseCookie : require('connect').utils.parseCookie,
    MemoryStore : require('./node_modules/connect/lib/middleware/session/memory'),
    Session : require('./node_modules/connect/lib/middleware/session/session'),
    sys : require('util')
}
/*
 *初始变量,主要是初始一些静态变量
 */
global.initVar = {
    routerConfig   : "",
    errorConfig    : "",
    serverConfig   : ""
}

urlResolve = require(CORE + "url_resolve");
urlResolve.getActionInfo();