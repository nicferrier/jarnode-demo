const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const indexer = require("serve-index");
const SSE = require("sse-node");
const http = require("http");
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');

const app = express();

exports.boot = function (port, options) {
    let opts = options != undefined ? options : {};
    let rootDir = opts.rootDir != undefined ? opts.rootDir : __dirname + "/www";
    let jsFile = opts.jsFile != undefined ? opts.jsFile : "/index.js";

    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use("/nichat", express.static(rootDir));
    
    app.get("/", function (req, response) {
        console.log("redirecting to routed path /nichat");
        response.redirect("/nichat");
    });


    // Chats

    app.get("/test/", function (req, response) {
        response.json({"hello": "world"});
    });

    app.listen(7001, "localhost", function () {
        console.log("hello Pri!");
    });
}

exports.boot();
