const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var RequestCondition = require('../../lib/permission/requestcondition.js')
var context = new ContextCheckFormat();

describe('Test RequestCondition', () => {

    it('load : full condition', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.not.throw()
        assert.notStrictEqual(requestCondition.method, undefined)
        assert.notStrictEqual(requestCondition.path, undefined)
        assert.notStrictEqual(requestCondition.querys, undefined)
        assert.notStrictEqual(requestCondition.headers, undefined)
        assert.notStrictEqual(requestCondition.body, undefined)
    });

    it('load : missing method', () => {
        var requestCondition = new RequestCondition();
        var request = {
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.not.throw()
        assert.strictEqual(requestCondition.method, undefined)
        assert.notStrictEqual(requestCondition.path, undefined)
        assert.notStrictEqual(requestCondition.querys, undefined)
        assert.notStrictEqual(requestCondition.headers, undefined)
        assert.notStrictEqual(requestCondition.body, undefined)
    });
    it('load : missing path', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.not.throw()
        assert.notStrictEqual(requestCondition.method, undefined)
        assert.strictEqual(requestCondition.path, undefined)
        assert.notStrictEqual(requestCondition.querys, undefined)
        assert.notStrictEqual(requestCondition.headers, undefined)
        assert.notStrictEqual(requestCondition.body, undefined)
    });
    it('load : missing query', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.not.throw()
        assert.notStrictEqual(requestCondition.method, undefined)
        assert.notStrictEqual(requestCondition.path, undefined)
        assert.strictEqual(requestCondition.querys, undefined)
        assert.notStrictEqual(requestCondition.headers, undefined)
        assert.notStrictEqual(requestCondition.body, undefined)
    });
    it('load : missing headers', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.not.throw()
        assert.notStrictEqual(requestCondition.method, undefined)
        assert.notStrictEqual(requestCondition.path, undefined)
        assert.notStrictEqual(requestCondition.querys, undefined)
        assert.strictEqual(requestCondition.headers, undefined)
        assert.notStrictEqual(requestCondition.body, undefined)
    });
    it('load : missing body', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }]
        }
        expect(() => requestCondition.load(request, context)).to.not.throw()
        assert.notStrictEqual(requestCondition.method, undefined)
        assert.notStrictEqual(requestCondition.path, undefined)
        assert.notStrictEqual(requestCondition.querys, undefined)
        assert.notStrictEqual(requestCondition.headers, undefined)
        assert.strictEqual(requestCondition.body, undefined)
    });
    it('load : method not a string', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: 2,
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : method not in list', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "TRY",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 3);
    });

    it('load : path not an object', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: 42,
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : headers not an array', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: true,
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 1);
    });
    it('load : query not an array', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: "hello",
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 1);
    });
    it('load : body not an object', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: 42
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : invalid path', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go"
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : invalid query', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 5);
    });
    it('load : invalid headers', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: 42
            }],
            body: {
                presence: "mandatory",
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 2);
    });
    it('load : invalid body', () => {
        var requestCondition = new RequestCondition();
        var request = {
            method: "GET",
            path: {
                value: "/test/go",
                is_regex: true
            },
            query: [{
                name: "q",
                presence: "forbidden"
            }],
            headers: [{
                name: "Content-Length",
                presence: "mandatory",
                check_value: "no"
            }],
            body: {
                presence: 12,
                json: {
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "type",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
        }
        expect(() => requestCondition.load(request, context)).to.throw(FormatException).with.property('code', 2);
    });










});