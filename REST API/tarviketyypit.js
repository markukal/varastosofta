var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku tarviketyypit taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT * FROM tarviketyypit";

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
                console.log("Virhe haettaessa tarviketyypit-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Uuden tarviketyypin lisäys
    addNew: function (req, res){
        sqlQuery = "INSERT INTO tarviketyypit (tyyppiID, nimi) VALUES (" + null + ", '" + req.query.nimi + "')";

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisätessä dataa tarviketyypit-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Tarviketyypin tietojen päivitys
    update: function (req, res){
        sqlQuery = "UPDATE tarviketyypit SET nimi ='"+ req.query.nimi + "' WHERE tyyppiID=" + req.query.tyyppiID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe päivittäessä dataa tarviketyypit-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Tarviketyypin poisto
    delete: function (req, res){
        sqlQuery = "DELETE FROM tarviketyypit WHERE tyyppiID=" + req.query.tyyppiID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistaessa dataa tarviketyypit-taulusta, syy: " + error);
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