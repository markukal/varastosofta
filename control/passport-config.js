const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mysql = require('mysql')
const connection = require('./connection')

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log('test serialize');
        done(null, user.kayttajaID);
    });

    passport.deserializeUser(function(id, done) {
        connection.query('SELECT * FROM kayttajat WHERE kayttajaID = ' + id, function(err, rows) {
            console.log('test deserialize');
            done(err, rows[0]);
        });
    });

    passport.use(
        new LocalStrategy({
            usernameField : 'kayttajatunnus',
            passwordField : 'salasana',
            passReqToCallback : true
        },
        function(req, kayttajatunnus, salasana, done) {
            connection.query('SELECT * FROM kayttajat WHERE kayttajatunnus = "' + kayttajatunnus + '"', function(err, rows){

                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'Väärä käyttäjätunnus'));
                }
                if (!bcrypt.compareSync(salasana, rows[0].salasana))
                    return done(null, false, req.flash('loginMessage', 'Vaara salasana'));
                return done(null, rows[0]);
            });
        })
        );
        };

        
        
    
