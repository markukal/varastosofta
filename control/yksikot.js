var sqlQuery;
var connection = require('./connection');

module.exports =
{
    //Tietojen haku yksikot taulusta
    fetchAll: function (req, res) {
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT yksikot.yksikkoID AS ID, yksikot.nimi AS nimi FROM yksikot";
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
       // haetaan halutun yksikön nimi muokkaamista / poistoa varten. Ylläoleva, kommentoitu koodi joutaa kenties poistoon?
        if (typeof req.query.myksikkoID !== 'undefined' && req.query.myksikkoID !== null) {
            connection.query('SELECT nimi FROM yksikot WHERE yksikkoID = "' + req.query.myksikkoID + '"', function (error, results) {
                if (error) {
                    console.log("Virhe haettaessa yksiköitä, syy " + error);
                    res.send({ "status": 500, "error": error, "response": null });
                }
                else {
                    res.send({ "status": 201 });
                    res.json(results);
                    console.log("Yksiköiden haku onnistui.");
                }
            });
        } else {
            connection.query(sqlQuery, function (error, results, fields) {
                if (error) {
                    console.log("Virhe haettaessa yksikot-taulusta, syy: " + error);
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

    //Uuden yksikon lisäys
    addNew: function (req, res) {
        
        // sqlQuery = "INSERT INTO yksikot (yksikkoID, nimi) VALUES (" + null + ", '" + connection.escape(req.query.nimi) + "')";
        
        var nimi = req.query.nimi;
        connection.query('INSERT INTO yksikot (nimi) VALUES (?)', [nimi], function (error, results) {
            if (error) {
                console.log("Virhe lisätessä dataa yksiköt-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                console.log("Yksikön lisäys onnistui.");
                res.send({ "status": 201 });
            }
        });
    },

    //Yksikön tietojen päivitys
    update: function (req, res) {
        //sqlQuery = "UPDATE yksikot SET nimi ='" + connection.escape(req.query.nimi) + "' WHERE yksikkoID=" + connection.escape(req.query.yksikkoID);

        var nimi = req.query.mnimi;
        var yksikkoID = req.query.myksikkoID;

        connection.query('UPDATE yksikot SET nimi = ? WHERE yksikkoID = ?', [nimi, yksikkoID], function (error, results) {
            if (error) {
                console.log("Virhe päivittäessä dataa yksiköt-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                res.json(results);
                console.log("Yksikön muokkaus onnistui.");
            }
        });
    },

    //Yksikön poisto
    delete: function (req, res) {
        //sqlQuery = "DELETE FROM yksikot WHERE yksikkoID=" + connection.escape(req.query.yksikkoID);

        var yksikkoID = req.query.yksikkoID;

        connection.query('DELETE FROM yksikot WHERE yksikkoID = ?', [yksikkoID], function (error, results) {
            if (error) {
                console.log("Virhe poistaessa dataa yksiköt-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                console.log("Yksikön poistaminen onnistui.");
                res.send({ "status": 201 });
            }
        });
    }

}