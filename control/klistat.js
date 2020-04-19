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
            
       if (req.query.klistaID == undefined && req.query.tarvikeID == undefined) {
            sqlQuery = "SELECT klistat.klistaID as ID, tarvikkeet.nimi AS nimi, yksikot.nimi AS yksikko, tarvikkeet.kuvaus AS kuvaus, tarvikkeet.maara AS maara, tarvikkeet.hinta AS hinta, tarvikkeet.hpaikka AS hpaikka, varastot.nimi AS varasto FROM klistat " + 
            "INNER JOIN tarvikkeet ON klistat.tarvikeID = tarvikkeet.tarvikeID " +
            "INNER JOIN varastot ON tarvikkeet.varastoID = varastot.varastoID " +
            "INNER JOIN yksikot ON tarvikkeet.yksikkoID = yksikot.yksikkoID;";
       }

        //Lokitetaan hakulauseke palvelimelle debuggausta varten. Tietoturvasyistä oletuksena kommentoitu
        console.log(sqlQuery);
        
        // Suoritetaan muodostettu hakulauseke.
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe haettaessa dataa klista-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {

                res.json(results);
            }
        });
    },

    // Poistaa klistaID-indeksin mukaisen rivin klistat-taulusta.
    delete: function (req, res) {

            if (req.body.klistaID == 0) {
                sqlQuery = "DELETE FROM klistat;"
            }
            else {
                sqlQuery = "DELETE FROM klistat WHERE klistaID='" + req.query.klistaID + "';"; 
            }
             
            console.log(sqlQuery);


        // Suoritetaan muodostettu hakulauseke.
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistettaessa klistat-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                res.json(results);
            }
        });

    },

    // Lisää klistat tauluun tarvikkeen.
    addNew: function (req, res) {

        var tarID = req.query.tarvikeID;

        if (tarID != "" && tarID != null) {
            sqlQuery = "INSERT INTO klistat (tarvikeID)" + " " +
            "VALUES " + "(" + "'" + tarID + "');";
        }

        console.log(sqlQuery);

        // Suoritetaan muodostettu hakulauseke.
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisattaessa dataa klista-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {

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
                sqlQuery = "UPDATE klistat SET tarvikeID ="+ tarID + " WHERE tarvikeID=" + id;
            }
    
    
            // Suoritetaan muodostettu hakulauseke.
            connection.query(sqlQuery, function (error, results, fields) {
                if (error) {
                    console.log("Virhe muokattaessa dataa klista-taulusta, syy: " + error);
                    res.send({ "status": 500, "error": error, "response": null });
                }
                else {
    
                    res.json(results);
                }
            });
    
        }

}
