const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions(null, null);

describe('Test Permissions checkWebConditionFormat', () => {
    it('condition minimum', () => {
        var condition = {
            name: "GET",
            presence: "forbidden"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), true);
    });
    it('condition minimum missing name', () => {
        var condition = {
            presence: "forbidden"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition minimum  name not a string', () => {
        var condition = {
            name: 2,
            presence: "forbidden"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition minimum presence not in list', () => {
        var condition = {
            name: "GET",
            presence: "good"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition minimum presence not a string', () => {
        var condition = {
            name: "GET",
            presence: 3
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden minimum', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), true);
    });
    it('condition presence not a forbidden minimum missing check_type', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden minimum missing check_value', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden minimum check_type not a string', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: 2,
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden minimum check_type not in list', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: "good",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden minimum check_value not a string', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: "no",
            check_value: 2
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden minimum check_value not in list', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type: "no",
            check_value: "good"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_type ngsi_custom', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: "MyType",
            derived: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), true);
    });
    it('condition presence not a forbidden check_type ngsi_custom invalid derived type', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: "MyType",
            derived: "blob",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_type ngsi_custom type not a string', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: 42,
            derived: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_type ngsi_custom derived not a string', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_custom",
            type: "test",
            derived: 42,
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_type ngsi_standard', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_standard",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), true);
    });
    it('condition presence not a forbidden check_type ngsi_standard type not in list', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_standard",
            type: "string",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_type ngsi_standard type not a string', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"ngsi_standard",
            type: 42,
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_type json', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"json",
            type: "string",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), true);
    });
    it('condition presence not a forbidden check_type json type not in list', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"json",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_type json type not a string', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"json",
            type: 42,
            check_value: "no"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_value list', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "list",
            value: [10,12]
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), true);
    });
    it('condition presence not a forbidden check_value list value missing', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "list"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_value list value not an array', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "list",
            value: "test"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
    it('condition presence not a forbidden check_value equals', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "equals",
            value: 12
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), true);
    });
    it('condition presence not a forbidden check_value equals value missing', () => {
        var condition = {
            name: "GET",
            presence: "mandatory", 
            check_type:"no",
            check_value: "equals"
        }
        assert.equal(permissions.checkWebConditionFormat(condition, ""), false);
    });
});
