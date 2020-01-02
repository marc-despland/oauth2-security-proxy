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
        headers: [{
            name: "Fiware-Service",
            mandatory: true,
            value: "TEST",
            is_regex: false
        }],
        query: [],
        method: "GET",
        path: {
            value: "/*",
            is_regex: true
        },
        body: {}
    }
}

var path=argv.folder===undefined ? id+".json" : argv.folder+"/"+id+".json";
try {
    fs.writeFileSync(path, JSON.stringify(permission, null, 4));
} catch(error) {
    console.log("An error occurs");
}