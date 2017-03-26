var Util = require('../src/Util.js');
var expect = require('chai').expect;

describe('util测试',function(){
    it('styless测试',function(){
        var style = {
            left:'10px',
            top:'20px'  
        };

        var style_str = Util.styless(style);
        expect(style_str).to.equal('left:10px;top:20px;');
    });
    
});