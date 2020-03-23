var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku varastotapahtumat taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "";

        var i = 0;//Apumuuttuja
        console.log(sqlQuery);
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
                console.log("Virhe haettaessa dataa varastotapahtumat-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Uuden varastotapahtuman lisäys
    addNew: function (req, res){
        sqlQuery = "INSERT INTO varastotapahtumat (tapahtumaID, ttyyppiID, tarvikeID, luokkaID, kasittelija, maara, pvm) VALUES (" + null + ", " + 
        connection.escape(req.query.ttyyppiID) + ", " + connection.escape(req.query.tarvikeID) +", " + connection.escape(req.query.luokkaID) + ", " 
        + connection.escape(req.query.kasittelija) + ", " + connection.escape(req.query.maara) + ", " + connection.escape(req.query.pvm) + ");";

        console.log(sqlQuery);
        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisätessä dataa varastotapahtumat-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Varastotapahtuman tietojen päivitys
    update: function (req, res){
        sqlQuery = "UPDATE varastotapahtumat SET ttyyppiID ="+ connection.escape(req.query.ttyyppiID) + ", tarvikeID =" + connection.escape(req.query.tarvikeID) + ", luokkaID ='" + 
        connection.escape(req.query.luokkaID) + "', kasittelija ='"+ connection.escape(req.query.kasittelija) +"', maara="+ connection.escape(req.query.maara) + 
        "', pvm="+ connection.escape(req.query.pvm) + " WHERE tapahtumaID=" + connection.escape(req.query.tapahtumaID);

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe päivittäessä dataa varastotapahtumat-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Varastotapahtuman poisto
    delete: function (req, res){
        sqlQuery = "DELETE FROM varastotapahtumat WHERE tapahtumaID=" + connection.escape(req.query.tapahtumaID);

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistaessa dataa varastotapahtumat-taulusta, syy: " + error);
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