const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var Permission = require('../../lib/permission/permission.js')
var context = new ContextCheckFormat();

describe('Test Permission', () => {

    it('load : full condition', () => {
        var permissionCondition = new Permission();
        var permission = {
            name: "test",
            permission: "myid",
            request: {
                method: "GET",
                path: {
                    value: "/test/go",
                    is_regex: true
                },
                query: [{
                    name: "q",
                    presence: "forbidden"
                }],
                headers: [{
                    name: "Content-Length",
                    presence: "mandatory",
                    check_value: "no"
                }],
                body: {
                    presence: "mandatory",
                    json: {
                        id: [{
                            name: "id",
                            presence: "mandatory",
                            check_type: "no",
                            check_value: "no"
                        }],
                        attributes: [{
                            name: "type",
                            presence: "mandatory",
                            check_type: "no",
                            check_value: "no"
                        }]
                    }
                }
            }
        }
        expect(() => permissionCondition.load(permission, context)).to.not.throw()
        assert.notStrictEqual(permissionCondition.request.method, undefined)
        assert.notStrictEqual(permissionCondition.request.path, undefined)
        assert.notStrictEqual(permissionCondition.request.querys, undefined)
        assert.notStrictEqual(permissionCondition.request.headers, undefined)
        assert.notStrictEqual(permissionCondition.request.body, undefined)
    });


    it('load : minimal condition', () => {
        var permissionCondition = new Permission();
        var permission = {
            name: "test",
            permission: "myid"
        }
        expect(() => permissionCondition.load(permission, context)).to.not.throw()
        assert.strictEqual(permissionCondition.request, undefined)

    });

    it('load : missing name', () => {
        var permissionCondition = new Permission();
        var permission = {
            permission: "myid"
        }
        expect(() => permissionCondition.load(permission, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : name not a string', () => {
        var permissionCondition = new Permission();
        var permission = {
            name: 42,
            permission: "myid"
        }
        expect(() => permissionCondition.load(permission, context)).to.throw(FormatException).with.property('code', 2);
    });

    it('load : missing permission', () => {
        var permissionCondition = new Permission();
        var permission = {
            name: "test"
        }
        expect(() => permissionCondition.load(permission, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : permission not a string', () => {
        var permissionCondition = new Permission();
        var permission = {
            name: "test",
            permission: 42
        }
        expect(() => permissionCondition.load(permission, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : request not an object', () => {
        var permissionCondition = new Permission();
        var permission = {
            name: "test",
            permission: "myid",
            request: true
        }
        expect(() => permissionCondition.load(permission, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : wrong condition', () => {
        var permissionCondition = new Permission();
        var permission = {
            name: "test",
            permission: "myid",
            request: {
                method: "GET",
                path: {
                    value: "/test/go",
                    is_regex: true
                },
                query: [{
                    name: "q",
                    presence: "forbidden"
                }],
                headers: [{
                    name: "Content-Length",
                    presence: "mandatory",
                    check_value: "no"
                }],
                body: {
                    presence: "mandatory",
                    json: {
                        id: [{
                            name: "id",
                            presence: "mandatory",
                            check_type: "no",
                            check_value: "no"
                        }],
                        attributes: [{
                            name: "type",
                            presence: "mandatory",
                            check_type: "no",
                            check_value: false
                        }]
                    }
                }
            }
        }
        expect(() => permissionCondition.load(permission, context)).to.throw(FormatException).with.property('code', 2);

    });

});