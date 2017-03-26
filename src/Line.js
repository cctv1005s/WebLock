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

    this.from = option.from;
    this.to = option.to;
    option.from = option.to = null;
    //计算
    var angle = this.calcAngle();

    //传入内置css
    option = Util.extend(option,{
        'left':parseInt(this.from.x) + 'px',
        'top':parseInt(this.from.y) + 'px',
        'width':'100px',
        'height':0,
        'border':option['border']||'1px solid grey',
        'position':'absolute',
        'display':'block',
        '-webkit-transform-origin':'0% 0%',
        '-ms-transform-origin':'0% 0%',
        'transform-origin':'0% 0%',
        'transform':""
    });
}

exports = module.exports = Line;