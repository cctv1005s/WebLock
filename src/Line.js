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
    // option.from = option.to = null;
    //计算
    var angle = this.calcAngle(this.from,this.to);
    var width = Util.getDistance(this.from,this.to);
    //传入内置css
    option = Util.extend(option,{
        'left':parseInt(this.from.x) + 'px',
        'top':parseInt(this.from.y) + 'px',
        'width':width + 'px',
        'height':option.height||0,
        'border':option['border']||'none',
        'position':'absolute',
        'display':'block',
        '-webkit-transform-origin':'0% 0%',
        '-ms-transform-origin':'0% 0%',
        'transform-origin':'0% 0%',
        'transform':'rotate('+angle+'deg)'
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

Line.fn.calcAngle = function(p1,p2){
    var slope = 0;
    //斜率不存在的情况下
    if(p2.x == p1.x){
        var angel = p2.y > p1.y?90:-90;
        return angel;
    }

    var k = (p2.y - p1.y) / (p2.x - p1.x);
    var angle = Math.atan(k) * (180/Math.PI) + (p2.x - p1.x >0 ? 0:180);
    return angle;
}

Line.fn.clear = function(){
    if(this.element){
        this.element.style['display'] = 'none';
        this.element.parentNode.removeChild(this.element);
    }
        
}

exports = module.exports = Line;