var sqlQuery;
var connection = require('./connection');

module.exports =
{
    //Tietojen haku varastot taulusta
    fetchAll: function (req, res) {

        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT varastot.varastoID AS ID, varastot.nimi AS nimi FROM varastot";
        /*
        var i = 0;//Apumuuttuja

        //Käydään req.query läpi ja lisätään hakuun ehdot 
        for (var key in req.query){

            if(!req.query[key] == "" || !req.query[key] == undefined || !req.query[key] == null){
                if(i > 0){
                    sqlQuery = sqlQuery + " OR "+ key + " LIKE '%" + req.query[key] + "%'";
                }
                else {
                    sqlQuery = sqlQuery + " WHERE " + key + " LIKE '%" + req.query[key] + "%'";
                    i++;
                }
            }
        }
        */

        // haetaan halutun varaston nimi muokkaamista / poistoa varten. Ylläoleva, kommentoitu koodi joutaa kenties poistoon?
        if (typeof req.query.mvarastoID !== 'undefined' && req.query.mvarastoID !== null) {
            connection.query('SELECT nimi FROM varastot WHERE varastoID = "' + req.query.mvarastoID + '"', function (error, results) {
                if (error) {
                    console.log("Virhe haettaessa varastoja, syy " + error);
                    res.send({ "status": 500, "error": error, "response": null });
                }
                else {
                    res.json(results);
                    console.log("Varastojen haku onnistui.");
                }
            });
        } else {
            connection.query(sqlQuery, function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa varastot-taulusta, syy: " + error);
                    res.send({ "status": 500, "error": error, "response": null });
                }
                else {
                    //console.log("Data = " + JSON.stringify(results));
                    //console.log("Params = " + JSON.stringify(req.query));

                    res.json(results);
                }
            });
        }
    },

    //Uuden varaston lisäys
    addNew: function (req, res) {
        var nimi = req.query.nimi;
        connection.query('INSERT INTO varastot (nimi) VALUES (?)', [nimi], function (error, results) {
            if (error) {
                console.log("Virhe lisätessä dataa varastot-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                console.log("Varaston lisäys onnistui.");
                res.send({ "status": 201 });
            }
        });
    },

    //Varaston tietojen päivitys
    update: function (req, res) {
        var nimi = req.query.mnimi;
        var varastoID = req.query.mvarastoID;

        connection.query('UPDATE varastot SET nimi = ? WHERE varastoID = ?', [nimi, varastoID], function (error, results) {
            if (error) {
                console.log("Virhe päivittäessä dataa varastot-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                res.json(results);
                console.log("Varaston muokkaus onnistui.");
            }
        });
    },

    //Varaston poisto
    delete: function (req, res) {
        var varastoID = req.query.varastoID;

        //sqlQuery = "DELETE FROM varastot WHERE varastoID=" + connection.escape(req.query.varastoID);

        connection.query('DELETE FROM varastot WHERE varastoID = ?', [varastoID], function (error, results) {
            if (error) {
                console.log("Virhe poistaessa dataa varastot-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                console.log("Varaston poistaminen onnistui.");
                res.send({ "status": 201 });
            }
        });
    }

}