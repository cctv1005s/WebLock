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

Canvas.fn = Canvas.prototype;

/**
 * 用于创建一个直线对象
 */
Canvas.fn.createLine = function(option){
    return new Line(this,option);
}
/**
 * 用于创建一个圆对象
 */
Canvas.fn.createCircle = function(option){
    return new Circle(this,option);
}

Canvas.fn.draw = function(element){
    this.ctx.appendChild(element);
}

/**
 * 获取画布的高度，只读
 */
Canvas.fn.height = function(){
    return this.ctx.clientHeight;
}

/**
 * 获取画布的宽度，只读
 */
Canvas.fn.width = function(){
    return this.ctx.clientWidth;
}

Canvas.fn.getOffset =function() {
  var el = this.ctx;
  let box = el.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  }
}

exports = module.exports = Canvas;

