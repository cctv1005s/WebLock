var Canvas = require('./Canvas');

//画出9个圆圈
var area = document.querySelector('#area');
var canvas = new Canvas(area);
var screenWidth = canvas.width();
//切分成5分
var eachWidth = screenWidth / 5;
var beginPoint = {
    x:eachWidth/2,
    y:eachWidth/2
};

var circles = [];
for(var i = 0;i < 3;i++)
    for(var j = 0;j < 3;j++){
        var circle = canvas.createCircle();
        circle.draw({
            x:beginPoint.x + i * 2 * eachWidth,
            y:beginPoint.x + j * 2 * eachWidth,
            radius:eachWidth/2,
            'background':'white'
        });
        circles.push(circle);
    }

var line = canvas.createLine();

//画布监听触摸
//没有一条直线是active的，
//触摸点在任意一个圆圈内，创建一条新的直线，并把这条直线的一端设置在这个圆的center,另一端设置为活动的
//如果当前有一条直线是active的，检测当前的点是否是在圆之内，如果是在圆内，则检测这个圆是否已经被设置了一个点，如果没有被设置
//那么将这条直线设置非active,并且结束当前直线，重复上面的步骤.

