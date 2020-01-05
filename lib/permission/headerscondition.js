'use strict';
var HeaderCondition = require('./headercondition.js')

module.exports = class HeadersCondition {
    constructor() {
        this.headers=[];
    }

    load(headers, context) {
        this.headers=[];
        context.addGroup("Headers", "Headers")
        headers.forEach(header => {
            var headerCondition=new HeaderCondition();
            headerCondition.load(header, context)
            this.headers.push(headerCondition)
        })
        context.popGroup()
    }
}