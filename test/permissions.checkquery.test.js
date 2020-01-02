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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: false
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
                is_forbidden: false,
                check_value: false,
                is_mandatory: false
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
                is_forbidden: false,
                name: "Fiware-Service",
                is_mandatory: false
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
    it('Query missing is_mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false
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
    it('Query missing is_forbidden', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            query: [{
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: false
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: false
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
                is_forbidden: true,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: false
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
                is_forbidden: false,
                name: "Fiware-ServicePath",
                check_value: false,
                is_mandatory: false
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
                is_forbidden: true,
                name: "Fiware-ServicePath",
                check_value: false,
                is_mandatory: false
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true
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
                is_forbidden: false,
                name: "Fiware-ServicePath",
                check_value: false,
                is_mandatory: true
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: false,
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: false,
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
                value: "Ma.*"
            }, {
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: false,
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
                value: "Ma.*"
            }, {
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: false,
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
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
                value: "Te.*"
            }, {
                is_forbidden: false,
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: false,
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