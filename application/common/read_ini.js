/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-3-13
 * Time: 下午10:35
 * To change this template use File | Settings | File Templates.
 */
exports.load = function (filename) {
    var r = [],
        q = require("querystring"),
        f = require("fs").readFileSync(filename, "ascii"),
        v = q.parse(f, '[', ']'),
        t;
    for (var i in v) {
        if (i != '' && v[i] != '') {
            r[i] = [];
            t = q.parse(v[i], '/n', '=');
            for (var j in t) {
                if (j != '' && t[j] != '')
                    r[i][j] = t[j];
            }
        }
    }
    return r;
};