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
        assert.equal(permissions.checkBody(request, permission), true);
    });
    it('permission with body field but no is_mandatory', () => {
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
                is_forbidden: false
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
    });
    it('permission with body field but no is_forbidden', () => {
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
                is_mandatory: false
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
    });
    it('a body is present but is_forbidden=true', () => {
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
                is_mandatory: false,
                is_forbidden: true
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
    });
    it('a body is undefined but is_mandatory=true', () => {
        var request = {
            method: "GET"
        };
        var permission = {
            method: "GET",
            body: {
                is_mandatory: true,
                is_forbidden: false
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
    });
    it('a body is empty but is_mandatory=true', () => {
        var request = {
            method: "GET",
            data: ""
        };
        var permission = {
            method: "GET",
            body: {
                is_mandatory: true,
                is_forbidden: false
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false
            }
        }
        assert.equal(permissions.checkBody(request, permission), true);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: {}
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    is_mandatory: false,
                    is_forbidden: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "id",
                    is_forbidden: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "id",
                    is_mandatory: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "id",
                    is_mandatory: false,
                    is_forbidden: true
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "007",
                    is_mandatory: true,
                    is_forbidden: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "standard",
                    type: "Text",
                    check_value: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), true);
    });
    it('Attribute legacy temperature type Text', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature":"cecie est un text",
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "standard",
                    type: "Text",
                    check_value: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), true);
    });
    it('Attribute legacy temperature type Text wrong', () => {
        var request = {
            method: "GET",
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature":33,
                "pressure": 711
            }
        };
        var permission = {
            method: "GET",
            body: {
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "standard",
                    type: "Text",
                    check_value: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "standard",
                    type: "Text",
                    check_value: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "none",
                    type: "Text",
                    check_value: false
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), true);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "none",
                    check_value: true,
                    is_regex: true,
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), true);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "none",
                    check_value: true,
                    is_regex: true,
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "none",
                    check_value: true,
                    is_regex: true,
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), true);
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
                is_mandatory: false,
                is_forbidden: false,
                attributes: [{
                    name: "temperature",
                    is_mandatory: false,
                    is_forbidden: false,
                    check_type: "none",
                    check_value: true,
                    is_regex: true,
                    value: "my.*"
                }]
            }
        }
        assert.equal(permissions.checkBody(request, permission), false);
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
            is_mandatory: false,
            is_forbidden: false,
            attributes: [{
                name: "temperature",
                is_mandatory: false,
                is_forbidden: false,
                check_type: "none",
                check_value: true,
                is_regex: false,
                value: "my data"
            }]
        }
    }
    assert.equal(permissions.checkBody(request, permission), true);
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
            is_mandatory: false,
            is_forbidden: false,
            attributes: [{
                name: "temperature",
                is_mandatory: false,
                is_forbidden: false,
                check_type: "none",
                check_value: true,
                is_regex: false,
                value: "my data"
            }]
        }
    }
    assert.equal(permissions.checkBody(request, permission), false);
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
            is_mandatory: false,
            is_forbidden: false,
            attributes: [{
                name: "temperature",
                is_mandatory: false,
                is_forbidden: false,
                check_type: "none",
                check_value: true,
                is_regex: false,
                value: "my data"
            }]
        }
    }
    assert.equal(permissions.checkBody(request, permission), true);
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
            is_mandatory: false,
            is_forbidden: false,
            attributes: [{
                name: "temperature",
                is_mandatory: false,
                is_forbidden: false,
                check_type: "none",
                check_value: true,
                is_regex: false,
                value: "my data"
            }]
        }
    }
    assert.equal(permissions.checkBody(request, permission), false);
});
});
