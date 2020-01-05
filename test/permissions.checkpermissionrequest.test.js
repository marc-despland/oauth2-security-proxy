const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions(null, null);

describe('Test Permissions checkPermissionRequest', () => {
    it('Permission passed', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), true);
    });

    it('Permission passed no method', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), true);
    });

    it('Permission passed no path', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), true);
    });

    it('Permission passed no query', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), true);
    });

    it('Permission passed no headers', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), true);
    });
    it('Permission passed no body', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }]
            }
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), true);
    });
    
    it('Permission failed with method', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "POST",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), false);
    });
    it('Permission failed with path', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/entities",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), false);
    });
    it('Permission failed with header', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-ServicePath",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), false);
    });
    it('Permission failed with query', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "failed",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), false);
    });
    it('Permission failed with body', () => {
        var request = {
            method: "GET",
            path: "/v2/types",
            headers: {
                "fiware-service": "Test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": "my data",
                "pressure": 711
            }
        };
        var permission = {
            name: "mytest",
            permission: "mytest",
            request: {
                method: "GET",
                path: {
                    value: "/v2/types",
                    is_regex: false
                },
                query: [{
                    name: "query",
                    check_value: "no",
                    presence: "mandatory"
                }],
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
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
                        value: 711
                    }]
                }
            }
        }
        permissions.loadPermission("mytest", permission);
        assert.equal(permissions.checkPermissionFormat(permission, "mytest"), true)
        assert.equal(permissions.checkPermissionRequest(request, "mytest"), false);
    });
});
