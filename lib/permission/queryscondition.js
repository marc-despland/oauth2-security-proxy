'use strict';
var QueryCondition = require('./querycondition.js')

module.exports = class QuerysCondition {
    constructor() {
        this.querys=[];
    }
    static skeleton() {
       var querys=new QuerysCondition();
       querys.querys.push(QueryCondition.skeleton());
       return querys; 
    }

    load(querys, context) {
        this.querys=[];
        context.addGroup("Querys", "Querys")
        querys.forEach(query => {
            var queryCondition=new QueryCondition();
            queryCondition.load(query, context)
            this.querys.push(queryCondition)
        })
        context.popGroup()
    }
}