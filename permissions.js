'use strict';
const fs = require('fs');
var Roles = require('./roles.js');

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
        if (folder!==null) this.readFolder(folder)

    }

    loadPermission(permid, permission) {
        this.permissions[permid]=permission;
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
                    if (permission.headers[index].check_value!=="no") {
                        if (!permission.headers[index].hasOwnProperty("value")) forbidden = true;
                        if (!forbidden) {
                            if (permission.headers[index].check_value=="regex") {
                                var regex = new RegExp(permission.headers[index].value);
                                var matchs = regex.exec(request.headers[permission.headers[index].name.toLowerCase()]);
                                forbidden = (matchs === null);
                            } else {
                                forbidden = (request.headers[permission.headers[index].name.toLowerCase()] !== permission.headers[index].value);
                            }
                        }
                    }
                } else {
                    if (permission.headers[index].presence==="mandatory") forbidden = true;
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
                    if (permission.query[index].presence!=="forbidden") {
                        if (!forbidden && !permission.query[index].hasOwnProperty("check_value")) forbidden = true;
                        if (!forbidden && permission.query[index].check_value!=="no") {
                            if (!permission.query[index].hasOwnProperty("value")) forbidden = true;
                            if (!forbidden) {
                                if (permission.query[index].check_value==="regex") {
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
                    if (permission.query[index].presence==="mandatory") forbidden = true;
                    if (debug) console.log("checkQuery query not found : " + !forbidden+ " "+permission.query[index].presence)
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
            if (permission.body.presence==="mandatory") return false;
        } else {
            if (permission.body.presence==="forbidden") return false;
            if (!permission.body.hasOwnProperty("id")) return true;
            var length = permission.body.id.length;
            if (length === undefined) return false;
            var index = 0;
            while (!forbidden && index < length) {
                var condition = permission.body.id[index];
                forbidden=!this.checkBodyCondition(body, condition);
                index++;
            }
            if (!forbidden) {
                if (!permission.body.hasOwnProperty("attributes")) return true;
                length = permission.body.attributes.length;
                if (length === undefined) return false;
                var index = 0;
                while (!forbidden && index < length) {
                    var condition = permission.body.attributes[index];
                    forbidden=!this.checkBodyCondition(body, condition);
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
                if (condition.presence==="forbidden") forbidden = true;
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
                if (condition.presence==="mandatory") forbidden = true;
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
            if (permission.hasOwnProperty("permission")) {
                this.permissions[permission.permission] = permission;
            }
        } catch (exceptio) {
            console.log("Failed to load permission from file " + file);
        }
    }

    dump() {
        console.log(JSON.stringify(this.permissions, null, 4));
    }
}
