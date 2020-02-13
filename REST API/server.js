// Määritetään tarvittavat moduulit
var express = require('express');
var users = require('./users');
var cookieparser = require('cookie-parser');

//Käytettävät sql luokat
var tarvikkeet = require('./tarvikkeet');
var varastot = require('./varastot');
var klista = require('./klista');
var yksikot = require('./yksikot');
var tarviketyypit = require('./tarviketyypit');

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

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}));

app.use(express.static('/'));

// Reitit tietokantafunktioihin.
app.route('/klista')
    .get(klista.fetchAll)
    .delete(klista.remove)
    .put(klista.add);

app.route('/tarvikkeet')
    .get(tarvikkeet.fetchAll)
    .post(tarvikkeet.addNew)
    .put(tarvikkeet.update)
    .delete(tarvikkeet.delete);

app.route('/varastot')
    .get(varastot.fetchAll)
    .post(varastot.addNew)
    .put(varastot.update)
    .delete(varastot.delete);

app.route('/yksikot')
    .get(yksikot.fetchAll)
    .post(yksikot.addNew)
    .put(yksikot.update)
    .delete(yksikot.delete);

app.route('/tarviketyypit')
    .get(tarviketyypit.fetchAll)
    .post(tarviketyypit.addNew)
    .put(tarviketyypit.update)
    .delete(tarviketyypit.delete);

app.route('/users')
    .post(users.register);

app.get('/login',  function (req, res) {
    res.render('login.ejs')
})

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
