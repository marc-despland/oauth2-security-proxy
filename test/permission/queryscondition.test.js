const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var QuerysCondition = require('../../lib/permission/queryscondition.js')
var context = new ContextCheckFormat();

describe('Test QueryCondition', () => {

    it('load : querys empty', () => {
        var querysCondition = new QuerysCondition();
        var querys = []
        expect(() => querysCondition.load(querys, context)).to.not.throw()
    });
    it('load : querys one query passed', () => {
        var querysCondition = new QuerysCondition();
        var querys = [{
            name: "My-Querys",
            presence: "forbidden"
        }]
        expect(() => querysCondition.load(querys, context)).to.not.throw()
        assert.equal(querysCondition.querys.length,1)
    });
    it('load : querys two query passed', () => {
        var querysCondition = new QuerysCondition();
        var querys = [{
            name: "My-Querys",
            presence: "forbidden"
        },{
            name: "My-Querys2",
            presence: "mandatory",
            check_value: "no"
        }]
        expect(() => querysCondition.load(querys, context)).to.not.throw()
        assert.equal(querysCondition.querys.length,2)
    });
    it('load : querys two query passed, failed', () => {
        var querysCondition = new QuerysCondition();
        var querys = [{
            name: "My-Querys",
            presence: "optional"
        },{
            name: "My-Querys2",
            presence: "mandatory",
            check_value: "no"
        }]
        expect(() => querysCondition.load(querys, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : querys two query failed, passed', () => {
        var querysCondition = new QuerysCondition();
        var querys = [{
            name: "My-Querys",
            presence: "forbidden"
        },{
            name: "My-Querys2",
            presence: "mandatory",
            check_value: "equals"
        }]
        expect(() => querysCondition.load(querys, context)).to.throw(FormatException).with.property('code', 5);
    });
});