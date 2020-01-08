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

    check(body){
        var index=0;
        var passed=true;
        while (passed && index<this.id.length) {
            passed = passed && this.id[index].check(body);
            index++;
        }
        index=0;
        while (passed && index<this.attributes.length) {
            passed = passed && this.attributes[index].check(body);
            index++;
        }
        return passed; 
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