'use strict';
var FormatException  = require('./formatexception.js')
module.exports = class ContextCheckFormat {
    constructor() {
        this.path = [];
        this.verbose = false;
    }
    setVerbose(value) {
        this.verboce = (value == true)
    }
    addGroup(name, type) {
        this.path.push(name === undefined ? type : name);
    }

    prefix() {
        var result = "";
        this.path.forEach(path => {
            result += ">" + path;
        })
        return result + "\t: ";
    }

    popGroup() {
        this.path.pop();
    }

    error(code, prefix, message) {
        var result={
            code: code,
            prefix: prefix,
            message: message
        }
        return result;
    }

    checkFormatProperty(object, mandatory, property, type, value) {
        var goodtypes = [];
        if (type !== null) {
            if (typeof type === "object" && type.length !== undefined) {
                goodtypes = type;
            } else {
                goodtypes.push(type);
            }
        }
        if (object.hasOwnProperty(property)) {
            if (type !== null) {
                if (type === "array") {
                    if ((typeof object[property] !== "object") || (object[property].length === undefined)) {
                        if (this.verbose) console.log(this.prefix() + "property " + property + " is not an array");
                        throw new FormatException(1, this.prefix(), "property " + property + " is not an array");
                    }
                } else {
                    if (!goodtypes.includes(typeof object[property])) {
                        if (this.verbose) console.log(this.prefix() + "property " + property + "  is not of type " + JSON.stringify(goodtypes));
                        throw new FormatException(2, this.prefix(), "property " + property + "  is not of type " + JSON.stringify(goodtypes));
                    }
                }
            }
            if (value !== null) {
                if (typeof value === "object" && value.length !== undefined) {
                    if (!value.includes(object[property])) {
                        if (this.verbose) console.log(this.prefix() + "property " + property + " value " + object[property] + " not in  " + JSON.stringify(value));
                        throw new FormatException(3, this.prefix(), "property " + property + " value " + object[property] + " not in  " + JSON.stringify(value))
                    }
                } else if (object[property] !== value) {
                    if (this.verbose) console.log(this.prefix() + "property " + property + " value " + object[property] + " different of " + value);
                    throw new FormatException(4, this.prefix(), "property " + property + " value " + object[property] + " different of " + value)
                }
            }
            return object[property]
        } else {
            if (mandatory) {
                if (this.verbose) console.log(this.prefix() + "property " + property + " missing");
                throw new FormatException(5, this.prefix(), "property " + property + " missing")
            }
            return undefined;
        }
    }
}