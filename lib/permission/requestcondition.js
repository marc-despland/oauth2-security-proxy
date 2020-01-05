'use strict';
var BodyCondition = require('./bodycondition.js')
var PathCondition = require('./pathcondition.js')
var QuerysCondition = require('./queryscondition.js')
var HeadersCondition = require('./headerscondition.js')

module.exports = class RequestCondition {
    constructor() {
        this.method = undefined;
        this.path = undefined;
        this.querys = undefined;
        this.headers = undefined;
        this.body = undefined;
    }

    load(request, context) {
        this.method = undefined;
        this.path = undefined;
        this.querys = undefined;
        this.headers = undefined;
        this.body = undefined;
        context.addGroup("Request", "Request")
        this.method = context.checkFormatProperty(request, false, "method", "string", ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTION"])
        var path = context.checkFormatProperty(request, false, "path", "object", null)
        if (path!==undefined) {
            this.path=new PathCondition();
            this.path.load(path, context);
        }
        var querys = context.checkFormatProperty(request, false, "query", "array", null)
        if (querys!==undefined) {
            this.querys=new QuerysCondition();
            this.querys.load(querys, context);
        }
        var headers = context.checkFormatProperty(request, false, "headers", "array", null)
        if (headers!==undefined) {
            this.headers=new HeadersCondition();
            this.headers.load(headers, context);
        }
        var body = context.checkFormatProperty(request, false, "body", "object", null)
        if (body!==undefined) {
            this.body=new BodyCondition();
            this.body.load(body, context);
        }
        context.popGroup()
    }
}