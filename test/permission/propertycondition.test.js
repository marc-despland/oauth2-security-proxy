const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var PropertyCondition = require('../../lib/permission/propertycondition.js')
var context = new ContextCheckFormat();

describe('Test PropertyCondition', () => {
    it('load : condition minimum', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "forbidden"
        }
        expect(() =>property.load(condition, context)).to.not.throw()
    });
    it('load : condition minimum missing name', () => {
        var property=new PropertyCondition();
        var condition = {
            presence: "forbidden"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : condition minimum  name not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: 2,
            presence: "forbidden"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition minimum presence not in list', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "good"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 3);
    });
    it('load : condition minimum presence not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: 3
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition presence not a forbidden minimum', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.not.throw()
    });
    it('load : condition presence not a forbidden minimum missing check_type', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : condition presence not a forbidden minimum missing check_value', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : condition presence not a forbidden minimum check_type not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: 2,
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition presence not a forbidden minimum check_type not in list', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: "good",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 3);
    });
    it('load : condition presence not a forbidden minimum check_value not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: "no",
            check_value: 2
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition presence not a forbidden minimum check_value not in list', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: "no",
            check_value: "good"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 3);
    });
    it('load : condition presence not a forbidden check_type ngsi_custom', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: "MyType",
            derived: "Text",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.not.throw()
    });
    it('load : condition presence not a forbidden check_type ngsi_custom invalid derived type', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: "MyType",
            derived: "blob",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 3);
    });
    it('load : condition presence not a forbidden check_type ngsi_custom type not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: 42,
            derived: "Text",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition presence not a forbidden check_type ngsi_custom derived not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: "test",
            derived: 42,
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition presence not a forbidden check_type ngsi_standard', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_standard",
            type: "Text",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.not.throw()
    });
    it('load : condition presence not a forbidden check_type ngsi_standard type not in list', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_standard",
            type: "string",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 3);
    });
    it('load : condition presence not a forbidden check_type ngsi_standard type not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_standard",
            type: 42,
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition presence not a forbidden check_type json', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"json",
            type: "string",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.not.throw()
    });
    it('load : condition presence not a forbidden check_type json type not in list', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"json",
            type: "Text",
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 3);
    });
    it('load : condition presence not a forbidden check_type json type not a string', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"json",
            type: 42,
            check_value: "no"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : condition presence not a forbidden check_value list', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "list",
            value: [10,12]
        }
        expect(() =>property.load(condition, context)).to.not.throw()
    });
    it('load : condition presence not a forbidden check_value list value missing', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "list"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : condition presence not a forbidden check_value list value not an array', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "list",
            value: "test"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 1);
    });
    it('load : condition presence not a forbidden check_value equals', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "equals",
            value: 12
        }
        expect(() =>property.load(condition, context)).to.not.throw()
    });
    it('load : condition presence not a forbidden check_value equals value missing', () => {
        var property=new PropertyCondition();
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "equals"
        }
        expect(() =>property.load(condition, context)).to.throw(FormatException).with.property('code', 5);
    });
});
