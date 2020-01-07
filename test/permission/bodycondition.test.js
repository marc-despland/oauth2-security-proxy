const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var BodyCondition = require('../../lib/permission/bodycondition.js')
var context = new ContextCheckFormat();

describe('Test BodyCondition', () => {

    it('load : permission body minimum', () => {
        var body = new BodyCondition();
        var permission = {
            body: {
                presence: "forbidden"
            }
        }
        expect(() => body.load(permission.body, context)).to.not.throw()
    });

    it('load : permission body not an object', () => {
        var body = new BodyCondition();
        var permission = {
            body: "forbidden"
        }
        expect(() => body.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : permission bodypresence missing', () => {
        var body = new BodyCondition();
        var permission = {
            body: {}
        }
        expect(() => body.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : permission body presence not a string', () => {
        var body = new BodyCondition();
        var permission = {
            body: {
                presence: 42
            }
        }
        expect(() => body.load(permission.body, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : permission body presence not in list', () => {
        var body = new BodyCondition();
        var permission = {
            body: {
                presence: "fox"
            }
        }
        expect(() => body.load(permission.body, context)).to.throw(FormatException).with.property('code', 3);
    });
    it('load : permission body json not an object', () => {
        var body = new BodyCondition();
        var permission = {
            body: {
                presence: "mandatory",
                json: 42
            }
        }
        expect(() => body.load(permission.body, context)).to.throw(FormatException).with.property('code', 2);
    });


    it('load : permission body not forbidden two attributes passed', () => {
        var body = new BodyCondition();
        var permission = {
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
                    name: "test",
                    presence: "forbidden"
                }, {
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "no"
                }]
            }
            }
        }
        expect(() => body.load(permission.body, context)).to.not.throw()
        assert.equal(body.json.id.length, 1)
        assert.equal(body.json.attributes.length, 2)
    });
    it('load : permission body not forbidden two attributes passed invalid attributes', () => {
        var body = new BodyCondition();
        var permission = {
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
                    name: "test",
                    presence: "forbidden"
                }, {
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: 42
                }]
            }
            }
        }
        expect(() => body.load(permission.body, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : permission body not forbidden two attributes passed invalid id', () => {
        var body = new BodyCondition();
        var permission = {
            body: {
                presence: "mandatory",
                json: {
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: 42
                }],
                attributes: [{
                    name: "test",
                    presence: "forbidden"
                }, {
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "no"
                }]
            }
            }
        }
        expect(() => body.load(permission.body, context)).to.throw(FormatException).with.property('code', 2);
    });
});