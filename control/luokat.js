const mysql = require('mysql');
const connection = require('./connection')

module.exports =

    {
        fetchAll: function (req, res) {
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
    }
