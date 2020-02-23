var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku varastot taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT * FROM varastot";

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
                console.log("Virhe haettaessa varastot-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Uuden varaston lisäys
    addNew: function (req, res){
        sqlQuery = "INSERT INTO varastot (varastoID, nimi) VALUES (" + null + ", '" + req.query.nimi + "')";

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisätessä dataa varastot-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Varaston tietojen päivitys
    update: function (req, res){
        sqlQuery = "UPDATE varastot SET nimi ='"+ req.query.nimi + "' WHERE varastoID=" + req.query.varastoID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe päivittäessä dataa varastot-tauluun, syy: " + error);
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
        sqlQuery = "DELETE FROM varastot WHERE varastoID=" + req.query.varastoID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistaessa dataa varastot-taulusta, syy: " + error);
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