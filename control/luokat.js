const mysql = require('mysql');
const connection = require('./connection')

module.exports =

    {
        fetchAll: function (req, res) {

            console.log(req.query.mluokkaID);
            // haetaan vain halutun luokan nimi muokkaamista varten
            if (typeof req.query.mluokkaID !== 'undefined' && req.query.mluokkaID !== null) {
                connection.query('SELECT nimi FROM luokat WHERE luokkaID = "' + req.query.mluokkaID + '"', function (error, results) {
                    if (error) {
                        console.log("Virhe haettaessa käyttäjiä, syy " + error);
                        res.send({"status":500, "error": error, "response": null});
                    }
                    else 
                    {
                        res.json(results);
                        console.log("Luokkien haku onnistui.");
                    }
                });
            }
            else 
            {
                // haetaan kaikki luokat
                connection.query('SELECT * FROM luokat', function(error, results) {
                    if (error) {
                        console.log("Virhe haettaessa luokkia, syy " + error);
                        res.send({"status":500, "error": error, "response": null});
                    }
                    else
                    {
                        res.json(results);
                        console.log("Luokkien haku onnistui");
                    }
                });
            }
        },
        addNew: function (req, res) {
            var nimi = req.query.nimi;
            connection.query('INSERT INTO luokat (nimi) VALUES (?)', [nimi], function (error, results) {
                if (error) {
                    console.log("Virhe lisättäessä uutta luokkaa, syy " + error);
                    res.send({"status":500, "error": error, "response": null});
                }
                else 
                {
                    console.log("Luokan lisäys onnistui.");
                    res.send({"status": 201});
                }
            });
        },
        update: function (req, res) {
            var nimi = req.query.mnimi;
            var luokkaID = req.query.mluokkaID;
            connection.query('UPDATE luokat SET nimi = ? WHERE luokkaID = ?', [nimi, luokkaID], function(error, results) {
                if (error) {
                    console.log("Virhe muokatessa luokkaa, syy " + error);
                    res.send({"status":500, "error": error, "response": null});
                }
                else
                {
                    res.json(results);
                    console.log("Luokan muokkaus onnistui.");
                }
            });
        },
        delete: function (req, res) {
            var luokkaID = req.query.luokkaID;
            connection.query('DELETE FROM luokat WHERE luokkaID = ?', [luokkaID], function(error, results) {
                if (error) {
                    console.log("Virhe poistaessa luokkaa, syy " + error);
                    res.send({"status":500, "error": error, "response": null});
                }
                else
                {
                    console.log("Luokan poistaminen onnistui.");
                    res.send({"status": 201});
                }
            });
        }
    }
