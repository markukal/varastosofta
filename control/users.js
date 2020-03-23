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
                    res.json(results);
                    console.log("Käyttäjien haku onnistui.");
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
        },
        update: async function (req, res) {
            var kayttajaID = req.query.kayttajaID;
            var luokkaID = req.query.luokkaID;
            var kayttajatunnus = req.query.kayttajatunnus;
            var salasana = req.query.salasana;
            var kayttoOikeus = req.query.kayttoOikeus;
            
            const hashedPassword = await bcrypt.hash(req.query.salasana, 10);

            connection.query('UPDATE kayttajat SET luokkaID = ?, kayttajatunnus = ?, salasana = ?, kayttoOikeus = ? WHERE kayttajaID = ?', [luokkaID, kayttajatunnus, hashedPassword, kayttoOikeus, kayttajaID], function(error, results, fields) {
                    if (error) {
                    console.log("Virhe muokattaessa käyttäjää, syy " + error);
                    res.send({"status":500, "error": error, "response": null});
                }
                else 
                {
                    console.log("Käyttäjän muokkaus onnistui.");
                    res.send({"status": 201});
                }
        });

    },
        delete: function (req, res) {
            // TODO: tarkistus ettei kirjautuneena oleva käyttäjä pysty poistamaan itseään
            // TAI jonkinlainen pääkäyttäjä jota ei pysty poistamaan
            //
            var kayttajaID = req.query.kayttajaID;
            connection.query('DELETE FROM kayttajat WHERE kayttajaID = ?', [kayttajaID], function(error, results, fields) {
                if (error) {
                    console.log("Virhe poistaessa käyttäjää, syy " + error);
                    res.send({"status":500, "error": error, "response": null});
                }
                else 
                {
                    console.log("Käyttäjän poistaminen onnistui.");
                    res.send({"status": 201});
                }
                });
            }

    }


