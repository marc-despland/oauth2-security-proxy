const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions(null, null);

describe('Test Permissions checkPermissionRequestFormat', () => {
    it('permission minimum', () => {
        var permission = {
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission method good', () => {
        var permission = {
            method:"GET"
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission method not a string', () => {
        var permission = {
            method: true
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission method not in list', () => {
        var permission = {
            method: "JUMP"
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission path good', () => {
        var permission = {
            path:{
                value: "/v2/.*",
                is_regex: true
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission path missing value', () => {
        var permission = {
            path:{
                is_regex: true
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission path missing is_regex', () => {
        var permission = {
            path:{
                value: "/v2/.*"
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission path value not a string', () => {
        var permission = {
            path:{
                value: 42,
                is_regex: true
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission path is_regex not boolean', () => {
        var permission = {
            path:{
                value: "/v2/.*",
                is_regex: 0
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers empty', () => {
        var permission = {
            headers:[]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission headers one header passed', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission headers one header missing name', () => {
        var permission = {
            headers:[{
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers one header name not a string', () => {
        var permission = {
            headers:[{
                name: 54,
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers one header missing presence', () => {
        var permission = {
            headers:[{
                name: "My-Headers"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers one header presence not in list', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "cors"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers not an array', () => {
        var permission = {
            headers:{
                name: "My-Headers",
                presence: "forbidden"
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers one header not forbidden passed', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "no"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission headers one header not forbidden missing check_value', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers one header not forbidden check_value not a string', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: 53
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers one header not forbidden check_value not in list', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "echo"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });

    it('permission headers one header not forbidden check_value not no passed', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "equals",
                value: "test"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission headers one header not forbidden check_value not no value missing', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "equals"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers one header not forbidden check_value equals value not a string', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "equals",
                value: 42
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission headers one header not forbidden check_value regex value not a string', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "regex",
                value: 42
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers two headers passed', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "equals",
                value: "test"
            },{
                name: "My-Headers-2",
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission headers two headers first failed', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "regex",
                value: 42
            },{
                name: "My-Headers-2",
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission headers two headers second failed', () => {
        var permission = {
            headers:[{
                name: "My-Headers",
                presence: "optional",
                check_value: "equals",
                value: "test"
            },{
                name: "My-Headers-2",
                presence: "hello"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query minimum', () => {
        var permission = {
            query:[]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission query not an array', () => {
        var permission = {
            query:42
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query passed', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission query one query missing name', () => {
        var permission = {
            query:[{
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query name not a string', () => {
        var permission = {
            query:[{
                name: true,
                presence: "forbidden"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query missing presence', () => {
        var permission = {
            query:[{
                name: "q"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query presence not a string', () => {
        var permission = {
            query:[{
                name: "q",
                presence: 42
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query presence not in list', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "hello"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query presence not forbidden', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "no"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission query one query presence not forbidden missing check_value', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query presence not forbidden check_value not a string', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: 42
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query presence not forbidden check_value not in list', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "fox"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query presence not forbidden check_value not equals value string', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "equals",
                value: "fox"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission query one query presence not forbidden check_value equals value not string', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "equals",
                value: 42
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });

    it('permission query one query presence not forbidden check_value equals value missing', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "equals"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission query one query presence not forbidden check_value regex value string', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "regex",
                value: "fox"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission query one query presence not forbidden check_value regex value not string', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "regex",
                value: 42
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });

    it('permission query one query presence not forbidden check_value regex value missing', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "regex"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });

    it('permission query two query passed', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "regex",
                value: "fox"
            },{
                name: "token",
                presence: "mandatory",
                check_value: "regex",
                value: "token.*"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });


    it('permission query two query first failed', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "god",
                check_value: "regex",
                value: "fox"
            },{
                name: "token",
                presence: "mandatory",
                check_value: "regex",
                value: "token.*"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });


    it('permission query two query second failed', () => {
        var permission = {
            query:[{
                name: "q",
                presence: "mandatory",
                check_value: "regex",
                value: "fox"
            },{
                name: "token",
                presence: "god",
                check_value: "regex",
                value: "token.*"
            }]
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });


    it('permission body minimum', () => {
        var permission = {
            body: {
                presence: "forbidden"
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });

    it('permission body not an object', () => {
        var permission = {
            body: "forbidden"
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission bodypresence missing', () => {
        var permission = {
            body: {}
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body presence not a string', () => {
        var permission = {
            body: {
                presence: 42
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body presence not in list', () => {
        var permission = {
            body: {
                presence: "fox"
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body not forbidden', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [],
                attributes: []
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });
    it('permission body not forbidden id missing', () => {
        var permission = {
            body: {
                presence: "mandatory",
                attributes: []
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body not forbidden id not an array', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: "rookie",
                attributes: []
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body not forbidden attributes missing', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: []
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body not forbidden attributes not an array', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [],
                attributes: "fox"
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body not forbidden one id one attributes passed', () => {
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
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });


    it('permission body not forbidden one id failed one attributes passed', () => {
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
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });
    it('permission body not forbidden one id passed one attributes failed', () => {
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
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });


    it('permission body not forbidden two id passed', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [{
                    name: "test",
                    presence: "forbidden"
                },{
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "no"
                }],
                attributes: []
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });

    it('permission body not forbidden two id falied,passed', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [{
                    name: "test",
                    presence: "mandatory"
                },{
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "no"
                }],
                attributes: []
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });

    it('permission body not forbidden two id passed,failed', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [{
                    name: "test",
                    presence: "forbidden"
                },{
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals"
                }],
                attributes: []
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });


    it('permission body not forbidden two attributes passed', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [],
                attributes: [{
                    name: "test",
                    presence: "forbidden"
                },{
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "no"
                }]
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), true);
    });

    it('permission body not forbidden two attributes falied,passed', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [],
                attributes: [{
                    name: "test",
                    presence: "mandatory"
                },{
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "no"
                }]
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });

    it('permission body not forbidden two attributes passed,failed', () => {
        var permission = {
            body: {
                presence: "mandatory",
                id: [],
                attributes: [{
                    name: "test",
                    presence: "forbidden"
                },{
                    name: "hello",
                    presence: "mandatory",
                    check_type: "no",
                    check_value: "equals"
                }]
            }
        }
        assert.equal(permissions.checkPermissionRequestFormat(permission), false);
    });

});
