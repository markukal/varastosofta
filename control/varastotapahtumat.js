var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku varastotapahtumat taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT varastotapahtumat.tapahtumaID AS ID, varastotapahtumat.kasittelija AS kasittelija, varastotapahtumat.ttyyppinimi AS tapahtumatyyppinimi, " +
        "varastotapahtumat.tarvikenimi AS tarvikenimi, varastotapahtumat.luokkanimi AS luokka, varastotapahtumat.maara AS maara, varastotapahtumat.yksikkonimi AS yksikko, " +
        "varastotapahtumat.tarvikehpaikka AS tarvikepaikka, varastotapahtumat.pvm AS pvm FROM varastotapahtumat";

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
                console.log("Virhe haettaessa dataa varastotapahtumat-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));
                console.log(results);
                res.json(results);
            }
        });
    },

    //Uuden varastotapahtuman lisäys
    addNew: function (req, res){
        sqlQuery = "INSERT INTO varastotapahtumat (tapahtumaID, ttyyppinimi, luokkanimi, tarvikenimi, tarvikehpaikka, maara, yksikkonimi, kasittelija, pvm) VALUES (" + null + ", " + 
        connection.escape(req.query.ttyyppinimi) + ", " + connection.escape(req.query.luokkanimi) +", " + connection.escape(req.query.tarvikenimi) + ", " +
        connection.escape(req.query.tarvikehpaikka) + ", " + connection.escape(req.query.maara) + ", " + connection.escape(req.query.yksikkonimi) + ", " +
        connection.escape(req.query.kasittelija) + ", " + connection.escape(req.query.pvm) + ");";

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
        sqlQuery = "UPDATE varastotapahtumat SET ttyyppinimi ="+ connection.escape(req.query.ttyyppinimi) + ", tarvikenimi =" + connection.escape(req.query.tarvikenimi) + 
        ", luokkanimi ='" + connection.escape(req.query.luokkanimi) + "', tarvikenimi ='" + connection.escape(req.query.tarvikenimi) + 
        "', tarvikehpaikka ='" + connection.escape(req.query.tarvikehpaikka) + "', maara="+ connection.escape(req.query.maara) + 
        "', yksikkonimi ='" + connection.escape(req.query.yksikkonimi) + "', kasittelija ='" + connection.escape(req.query.kasittelija) +
        "', pvm=" + connection.escape(req.query.pvm) + " WHERE tapahtumaID=" + connection.escape(req.query.tapahtumaID);

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