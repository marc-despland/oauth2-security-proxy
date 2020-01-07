'use strict';

module.exports = class HeaderCondition {
    constructor() {
        this.presence = undefined;
        this.name = undefined;
        this.check_value = undefined;
        this.value = undefined;
    }
    static skeleton() {
        var header=new HeaderCondition()
        header.presence="mandatory"
        header.name=""
        header.check_value="equals"
        header.value=""
        return header;
    }
    load(header, context) {
        this.presence = undefined;
        this.name = undefined;
        this.check_value = undefined;
        this.value = undefined;
        context.addGroup(header.name, "Header")
        this.name = context.checkFormatProperty(header, true, "name", "string", null)
        this.presence = context.checkFormatProperty(header, true, "presence", "string", ["optional", "mandatory", "forbidden"])
        if (this.presence !== "forbidden") {
            this.check_value = context.checkFormatProperty(header, true, "check_value", "string", ["no", "equals", "regex"])
            if (this.check_value === "equals") {
                this.value = context.checkFormatProperty(header, true, "value", null, null)
            }
            if (this.check_value === "regex") {
                this.value = context.checkFormatProperty(header, true, "value", "string", null)
            }
        }
        context.popGroup()
    }
}