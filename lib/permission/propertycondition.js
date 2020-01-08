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
        this.name = ""
        this.presence = "forbidden"
        this.check_type = undefined
        this.type = undefined
        this.derived = undefined
        this.check_value = undefined
        this.value = undefined
    }

    static skeleton() {
        var property = new PropertyCondition();
        property.name = ""
        property.presence = "mandatory"
        property.check_type = "ngsi_custom"
        property.derived = "Text"
        property.type = ""
        property.check_value = "equals"
        property.value = ""
        return property;
    }
    check(body) {
        if (body.hasOwnProperty(this.name)) {
            if (this.presence === "forbidden") return false;
            if ((this.check_type === "ngsi_standard") || (this.check_type === "ngsi_custom")) {
                var jsontype= this.check_type === "ngsi_standard" ? typesNGSI[this.type] : typesNGSI[this.derived];
                if (typeof body[this.name] === "object") {
                    if (body[this.name].hasOwnProperty("type") && body[this.name].hasOwnProperty("value")) {
                        if (body[this.name].type!==this.type) return false;
                        if (typeof body[this.name].value !== jsontype) return false;
                    } else {
                        if (jsontype!=="object") return false
                    }
                } else {
                    if (typeof body[this.name] !== jsontype) return false; 
                }
            } else if (this.check_type === "json") {
                if (typeof body[this.name] !== this.type) return false;
            }
            if (this.check_value!=="no") {
                if (typeof body[this.name] === "object") {
                    if (body[this.name].hasOwnProperty("type") && body[this.name].hasOwnProperty("value")) {
                        if (this.check_value==="equals") {
                            if (this.value!==body[this.name].value) return false;
                        }
                        if (this.check_value==="regex") {
                            if (typeof body[this.name].value !== "string") return false;
                            var regex = new RegExp(this.value);
                            var matchs = regex.exec(body[this.name].value);
                            if (matchs===null) return false;
                        }
                        if (this.check_value==="list") {
                            if (!this.value.includes(body[this.name].value)) return false;
                        }
                    } else {
                        if (this.check_value==="regex") return false;
                        if ((this.check_value==="equals") && (body[this.name]!==this.value)) return false;
                        if (this.check_value==="list") {
                            if (!this.value.includes(body[this.name])) return false;
                        }
                    }
                } else {
                    if (this.check_value==="equals") {
                        if (this.value!==body[this.name]) return false;
                    }
                    if (this.check_value==="regex") {
                        if (typeof body[this.name] !== "string") return false;
                        var regex = new RegExp(this.value);
                        var matchs = regex.exec(body[this.name]);
                        if (matchs===null) return false;
                    } 
                    if (this.check_value==="list") {
                        if (!this.value.includes(body[this.name])) return false;
                    }
                }    
            }

        } else {
            if (this.presence === "mandatory") return false;
        }
        return true;
    }

    load(condition, context) {
        this.name = ""
        this.presence = "forbidden"
        this.check_type = undefined
        this.type = undefined
        this.derived = undefined
        this.check_value = undefined
        this.value = undefined
        var good = true;
        context.addGroup(condition.name, "property");
        this.name = context.checkFormatProperty(condition, true, "name", "string", null)
        this.presence = context.checkFormatProperty(condition, true, "presence", "string", ["optional", "mandatory", "forbidden"])
        if (this.presence !== "forbidden") {
            this.check_type = context.checkFormatProperty(condition, true, "check_type", "string", ["no", "ngsi_standard", "ngsi_custom", "json"])
            if (this.check_type !== "no") {
                if (this.check_type === "ngsi_custom") {
                    this.type = context.checkFormatProperty(condition, true, "type", "string", null)
                    this.derived = context.checkFormatProperty(condition, true, "derived", "string", ["Text", "Integer", "Float", "Boolean", "DateTime", "geo:json", "StructuredValue"])
                }
                if (this.check_type === "ngsi_standard") {
                    this.type = context.checkFormatProperty(condition, true, "type", "string", ["Text", "Integer", "Float", "Boolean", "DateTime", "geo:json", "StructuredValue"])
                }
                if (this.check_type === "json") {
                    this.type = context.checkFormatProperty(condition, true, "type", "string", ["object", "number", "string", "boolean", "array"])
                }
            }
            this.check_value = context.checkFormatProperty(condition, true, "check_value", "string", ["no", "equals", "regex", "list"])
            if (good && condition.check_value !== "no") {
                if (this.check_value === "list") {
                    this.value = context.checkFormatProperty(condition, true, "value", "array", null)
                } else {
                    this.value = context.checkFormatProperty(condition, true, "value", null, null)
                }
            }
        }
        context.popGroup();
    }
}