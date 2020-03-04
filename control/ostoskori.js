var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku ostoskori taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT ostoskori.ostosID as id, tarvikkeet.nimi as nimi, yksikot.nimi AS yksikko, tarvikkeet.maara as varastossa, ostoskori.maara as maara, tarvikkeet.hinta AS hinta, ostoskori.kasittelija as kasittelija FROM ostoskori " +
                "INNER JOIN tarvikkeet ON ostoskori.tarvikeID = tarvikkeet.tarvikeID " +
                "INNER JOIN yksikot ON tarvikkeet.yksikkoID = yksikot.yksikkoID;"; 
                

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
                console.log("Virhe haettaessa ostoskori-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Uuden ostoskorin lisäys
    addNew: function (req, res){
        sqlQuery = "INSERT INTO ostoskori (ostosID, tarvikeID, maara, kasittelija) VALUES (" + null + ", " + req.query.tarvikeID + ", " + req.query.maara + ", '" + req.query.kasittelija +"');";

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisätessä dataa ostoskori-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Ostoskorin tietojen päivitys
    update: function (req, res){
        sqlQuery = "UPDATE ostoskori SET tarvikeID="+ req.query.tarvikeID + ", maara ="+ req.query.maara + " WHERE ostosID=" + req.query.ostosID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe päivittäessä dataa ostoskori-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Ostoskorin poisto
    delete: function (req, res){
        sqlQuery = "DELETE FROM ostoskori WHERE ostosID=" + req.query.ostosID;

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistaessa dataa ostoskori-taulusta, syy: " + error);
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