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
global.log      = global.BASE_DIR + "/log/";
global.PUBLIC   = global.BASE_DIR + "/public/";
global.VIEW     = global.BASE_DIR + "/view/";


/**
 * modules引入
 */
global.express = require('express');
global.sio = require('socket.io');
global.fs=require('fs');
global.path = require('path');
global.url = require('url');
global.parseCookie = require('connect').utils.parseCookie;
global.MemoryStore = require('./node_modules/connect/lib/middleware/session/memory');
global.Session = require('./node_modules/connect/lib/middleware/session/session');
global.sys = require('util');

urlResolve = require(CORE + "url_resolve");
urlResolve.getActionInfo();