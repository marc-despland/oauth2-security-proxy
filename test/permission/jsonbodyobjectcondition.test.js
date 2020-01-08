const assert = require('assert');
const expect = require('chai').expect;
var ContextCheckFormat = require('../../lib/permission/contextcheckformat.js')
var FormatException = require('../../lib/permission/formatexception.js')
var JsonBodyObjectCondition = require('../../lib/permission/jsonbodyobjectcondition.js')
var context = new ContextCheckFormat();

describe('Test JsonBodyObjectCondition', () => {
    describe('load', () => {
        it('load Json Body Object', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [],
                    attributes: []
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw()
        });
        it('load Json Body Object id missing', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    attributes: []
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
        });
        it('load Json Body Object id not an array', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: "rookie",
                    attributes: []
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 1);
        });
        it('load Json Body Object attributes missing', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: []
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
        });
        it('load Json Body Object attributes not an array', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [],
                    attributes: "fox"
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 1);
        });
        it('load Json Body Object one id one attributes passed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "forbidden"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw()
            assert.equal(jsonObject.id.length, 1);
            assert.equal(jsonObject.attributes.length, 1);
        });


        it('load Json Body Object one id failed one attributes passed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "mandatory"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
        });
        it('load Json Body Object one id passed one attributes failed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "forbidden"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "equals",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 3);
        });


        it('load Json Body Object two id passed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "forbidden"
                    }, {
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: []
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw()
            assert.equal(jsonObject.id.length, 2);
            assert.equal(jsonObject.attributes.length, 0);
        });

        it('load Json Body Object two id falied,passed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "mandatory"
                    }, {
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: []
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
        });

        it('load Json Body Object two id passed,failed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "forbidden"
                    }, {
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "equals"
                    }],
                    attributes: []
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
        });


        it('load Json Body Object two attributes passed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [],
                    attributes: [{
                        name: "test",
                        presence: "forbidden"
                    }, {
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw()
            assert.equal(jsonObject.id.length, 0);
            assert.equal(jsonObject.attributes.length, 2);
        });

        it('load Json Body Object two attributes falied,passed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [],
                    attributes: [{
                        name: "test",
                        presence: "mandatory"
                    }, {
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);
        });

        it('load Json Body Object two attributes passed,failed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [],
                    attributes: [{
                        name: "test",
                        presence: "forbidden"
                    }, {
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "equals"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.throw(FormatException).with.property('code', 5);


        });
    });
    describe('check', () => {
        it('check with id and attributes passed', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    id: [{
                        name: "test",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "good",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "bonjour",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw();
            assert.equal(jsonObject.id.length,2)
            assert.equal(jsonObject.attributes.length,2)
            var body = {
                test: 1,
                good: 2,
                hello: 3,
                bonjour: 4
            }
            assert.equal(jsonObject.check(body),true)
        });
        it('check with id and attributes failed first id', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "good",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "bonjour",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw();
            assert.equal(jsonObject.id.length,2)
            assert.equal(jsonObject.attributes.length,2)
            var body = {
                good: 2,
                hello: 3,
                bonjour: 4
            }
            assert.equal(jsonObject.check(body),false)
        });
        it('check with id and attributes failed second id', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "good",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "bonjour",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw();
            assert.equal(jsonObject.id.length,2)
            assert.equal(jsonObject.attributes.length,2)
            var body = {
                test: 1,
                hello: 3,
                bonjour: 4
            }
            assert.equal(jsonObject.check(body),false)

        });
        it('check with id and attributes failed first attributes', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "good",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "bonjour",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw();
            assert.equal(jsonObject.id.length,2)
            assert.equal(jsonObject.attributes.length,2)
            var body = {
                test: 1,
                good: 2,
                bonjour: 4
            }
            assert.equal(jsonObject.check(body),false)
        });
        it('check with id and attributes failed second attributes', () => {
            var jsonObject = new JsonBodyObjectCondition();
            var permission = {
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "test",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "good",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }],
                    attributes: [{
                        name: "hello",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    },{
                        name: "bonjour",
                        presence: "mandatory",
                        check_type: "no",
                        check_value: "no"
                    }]
                }
            }
            expect(() => jsonObject.load(permission.body, context)).to.not.throw();
            assert.equal(jsonObject.id.length,2)
            assert.equal(jsonObject.attributes.length,2)
            var body = {
                test: 1,
                good: 2,
                hello: 3
            }
            assert.equal(jsonObject.check(body),false)
        });
    });
});