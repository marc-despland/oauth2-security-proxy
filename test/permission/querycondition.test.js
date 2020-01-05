const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var QueryCondition = require('../../lib/permission/querycondition.js')
var context = new ContextCheckFormat();

describe('Test QueryCondition', () => {

    it('load : query empty', () => {
        var queryCondition = new QueryCondition();
        var query = {}
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : query one query passed', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "forbidden"
        }
        expect(() => queryCondition.load(query, context)).to.not.throw()
    });
    it('load : query one query missing name', () => {
        var queryCondition = new QueryCondition();
        var query = {
            presence: "forbidden"
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : query one query name not a string', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: 54,
            presence: "forbidden"
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : query one query missing presence', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys"
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : query one query presence not in list', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "cors"
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 3);
    });

    it('load : query one query not forbidden passed', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional",
            check_value: "no"
        }
        expect(() => queryCondition.load(query, context)).to.not.throw()
    });
    it('load : query one query not forbidden missing check_value', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional"
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : query one query not forbidden check_value not a string', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional",
            check_value: 53
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : query one query not forbidden check_value not in list', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional",
            check_value: "echo"
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 3);
    });

    it('load : query one query not forbidden check_value not no passed', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional",
            check_value: "equals",
            value: "test"
        }
        expect(() => queryCondition.load(query, context)).to.not.throw()
    });
    it('load : query one query not forbidden check_value not no value missing', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional",
            check_value: "equals"
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : query one query not forbidden check_value equals value not a string', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional",
            check_value: "equals",
            value: 42
        }
        expect(() => queryCondition.load(query, context)).to.not.throw()
    });
    it('load : query one query not forbidden check_value regex value not a string', () => {
        var queryCondition = new QueryCondition();
        var query = {
            name: "My-Querys",
            presence: "optional",
            check_value: "regex",
            value: 42
        }
        expect(() => queryCondition.load(query, context)).to.throw(FormatException).with.property('code', 2);
    });

});