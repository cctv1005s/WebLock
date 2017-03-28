var Util = require('./Util');
var util = require('util');
var Circle = function(ctx,option){
    this.ctx = ctx;
    this.option = option;
}

Circle.fn = Circle.prototype;

/**
 * Circle的绘制函数，实际上为了实现数据与绘制的分离，这里的draw方法调用了传入的ctx的绘制方法
 * 而这个类只生成html代码，传给Canvas的draw方法
 * 
 * @param {object} option 绘制传入的参数
 */
Circle.fn.draw = function(option){
    //如果既没有初始化时传入参数，也没有后来传入参数，那么就报错
    //后面的option会覆盖前面的option
    //原有的参数不变
    option = Util.extend(this.option,option) || this.option;
    //保存option
    this.option = Util.extend({},option);
    if(!option)
        throw Error("至少要给圆传入一个参数");
    
    if(!('x' in option && 'y' in option && 'radius' in option)){
        throw new Error('缺少必要参数');
    }

    this.x = parseInt(option.x);
    this.y = parseInt(option.y);
    this.radius = parseInt(option.radius);
    option.radius = option.x = option.y = null;
    //传入内置css
    option = Util.extend(option,{
        'left':(this.x - this.radius) + 'px',
        'top':(this.y - this.radius) + 'px',
        'width':2*this.radius + 'px',
        'height':2*this.radius + 'px',
        'background':option['background']||'white',
        'border':option['border']||'1px solid grey',
        'position':'absolute',
        'display':'block',
        'border-radius':'100%',
        'min-width':'5px',
        'min-height':'5px'
    });

    if(!this.element)
        var element = document.createElement('div');
    else 
        var element = this.element;

    element.setAttribute('style',Util.styless(option));
    
    if(!this.element)
        this.ctx.draw(element);

    this.element = element;
    return this;
}

/**
 * 判断一个点是否在圆内
 * 
 * @param {object} point 传入的点，实例 {x:0,y:0}
 */
Circle.fn.isInCircle = function(point){
    var distance = Util.getDistance(point,{
        x:this.x,y:this.y
    });
    if(distance <= this.radius){
        return true;
    }
    return false;
}

Circle.fn.center = function(){
    return {x:this.x,y:this.y};
}

exports = module.exports = Circle;