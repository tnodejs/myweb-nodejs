/**
 * Created by JetBrains WebStorm.
 * User: Administrator
 * Date: 12-3-17
 * Time: 上午10:05
 * To change this template use File | Settings | File Templates.
 */
require(CORE + "base_model.js");

/*
 *根据key查询用户信息
 * 变量：uid
 * 返回：查询成功返回用户json，失败返回false
 */

function UserModel(){
    this.getUserById = function(uid, callBack){
        console.log(uid);
        console.log(typeof uid);
        var whereArea = "f_uid = " + uid,
            result = this.query(whereArea, false,function(result){callBack(result);});
        return result;
    };
    /*
     *判断用户登录
     * 变量：username，values需要更新的数组json格式，需要更新的表名
     * 返回：更新成功返回id的值，更新失败返回false
     */
    this.checkUser = function(username, password, callBack){
        var whereArea = "f_uname = '" + username + "' and f_password = '" + password + "'",
            result = this.query(whereArea, false,function(result){callBack(result);});
        return result;
    };

    /*
     *添加新用户
     * 变量：userParameters：json数组
     * 返回：添加成功返回id的值，更新失败返回false
     */
    this.addNewUser = function(userParameters, callBack){
        var result = this.add(userParameters,function(result){callBack(result);});
        return result;
    };

    /*
     * 修改用户资料
     * 变量：id和需要更新的json数据
     * 返回：更新成功返回true，更新失败返回false
     */
    this.updateUser = function(uid, userParameters, callBack){
        var result = this.update(uid,userParameters, function(result){callBack(result);});
        return result;
    };

    /*
     * 删除用户
     * 变量：uid需要删除的用户id值
     * 返回：删除成功返回true，删除失败返回false
     */
    this.deleteUser = function(uid, callBack){
        var result = this.deleteItem(uid, function(result){callBack(result);});
        return result;
    };

    /*
     * 查询用户
     * 变量：userName
     * 返回：查找成功返回查找结果，失败返回false
     */
    this.searchUser = function(userName, callBack){
        var whereArea = "f_uname = '" + username + "'",
            result = this.query(whereArea, false, function(result){callBack(result);});
        return result;
    };

}
UserModel.prototype = new BaseModel("t_user");
global.UserModel = UserModel;