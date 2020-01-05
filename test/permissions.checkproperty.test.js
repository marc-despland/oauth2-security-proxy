const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions(null, null);

describe('Test Permissions checkProperty format', () => {
    it('method object has property type string', () => {
        var object = {
            test: "ok"
        };
        assert.equal(permissions.checkProperty(object, true, "test", "string", null, ""), true);
    });
    it('method object has property type number', () => {
        var object = {
            test: 2
        };
        assert.equal(permissions.checkProperty(object, true, "test", "number", null, ""), true);
    });
    it('method object has property type boolean', () => {
        var object = {
            test: true
        };
        assert.equal(permissions.checkProperty(object, true, "test", "boolean", null, ""), true);
    });
    it('method object has property type object', () => {
        var object = {
            test: {
                ok: 2
            }
        };
        assert.equal(permissions.checkProperty(object, true, "test", "object", null, ""), true);
    });
    it('method object has property type array', () => {
        var object = {
            test: ["test", 3]
        };
        assert.equal(permissions.checkProperty(object, true, "test", "array", null, ""), true);
    });
    it('method object has property type array but a string', () => {
        var object = {
            test: "ok"
        };
        assert.equal(permissions.checkProperty(object, true, "test", "array", null, ""), false);
    });
    it('method object has property type array but an object', () => {
        var object = {
            test: {
                ok: 2
            }
        };
        assert.equal(permissions.checkProperty(object, true, "test", "array", null, ""), false);
    });
    it('method object has property type in  [string, number]', () => {
        var object = {
            test: 3
        };
        assert.equal(permissions.checkProperty(object, true, "test", ["string", "number"], null, ""), true);
    });
    it('method object has property type not in  [string, number]', () => {
        var object = {
            test: true
        };
        assert.equal(permissions.checkProperty(object, true, "test", ["string", "number"], null, ""), false);
    });
    it('method object has property type string and value is in [ok, ko, none]', () => {
        var object = {
            test: "ok"
        };
        assert.equal(permissions.checkProperty(object, true, "test", "string", ["ok","ko", "none"], ""), true);
    });
    it('method object has property no type set and value is in [ok, ko, none]', () => {
        var object = {
            test: "ok"
        };
        assert.equal(permissions.checkProperty(object, true, "test", null, ["ok","ko", "none"], ""), true);
    });
    it('method object has property no type set and value is not in [ok, ko, none]', () => {
        var object = {
            test: "good"
        };
        assert.equal(permissions.checkProperty(object, true, "test", null, ["ok","ko", "none"], ""), false);
    });
    it('method object has property no type set and value equals good', () => {
        var object = {
            test: "good"
        };
        assert.equal(permissions.checkProperty(object, true, "test", null, "good", ""), true);
    });
    it('method object has property no type set and value equals 42', () => {
        var object = {
            test: 42
        };
        assert.equal(permissions.checkProperty(object, true, "test", null, 42, ""), true);
    });
    it('method object has property no type set and value equals 42 but wrong', () => {
        var object = {
            test: 43
        };
        assert.equal(permissions.checkProperty(object, true, "test", null, 42, ""), false);
    });
    it('method object has not property but mandatory', () => {
        var object = {
            test: 43
        };
        assert.equal(permissions.checkProperty(object, true, "wrong", null, 43, ""), false);
    });
    it('method object has not property and not mandatory', () => {
        var object = {
            test: 43
        };
        assert.equal(permissions.checkProperty(object, false, "wrong", null, 43, ""), true);
    });

});
