var sqlQuery;
var connection = require('./connection');

module.exports =
{
    //Tietojen haku tarviketyypit taulusta
    fetchAll: function (req, res) {
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT tarviketyypit.tyyppiID AS ID, tarviketyypit.nimi AS tyyppi FROM tarviketyypit";
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
        
        // haetaan halutun tarviketyypin nimi muokkaamista / poistoa varten. Ylläoleva, kommentoitu koodi joutaa kenties poistoon?
        if (typeof req.query.mttyyppiID !== 'undefined' && req.query.mttyyppiID !== null) {
            connection.query('SELECT nimi FROM tarviketyypit WHERE tyyppiID = "' + req.query.mttyyppiID + '"', function (error, results) {
                if (error) {
                    console.log("Virhe haettaessa tarviketyyppejä, syy " + error);
                    res.send({ "status": 500, "error": error, "response": null });
                }
                else {
                    res.json(results);
                    console.log("Tarviketyyppien haku onnistui.");
                }
            });
        } else {
            connection.query(sqlQuery, function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa tarviketyypit-taulusta, syy: " + error);
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

    //Uuden tarviketyypin lisäys
    addNew: function (req, res) {
        var nimi = req.query.nimi;
        connection.query('INSERT INTO tarviketyypit (nimi) VALUES (?)', [nimi], function (error, results) {
            if (error) {
                console.log("Virhe lisätessä dataa tarviketyypit-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                console.log("Tarviketyypin lisäys onnistui.");
                res.send({ "status": 201 });
            }
        });
    },

    //Tarviketyypin tietojen päivitys
    update: function (req, res) {
        var nimi = req.query.mnimi;
        var ttyyppiID = req.query.mttyyppiID;

        connection.query('UPDATE tarviketyypit SET nimi = ? WHERE tyyppiID = ?', [nimi, ttyyppiID], function (error, results) {
            if (error) {
                console.log("Virhe päivittäessä dataa tarviketyypit-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                res.json(results);
                console.log("Tarviketyypin muokkaus onnistui.");
            }
        });
    },

    //Tarviketyypin poisto
    delete: function (req, res) {
        var ttyyppiID = req.query.tyyppiID;
        //sqlQuery = "DELETE FROM tarviketyypitt WHERE tyyppiID=" + connection.escape(req.query.ttyyppiID);

        connection.query('DELETE FROM tarviketyypit WHERE tyyppiID = ?', [ttyyppiID], function (error, results) {
            if (error) {
                console.log("Virhe poistaessa dataa tarviketyypit-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                console.log("Tarviketyypin poistaminen onnistui.");
                res.send({ "status": 201 });
            }
        });
    }

}