'use strict';

module.exports = class QueryCondition {
    constructor() {
        this.presence = undefined;
        this.name = undefined;
        this.check_value = undefined;
        this.value = undefined;
    }

    static skeleton() {
        var query=new QueryCondition()
        query.presence="mandatory"
        query.name=""
        query.check_value="equals"
        query.value=""
        return query;
    }
    load(query, context) {
        this.presence = undefined;
        this.name = undefined;
        this.check_value = undefined;
        this.value = undefined;
        context.addGroup(query.name, "Query")
        this.name = context.checkFormatProperty(query, true, "name", "string", null)
        this.presence = context.checkFormatProperty(query, true, "presence", "string", ["optional", "mandatory", "forbidden"])
        if (this.presence !== "forbidden") {
            this.check_value = context.checkFormatProperty(query, true, "check_value", "string", ["no", "equals", "regex"])
            if (this.check_value === "equals") {
                this.value = context.checkFormatProperty(query, true, "value", null, null)
            }
            if (this.check_value === "regex") {
                this.value = context.checkFormatProperty(query, true, "value", "string", null)
            }
        }
        context.popGroup()
    }
}