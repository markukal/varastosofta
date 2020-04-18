// Määritetään tarvittavat moduulit
var express = require('express');
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
var luokat = require('./control/luokat');
var varastotapahtumat = require('./control/varastotapahtumat');

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

// ejs
app.set('view-engine', 'ejs')
// app.engine('html', require('ejs').renderFile);

app.use(express.urlencoded({ extended: true}));

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
    .get(checkAuthenticated, klistat.fetchAll)
    .post(checkAuthenticated, klistat.addNew)
    .put(checkAuthenticated, klistat.update)
    .delete(checkAuthenticated, checkPermissions, klistat.delete);

app.route('/tarvikkeet')
    .get(checkAuthenticated, tarvikkeet.fetchAll)
    .post(checkAuthenticated, tarvikkeet.addNew)
    .put(checkAuthenticated, tarvikkeet.update)
    .delete(checkAuthenticated, checkPermissions, tarvikkeet.delete);

app.route('/varastot')
    .get(checkAuthenticated, varastot.fetchAll)
    .post(checkAuthenticated, checkPermissions, varastot.addNew)
    .put(checkAuthenticated, checkPermissions, varastot.update)
    .delete(checkAuthenticated, checkPermissions, varastot.delete);

app.route('/yksikot')
    .get(checkAuthenticated, yksikot.fetchAll)
    .post(checkAuthenticated, yksikot.addNew)
    .put(checkAuthenticated, checkPermissions, yksikot.update)
    .delete(checkAuthenticated, checkPermissions, yksikot.delete);

app.route('/tarviketyypit')
    .get(checkAuthenticated, tarviketyypit.fetchAll)
    .post(checkAuthenticated, tarviketyypit.addNew)
    .put(checkAuthenticated, checkPermissions, tarviketyypit.update)
    .delete(checkAuthenticated, checkPermissions, tarviketyypit.delete);

app.route('/tapahtumatyypit')
    .get(checkAuthenticated, tapahtumatyypit.fetchAll)
    .post(checkAuthenticated, tapahtumatyypit.addNew)
    .put(checkAuthenticated, tapahtumatyypit.update)
    .delete(checkAuthenticated, tapahtumatyypit.delete);

app.route('/ostoskori')
    .get(checkAuthenticated, ostoskori.fetchAll)
    .post(checkAuthenticated, ostoskori.addNew)
    .put(checkAuthenticated, ostoskori.update)
    .delete(checkAuthenticated, ostoskori.delete);

app.route('/luokat')
    .get(checkAuthenticated, luokat.fetchAll)
    .post(checkAuthenticated, checkPermissions, luokat.addNew)
    .put(checkAuthenticated, checkPermissions, luokat.update)
    .delete(checkAuthenticated, checkPermissions, luokat.delete);

app.route('/varastotapahtumat')
    .get(checkAuthenticated, varastotapahtumat.fetchAll)
    .post(checkAuthenticated, varastotapahtumat.addNew)
    .put(checkAuthenticated, varastotapahtumat.update)
    .delete(checkAuthenticated, varastotapahtumat.delete);

app.route('/users')
    .get(checkAuthenticated, checkPermissions, users.fetchAll)
    .post(checkAuthenticated, checkPermissions, users.register)
    .put(checkAuthenticated, checkPermissions, users.update)
    .delete(checkAuthenticated, checkPermissions, users.delete)

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
    res.render('yhteenveto.ejs', {
        kayttoOikeus: req.user.kayttoOikeus,
        luokka: req.user.luokkaID,
        kayttajatunnus: req.user.kayttajatunnus
    });
});

app.get('/kayttajienhallinta', checkAuthenticated,( req, res) => {
    // opettajan kayttooikeus = 1 , oppilaan = 2
    if (req.user.kayttoOikeus == "1") {
        res.render('kayttajienhallinta.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID,
        });
    }
    else {
        res.redirect('/login')
    }
});

app.get('/varastojenhallinta', checkAuthenticated,( req, res) => {
    // opettajan kayttooikeus = 1 , oppilaan = 2
    if (req.user.kayttoOikeus == "1") {
        res.render('varastojenhallinta.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID
        });
    }
    else {
        res.redirect('/login')
    }
});

app.get('/luokkienhallinta', checkAuthenticated,( req, res) => {
    // opettajan kayttooikeus = 1 , oppilaan = 2
    if (req.user.kayttoOikeus == "1") {
        res.render('luokkienhallinta.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID
        });
    }
    else {
        res.redirect('/login')
    }
});


app.get('/tarviketyyppienhallinta', checkAuthenticated,( req, res) => {
    // opettajan kayttooikeus = 1 , oppilaan = 2
    if (req.user.kayttoOikeus == "1") {
        res.render('tarviketyyppienhallinta.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID
        });
    }
    else {
        res.redirect('/login')
    }
});

app.get('/yksikoidenhallinta', checkAuthenticated,( req, res) => {
    // opettajan kayttooikeus = 1 , oppilaan = 2
    if (req.user.kayttoOikeus == "1") {
        res.render('yksikoidenhallinta.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID
        });
    }
    else {
        res.redirect('/login')
    }
});

app.get('/tapahtumat', checkAuthenticated,( req, res) => {
    // opettajan kayttooikeus = 1 , oppilaan = 2
    if (req.user.kayttoOikeus == "1") {
        res.render('tapahtumat.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID
        });
    }
    else {
        res.redirect('/login')
    }
});

app.get('/kerailylista', (req, res) => {
    res.render('kerailylista.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID
        }); 
}); 

app.get('/noutolista', (req, res) => {
    res.render('ostoskorisivu.ejs', {
            kayttajatunnus: req.user.kayttajatunnus,
            kayttoOikeus: req.user.kayttoOikeus,
            kayttajaID: req.user.kayttajaID,
            luokkaID: req.user.luokkaID
        }); 
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

// tarkastetaan onko käyttäjällä täydet käyttöoikeudet
// tämä reitityksissä checkAuthenticated ja itse rest api funktiokutsun väliin
function checkPermissions(req, res, next) {
    if (req.user.kayttoOikeus === 1) {
        return next()
    }
    res.redirect('/login')
}

app.listen(port, hostname, () => {
    console.log(`Server running AT http://${hostname}:${port}/`);
});

module.exports = app.listen(port, () => console.log("Serveri pyörii portissa " + port));
