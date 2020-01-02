'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
const fs = require('fs');
const axios = require('axios');


var host = process.env.LISTEN_HOST || "0.0.0.0";
var port = process.env.LISTEN_PORT || 8080;
var target = process.env.DESTINATION || "http://192.168.1.32:1026";


var oauth2 = express();
oauth2.use(cors());
oauth2.use(bodyParser.json());


oauth2.all('*', intercept);

async function intercept(req, res) {
    try {
        var targetResponse=await proxify(req);
        sendProxyResponse(res, targetResponse);
    } catch(targetError) {
        if ((targetError.hasOwnProperty("response")) && (targetError.response!==undefined)) {
            sendProxyResponse(res, targetError.response);
        } else {
            console.log(JSON.stringify(targetError))
            res.sendStatus(502);
        }
    }
}

function sendProxyResponse(response, targetResponse) {
    response.status(targetResponse.status);
    for(var header in targetResponse.headers) {
        if (header.toLowerCase() !== "content-length") {
            response.setHeader(header,targetResponse.headers[header]);
        }
    }
    if ((targetResponse.hasOwnProperty("data")) && (targetResponse.data!==undefined)) {
        response.send(targetResponse.data);
    } else {
        response.end();
    }
}

async function proxify(receivedRequest) {
    var url = target+receivedRequest.path;
    var query="?";
    for(var queryparam in receivedRequest.query) {
        query += query==="?" ? "" : "&";
        query += queryparam+"="+receivedRequest.query[queryparam];
    }
    if (query!=="?") url+=query;
    var request = {
        maxRedirects: 0,
        method: receivedRequest.method,
        url: url,
        headers: {}
    };
    for(var header in receivedRequest.headers) {
        if (header.toLowerCase() !== "content-length") {
            request.headers[header]=receivedRequest.headers[header];
        }
    }
    return  await axios.request(request);
}

oauth2.listen(port, host, function () {
    console.log("Listening on " + host + ", port " + port);
});