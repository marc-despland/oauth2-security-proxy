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
        this.readFolder(folder)

    }


    authorizeRequest(request, roles) {
        if (debug) console.log("authorizeRequest roles" + JSON.stringify(roles));
        var authorized = [];
        var list = this.roles.permissionsList(roles);
        list.forEach(permid => {
            if (debug) console.log("authorizeRequest : permid=" + permid)
            if (this.checkPermissionRequest(request, permid)) {
                authorized.push(permid);
            }
        })
        if (debug) console.log("authorizeRequest list" + JSON.stringify(authorized));
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
        if (!permission.hasOwnProperty("method")) return false;
        return (request.method === permission.method);
    }


    checkPath(request, permission) {
        if (debug) console.log("\tcheckPath")
        if (!permission.hasOwnProperty("path")) return false;
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
        if (!permission.hasOwnProperty("headers")) return false;
        //try {
        var length = permission.headers.length;
        if (length === undefined) return false;
        var forbidden = false;
        var index = 0;
        while (!forbidden && index < length) {
            if (!forbidden && !permission.headers[index].hasOwnProperty("name")) forbidden = true;
            if (!forbidden && !permission.headers[index].hasOwnProperty("check_value")) forbidden = true;
            if (!forbidden && !permission.headers[index].hasOwnProperty("is_mandatory")) forbidden = true;
            if (!forbidden) {
                if (request.headers.hasOwnProperty(permission.headers[index].name.toLowerCase())) {
                    if (permission.headers[index].check_value) {
                        if (!permission.headers[index].hasOwnProperty("value")) forbidden = true;
                        if (!forbidden && !permission.headers[index].hasOwnProperty("is_regex")) forbidden = true;
                        if (!forbidden) {
                            if (permission.headers[index].is_regex) {
                                var regex = new RegExp(permission.headers[index].value);
                                var matchs = regex.exec(request.headers[permission.headers[index].name.toLowerCase()]);
                                forbidden = (matchs === null);
                            } else {
                                forbidden = (request.headers[permission.headers[index].name.toLowerCase()] !== permission.headers[index].value);
                            }
                        }
                    }
                } else {
                    if (permission.headers[index].is_mandatory) forbidden = true;
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
        if (!permission.hasOwnProperty("query")) return false;
        //try {
        var length = permission.query.length;
        if (length === undefined) return false;
        var forbidden = false;
        var index = 0;
        while (!forbidden && index < length) {
            if (!forbidden && !permission.query[index].hasOwnProperty("name")) forbidden = true;
            if (!forbidden && !permission.query[index].hasOwnProperty("check_value")) forbidden = true;
            if (!forbidden && !permission.query[index].hasOwnProperty("is_mandatory")) forbidden = true;
            if (!forbidden && !permission.query[index].hasOwnProperty("is_forbidden")) forbidden = true;
            if (!forbidden) {
                if (request.query.hasOwnProperty(permission.query[index].name.toLowerCase())) {
                    if (!permission.query[index].is_forbidden) {
                        if (permission.query[index].check_value) {
                            if (!permission.query[index].hasOwnProperty("value")) forbidden = true;
                            if (!forbidden && !permission.query[index].hasOwnProperty("is_regex")) forbidden = true;
                            if (!forbidden) {
                                if (permission.query[index].is_regex) {
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
                    if (permission.query[index].is_mandatory) forbidden = true;
                    if (debug) console.log("checkQuery header not found : " + !forbidden)
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

    checkBody(request, permission) {
        if (debug) console.log("\tcheckBody")
        if (!permission.hasOwnProperty("body")) return true;
        if (!permission.body.hasOwnProperty("is_mandatory")) return false;
        if (!permission.body.hasOwnProperty("is_forbidden")) return false;
        if ((request.data === undefined) || (request.data === "")) {
            //no body
            if (permission.body.is_mandatory) return false;
        } else {
            if (permission.body.is_forbidden) return false;
            if (!permission.body.hasOwnProperty("attributes")) return true;
            var length = permission.body.attributes.length;
            if (length === undefined) return false;
            var index = 0;
            var forbidden = false;
            while (!forbidden && index < length) {
                var condition = permission.body.attributes[index];
                if (!condition.hasOwnProperty("name")) forbidden = true;
                if (!forbidden && !condition.hasOwnProperty("is_mandatory")) forbidden = true;
                if (!forbidden && !condition.hasOwnProperty("is_forbidden")) forbidden = true;
                if (!forbidden) {
                    if (request.data.hasOwnProperty(condition.name)) {
                        if (condition.is_forbidden) forbidden = true;
                        if (!forbidden && !condition.hasOwnProperty("check_type")) forbidden = true;
                        if (!forbidden && !condition.hasOwnProperty("check_value")) forbidden = true;
                        if (!forbidden) {
                            forbidden= ! this.checkAttributeType(request.data[condition.name], condition);
                            if (!forbidden && condition.check_value) {
                                if (!forbidden && !condition.hasOwnProperty("value")) forbidden = true;
                                if (!forbidden && !condition.hasOwnProperty("is_regex")) forbidden = true;
                                if (!forbidden) {
                                    if ((typeof request.data[condition.name]==="object") && (request.data[condition.name].hasOwnProperty("value"))  && (request.data[condition.name].hasOwnProperty("type"))) {
                                        if (condition.is_regex) {
                                            if (typeof request.data[condition.name].value==="string") {
                                                var regex = new RegExp(condition.value);
                                                var matchs = regex.exec(request.data[condition.name].value);
                                                forbidden = (matchs === null);
                                            } else {
                                                forbidden=true;
                                            }
                                        } else {
                                            forbidden= (request.data[condition.name].value!==condition.value)
                                        }
                                    } else {
                                        if (condition.is_regex) {
                                            if (typeof request.data[condition.name]==="string") {
                                                var regex = new RegExp(condition.value);
                                                var matchs = regex.exec(request.data[condition.name]);
                                                forbidden = (matchs === null);
                                            } else {
                                                forbidden=true;
                                            }
                                        } else {
                                            forbidden= (request.data[condition.name]!==condition.value)
                                        }
                                    }
                                }
 
                            }
                        }

                    } else {
                        if (condition.is_mandatory) forbidden = true;
                    }
                }
                index++;
            }
            return !forbidden;
        }
    }


    checkAttributeType(attribute, condition) {
        if (condition.check_type === "none") return true;
        if (condition.check_type === "standard") {
            if (!condition.hasOwnProperty("type")) return false;
            var type = typeof attribute;
            var jsontype = typesNGSI[condition.type]
            if ((type === "object") && (attribute.hasOwnProperty("value")) && (attribute.hasOwnProperty("type"))) {
                return ((typeof attribute.value === jsontype) && (attribute.type === condition.type));
            }
            if (type === jsontype)  return true
        }
        if (condition.check_type === "custom") {
            if (!condition.hasOwnProperty("type")) return false;
            if (!condition.hasOwnProperty("derived")) return false;
            var type = typeof attribute;
            var jsontype = typesNGSI[condition.derived];
            if ((type === "object") && (attribute.hasOwnProperty("value")) && (attribute.hasOwnProperty("type"))) {
                return ((typeof attribute.value === jsontype) && (attribute.type === condition.type));
            }
            if (type === jsontype)  return true
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
