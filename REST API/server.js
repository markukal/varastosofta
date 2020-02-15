// Määritetään tarvittavat moduulit
var express = require('express');
var klistat = require('./klistat');
var users = require('./users');
var cookieparser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var path = require('path');
//Käytettävät tietokantafunktiot
var tarvikkeet = require('./tarvikkeet');
var varastot = require('./varastot');
var klistat = require('./klistat');
var yksikot = require('./yksikot');
var tarviketyypit = require('./tarviketyypit');
var tapahtumatyypit = require('./tapahtumatyypit');
var ostoskori = require('./ostoskori');

const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

// TARVITAAN AUTENTIKOINTIIN
require('../passport-config')(passport);

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

// ejs
app.set('view-engine', 'ejs')
app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({ extended: true}));

//app.use(express.static('/'));
// staattiset tiedostot haetaan public kansion alta. esim css tiedostot
app.use(express.static(path.join(__dirname, '../public')));

// tarvitaan passportia varten. express session
app.use(session({
    secret: 'satunnaistatekstia',
    resave: true,
    saveUninitialized: true
})); 

// passport middleware
app.use(passport.initialize());
app.use(passport.session()); // autentikoituneena pysyminen
app.use(flash());

// Reitit tietokantafunktioihin.
app.route('/klistat')
    .get(klistat.fetchAll)
    .post(klistat.addNew)
    .put(klistat.update)
    .delete(klistat.delete);
    

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

app.route('/tapahtumatyypit')
    .get(tapahtumatyypit.fetchAll)
    .post(tapahtumatyypit.addNew)
    .put(tapahtumatyypit.update)
    .delete(tapahtumatyypit.delete);

app.route('/ostoskori')
    .get(ostoskori.fetchAll)
    .post(ostoskori.addNew)
    .put(ostoskori.update)
    .delete(ostoskori.delete);

app.route('/users')
    .post(users.register);

app.get('/login',  function (req, res) {
    res.render('login.ejs')
})
app.post('/login', passport.authenticate('local', {
    successRedirect : '/' ,
    failureRedirect : '/login'
}));

app.get('/', function (req, res) {
    res.render('index.html')
    /* if (request.cookies.userData == null) {
             response.redirect("/login");
         }
         else {
             fs.readFile("front.html", function (err, data) {
                 response.writeHead(200, { 'Content-Type': 'text/html' });
                 response.write(data);
                 response.end();
             });
         } 
         fs.readFile("./welcome.html", function (err, data) {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();  
        });   
    */
    });

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
     
     
    app.listen(port, hostname, () => {
        console.log(`Server running AT http://${hostname}:${port}/`);
    });
