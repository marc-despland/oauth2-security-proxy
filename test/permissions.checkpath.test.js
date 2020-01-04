const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions(null,null)

describe('Test Permissions checkPath', () => {
    it('path equal match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types",
                is_regex: false
            }
        };
        var request = {
            method: "GET",
            path: "/v2/types"
        }
        assert.equal(permissions.checkPath(request, permission), true);
    });
    it('path equal don\'t match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/entities",
                is_regex: false
            }
        };
        var request = {
            method: "GET",
            path: "/v2/types"
        }
        assert.equal(permissions.checkPath(request, permission), false);
    });
    it('path regex match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "^/v2/.*",
                is_regex: true
            }
        };
        var request = {
            method: "GET",
            path: "/v2/types"
        }
        assert.equal(permissions.checkPath(request, permission), true);
    });
    it('path regex don\'t match', () => {
        var permission = {
            method: "GET",
            path: {
                value: "^/v2/.*",
                is_regex: true
            }
        };
        var request = {
            method: "GET",
            path: "/v3/entities"
        }
        assert.equal(permissions.checkPath(request, permission), false);
    });
    it('missing path ', () => {
        var permission = {
            method: "GET"
        };
        var request = {
            method: "GET",
            path: "/v2/types"
        }
        assert.equal(permissions.checkPath(request, permission), true);
    });
    it('missing value ', () => {
        var permission = {
            method: "GET",
            path: {
                is_regex: false
            }
        };
        var request = {
            method: "GET",
            path: "/v2/types"
        }
        assert.equal(permissions.checkPath(request, permission), false);
    });
    it('missing is_regex ', () => {
        var permission = {
            method: "GET",
            path: {
                value: "/v2/types"
            }
        };
        var request = {
            method: "GET",
            path: "/v2/types"
        }
        assert.equal(permissions.checkPath(request, permission), false);
    });
});