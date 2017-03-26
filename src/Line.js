var Util = require('./Util.js');
var Line = function(ctx,option){
    this.ctx = ctx;
    this.option = option;
}

Line.fn = Line.prototype;

Line.fn.draw = function(option){
    option = Util.extend(this.option,option) || this.option;
    if(!option)
        throw Error("至少要给直线传入一个参数");
    
    if(!('from' in option && 'to' in option)){
        throw new Error('缺少必要参数');
    }
}

exports = module.exports = Line;