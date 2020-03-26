const bcrypt = require('bcrypt');
const passport = require('passport');
const mysql = require('mysql');
const connection = require('./connection')


module.exports = 

    {
        // haetaan kaikki käyttäjän kentät paitsi salasana
        
        fetchAll: function (req, res) {

            // tulostetaan vain halutun käyttäjän kentät muokkaamista varten
            if (typeof req.query.mkayttajatunnus !== 'undefined' && req.query.mkayttajatunnus !== null) {
            connection.query('SELECT kayttajaID, luokat.nimi AS luokanNimi, kayttajatunnus, kayttoOikeus FROM kayttajat INNER JOIN luokat ON kayttajat.luokkaID = luokat.luokkaID WHERE kayttajat.kayttajatunnus = "' + req.query.mkayttajatunnus + '"', function(error, results, fields) {
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
 
 
            }
            // jos hakuehtoja ei ole tulostetaan kaikki käyttäjät
            else
            {
            connection.query('SELECT kayttajaID, luokat.nimi AS luokanNimi, kayttajatunnus, salasana, kayttoOikeus FROM kayttajat INNER JOIN luokat ON kayttajat.luokkaID = luokat.luokkaID', function(error, results, fields) {
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
            }
        },
        register: async function (req, res) {
            var luokkaID = req.query.luokkaID;
            var kayttajatunnus = req.query.kayttajatunnus;
            
            console.log(req.query.kayttajatunnus);
            if(req.query.salasana === req.query.salasanauudelleen && req.query.salasana !== undefined && req.query.salasana !== null) {

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
            else // jos salasana ja salasana uudelleen eivät täsmää 
            {
                console.log("salasanat ei tasmaa");
            }
        },
        update: async function (req, res) {
            var kayttajaID = req.query.mkayttajaID;
            var luokkaID = req.query.mluokkaID;
            var kayttajatunnus = req.query.mkayttajatunnus;
            var salasana = req.query.msalasana;
            var kayttoOikeus = req.query.mkayttoOikeus;


            if(req.query.msalasana === req.query.msalasanauudelleen) {
                const hashedPassword = await bcrypt.hash(req.query.msalasana, 10);

                // tarkastetaan onko käyttäjän antama käyttäjätunnus sama kuin jo ennestään oleva
                connection.query('SELECT * FROM kayttajat WHERE kayttajatunnus = ?', [kayttajatunnus], function(error, rows, fields) {
                    if (error) {
                        console.log("testtesttest");
                        console.log("Virhe muokattaessa käyttäjää, syy " + error);
                        res.send({"status":500, "error": error, "response": null});
                    }
                    // jos käyttäjätunnus on sama niin päivitetään kaikki muut kentät paitsi kayttajatunnus
                    if (rows[0].kayttajatunnus === kayttajatunnus) {
                        connection.query('UPDATE kayttajat SET luokkaID = ?, salasana = ?, kayttoOikeus = ? WHERE kayttajatunnus = kayttajatunnus', [luokkaID, hashedPassword, kayttoOikeus], function(error, results, fields) {
                            console.log("Käyttäjän muokkaus onnistui.");
                            res.send({"status": 201});
                        });
                    } 
                    else 
                    {

                        // jos käyttäjän syöttämä käyttäjätunnus on eri kuin ennestään oleva, päivitetään se
                        connection.query('UPDATE kayttajat SET luokkaID = ?, kayttajatunnus = ?, salasana = ?, kayttoOikeus = ? WHERE kayttajatunnus = kayttajatunnus', [luokkaID, kayttajatunnus, hashedPassword, kayttoOikeus], function(error, results, fields) {
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
                    }
                });
            }
            else // jos salasana ja salasana uudelleen eivät täsmää
            {
                // TODO: connect-flash errorviestit,, mahdollisesti myös muihin kenttiin 
                console.log("salasanat ei tasmaa");
                res.send();
            }
        },
        delete: function (req, res) {
            // TODO: tarkistus ettei kirjautuneena oleva käyttäjä pysty poistamaan itseään
            // TAI jonkinlainen pääkäyttäjä jota ei pysty poistamaan
            //
            var kayttajaID = req.query.kayttajaID;
            connection.query('DELETE FROM kayttajat WHERE kayttajatunnus = ?', [kayttajatunnus], function(error, results, fields) {
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


