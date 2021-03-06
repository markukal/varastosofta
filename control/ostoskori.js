var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku ostoskori taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT ostoskori.ostosID as id, tarvikkeet.nimi as nimi, yksikot.nimi AS yksikko, tarvikkeet.maara as varastossa, tarvikkeet.hinta AS hinta, ostoskori.kasittelija as kasittelija FROM ostoskori " +
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
        sqlQuery = "INSERT INTO ostoskori (ostosID, tarvikeID, kasittelija) VALUES (" + null + ", " + connection.escape(req.query.tarvikeID) + ", " + connection.escape(req.query.kasittelija) +");";

        console.log(sqlQuery);

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
        sqlQuery = "UPDATE ostoskori SET tarvikeID="+ connection.escape(req.query.tarvikeID) + "," +
        " WHERE ostosID=" + connection.escape(req.query.ostosID);

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

        if (req.query.ostosID != null && req.query.ostosID != undefined) {
            sqlQuery = "DELETE FROM ostoskori WHERE ostosID=" + connection.escape(req.query.ostosID);
        }
        else if (req.body.ostosID != null && req.body.ostosID != undefined && req.body.ostosID != 0) {
            sqlQuery = "DELETE FROM ostoskori WHERE ostosID=" + connection.escape(req.body.ostosID);
        }
        else if (req.body.ostosID == 0) {
            sqlQuery = "DELETE FROM ostoskori;"
        }
        else {
            sqlQuery = "";
        }

        console.log(sqlQuery);
        

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