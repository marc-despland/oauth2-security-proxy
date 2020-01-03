const assert = require('assert');
var Permissions = require('../permissions.js')
var permissions = new Permissions("permissions.d");

describe('Test Permissions checkAttributeType', () => {
    it('check_type=no', () => {
        var attribute = null;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "no",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    //********************************************
    //Text
    it('check_type=standard normalized type Text ok', () => {
        var attribute = {
            type: "Text",
            value: "text"
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard keyvalue type Text ok', () => {
        var attribute = "text";
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard normalized type Text wrong type', () => {
        var attribute = {
            type: "Integer",
            value: 2
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard normalized type Text wrong value', () => {
        var attribute = {
            type: "Text",
            value: 2
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard keyvalue type Text wrong', () => {
        var attribute = 2;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Text",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    //********************************************
    //Integer
    it('check_type=standard normalized type Integer ok', () => {
        var attribute = {
            type: "Integer",
            value: 2
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Integer",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard keyvalue type Integer ok', () => {
        var attribute = 2;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Integer",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard normalized type Integer wrong type', () => {
        var attribute = {
            type: "Text",
            value: 2
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Integer",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard normalized type Integer wrong value', () => {
        var attribute = {
            type: "Integer",
            value: "text"
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Integer",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard keyvalue type Integer wrong', () => {
        var attribute = "text";
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Integer",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    //********************************************
    //Float
    it('check_type=standard normalized type Float ok', () => {
        var attribute = {
            type: "Float",
            value: 2.3
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Float",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard keyvalue type Float ok', () => {
        var attribute = 2.3;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Float",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard normalized type Float wrong type', () => {
        var attribute = {
            type: "Text",
            value: 2.3
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Float",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard normalized type Float wrong value', () => {
        var attribute = {
            type: "Float",
            value: "text"
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Float",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard keyvalue type Float wrong', () => {
        var attribute = "text";
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Float",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    //********************************************
    //Boolean
    it('check_type=standard normalized type Boolean ok', () => {
        var attribute = {
            type: "Boolean",
            value: true
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Boolean",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard keyvalue type Boolean ok', () => {
        var attribute = true;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Boolean",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard normalized type Boolean wrong type', () => {
        var attribute = {
            type: "Text",
            value: true
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Boolean",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard normalized type Boolean wrong value', () => {
        var attribute = {
            type: "Boolean",
            value: "text"
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Boolean",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard keyvalue type Boolean wrong', () => {
        var attribute = "text";
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "Boolean",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    //********************************************
    //DateTime
    it('check_type=standard normalized type DateTime ok', () => {
        var attribute = {
            type: "DateTime",
            value: "2016-08-08T10:18:16Z"
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "DateTime",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard keyvalue type DateTime ok', () => {
        var attribute = "2016-08-08T10:18:16Z";
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "DateTime",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard normalized type DateTime wrong type', () => {
        var attribute = {
            type: "Text",
            value: "2016-08-08T10:18:16Z"
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "DateTime",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard normalized type DateTime wrong value', () => {
        var attribute = {
            type: "DateTime",
            value: 22
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "DateTime",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard keyvalue type DateTime wrong', () => {
        var attribute = 22;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "DateTime",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    //********************************************
    //geo:json
    it('check_type=standard normalized type geo:json ok', () => {
        var attribute = {
            type: "geo:json",
            value: {
                "type": "Point",
                "coordinates": [
                    -0.548,
                    44.859
                ]
            }
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "geo:json",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard keyvalue type geo:json ok', () => {
        var attribute = {
            "type": "Point",
            "coordinates": [
                -0.548,
                44.859
            ]
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "geo:json",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=standard normalized type geo:json wrong type', () => {
        var attribute = {
            type: "Text",
            value: {
                "type": "Point",
                "coordinates": [
                    -0.548,
                    44.859
                ]
            }
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "geo:json",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=standard normalized type geo:json wrong value', () => {
        var attribute = {
            type: "geo:json",
            value: 22
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "geo:json",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=custom keyvalue type geo:json wrong', () => {
        var attribute = 22;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "standard",
            type: "geo:json",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    //********************************************
    //TEXT_URLENCODED
    it('check_type=custom normalized type TEXT_URLENCODED ok', () => {
        var attribute = {
            type: "TEXT_URLENCODED",
            value: "text"
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "Text",
            type: "TEXT_URLENCODED",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=custom keyvalue type TEXT_URLENCODED ok', () => {
        var attribute = "TEXT_URLENCODED";
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "Text",
            type: "TEXT_URLENCODED",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=custom normalized type TEXT_URLENCODED wrong type', () => {
        var attribute = {
            type: "Integer",
            value: 2
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "Text",
            type: "TEXT_URLENCODED",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=custom normalized type TEXT_URLENCODED wrong value', () => {
        var attribute = {
            type: "TEXT_URLENCODED",
            value: 2
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "Text",
            type: "TEXT_URLENCODED",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=custom keyvalue type TEXT_URLENCODED wrong', () => {
        var attribute = 2;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "Text",
            type: "TEXT_URLENCODED",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    //********************************************
    //Point
    it('check_type=custom normalized type Point ok', () => {
        var attribute = {
            type: "Point",
            value: { x: 2, y:3}
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "StructuredValue",
            type: "Point",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=custom keyvalue type Point ok', () => {
        var attribute = { x: 2, y:3};
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "StructuredValue",
            type: "Point",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), true);
    });
    it('check_type=custom normalized type Point wrong type', () => {
        var attribute = {
            type: "Integer",
            value: { x: 2, y:3}
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "StructuredValue",
            type: "Point",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=custom normalized type Point wrong value', () => {
        var attribute = {
            type: "Point",
            value: 2
        };
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "StructuredValue",
            type: "Point",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
    it('check_type=custom keyvalue type Point wrong', () => {
        var attribute = 2;
        var condition = {
            name: "temperature",
            presence: "optional",
            check_type: "custom",
            derived: "StructuredValue",
            type: "Point",
            check_value: "no"
        }
        assert.equal(permissions.checkAttributeType(attribute, condition), false);
    });
});
