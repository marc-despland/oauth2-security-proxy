'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
const fs = require('fs');
const axios = require('axios');

var debug=true;

var host = process.env.LISTEN_HOST || "0.0.0.0";
var port = process.env.LISTEN_PORT || 8080;
var target = process.env.DESTINATION || "http://192.168.1.32:1026";
var idm = process.env.IDM_SERVER || "http://172.17.0.1:3000";
var proxy_app_id= process.env.PROXY_APP_ID || "60be3e8d0174f328";

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
    var permissions= await authorize(receivedRequest);
    if (permissions.length>0) {
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
    } else {
        var response= {
            status: 401,
            headers: {}
        }
        return response;
    }
}



async function authorize(request) {
    if (request.headers.hasOwnProperty("x-auth-token")) {
        var user=await requestAuthorize(request.headers["x-auth-token"])
        if (user.hasOwnProperty("app_id")) {
            if (user.app_id===proxy_app_id) {
                var permission={
                    check_response: false
                }
                var perms=[];
                perms.push(permission);
                return perms;
            } else {
                if (debug) console.log("Token not generated forr the right app_id "+JSON.stringify(user, null, 4));
                return [];
            }
        } else {
            if (debug) console.log("Missing response app_id "+JSON.stringify(user, null, 4));
            return [];
        }
    } else {
        if (debug) console.log("Missing token X-Auth-Token")
        return [];
    }
}


async function requestAuthorize(token) {
    var request = {
        maxRedirects: 0,
        method: "GET",
        url: idm+"/user?access_token="+token,
        headers: {}
    };
    try {
        var response=await axios.request(request);
        if (response.status===200){
            return response.data;
        } else {
            if (debug) console.log("requestAuthorize : Response not 200 "+response.status);
            return {}
        }
    } catch (Error) {
        if (debug) console.log("requestAuthorize : error in request "+JSON.stringify(request, null, 4));
        return {}
    }
}

oauth2.listen(port, host, function () {
    console.log("Listening on " + host + ", port " + port);
});