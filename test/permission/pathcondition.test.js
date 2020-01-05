const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var PathCondition = require('../../lib/permission/pathcondition.js')
var context = new ContextCheckFormat();

describe('Test PathCondition', () => {

    it('load : path', () => {
        var pathCondition = new PathCondition();
        var path = {
                value: "/test/go",
                is_regex: true
        }
        expect(() => pathCondition.load(path, context)).to.not.throw()
    });

    it('load : value missing', () => {
        var pathCondition = new PathCondition();
        var path = {
                is_regex: true
        }
        expect(() => pathCondition.load(path, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : value not a string', () => {
        var pathCondition = new PathCondition();
        var path = {
                value: 42,
                is_regex: true
        }
        expect(() => pathCondition.load(path, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : is_regex missing', () => {
        var pathCondition = new PathCondition();
        var path = {
                value: "/test/go"
        }
        expect(() => pathCondition.load(path, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : is_regex not boolean', () => {
        var pathCondition = new PathCondition();
        var path = {
                value: "/test/go",
                is_regex: 42
        }
        expect(() => pathCondition.load(path, context)).to.throw(FormatException).with.property('code', 2);
    });

});