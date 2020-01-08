'use strict';
var JsonBodyObjectCondition = require('./jsonbodyobjectcondition.js')

module.exports = class BodyCondition {
    constructor() {
        this.presence = undefined;
        this.json = undefined;
    }
    static skeleton() {
        var body = new BodyCondition()
        body.presence = "mandatory"
        body.json = JsonBodyObjectCondition.skeleton()
        return body;
    }

    check(body) {
        if ((body===undefined) || (body==="")) {
            if (this.presence==="mandatory") return false;
        } else {
            if (this.presence==="forbidden") return false;
            if (this.json!==undefined) return this.json.check(body)
        }
        return true;
    }

    load(body, context) {
        this.presence = undefined;
        this.json = undefined;
        context.addGroup("Body", "Body")
        this.presence = context.checkFormatProperty(body, true, "presence", "string", ["optional", "mandatory", "forbidden"])
        if (this.presence !== "forbidden") {
            var jsonBody = context.checkFormatProperty(body, false, "json", "object", null)
            if (jsonBody !== undefined) {
                this.json = new JsonBodyObjectCondition();
                this.json.load(jsonBody, context);
            }
        }
        context.popGroup()
    }
}