var util = require('util');
/**
 * 工具函数库，用于做一些基本的功能
 */

/**
 * 将一个option转换成一个style字符串
 */
exports.styless = function(option){
    if(typeof option != 'object')
        throw new TypeError('类型错误');
    
    var style = "";
    for(var i in option){
        if(typeof option[i] == 'undefined' ||option[i] == null)
            continue;
        style += util.format('%s:%s;',i,option[i]);
    }

    return style;
}

/**
 * 浅复制
 */
exports.extend = function(obj1,obj2){
    obj1 = obj1||{};
    for(var i in obj2){
        obj1[i] = obj2[i];
    }
    return obj1;
};

/**
 * 计算两个点的距离
 */
exports.getDistance = function(p1,p2){
    return Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
}

/**
 * 判断两个数组是否相等
 */
exports.Equals = function(a1,a2){
    try{
        if(a1.length !== a2.length)
            return false;
        for(var i in a1){
            if(a1[i] != a2[i])
                return false;
        }
        return true;
    }catch(e){
        return false;
    }
}