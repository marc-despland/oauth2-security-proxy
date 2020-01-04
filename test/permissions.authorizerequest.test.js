const assert = require('assert');
var Permissions = require('../permissions.js')
var Roles = require('../roles.js')
var roles = new Roles( null);
var permissions = new Permissions(null, roles);

describe('Test Permissions authorizeRequest', () => {
    it('authorizeRequest passed', () => {
        var request = {
            method: "POST",
            path: "/v2/entities",
            headers: {
                "fiware-service": "Test",
                "fiware-servicepath": "/test"
            },
            query: {
                "query": "Test"
            },
            data: {
                "id": "Room2",
                "type": "Room",
                "temperature": 25.8,
                "pressure": 711
            }
        };
        var gettypes = {
            name: "GET types",
            permission: "gettypes",
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
                    presence: "forbidden"
                }
            }
        }
        var postall = {
            name: "POST all",
            permission: "gettypes",
            request: {
                method: "POST",
                path: {
                    value: "^/v2/.*",
                    is_regex: true
                },
                headers: [{
                    name: "Fiware-Service",
                    check_value: "no",
                    presence: "mandatory"
                }],
                body: {
                    presence: "mandatory",
                    id: [],
                    attributes: []
                }
            }
        }
        var postroom= {
            permission : "postroom",
            name: "post a room",
            request: {
                method: "POST",
                path: {
                    value: "/v2/entities",
                    is_regex: false
                },
                headers: [{
                    name: "Fiware-Service",
                    presence: "mandatory",
                    check_value: "equals",
                    value: "Test"
                },{
                    name: "Fiware-ServicePath",
                    presence: "mandatory",
                    check_value: "regex",
                    value: "^/.*"
                }],
                query: [{
                    name: "z",
                    presence: "forbidden"
                }],
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "json",
                        check_value: "no",
                        type: "string"
                    },{
                        name: "type",
                        presence: "mandatory",
                        check_type: "json",
                        type: "string",
                        check_value: "equals",
                        value: "Room"
                    }],
                    attributes: [{
                        name: "temperature",
                        presence: "mandatory",
                        check_type: "ngsi_standard",
                        type: "Float",
                        check_value: "no"
                    },{
                        name: "pressure",
                        presence: "mandatory",
                        check_type: "ngsi_standard",
                        type: "Integer",
                        check_value: "no"
                    }]
                }
            }
        }
        var postroom2= {
            permission : "postroom2",
            name: "post a room 2",
            request: {
                method: "POST",
                path: {
                    value: "/v2/entities",
                    is_regex: false
                },
                headers: [{
                    name: "Fiware-Service",
                    presence: "mandatory",
                    check_value: "equals",
                    value: "Test"
                },{
                    name: "Fiware-ServicePath",
                    presence: "mandatory",
                    check_value: "regex",
                    value: "^/.*"
                }],
                query: [{
                    name: "q",
                    presence: "forbidden"
                }],
                body: {
                    presence: "mandatory",
                    id: [{
                        name: "id",
                        presence: "mandatory",
                        check_type: "json",
                        check_value: "no",
                        type: "string"
                    },{
                        name: "type",
                        presence: "mandatory",
                        check_type: "json",
                        type: "string",
                        check_value: "equals",
                        value: "Room"
                    }],
                    attributes: [{
                        name: "temperature",
                        presence: "mandatory",
                        check_type: "ngsi_standard",
                        type: "Float",
                        check_value: "no"
                    },{
                        name: "pressure",
                        presence: "forbidden"
                    }]
                }
            }
        }        

        permissions.loadPermission("gettypes", gettypes);
        permissions.loadPermission("postroom", postroom);
        permissions.loadPermission("postroom2", postroom2);
        permissions.loadPermission("postall", postall);

        var admin={
            "role": "admin",
            "name": "Admin",
            "permissions": ["gettypes", "postall"]
        }
        var user={
            "role": "user",
            "name": "User",
            "permissions": ["postroom", "postroom2"]
        }
        roles.loadRole("admin", admin);
        roles.loadRole("user", user);
        var requestrole=[{
            id: "admin",
            name: "Admin"
        }, {
            id: "user",
            name: "User"
        }]
        assert.deepEqual(permissions.authorizeRequest(request, requestrole), ["postall", "postroom"]);
    });


});
