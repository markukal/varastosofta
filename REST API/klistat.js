var sqlQuery;
var connection = require('./connection')

/*var connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'varasto',
    timezone: 'Europe/Helsinki'

});
*/


module.exports =
{

    // Hakee klistat-taulusta kaikki rivit. Jos tulee parametrejä, suodatetaan tulos niiden mukaan.
    fetchAll: function (req, res) {
            
        if (req.query.klistaID == "" &&  req.query.tarvikeID == "") {
            sqlQuery = "SELECT * FROM klistat;"
        }
        else if (req.query.tyoteID == undefined && req.query.proNimi == undefined) {
            sqlQuery = "SELECT * FROM klistat;"
        }


        //Lokitetaan hakulauseke palvelimelle debuggausta varten. Tietoturvasyistä oletuksena kommentoitu
        //console.log(sqlQuery);
        
        // Suoritetaan muodostettu hakulauseke.
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe haettaessa dataa klista-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                /*console.log("Data = " + JSON.stringify(results));
                console.log("Params = " + JSON.stringify(req.query));*/

                res.json(results);
            }
        });
    },

    // Poistaa klistaID-indeksin mukaisen rivin klistat-taulusta.
    delete: function (req, res) {

        if (req.query.klistaID == "" && req.query.klistaID == undefined) {
            sqlQuery = "DELETE * FROM klistat;"
        }
        else if (req.query.klistaID != "") {
            sqlQuery = "DELETE FROM klistat WHERE klistaID='" + req.query.klistaID + "';";  
        }


        // Suoritetaan muodostettu hakulauseke.
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistettaessa klista-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                /*console.log("Data = " + JSON.stringify(results));
                console.log("Params = " + JSON.stringify(req.query));*/
                res.json(results);
            }
        });

    },

    // Lisää klistat tauluun tarvikkeen.
    addNew: function (req, res) {

        var tarID = req.query.tarvikeID;
        var pv = req.query.pvm;

        if (tarID != "" && tarID != null && pv != "" && pv != undefined) {
            sqlQuery = "INSERT INTO klistat (tarvikeID, pvm)" + " " +
            "VALUES " + "(" + "'" + tarID + "'" + "," 
            + "'" + pv + "'" + ")" + ";";
        }

        console.log(sqlQuery);

        // Suoritetaan muodostettu hakulauseke.
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisattaessa dataa klista-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                /*console.log("Data = " + JSON.stringify(results));
                console.log("Params = " + JSON.stringify(req.query));*/

                res.json(results);
            }
        });

    },

        // Päivittää klistat taulusta parametrien mukaisen tarvikkeen.
        update: function (req, res) {

            var tarID = req.query.tarvikeID;
            var pv = req.query.pvm;
            var id = req.query.klistaID;
    
            if (tarID != "" && tarID != undefined && tarID != null && pv != "" && pv != undefined && pv != null) {
                sqlQuery = "UPDATE klistat SET tarvikeID ="+ tarID + ", pvm =" + pv + " WHERE tarvikeID=" + id;
            }
    
    
            // Suoritetaan muodostettu hakulauseke.
            connection.query(sqlQuery, function (error, results, fields) {
                if (error) {
                    console.log("Virhe muokattaessa dataa klista-taulusta, syy: " + error);
                    res.send({ "status": 500, "error": error, "response": null });
                }
                else {
                    /*console.log("Data = " + JSON.stringify(results));
                    console.log("Params = " + JSON.stringify(req.query));*/
    
                    res.json(results);
                }
            });
    
        }

}
