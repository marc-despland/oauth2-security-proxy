'use strict';
var RequestCondition = require('./requestcondition.js')

module.exports = class Permission {
    constructor() {
        this.name = undefined;
        this.permission = undefined;
        this.request = undefined;
    }

    load(permission, context) {
        this.name = undefined;
        this.permission = undefined;
        this.request = undefined;
        context.addGroup(permission.permission, "Permission");
        this.name = context.checkFormatProperty(permission, true, "name", "string", null);
        this.permission = context.checkFormatProperty(permission, true, "permission", "string", null)
        var request = context.checkFormatProperty(permission, false, "request", "object", null)
        if (request!==undefined) {
            this.request=new RequestCondition();
            this.request.load(request, context);
        }
        context.popGroup()
    }

    static skeleton() {
        var permission=new Permission();
        permission.name="";
        permission.permission="";
        permission.request=RequestCondition.skeleton();
        return permission;
    }
}
