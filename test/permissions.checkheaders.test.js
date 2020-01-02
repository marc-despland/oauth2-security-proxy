const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions("permissions.d");


describe('Test Permissions checkHeaders', () => {
    it('Headers not an array', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: {
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: false
            }
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('Header missing name', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                check_value: false,
                is_mandatory: false
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('Header missing check_value', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-Service",
                is_mandatory: false
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('Header missing is_mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-Service",
                check_value: false
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('Header present not mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: false
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), true);
    });
    it('Header absent not mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-ServicePath",
                check_value: false,
                is_mandatory: false
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), true);
    });
    it('Header present mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), true);
    });
    it('Header absent mandatory', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-ServicePath",
                check_value: false,
                is_mandatory: true
            }]
        };
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('Header present mandatory check value equals match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
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
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), true);
    });
    it('Header present mandatory check value equals don\'t match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
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
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('Header present mandatory check value regex match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
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
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), true);
    });
    it('Header present mandatory check value regex don\'t match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
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
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('2 headers rules, one match one failed', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
                value: "Ma.*"
            }, {
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
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('2 headers rules, two failed', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
                value: "Ma.*"
            }, {
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
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), false);
    });
    it('2 headers rules, two match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            },
            headers: [{
                name: "Fiware-Service",
                check_value: false,
                is_mandatory: true,
                check_value:true,
                is_regex: true,
                value: "Te.*"
            }, {
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
            headers: {
                "fiware-service" : "Test"
            }
        }
        assert.equal(permissions.checkHeaders(request, permission), true);
    });
});