'use strict';

module.exports = class FormatException extends Error{
    constructor(code, prefix, message) {
        super(message);
        this.name="FormatException"
        this.code= code;
        this.prefix= prefix;
        this.message= message;
    }
}