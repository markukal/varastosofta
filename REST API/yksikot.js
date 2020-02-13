var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku yksikot taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT * FROM yksikot";

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
    },

    //Uuden yksikon lisäys
    addNew: function (req, res){
        sqlQuery = "INSERT INTO yksikot (yksikkoID, nimi) VALUES (" + null + ", '" + req.query.nimi + "')";

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisätessä dataa yksikot-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Yksikon tietojen päivitys
    update: function (req, res){
        sqlQuery = "UPDATE yksikot SET nimi ='"+ req.query.nimi + "' WHERE yksikkoID=" + req.query.yksikkoID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe päivittäessä dataa yksikot-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Varaston poisto
    delete: function (req, res){
        sqlQuery = "DELETE FROM yksikot WHERE yksikkoID=" + req.query.yksikkoID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistaessa dataa yksikot-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });  
    }

}