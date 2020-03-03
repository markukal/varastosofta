var sqlQuery;
var connection = require('./connection');

module.exports = 
{
    //Tietojen haku tarvikkeet taulusta
    fetchAll: function (req, res){
        //Haetaan kaikki tiedot jos hakuehtoja ei tule
        sqlQuery = "SELECT tarvikkeet.tarvikeID AS ID, tarviketyypit.nimi AS Tyyppi, tarvikkeet.nimi AS Nimi, varastot.nimi AS Varasto, tarvikkeet.hinta AS Hinta, " +
        "tarvikkeet.kuvaus AS Kuvaus, tarvikkeet.maara AS Määrä, yksikot.nimi AS Yksikkö, tarvikkeet.rarvo AS Hälytysraja, tarvikkeet.hpaikka AS Hankintapaikka FROM tarvikkeet " +
        "INNER JOIN tarviketyypit ON tarvikkeet.tyyppiID = tarviketyypit.tyyppiID " +
        "INNER JOIN varastot ON tarvikkeet.varastoID = varastot.varastoID " +
        "INNER JOIN yksikot ON tarvikkeet.yksikkoID = yksikot.yksikkoID";

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
                console.log("Virhe haettaessa dataa tarvikkeet-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Uuden tarvikkeen lisäys
    addNew: function (req, res){
        sqlQuery = "INSERT INTO tarvikkeet (tarvikeID, tyyppiID, varastoID, nimi, kuvaus, hinta, maara, yksikkoID, hpaikka, rarvo) VALUES (" + null + ", " + 
        connection.escape(req.query.tyyppiID) + ", " + connection.escape(req.query.varastoID) +", " + connection.escape(req.query.nimi) + ", " 
        + connection.escape(req.query.kuvaus) + ", " + connection.escape(req.query.maara) + ", " + connection.escape(req.query.hinta) + ", '"+ req.query.yksikkoID + "'" + ", "+ connection.escape(req.query.hpaikka) + ", "+ connection.escape(req.query.rarvo) + ");";

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe lisätessä dataa tarvikkeet-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Tarvikkeen tietojen päivitys
    update: function (req, res){
        sqlQuery = "UPDATE tarvikkeet SET tyyppiID ="+ connection.escape(req.query.tyyppiID) + ", varastoID =" + connection.escape(req.query.varastoID) + ", nimi ='" + connection.escape(req.query.nimi) + 
        "', kuvaus ='"+ connection.escape(req.query.kuvaus) +"', maara="+ connection.escape(req.query.maara) + " WHERE tarvikeID=" + connection.escape(req.query.tarvikeID);

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe päivittäessä dataa tarvikkeet-tauluun, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                //console.log("Data = " + JSON.stringify(results));
                //console.log("Params = " + JSON.stringify(req.query));

                res.json(results);
            }
        });
    },

    //Tarvikkeen poisto
    delete: function (req, res){
        sqlQuery = "DELETE FROM tarvikkeet WHERE tarvikeID=" + connection.escape(req.query.tarvikeID);

        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe poistaessa dataa tarvikkeet-taulusta, syy: " + error);
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