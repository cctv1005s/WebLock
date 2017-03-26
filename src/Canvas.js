var Line = require('./Line');
var Circle = require('./Circle');

/**
 * 用于创建自己的画布,提供直线和圆两种方法
 * 
 * @param {Element} ctx 上下文环境，提供画布的元素，一般为div，其实不是div也可以，只要是块状元素都可以
 */
var Canvas = function(ctx){
    this.ctx = ctx;
}


Canvas.fn = canvas.prototype;

/**
 * 用于创建一个直线对象
 */
Canvas.fn.createLine = function(){

}
/**
 * 用于创建一个圆对象
 */
Canvas.fn.createCircle = function(option){
    return new Circle(this.ctx,option);
}

exports = module.exports = canvas;
