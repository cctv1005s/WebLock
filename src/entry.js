var WebLock = require('./WebLock.js');

var _password = [];
var _alert = document.querySelector('#alert');
var form = document.querySelector('#box');
wl = new WebLock(document.querySelector('#area'));

form.addEventListener('click',function(e){
    var v = e.toElement;
    if(v.value == 'set'){
        wl.done(set);
    }else{
        if(_password.length == 0){
            _alert.innerHTML = '没有设置密码';
            return ;
        }
        wl.clear();
        wl.done(check);
    }
});

var set = function(password){
    console.info(password);
    if(password.length < 5){
        _alert.innerHTML = '密码长度必须要大于5';
        return;
    }
    _alert.innerHTML = '设置成功';
    _password = password;
}

var check = function(password){
    if(_password.length != password.length){
        _alert.innerHTML = '密码不一致';
        return ;
    }
    for(var i in _password){
        if(_password[i] != password[i]){
            _alert.innerHTML = '密码不一致';
            return ;
        }
    }

    _alert.innerHTML = '密码一致';
}

wl.start().done(set);
