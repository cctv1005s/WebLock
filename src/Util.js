var util = require('util');
/**
 * 工具函数库，用于做一些基本的功能
 */

/**
 * 讲一个option转换成一个style字符串
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

exports.extend = function(obj1,obj2){
    obj1 = obj1||{};
    for(var i in obj2){
        obj1[i] = obj2[i];
    }
    return obj1;
};

exports.getDistance = function(p1,p2){
    return Math.sqrt((p2.y - p1.y)*(p2.y - p1.y) + (p2.x - p1.x)*(p2.x - p1.x));
}

