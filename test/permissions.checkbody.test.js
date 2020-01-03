const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions("permissions.d");

describe('Test Permissions checkBody', () => {
    it('permission with no body field', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET"
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('permission with body field but no presence', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('permission with body field but no presence', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is present but presence forbidden', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "forbidden"
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is undefined but presence mandatory', () => {
        var request = {
            method: "GET"
        };
        var permission = {
            method: "GET",
            body: {
                presence: "mandatory"
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is empty but presence mandatory', () => {
        var request = {
            method: "GET",
            data: ""
        };
        var permission = {
            method: "GET",
            body: {
                presence: "mandatory"
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is present but no fields attributes', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional"
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('a body is present but attribute not an arrays', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: {}
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is present but attribute have no name', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    presence: "optional"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is present but attribute have no is_mandatory', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "id",
                    is_forbidden: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is present but attribute have no is_forbidden', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "id",
                    is_mandatory: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is present but attribute forbidden present', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "id",
                    presence: "forbidden"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('a body is present but attribute mandatory absent', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 21,
                    "type": "Float"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "007",
                    presence: "mandatory"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('Attribute legacy temperature type Text', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": "cecie est un text",
                    "type": "Text"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "standard",
                    type: "Text",
                    check_value: "no"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('Attribute legacy temperature type Text', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "cecie est un text",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "standard",
                    type: "Text",
                    check_value: "no"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('Attribute legacy temperature type Text wrong', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": 33,
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "standard",
                    type: "Text",
                    check_value: "no"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('Attribute legacy temperature type Text wrong', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 22,
                    "type": "Integer"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "standard",
                    type: "Text",
                    check_value: "no"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('Attribute legacy temperature type Text wrong - no check', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    "value": 22,
                    "type": "Integer"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    type: "Text",
                    check_value: "no"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('check_data normalized regex match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    value: "my data",
                    type: "Text"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "regex",
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('check_data normalized regex not match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    value: "data",
                    type: "Text"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "regex",
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });

    it('check_data keyvalue regex match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "regex",
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('check_data keyvalue regex not match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "data",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "regex",
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });


    //mde
    it('check_data normalized string equals match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    value: "my data",
                    type: "Text"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "equals",
                    value: "my data"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('check_data normalized string equals not match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    value: "data",
                    type: "Text"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "equals",
                    value: "my data"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });

    it('check_data keyvalue string equals match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "equals",
                    value: "my data"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('check_data keyvalue string equals not match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "data",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "equals",
                    value: "my data"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });

    it('check_data keyvalue string list not match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "data",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "list",
                    value: ["my data", "test", "try"]
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });
    it('check_data keyvalue string list match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "list",
                    value: ["my data", "test", "try"]
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });

    it('check_data normalized string list not match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    value: "data",
                    type: "Text"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "list",
                    value: ["my data", "test", "try"]
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });

    it('check_data normalized string list match', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": {
                    value: "my data",
                    type: "Text"
                },
                "pressure": {
                    "value": 711,
                    "type": "Integer"
                }
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room2"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "list",
                    value: ["my data", "test", "try"]
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), true);
    });
    it('check_data keyvalue string equals match id condition failed', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                presence: "optional",
                id: [{
                    name: "id",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals",
                    value: "Room3"
                }],
                attributes: [{
                    name: "temperature",
                    presence: "optional",
                    check_type: "no",
                    check_value: "equals",
                    value: "my data"
                }]
            }
        }
        assert.equal(permissions.checkBody(request.data, permission), false);
    });

});
