const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var context = new ContextCheckFormat();

describe('Class ContextCheckFormat', () => {
    it('prefix', () => {
        assert.equal(context.prefix(), "\t: ");
        context.addGroup(undefined, "path");
        assert.equal(context.prefix(), ">path\t: ");
        context.addGroup("fox", "path");
        assert.equal(context.prefix(), ">path>fox\t: ");
        context.popGroup();
        assert.equal(context.prefix(), ">path\t: ");
        context.popGroup();
        assert.equal(context.prefix(), "\t: ");
    });

    it('checkFormatProperty > method object has property type string', () => {
        var object = {
            test: "ok"
        };
        expect(() =>context.checkFormatProperty(object, true, "test", "string", null)).to.not.throw()
    });
    it('checkFormatProperty > method object has property type number', () => {
        var object = {
            test: 2
        };
        expect(() =>context.checkFormatProperty(object, true, "test", "number", null)).to.not.throw()
    });
    it('checkFormatProperty > method object has property type boolean', () => {
        var object = {
            test: true
        };
        expect(() =>context.checkFormatProperty(object, true, "test", "boolean", null)).to.not.throw()
    });
    it('checkFormatProperty > method object has property type object', () => {
        var object = {
            test: {
                ok: 2
            }
        };
        expect(() =>context.checkFormatProperty(object, true, "test", "object", null)).to.not.throw()
    });
    it('checkFormatProperty > method object has property type array', () => {
        var object = {
            test: ["test", 3]
        };
        expect(() =>context.checkFormatProperty(object, true, "test", "array", null)).to.not.throw()
    });
    it('checkFormatProperty > method object has property type array but a string', () => {
        var object = {
            test: "ok"
        };
        var error = {
            code: 1
        }
        expect(() =>context.checkFormatProperty(object, true, "test", "array", null)).to.throw(FormatException).with.property('code', 1);
    });
    it('checkFormatProperty > method object has property type array but an object', () => {
        var object = {
            test: {
                ok: 2
            }
        };
        expect(() =>context.checkFormatProperty(object, true, "test", "array", null)).to.throw(FormatException).with.property('code', 1);
    });
    it('checkFormatProperty > method object has property type in  [string, number]', () => {
        var object = {
            test: 3
        };
        expect(() =>context.checkFormatProperty(object, true, "test", ["string", "number"], null)).to.not.throw()
    });
    it('checkFormatProperty > method object has property type not in  [string, number]', () => {
        var object = {
            test: true
        };
        expect(() =>context.checkFormatProperty(object, true, "test", ["string", "number"], null)).to.throw(FormatException).with.property('code', 2);
    });
    it('checkFormatProperty > method object has property type string and value is in [ok, ko, none]', () => {
        var object = {
            test: "ok"
        };
        expect(() =>context.checkFormatProperty(object, true, "test", "string", ["ok","ko", "none"])).to.not.throw()
    });
    it('checkFormatProperty > method object has property no type set and value is in [ok, ko, none]', () => {
        var object = {
            test: "ok"
        };
        expect(() =>context.checkFormatProperty(object, true, "test", null, ["ok","ko", "none"])).to.not.throw()
    });
    it('checkFormatProperty > method object has property no type set and value is not in [ok, ko, none]', () => {
        var object = {
            test: "good"
        };
        expect(() =>context.checkFormatProperty(object, true, "test", null, ["ok","ko", "none"])).to.throw(FormatException).with.property('code', 3);
    });
    it('checkFormatProperty > method object has property no type set and value equals good', () => {
        var object = {
            test: "good"
        };
        expect(() =>context.checkFormatProperty(object, true, "test", null, "good")).to.not.throw()
    });
    it('checkFormatProperty > method object has property no type set and value equals 42', () => {
        var object = {
            test: 42
        };
        expect(() =>context.checkFormatProperty(object, true, "test", null, 42)).to.not.throw()
    });
    it('checkFormatProperty > method object has property no type set and value equals 42 but wrong', () => {
        var object = {
            test: 43
        };
        expect(() =>context.checkFormatProperty(object, true, "test", null, 42)).to.throw(FormatException).with.property('code', 4);
    });
    it('checkFormatProperty > method object has not property but mandatory', () => {
        var object = {
            test: 43
        };
        expect(() =>context.checkFormatProperty(object, true, "wrong", null, 43)).to.throw(FormatException).with.property('code', 5);
    });
    it('checkFormatProperty > method object has not property and not mandatory', () => {
        var object = {
            test: 43
        };
        expect(() =>context.checkFormatProperty(object, false, "wrong", null, 43)).to.not.throw()
    });

});