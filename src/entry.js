var WebLock = require('./WebLock.js');

var _password = [];
var v = document.querySelector("input[name='choice']:checked");
var _alert = document.querySelector('#alert');
wl = new WebLock(document.querySelector('#area'));
if(v.value == 'set'){
}

var set = function(){
    wl.start().done(function(password,clear){
        if(password.length < 5){
            _alert.innerHTML = "密码长度必须要大于5";
        }else{
            _password = password;
            _alert.innerHTML = "设置成功";
        }
    });
}
