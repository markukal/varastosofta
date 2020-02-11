var sqlQuery;
var connection = require('./connection');

module.exports = 
{

    fetchAll: function (req, res){
        if (isEmpty(req.query)){
            sqlQuery = "SELECT * FROM tarvikkeet";
        }
        else if(!isEmpty(req.query.nimi)){
            sqlQuery = "SELECT * FROM tarvikkeet WHERE nimi LIKE '%" + req.query.nimi + "%'";
        }


        connection.query(sqlQuery, function (error, results, fields) {
            if (error) {
                console.log("Virhe haettaessa dataa tarvikkeet-taulusta, syy: " + error);
                res.send({ "status": 500, "error": error, "response": null });
            }
            else {
                /*console.log("Data = " + JSON.stringify(results));
                console.log("Params = " + JSON.stringify(req.query));*/

                res.json(results);
            }
        });
    }

}