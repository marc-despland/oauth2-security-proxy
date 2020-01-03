const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions("permissions.d");


describe('Test Permissions checkQuery', () => {
    it('Query not an array', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: {
                name: "Fiware-Service",
                check_value: "no",
                presence: "optional"
            }
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('Query missing name', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                check_value: "no",
                presence: "optional"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('Query missing check_value', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                name: "Fiware-Service",
                presence: "optional"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('Query missing presence', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                name: "Fiware-Service",
                check_value: "no"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('Query present not mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                name: "Fiware-Service",
                check_value: "no",
                presence: "optional"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), true);
    });
    it('Query present not mandatory but forbidden', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "forbidden",
                name: "Fiware-Service",
                check_value: "no"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('Query absent not mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                name: "Fiware-ServicePath",
                check_value: "no",
                presence: "optional"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), true);
    });
    it('Query absent not mandatory and forbbiden', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "forbidden",
                name: "Fiware-ServicePath",
                check_value: "no"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), true);
    });
    it('Query present mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value: "no"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), true);
    });
    it('Query absent mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-ServicePath",
                check_value: "no"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('Query present mandatory check value equals match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"equals",
                value: "Test"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), true);
    });
    it('Query present mandatory check value equals don\'t match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"equals",
                value: "MArs"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('Query present mandatory check value regex match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"regex",
                value: "Te.*"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), true);
    });
    it('Query present mandatory check value regex don\'t match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"regex",
                value: "Ma.*"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('2 query rules, one match one failed', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"regex",
                value: "Ma.*"
            }, {
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"equals",
                value: "Test"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('2 query rules, two failed', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"regex",
                value: "Ma.*"
            }, {
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"equals",
                value: "Tes"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), false);
    });
    it('2 query rules, two match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"regex",
                value: "Te.*"
            }, {
                presence: "mandatory",
                name: "Fiware-Service",
                check_value:"equals",
                value: "Test"
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            query: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkQuery(request, permission), true);
    });
});