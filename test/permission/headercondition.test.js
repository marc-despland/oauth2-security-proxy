const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var HeaderCondition = require('../../lib/permission/headercondition.js')
var context = new ContextCheckFormat();

describe('Test HeaderCondition', () => {

    it('load : header empty', () => {
        var headerCondition = new HeaderCondition();
        var header = {}
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : header one header passed', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "forbidden"
        }
        expect(() => headerCondition.load(header, context)).to.not.throw()
    });
    it('load : header one header missing name', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            presence: "forbidden"
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : header one header name not a string', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: 54,
            presence: "forbidden"
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : header one header missing presence', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers"
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : header one header presence not in list', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "cors"
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 3);
    });

    it('load : header one header not forbidden passed', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional",
            check_value: "no"
        }
        expect(() => headerCondition.load(header, context)).to.not.throw()
    });
    it('load : header one header not forbidden missing check_value', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional"
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : header one header not forbidden check_value not a string', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional",
            check_value: 53
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : header one header not forbidden check_value not in list', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional",
            check_value: "echo"
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 3);
    });

    it('load : header one header not forbidden check_value not no passed', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional",
            check_value: "equals",
            value: "test"
        }
        expect(() => headerCondition.load(header, context)).to.not.throw()
    });
    it('load : header one header not forbidden check_value not no value missing', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional",
            check_value: "equals"
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : header one header not forbidden check_value equals value not a string', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional",
            check_value: "equals",
            value: 42
        }
        expect(() => headerCondition.load(header, context)).to.not.throw()
    });
    it('load : header one header not forbidden check_value regex value not a string', () => {
        var headerCondition = new HeaderCondition();
        var header = {
            name: "My-Headers",
            presence: "optional",
            check_value: "regex",
            value: 42
        }
        expect(() => headerCondition.load(header, context)).to.throw(FormatException).with.property('code', 2);
    });

});