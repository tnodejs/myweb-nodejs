MyWeb0.2�汾
有兴趣，就来我的nodejs论坛：www.tnodejs.com
һ�����Լ����ܺõĽ��飬�ҰѸÿ��ܽ����˽�һ�����޸ģ�
�����õĽ�����Ҫ������cnodejs.org
1�����ڶ�ȡ�����ļ�������Ч�ʵ�����
�û�����kamaliang
���飺ÿ������ʱ��Ҫ��router.json����readFileSync������û��Ҫ�ɣ�
���ͣ�������Ӱ��ϵͳ��Ч�ʣ����α������������أ��Ҳ��õķ�����ͨ��ʹ��һ����̬ȫ�ֱ�������һ����Ҫ��ȡ�����ļ����ڶ��ξ�ֱ�Ӵ�ȫ�ֱ�����ȡ��
���Ը���������һ��ȫ�ֵľ�̬�����ռ䣬���´��룺
/*
 *��ʼ����,��Ҫ�ǳ�ʼһЩ��̬����
 */
global.initVar = {
    routerConfig   : "",
    errorConfig    : "",
    serverConfig   : ""
}
2��global��ע���˶�������������
�û�����kfll
���飺��global��ע����ô�����ֺ���ô.... ����ע���������ռ���.. global.xxxxApp = {}
���ͣ����Ȿ�ļ��������ռ�������global�ı�����ͻ��ͬʱ����ϵͳ�����������á�
�������������ǳ��ã���л�������������⣡
���Ըý���ע���������ռ䣬�����룺
/**
 * modules����
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
 *��ʼ����,��Ҫ�ǳ�ʼһЩ��̬����
 */
global.initVar = {
    routerConfig   : "",
    errorConfig    : "",
    serverConfig   : ""
}
������������
����log��־��ӡ���ܣ���Ȼ����nodejs��һ��api�����ṩʵ��log��¼����������������������һ�����ܽӿڣ�����Ҫ�����ǣ���¼����log��־�����󡢾��桢��ˮ����ͬʱ�������ҵ���Ҫ�趨�����룬������Ϣ��ͬʱ�趨���󼶱�����Ҫ�Ǳ���ϵͳ��ά���ͼ��ء�
�ṩ���ļ���������core�ļ����£�log.js
Module����exports�ĺ�������addLog
����
errorCode     �� ������
 myErrorMsg  �� ������Ϣ
errorJson      �� ��¼��Ӧ������
��־��¼��ʽ
[20:25:44] [1] [can not connect to mysql database]  [ClientConnectionReady Error: ]
�ֱ��ǣ�ʱ�䡢���󼶱𡢴���������Ϣ������������Ϣ����Ӧ��¼����δ���ӣ�


ʵ�ַ�����ʹ��fsģ�������ļ�����
���������Ƶ�api��readFileSync��lstat��writeFile��createWriteStream
�ù����д����Ƽ�����Ч�ʣ�
readFileSyncͬ����ȡ�ļ�����
lstat��ѯ�Ƿ��и��ļ�����
createWriteStream����һ���ļ�
writeFile��дһ���ļ�
���̵����⣺nodejs��û���ṩ�ǲ���д�ļ���api��writeFile����д�ļ��ģ�������ÿ����Ҫȥ��ȡ�ļ���Ϣ��Ȼ������д��ȥ���ᵼ��Ч���½���
