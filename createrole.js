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
    .option('roleid', {
        describe: "Roleid to create"
    })
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2019')
    .argv;

var id=argv.roleid===undefined ? genRandomString(16) : argv.roleid;

var role= {
    role : id,
    name: argv.name!==undefined ? argv.name: "",
    permissions: []
}

var path=argv.folder===undefined ? id+".json" : argv.folder+"/"+id+".json";
try {
    fs.writeFileSync(path, JSON.stringify(role, null, 4));
} catch(error) {
    console.log("An error occurs");
}