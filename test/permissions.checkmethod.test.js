const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions("permissions.d");

describe('Test Permissions checkMethod', () => {
    it('method match', () => {
        var request = {
            method: "GET"
        };
        var permission = {
            method: "GET"
        }
        assert.equal(permissions.checkMethod(request, permission), true);
    });
    it('method don\'t match', () => {
        var request = {
            method: "GET"
        };
        var permission = {
            method: "POST"
        }
        assert.equal(permissions.checkMethod(request, permission), false);
    });
});
