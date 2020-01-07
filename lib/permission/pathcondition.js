'use strict';

module.exports = class PathCondition {
    constructor() {
        this.is_regex = undefined;
        this.value = undefined;
    }

    static skeleton() {
        var path=new PathCondition()
        path.is_regex=true
        path.value="^$"
        return path;
    }

    load(path, context) {
        this.is_regex = undefined;
        this.value = undefined;
        context.addGroup("Path", "Path")
        this.value = context.checkFormatProperty(path, true, "value", "string", null)
        this.is_regex = context.checkFormatProperty(path, true, "is_regex", "boolean", null)
        context.popGroup()
    }
}