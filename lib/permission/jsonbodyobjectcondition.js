'use strict';
var PropertyCondition = require('./propertycondition.js')

module.exports = class JsonBodyObjectCondition {
    constructor() {
        this.id=[]
        this.attributes=[]
    }

    static skeleton() {
        var body=new JsonBodyObjectCondition()
        body.id.push(PropertyCondition.skeleton());
        body.attributes.push(PropertyCondition.skeleton());
        return body;
    }

    load(object, context) {
        this.id=[]
        this.attributes=[]
        context.addGroup("JsonObject", "JsonObject")
        var id=context.checkFormatProperty(object, true, "id", "array", null);
        context.addGroup("id", "id")
        id.forEach(condition => {
            var property=new PropertyCondition();
            property.load(condition, context)
            this.id.push(property)
        })
        context.popGroup()
        context.addGroup("attributes", "attributes")
        var attributes=context.checkFormatProperty(object, true, "attributes", "array", null);
        attributes.forEach(condition => {
            var property=new PropertyCondition();
            property.load(condition, context)
            this.attributes.push(property)
        })
        context.popGroup()
        context.popGroup()
    }
}