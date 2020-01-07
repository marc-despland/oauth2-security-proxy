'use strict';
const fs = require('fs');
var Roles = require('./roles.js');
var ContextCheckFormat = require('./lib/permission/contextcheckformat.js')
var FormatException = require('./lib/permission/formatexception.js')
var Permission = require('./lib/permission/permission.js')

var debug = false;

var typesNGSI = {
    "Text": "string",
    "Integer": "number",
    "Float": "number",
    "Boolean": "boolean",
    "DateTime": "string",
    "geo:json": "object",
    "StructuredValue": "object"
}

module.exports = class Permissions {

    constructor(folder, roles) {
        this.permissions = {};
        this.roles = roles;
    }

    load(folder) {
        try {
            this.readFolder(folder);
            return true;
        } catch (formatException) {
            console.log("Invalid permission format : "+formatException.code)
            console.log(formatException.prefix+formatException.message)
            return false;
        }
    }
    readFolder(folder) {
        var option = {
            withFileTypes: true
        }
        var files = fs.readdirSync(folder, option);
        if (debug) console.log("Files : " + JSON.stringify(files, null, 4))
        files.forEach(file => {
            if (file.isDirectory()) {
                if (file.name !== "." && file.name !== "..") {
                    this.readFolder(folder + "/" + file.name);
                }
            } else if (file.isFile() && file.name.endsWith(".json")) {
                this.readPermissionFile(folder + "/" + file.name);
            }
        })
    }

    readPermissionFile(file) {
        try {
            let rawdata = fs.readFileSync(file);
            var permission = JSON.parse(rawdata);
        } catch (exceptio) {
            if (debug) console.log("Failed to load permission from file " + file);
            throw new FormatException(6, "", "Failed to load permission from file " + file);
        }
        var context = new ContextCheckFormat();
        var perm=new Permission();
        perm.load(permission, context)
        this.permissions[perm.permission]=perm;
    }


    loadPermission(permid, permission) {
        this.permissions[permid] = permission;
    }

    checkPermissionsFormat() {
        var good = true;
        for (var permission in this.permissions) {
            good &= this.checkPermissionFormat(this.permissions[permission]);
        }
        return (good == true);
    }

    authorizeRequest(request, roles) {
        if (debug) console.log("authorizeRequest roles" + JSON.stringify(roles));
        var authorized = [];
        var list = this.roles.permissionsList(roles);
        if (debug) console.log("authorizeRequest permissionsList" + JSON.stringify(list));
        list.forEach(permid => {
            if (debug) console.log("authorizeRequest : permid=" + permid)
            if (this.checkPermissionRequest(request, permid)) {
                authorized.push(permid);
            }
        })
        if (debug) console.log("authorizeRequest authorized" + JSON.stringify(authorized));
        return authorized;
    }

    checkPermissionRequest(request, permid) {
        var check = false;
        if (debug) console.log("checkPermissionRequest")
        try {
            if (this.permissions.hasOwnProperty(permid)) {
                var permission = this.permissions[permid];
                if (permission.hasOwnProperty("request")) {
                    var forbidden = false;
                    if (debug) console.log("\tcheckPermissionRequest checking the request")
                    forbidden = forbidden || !this.checkMethod(request, permission.request);
                    if (debug) console.log("\tcheckPermissionRequest method:" + !forbidden)
                    forbidden = forbidden || !this.checkPath(request, permission.request)
                    if (debug) console.log("\tcheckPermissionRequest path:" + !forbidden)
                    forbidden = forbidden || !this.checkHeaders(request, permission.request)
                    if (debug) console.log("\tcheckPermissionRequest headers:" + !forbidden)
                    forbidden = forbidden || !this.checkQuery(request, permission.request)
                    if (debug) console.log("\tcheckPermissionRequest query:" + !forbidden)
                    forbidden = forbidden || !this.checkBody(request.data, permission.request)
                    if (debug) console.log("\tcheckPermissionRequest Body:" + !forbidden)

                    check = !forbidden;
                } else {
                    if (debug) console.log("\tcheckPermissionRequest no request property")
                    check = true;
                }
            }
        } catch (error) {
            check = false;
        }
        if (debug) console.log("checkPermissionRequest result:" + check)
        return check;
    }

    checkMethod(request, permission) {
        if (debug) console.log("\tcheckMethod")
        if (!permission.hasOwnProperty("method")) return true;
        return (request.method === permission.method);
    }


    checkPath(request, permission) {
        if (debug) console.log("\tcheckPath")
        if (!permission.hasOwnProperty("path")) return true;
        if (!permission.path.hasOwnProperty("value")) return false;
        if (!permission.path.hasOwnProperty("is_regex")) return false;
        if (permission.path.is_regex) {
            var regex = new RegExp(permission.path.value);
            var matchs = regex.exec(request.path);
            if (debug) console.log("\tcheckPath " + JSON.stringify(matchs))
            return (matchs !== null);
        } else {
            return (request.path === permission.path.value);
        }
    }
    checkHeaders(request, permission) {
        if (debug) console.log("\tcheckHeaders")
        if (!permission.hasOwnProperty("headers")) return true;
        //try {
        var length = permission.headers.length;
        if (length === undefined) return false;
        var forbidden = false;
        var index = 0;
        while (!forbidden && index < length) {
            if (!forbidden && !permission.headers[index].hasOwnProperty("name")) forbidden = true;
            if (!forbidden && !permission.headers[index].hasOwnProperty("check_value")) forbidden = true;
            if (!forbidden && !permission.headers[index].hasOwnProperty("presence")) forbidden = true;
            if (!forbidden) {
                if (request.headers.hasOwnProperty(permission.headers[index].name.toLowerCase())) {
                    if (permission.headers[index].check_value !== "no") {
                        if (!permission.headers[index].hasOwnProperty("value")) forbidden = true;
                        if (!forbidden) {
                            if (permission.headers[index].check_value == "regex") {
                                var regex = new RegExp(permission.headers[index].value);
                                var matchs = regex.exec(request.headers[permission.headers[index].name.toLowerCase()]);
                                forbidden = (matchs === null);
                            } else {
                                forbidden = (request.headers[permission.headers[index].name.toLowerCase()] !== permission.headers[index].value);
                            }
                        }
                    }
                } else {
                    if (permission.headers[index].presence === "mandatory") forbidden = true;
                    if (debug) console.log("\tcheckHeaders header not found : " + !forbidden)
                }
            }
            index++;
        }
        return !forbidden;
        /* } catch (Error) {
             if (debug) console.log("\tcheckHeaders something wrong append "+JSON.stringify(Error))
             return false;
         }*/
    }

    checkQuery(request, permission) {
        if (debug) console.log("\tcheckQuery")
        if (!permission.hasOwnProperty("query")) return true;
        //try {
        var length = permission.query.length;
        if (length === undefined) return false;
        var forbidden = false;
        var index = 0;
        while (!forbidden && index < length) {
            if (!forbidden && !permission.query[index].hasOwnProperty("name")) forbidden = true;
            if (!forbidden && !permission.query[index].hasOwnProperty("presence")) forbidden = true;
            if (!forbidden) {
                if (request.query.hasOwnProperty(permission.query[index].name.toLowerCase())) {
                    if (permission.query[index].presence !== "forbidden") {
                        if (!forbidden && !permission.query[index].hasOwnProperty("check_value")) forbidden = true;
                        if (!forbidden && permission.query[index].check_value !== "no") {
                            if (!permission.query[index].hasOwnProperty("value")) forbidden = true;
                            if (!forbidden) {
                                if (permission.query[index].check_value === "regex") {
                                    var regex = new RegExp(permission.query[index].value);
                                    var matchs = regex.exec(request.query[permission.query[index].name.toLowerCase()]);
                                    forbidden = (matchs === null);
                                } else {
                                    forbidden = (request.query[permission.query[index].name.toLowerCase()] !== permission.query[index].value);
                                }
                            }
                        }
                    } else {
                        forbidden = true;
                    }
                } else {
                    if (permission.query[index].presence === "mandatory") forbidden = true;
                    if (debug) console.log("checkQuery query not found : " + !forbidden + " " + permission.query[index].presence)
                }
            }
            index++;
        }
        return !forbidden;
        /* } catch (Error) {
             if (debug) console.log("\tcheckQuery something wrong append "+JSON.stringify(Error))
             return false;
         }*/
    }
    /*
    "name": "id",
                    "is_mandatory" : true,
                    "check_type": true,
                    "type" : "Integer",
                    "check_value": true,
                    "value": "monid",
                    "is_regex": true 
                    */

    checkBody(body, permission) {
        if (debug) console.log("\tcheckBody")
        if (!permission.hasOwnProperty("body")) return true;
        if (!permission.body.hasOwnProperty("presence")) return false;
        var forbidden = false;
        if ((body === undefined) || (body === "")) {
            //no body
            if (permission.body.presence === "mandatory") return false;
        } else {
            if (permission.body.presence === "forbidden") return false;
            if (!permission.body.hasOwnProperty("id")) return true;
            var length = permission.body.id.length;
            if (length === undefined) return false;
            var index = 0;
            while (!forbidden && index < length) {
                var condition = permission.body.id[index];
                forbidden = !this.checkBodyCondition(body, condition);
                index++;
            }
            if (!forbidden) {
                if (!permission.body.hasOwnProperty("attributes")) return true;
                length = permission.body.attributes.length;
                if (length === undefined) return false;
                var index = 0;
                while (!forbidden && index < length) {
                    var condition = permission.body.attributes[index];
                    forbidden = !this.checkBodyCondition(body, condition);
                    index++;
                }
            }
        }
        return !forbidden;
    }



    checkBodyCondition(body, condition) {
        var forbidden = false;
        if (!condition.hasOwnProperty("name")) forbidden = true;
        if (!forbidden && !condition.hasOwnProperty("presence")) forbidden = true;
        if (!forbidden) {
            if (body.hasOwnProperty(condition.name)) {
                if (condition.presence === "forbidden") forbidden = true;
                if (!forbidden && !condition.hasOwnProperty("check_type")) forbidden = true;
                if (!forbidden && !condition.hasOwnProperty("check_value")) forbidden = true;
                if (!forbidden) {
                    forbidden = !this.checkAttributeType(body[condition.name], condition);
                    if (!forbidden && condition.check_value == "regex") {
                        if (!forbidden && !condition.hasOwnProperty("value")) forbidden = true;
                        if (!forbidden) {
                            if ((typeof body[condition.name] === "object") && (body[condition.name].hasOwnProperty("value")) && (body[condition.name].hasOwnProperty("type"))) {
                                if (typeof body[condition.name].value === "string") {
                                    var regex = new RegExp(condition.value);
                                    var matchs = regex.exec(body[condition.name].value);
                                    forbidden = (matchs === null);
                                } else {
                                    forbidden = true;
                                }
                            } else {
                                if (typeof body[condition.name] === "string") {
                                    var regex = new RegExp(condition.value);
                                    var matchs = regex.exec(body[condition.name]);
                                    forbidden = (matchs === null);
                                } else {
                                    forbidden = true;
                                }
                            }
                        }
                    }
                    if (!forbidden && condition.check_value == "equals") {
                        if (!forbidden && !condition.hasOwnProperty("value")) forbidden = true;
                        if (!forbidden) {
                            if ((typeof body[condition.name] === "object") && (body[condition.name].hasOwnProperty("value")) && (body[condition.name].hasOwnProperty("type"))) {
                                forbidden = (body[condition.name].value !== condition.value);
                            } else {
                                forbidden = (body[condition.name] !== condition.value)
                            }
                        }
                    }
                    if (!forbidden && condition.check_value == "list") {
                        if (!forbidden && !condition.hasOwnProperty("value")) forbidden = true;
                        if (!forbidden && !condition.value.lenght === undefined) forbidden = true;
                        if (!forbidden) {
                            if ((typeof body[condition.name] === "object") && (body[condition.name].hasOwnProperty("value")) && (body[condition.name].hasOwnProperty("type"))) {
                                forbidden = (!condition.value.includes(body[condition.name].value));
                            } else {
                                forbidden = (!condition.value.includes(body[condition.name]));
                            }
                        }
                    }
                }
            } else {
                if (condition.presence === "mandatory") forbidden = true;
            }
        }
        return !forbidden;
    }


    checkAttributeType(attribute, condition) {
        if (condition.check_type === "no") return true;
        if (condition.check_type === "ngsi_standard") {
            if (!condition.hasOwnProperty("type")) return false;
            var type = typeof attribute;
            var jsontype = typesNGSI[condition.type]
            if ((type === "object") && (attribute.hasOwnProperty("value")) && (attribute.hasOwnProperty("type"))) {
                return ((typeof attribute.value === jsontype) && (attribute.type === condition.type));
            }
            if (type === jsontype) return true
        }
        if (condition.check_type === "ngsi_custom") {
            if (!condition.hasOwnProperty("type")) return false;
            if (!condition.hasOwnProperty("derived")) return false;
            var type = typeof attribute;
            var jsontype = typesNGSI[condition.derived];
            if ((type === "object") && (attribute.hasOwnProperty("value")) && (attribute.hasOwnProperty("type"))) {
                return ((typeof attribute.value === jsontype) && (attribute.type === condition.type));
            }
            if (type === jsontype) return true
        }
        if (condition.check_type === "json") {
            if (!condition.hasOwnProperty("type")) return false;
            var type = typeof attribute;
            if (type === condition.type) return true
        }
        return false;
    }



    checkPermissionFormat(permission, permid) {
        var good = true;
        console.log("Checking format of permission : " + permid)
        good &= this.checkProperty(permission, true, "name", "string", null, "\t");
        good &= this.checkProperty(permission, true, "permission", "string", permid, "\t");
        good &= this.checkProperty(permission, false, "request", "object", null, "\t")
        if (permission.hasOwnProperty("request")) {
            good &= this.checkPermissionRequestFormat(permission.request)
        }

        return (good == true)
    }


    checkPermissionRequestFormat(permission) {
        var good = true;
        good &= this.checkProperty(permission, false, "method", "string", ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTION"], "\t\t");
        good &= this.checkProperty(permission, false, "path", "object", null, "\t\t")
        if (good && permission.hasOwnProperty("path")) {
            good &= this.checkProperty(permission.path, true, "value", "string", null, "\t\t\tpath : ")
            good &= this.checkProperty(permission.path, true, "is_regex", "boolean", null, "\t\t\tpath : ")
        }
        good &= this.checkProperty(permission, false, "query", "array", null, "\t\t")
        if (good && permission.hasOwnProperty("query")) {
            permission.query.forEach(query => {
                good &= this.checkProperty(query, true, "name", "string", null, query.name !== undefined ? "\t\t\tquery : " + query.name + " : " : "query : ")
                good &= this.checkProperty(query, true, "presence", "string", ["optional", "mandatory", "forbidden"], query.name !== undefined ? "\t\t\tquery : " + query.name + " : " : "query : ")
                if (good && query.presence !== "forbidden") {
                    good &= this.checkProperty(query, true, "check_value", "string", ["no", "equals", "regex"], query.name !== undefined ? "\t\t\tquery : " + query.name + " : " : "query : ")
                    if (good && query.check_value === "equals") {
                        good &= this.checkProperty(query, true, "value", null, null, query.name !== undefined ? "\t\t\tquery : " + query.name + " : " : "query : ")
                    }
                    if (good && query.check_value === "regex") {
                        good &= this.checkProperty(query, true, "value", "string", null, query.name !== undefined ? "\t\t\tquery : " + query.name + " : " : "query : ")
                    }
                }
            })
        }
        good &= this.checkProperty(permission, false, "headers", "array", null, "\t\t")
        if (good && permission.hasOwnProperty("headers")) {
            permission.headers.forEach(header => {
                good &= this.checkProperty(header, true, "name", "string", null, header.name !== undefined ? "\t\t\theader : " + header.name + " : " : "header : ")
                good &= this.checkProperty(header, true, "presence", "string", ["optional", "mandatory", "forbidden"], header.name !== undefined ? "\t\t\theader : " + header.name + " : " : "header : ")
                if (good && header.presence !== "forbidden") {
                    good &= this.checkProperty(header, true, "check_value", "string", ["no", "equals", "regex"], header.name !== undefined ? "\t\t\theader : " + header.name + " : " : "header : ")
                    if (good && header.check_value === "equals") {
                        good &= this.checkProperty(header, true, "value", null, null, header.name !== undefined ? "\t\t\theader : " + header.name + " : " : "header : ")
                    }
                    if (good && header.check_value === "regex") {
                        good &= this.checkProperty(header, true, "value", "string", null, header.name !== undefined ? "\t\t\theader : " + header.name + " : " : "header : ")
                    }
                }
            })
        }
        good &= this.checkProperty(permission, false, "body", "object", null, "\t\t")
        if (good && permission.hasOwnProperty("body")) {
            good &= this.checkProperty(permission.body, true, "presence", "string", ["optional", "mandatory", "forbidden"], "\t\t\tbody : ")
            if (good && permission.body.presence !== "forbidden") {
                if (this.checkProperty(permission.body, true, "id", "array", null, "\t\t\tbody : ")) {
                    permission.body.id.forEach(condition => {
                        good &= this.checkWebConditionFormat(condition, "\t\t\t")
                    })
                } else {
                    good = false;
                }
                if (this.checkProperty(permission.body, true, "attributes", "array", null, "\t\t\tbody :")) {
                    permission.body.attributes.forEach(condition => {
                        good &= this.checkWebConditionFormat(condition, "\t\t\t")
                    })
                } else {
                    good = false;
                }
            }
        }
        return (good == true)
    }

    checkWebConditionFormat(condition, tab) {
        var good = true;
        good &= this.checkProperty(condition, true, "name", "string", null, condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
        good &= this.checkProperty(condition, true, "presence", "string", ["optional", "mandatory", "forbidden"], condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
        if (good && condition.presence !== "forbidden") {
            good &= this.checkProperty(condition, true, "check_type", "string", ["no", "ngsi_standard", "ngsi_custom", "json"], condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
            if (good && condition.check_type !== "no") {
                //good &= this.checkProperty(condition, true, "type", "string", null, condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
                if (condition.check_type === "ngsi_custom") {
                    good &= this.checkProperty(condition, true, "type", "string", null, condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
                    good &= this.checkProperty(condition, true, "derived", "string", ["Text", "Integer", "Float", "Boolean", "DateTime", "geo:json", "StructuredValue"], condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
                }
                if (condition.check_type === "ngsi_standard") {
                    good &= this.checkProperty(condition, true, "type", "string", ["Text", "Integer", "Float", "Boolean", "DateTime", "geo:json", "StructuredValue"], condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
                }
                if (condition.check_type === "json") {
                    good &= this.checkProperty(condition, true, "type", "string", ["object", "number", "string", "boolean", "array"], condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
                }
            }
            good &= this.checkProperty(condition, true, "check_value", "string", ["no", "equals", "regex", "list"], condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
            if (good && condition.check_value !== "no") {
                if (condition.check_value === "list") {
                    good &= this.checkProperty(condition, true, "value", "array", null, condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
                } else {
                    good &= this.checkProperty(condition, true, "value", null, null, condition.name !== undefined ? tab + "\tcondition : " + condition.name + " : " : " : ")
                }
            }
        }
        return (good == true)
    }


    checkProperty(object, mandatory, property, type, value, tab) {
        var good = true;
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
                        console.log(tab + "property " + property + " is not an array");
                        good = false;
                    }
                } else {
                    if (!goodtypes.includes(typeof object[property])) {
                        console.log(tab + "property " + property + "  is not of type " + JSON.stringify(goodtypes));
                        good = false;
                    }
                }
            }
            if (good) {
                if (value !== null) {
                    if (typeof value === "object" && value.length !== undefined) {
                        if (!value.includes(object[property])) {
                            console.log(tab + "property " + property + " value " + object[property] + " not in  " + JSON.stringify(value));
                            good = false;
                        }
                    } else if (object[property] !== value) {
                        console.log(tab + "property " + property + " value " + object[property] + " different of " + value);
                        good = false;
                    }
                }
            }
        } else {
            if (mandatory) {
                console.log(tab + "property " + property + " missing");
                good = false;
            }
        }
        return good;
    }

    dump() {
        console.log(JSON.stringify(this.permissions, null, 4));
    }
}
