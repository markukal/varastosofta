const bcrypt = require('bcrypt');
const passport = require('passport');
const mysql = require('mysql');
const connection = require('./connection')


module.exports = 

    {
        // haetaan kaikki käyttäjän kentät paitsi salasana
        fetchAll: function (req, res) {
            var columns = ['kayttajaID', 'luokkaID', 'kayttajatunnus', 'kayttoOikeus']
            connection.query('SELECT ?? FROM kayttajat', [columns], function(error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa käyttäjiä, syy " + error);
                    res.send({"status":500, "error": error, "response": null});
                }
                else
                {
                    console.log("Käyttäjien haku onnistui.");
                    res.send({"status": 201});
                }
            });
        },
        register: async function (req, res) {
            var luokkaID = req.query.luokkaID;
            var kayttajatunnus = req.query.kayttajatunnus;
            // salasanan suolaus + hashaus
            const hashedPassword = await bcrypt.hash(req.query.salasana, 10);
            var kayttoOikeus = req.query.kayttoOikeus;
            // console.log(hashedPassword);

            var columns = ['luokkaID', 'kayttajatunnus', 'salasana', 'kayttoOikeus']
            connection.query('INSERT INTO ?? (??) VALUES (?,?,?,?)', ['kayttajat', columns, luokkaID, kayttajatunnus, hashedPassword, kayttoOikeus], function(error, results, fields) {
                if (error) {
                    console.log("Virhe lisättäessä uutta käyttäjää, syy " + error);
                    res.send({"status":500, "error": error, "response": null});
                }
                else
                {
                    console.log("Rekisteröinti onnistui.");
                    res.send({"status": 201});
                }
            });
        }

    }


