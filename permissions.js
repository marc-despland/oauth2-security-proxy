'use strict';
const fs = require('fs');
var Roles = require('./roles.js');

var debug = false;

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
