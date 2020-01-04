'use strict';
const fs = require('fs');
var debug = false;


module.exports = class Roles {

    constructor(folder) {
        this.roles = {};
        if (folder!==null) this.readFolder(folder)

    }

    loadRole(roleid, role) {
        this.roles[roleid]=role;
    }

    permissionsList(roles) {
        if (debug) console.log("permissionsList roles :" + JSON.stringify(roles))
        var list = [];
        roles.forEach(role => {
            if (this.roles.hasOwnProperty(role.id)) {
                if (debug) console.log("permissionsList found role :" + role)
                if (this.roles[role.id].hasOwnProperty("permissions")) {
                    this.roles[role.id].permissions.forEach(permission => {
                        if (!list.includes(permission)) {
                            list.push(permission)
                        }
                    })
                }
            }
        })
        if (debug) console.log("permissionsList list :" + JSON.stringify(list))
        return list;
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
                this.readFile(folder + "/" + file.name);
            }
        })
    }

    readFile(file) {
        try {
            let rawdata = fs.readFileSync(file);
            var role = JSON.parse(rawdata);
            if (role.hasOwnProperty("role")) {
                this.roles[role.role] = role;
            }
        } catch (exceptio) {
            console.log("Failed to load role from file " + file);
        }
    }

    dump() {
        console.log(JSON.stringify(this.roles, null, 4));
    }
}
