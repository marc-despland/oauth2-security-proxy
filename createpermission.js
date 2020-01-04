'use strict';
const fs = require('fs');
var crypto = require('crypto');

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};


const argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .option('folder', {
        describe: "Folder where to create the permission"
    })
    .option('name', {
        describe: "Permission name"
    })
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .argv;

var id=genRandomString(16);

var permission= {
    permission : id,
    name: argv.name!==undefined ? argv.name: "",
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
            value: "TEST"
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
                presence: "mandatory",
                check_type: "ngsi_standard",
                type: "Integer",
                check_value: "no"
            }]
        }
    }
}

var path=argv.folder===undefined ? id+".json" : argv.folder+"/"+id+".json";
try {
    fs.writeFileSync(path, JSON.stringify(permission, null, 4));
} catch(error) {
    console.log("An error occurs");
}