const bcrypt = require('bcrypt');
const passport = require('passport');
const mysql = require('mysql');
const connection = require('./connection')


module.exports = 

    {
        register: async function (req, res) {
            var luokkaID = req.query.luokkaID;
            var etunimi = req.query.etunimi;
            var sukunimi = req.query.sukunimi;
            var kayttajatunnus = req.query.kayttajatunnus;
            // salasanan suolaus + hashaus
            const hashedPassword = await bcrypt.hash(req.query.salasana, 10);
            var kayttoOikeus = req.query.kayttoOikeus;
            // console.log(hashedPassword);

            connection.query('INSERT INTO kayttajat (luokkaID, etunimi, sukunimi, kayttajatunnus, salasana, kayttoOikeus) VALUES ("' + luokkaID + '", "'+ etunimi + '", "' + sukunimi + '", "' + kayttajatunnus + '", "' + hashedPassword + '", "' + kayttoOikeus + '")', function(error, results, fields) {
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


