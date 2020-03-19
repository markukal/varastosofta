// Määritetään tarvittavat moduulit
var express = require('express');
var cookieparser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var path = require('path');
//Käytettävät tietokantafunktiot
var klistat = require('./control/klistat');
var users = require('./control/users');
var tarvikkeet = require('./control/tarvikkeet');
var varastot = require('./control/varastot');
var klistat = require('./control/klistat');
var yksikot = require('./control/yksikot');
var tarviketyypit = require('./control/tarviketyypit');
var tapahtumatyypit = require('./control/tapahtumatyypit');
var ostoskori = require('./control/ostoskori');

const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;

// TARVITAAN AUTENTIKOINTIIN
require('./control/passport-config')(passport);

var app = express();

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
app.use(express.static(path.join(__dirname, './public')));

// tarvitaan passportia varten. express session
app.use(session({
    secret: 'satunnaistatekstia',
    resave: true,
    saveUninitialized: true
})); 

// passport middleware
app.use(passport.initialize());
app.use(passport.session()); // autentikoituneena pysyminen
app.use(flash()); // käytetään virheviesteihin kirjautumisen epäonnistuessa

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
    .get(users.fetchAll)
    .post(users.register)
    .put(users.update);

app.get('/login',  function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect : '/' ,
    failureRedirect : '/login',
    failureFlash: true
}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/', checkAuthenticated, function (req, res) {
    res.render('index.ejs', {
        kayttoOikeus: req.user.kayttoOikeus,
        luokka: req.user.luokkaID
    });
});

app.get('/yhteenveto', checkAuthenticated, function (req, res) {
    res.render('yhteenveto.ejs', {
        kayttoOikeus: req.user.kayttoOikeus,
        luokka: req.user.luokkaID
    });
});

app.get('/asetukset', checkAuthenticated,( req, res) => {
    // opettajan kayttooikeus = 1 , oppilaan = 2
    console.log(req.user.kayttoOikeus)
    if (req.user.kayttoOikeus == "1") {
        res.render('asetukset.ejs');
    }
    else {
        // mahdollisesti jonkinlainen varoitussivu käyttöoikeuksien puuttumisesta, tai redirect edelliselle sivulle
        // res.redirect('back')
        res.redirect('/login')
    }
});

app.get('/kerailylista', (req, res) => {
    res.render('kerailylista.ejs');
});

app.get('/ostoskorisivu', (req, res) => {
    res.render('ostoskorisivu.ejs');
});

app.get('/hallinnointi', (req, res) => {
    res.render('hallinnointi.ejs');
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
