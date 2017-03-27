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

var lines = [];
var activeLine;

area.addEventListener('touchstart',function(e){
    var point = {x:e.touches[0].clientX,y:e.touches[0].clientY};
    var theCircle = inCircle(point);
    if(!theCircle)
        return ;
    activeLine = canvas.createLine({
        from:{
            x:theCircle.x,
            y:theCircle.y
        },
        to:{
            x:theCircle.x,
            y:theCircle.y
        }
    });
    theCircle.isActive = true;
    theCircle.draw({
        background:'yellow'
    });
});

area.addEventListener('touchmove',function(e){
    var point = {x:e.touches[0].clientX,y:e.touches[0].clientY};
    var theCircle = inCircle(point);
    if(!activeLine){

    }else{
        if(theCircle && !theCircle.isActive){
            //已经到达圆的中心了
            activeLine.draw({
                to:{
                    x:theCircle.x,
                    y:theCircle.y
                }
            });
            
            lines.push(activeLine);
            activeLine = canvas.createLine({
                from:{
                    x:theCircle.x,
                    y:theCircle.y
                },
                to:{
                    x:theCircle.x,
                    y:theCircle.y
                }
            });

            theCircle.isActive = true;
            theCircle.draw({
                background:'yellow'
            });

        }else{
            activeLine.draw({
                to:point
            });
        }
    }
});

area.addEventListener('touchend',function(e){
    console.log(activeLine);
    activeLine.clear();
});

var inCircle = function(point){
    for(var i in circles){
        if(circles[i].isInCircle(point)){
            return circles[i];
        }
    }
    return null;
};

//画布监听触摸
//没有一条直线是active的，
//触摸点在任意一个圆圈内，创建一条新的直线，并把这条直线的一端设置在这个圆的center,另一端设置为活动的
//如果当前有一条直线是active的，检测当前的点是否是在圆之内，如果是在圆内，则检测这个圆是否已经被设置了一个点，如果没有被设置
//那么将这条直线设置非active,并且结束当前直线，重复上面的步骤.