var WebLock = require('./WebLock.js');
var Util = require('./Util.js');

var storage = window.localStorage;
var _password = [];
var _set_password = storage['password']||[];//最终设置好的password
if(typeof _set_password == 'string'){
    _set_password = _set_password.split(',');
}

var _alert = document.querySelector('#alert');
var form = document.querySelector('#box');
wl = new WebLock(document.querySelector('#area'));

var wlinfo = function(str){
    _alert.innerHTML = str;
}
wlinfo('请输入手势密码');

form.addEventListener('click',function(e){
    var v = e.toElement;
    if(v.value == 'set'){
        wl.done(set);
    }else{
        if(_set_password.length == 0){
            wlinfo('没有设置密码');
            return ;
        }
        wl.clear();
        wl.done(check);
    }
});

var set = function(password){
    if(_set_password.length != 0){
        wlinfo('密码已设置,无法重新设置');
        return;
    }

    if(_password.length == 0){
        //还没有输入密码时
        if(password.length < 5){
            wlinfo('密码太短，至少需要5个点');
            return;
        }
        wlinfo('请再次输入手势密码');
        _password = password;
    }else{
        //已经输入了密码，这时需要重复输入密码
        if(!Util.Equals(_password,password)){
            wlinfo('两次密码不一样');
            return ;
        }
        wlinfo('设置成功');
        _set_password = _password;
        storage['password'] = _password;
    }
}

var check = function(password){
    if(_set_password.length == 0){
        wlinfo('密码未设置');
        return;
    }
    if(!Util.Equals(_set_password,password)){
        wlinfo('密码不一致');
        return ;
    }
    wlinfo('密码一致，验证成功');
}

wl.start().done(set);