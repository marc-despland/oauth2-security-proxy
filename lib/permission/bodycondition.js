'use strict';
var JsonBodyObjectCondition = require('./jsonbodyobjectcondition.js')

module.exports = class BodyCondition {
    constructor() {
        this.presence=undefined;
        this.jsonobjectcondition=null;
    }

    load(body, context) {
        this.presence=undefined;
        this.jsonobjectcondition=null;
        context.addGroup("Body", "Body")
        this.presence=context.checkFormatProperty(body, true, "presence", "string", ["optional", "mandatory", "forbidden"])
        if (this.presence!=="forbidden") {
            this.jsonobjectcondition=new JsonBodyObjectCondition();
            this.jsonobjectcondition.load(body, context);
        }
        context.popGroup()
    }
}