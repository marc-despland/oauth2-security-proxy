'use strict';
var typesNGSI = {
    "Text": "string",
    "Integer": "number",
    "Float": "number",
    "Boolean": "boolean",
    "DateTime": "string",
    "geo:json": "object",
    "StructuredValue": "object"
}
//var ContextCheckFormat = require('./contextcheckformat.js')

module.exports = class PropertyCondition {
    constructor() {
        this.name= ""
        this.presence= "forbidden"
        this.check_type=undefined
        this.type=undefined
        this.derived=undefined
        this.check_value= undefined
        this.value=undefined
    }

    load(condition, context) {
        this.name= ""
        this.presence= "forbidden"
        this.check_type=undefined
        this.type=undefined
        this.derived=undefined
        this.check_value= undefined
        this.value=undefined
        var good = true;
        context.addGroup(condition.name, "property");
        this.name=context.checkFormatProperty( condition, true, "name", "string", null)
        this.presence=context.checkFormatProperty( condition, true, "presence", "string", ["optional", "mandatory", "forbidden"])
        if (this.presence !== "forbidden") {
            this.check_type=context.checkFormatProperty( condition, true, "check_type", "string", ["no", "ngsi_standard", "ngsi_custom", "json"])
            if (this.check_type !== "no") {
                if (this.check_type === "ngsi_custom") {
                    this.type=context.checkFormatProperty( condition, true, "type", "string", null)
                    this.derived=context.checkFormatProperty( condition, true, "derived", "string", ["Text", "Integer", "Float", "Boolean", "DateTime", "geo:json", "StructuredValue"])
                }
                if (this.check_type === "ngsi_standard") {
                    this.type=context.checkFormatProperty( condition, true, "type", "string", ["Text", "Integer", "Float", "Boolean", "DateTime", "geo:json", "StructuredValue"])
                }
                if (this.check_type === "json") {
                    this.type=context.checkFormatProperty( condition, true, "type", "string", ["object", "number", "string", "boolean", "array"])
                }
            }
            this.check_value=context.checkFormatProperty( condition, true, "check_value", "string", ["no", "equals", "regex", "list"])
            if (good && condition.check_value !== "no") {
                if (this.check_value === "list") {
                    this.value=context.checkFormatProperty( condition, true, "value", "array", null)
                } else {
                    this.value=context.checkFormatProperty( condition, true, "value", null, null)
                }
            }
        }
        context.popGroup();
    }
}