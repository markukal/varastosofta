var express = require('express');
var klista = require('./klista');
var cookieparser = require('cookie-parser');

const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

var app = express();
// Määrittelevät selaimen kautta käytettävät tiedostot.
//app.use(express.static(__dirname + '/www'));
//app.use(express.static(__dirname + '/www/images'));


var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
//app.use(cookieparser);



app.use(express.static('/'));

app.route('/collection')
    .get(klista.fetchAll);


app.get('/', function (request, response) {

    /* if (request.cookies.userData == null) {
             response.redirect("/login");
         }
         else {
             fs.readFile("front.html", function (err, data) {
                 response.writeHead(200, { 'Content-Type': 'text/html' });
                 response.write(data);
                 response.end();
             });
         } */
         fs.readFile("./welcome.html", function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();  
        });   
    });
     
     
    app.listen(port, hostname, () => {
        console.log(`Server running AT http://${hostname}:${port}/`);
    });
