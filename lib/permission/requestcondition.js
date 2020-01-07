'use strict';
var BodyCondition = require('./bodycondition.js')
var PathCondition = require('./pathcondition.js')
var QueryCondition = require('./querycondition.js')
var HeaderCondition = require('./headercondition.js')

module.exports = class RequestCondition {
    constructor() {
        this.method = undefined;
        this.path = undefined;
        this.querys = undefined;
        this.headers = undefined;
        this.body = undefined;
    }

    static skeleton() {
        var request=new RequestCondition();
        request.method="GET";
        request.path=PathCondition.skeleton();
        request.querys=[]
        request.querys.push(QueryCondition.skeleton());
        request.headers=[]
        request.headers.push(HeaderCondition.skeleton());
        request.body=BodyCondition.skeleton();
        return request;
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
            this.querys=[];
            querys.forEach(query=> {
                var queryCondition=new QueryCondition();
                queryCondition.load(query, context);
                this.querys.push(queryCondition);
            })
        }
        var headers = context.checkFormatProperty(request, false, "headers", "array", null)
        if (headers!==undefined) {
            this.headers=[];
            headers.forEach(header=> {
                var headerCondition=new HeaderCondition();
                headerCondition.load(header, context);
                this.headers.push(headerCondition);
            })
        }
        var body = context.checkFormatProperty(request, false, "body", "object", null)
        if (body!==undefined) {
            this.body=new BodyCondition();
            this.body.load(body, context);
        }
        context.popGroup()
    }
}