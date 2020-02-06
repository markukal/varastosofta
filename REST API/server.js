var express = require('express');
var controller = require('./controller');
var cookieparser = require('cookie-parser');

const http = require('http');
const hostname = '127.0.0.1';


// Määrittelevät selaimen kautta käytettävät tiedostot.
app.use(express.static(__dirname + '/www'));
app.use(express.static(__dirname + '/www/images'));


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(cookieparser);


app.use(express.static('/'));

app.route('/collection')
    .get(controller.collection)
    .post(controller.collection)
    .delete(controller.collection);