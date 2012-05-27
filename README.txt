MyWeb0.2版本
一、针对几个很好的建议，我把该框架进行了进一步的修改！
两个好的建议主要是来自cnodejs.org
1、关于读取配置文件，降低效率的问题
用户名：kamaliang
建议：每次请求时都要对router.json进行readFileSync？这个没必要吧？
解释：这样会影响系统的效率，如何避免这个问题呢？我采用的方法是通过使用一个静态全局变量，第一次需要读取配置文件，第二次就直接从全局变量获取！
针对该问题做了一个全局的静态命名空间，如下代码：
/*
 *初始变量,主要是初始一些静态变量
 */
global.initVar = {
    routerConfig   : "",
    errorConfig    : "",
    serverConfig   : ""
}
2、global下注册了多个变量的问题
用户名：kfll
建议：在global下注册那么多名字合适么.... 还是注册个命名空间吧.. global.xxxxApp = {}
解释：避免本文件的命令空间变量和global的变量冲突，同时便于系统化管理与配置。
以上两个建议非常好，感谢他们提出的问题！
针对该建议注册了命名空间，如代码：
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
二、新增功能
新增log日志打印功能，当然这个nodejs有一套api可以提供实现log记录，不过这里我自我设计了一个框架接口，其主要功能是：记录多种log日志（错误、警告、流水），同时根据自我的需要设定错误码，错误信息，同时设定错误级别。主要是便于系统的维护和监控。
提供的文件名：（在core文件夹下）log.js
Module名中exports的函数名：addLog
参数
errorCode     ： 错误码
 myErrorMsg  ： 错误信息
errorJson      ： 记录相应的数据
日志记录格式
[20:25:44] [1] [can not connect to mysql database]  [ClientConnectionReady Error: ]
分别是：时间、错误级别、错误配置信息、错误代码信息（相应记录数据未添加）


实现方法：使用fs模块进行文件管理
本功能设计的api有readFileSync，lstat，writeFile，createWriteStream
该功能有待完善加提高效率！
readFileSync同步读取文件内容
lstat查询是否有该文件存在
createWriteStream创建一个文件
writeFile重写一个文件
请教的问题：nodejs有没有提供是不重写文件的api，writeFile是重写文件的，因此我每次需要去读取文件信息，然后重新写进去，会导致效率下降！
