var Canvas = require('./Canvas');
var Util = require('./Util.js');

var WebLock = function(element){
    var area = element;
    var canvas = new Canvas(area);
    var screenWidth = canvas.width();
    //初始化配置
    this.config();
    //切分成5分
    var eachWidth = screenWidth / 5;
    var beginPoint = {
        x:eachWidth/2,
        y:eachWidth/2
    };
    //画出圆形
    var circles = [];
    var k = 0;
    for(var i = 0;i < 3;i++)
        for(var j = 0;j < 3;j++){
            var circle = canvas.createCircle();
            circle.draw(Util.extend({
                x:beginPoint.x + i * 2 * eachWidth,
                y:beginPoint.x + j * 2 * eachWidth,
                radius:eachWidth/2,
            },this.config.circle));
            circle.id = k++;
            circles.push(circle);
        }
    //基本的配置选项
    this.area = area;
    this.canvas = canvas;
    this.lines = [];
    this.circles = circles;
    this.callback = function(){};
}

WebLock.fn = WebLock.prototype;

WebLock.fn.start = function(){
    var {area,canvas,lines,ctiveLine,circles} = this;
    var activeLine = null;
    var self = this;
    //记录图案锁的密码
    var password = [];
    var start = function(e){
        password = [];
        if(self.lines.length !== 0 && activeLine == null){
            self.clear();
        }
        var point = {x:e.touches[0].clientX,y:e.touches[0].clientY};
        var theCircle = inCircle(point,circles);
        if(!theCircle)
            return ;
        activeLine = canvas.createLine({from:theCircle.center(),to:theCircle.center()});
        //设置经过的圆为激活状态
        theCircle.isActive = true;
        theCircle.draw(self.config.active);
        //记录密码
        password.push(theCircle.id);
    };

    var move = function(e){
        var point = {x:e.touches[0].clientX,y:e.touches[0].clientY};
        var theCircle = inCircle(point,circles);
        if(!activeLine)
            return ;
        if(theCircle && !theCircle.isActive){
            //已经到达圆的中心了
            activeLine.draw(Util.extend({to:theCircle.center()},self.config.line));
            self.lines.push(activeLine);
            activeLine = canvas.createLine({from:theCircle.center(),to:theCircle.center()});
            //设置经过的圆为激活状态var password = [];
            theCircle.isActive = true;
            theCircle.draw(self.config.active);
            //记录密码
            password.push(theCircle.id);
        }else{
            activeLine.draw(Util.extend({to:point},self.config.line));
        }
    };

    var end = function(e){
        activeLine.clear();
        activeLine = null;
        var cbs = self.callback;
        cbs.call(self,password,self.clear);
    };

    this.disable = function(){
        area.removeEventListener('touchstart',start);
        area.removeEventListener('touchmove',move);
        area.removeEventListener('touchend',end);
    }

    area.addEventListener('touchstart',start);
    area.addEventListener('touchmove',move);
    area.addEventListener('touchend',end);
    return this;
}

WebLock.fn.done = function(fn){
    this.callback = fn;
}

WebLock.fn.clear = function(){
    //将直线清除
    var lines = this.lines;
    for(var i in lines){
        lines[i].clear();
    }
    this.lines = [];
    //将圆背景清除
    var circles = this.circles;
    for(var i in circles){
       circles[i].draw({
        background:'white'
       });
       circles[i].isActive = false;
    }
}

WebLock.fn.config = function(config){
    config = config||{};
    //普通直线的样式
    var line = config.line||{};
    this.config.line = {
        background:line.background||'rgba(0,0,0,0.5)',
        height:line.height||'5px',
        'border-radius':line['border-radius']||'10px'
    };
    //一般的时候的圆的样式s
    var circle = config.circle||{};
    this.config.circle = {
        background:circle.background || 'rgb(255,255,255)',
        border:circle.border||'1px solid grey'
    };
    //被选中的圆的样式
    var active = config.active||{};
    this.config.active = {
        background:circle.background || 'rgb(255,0,255)',
        border:circle.border||'1px solid grey'
    };
}

var inCircle = function(point,circles){
    for(var i in circles){
        if(circles[i].isInCircle(point)){
            return circles[i];
        }
    }
    return null;
};

exports = module.exports = WebLock;