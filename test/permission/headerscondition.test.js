const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var HeadersCondition = require('../../lib/permission/headerscondition.js')
var context = new ContextCheckFormat();

describe('Test HeaderCondition', () => {

    it('load : headers empty', () => {
        var headersCondition = new HeadersCondition();
        var headers = []
        expect(() => headersCondition.load(headers, context)).to.not.throw()
    });
    it('load : headers one header passed', () => {
        var headersCondition = new HeadersCondition();
        var headers = [{
            name: "My-Headers",
            presence: "forbidden"
        }]
        expect(() => headersCondition.load(headers, context)).to.not.throw()
        assert.equal(headersCondition.headers.length,1)
    });
    it('load : headers two header passed', () => {
        var headersCondition = new HeadersCondition();
        var headers = [{
            name: "My-Headers",
            presence: "forbidden"
        },{
            name: "My-Headers2",
            presence: "mandatory",
            check_value: "no"
        }]
        expect(() => headersCondition.load(headers, context)).to.not.throw()
        assert.equal(headersCondition.headers.length,2)
    });
    it('load : headers two header passed, failed', () => {
        var headersCondition = new HeadersCondition();
        var headers = [{
            name: "My-Headers",
            presence: "optional"
        },{
            name: "My-Headers2",
            presence: "mandatory",
            check_value: "no"
        }]
        expect(() => headersCondition.load(headers, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : headers two header failed, passed', () => {
        var headersCondition = new HeadersCondition();
        var headers = [{
            name: "My-Headers",
            presence: "forbidden"
        },{
            name: "My-Headers2",
            presence: "mandatory",
            check_value: "equals"
        }]
        expect(() => headersCondition.load(headers, context)).to.throw(FormatException).with.property('code', 5);
    });
});