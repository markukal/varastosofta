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
					console.log(results);
					res.json(results);
				}
			});
		},

		//Uuden varastotapahtuman lisäys
		addNew: function (req, res){
			var pvm = new Date().toJSON().slice(0, 19).replace('T', ' ');
			var luokkaID = req.body.luokkaID;
			var nimi = req.body.nimi;
			var maara = req.body.maara;
			var yksikkoID = req.body.yksikkoID;
			var kasittelija = req.body.kasittelija;
			var ttyyppinimi = req.body.ttyyppinimi;

			connection.query('INSERT INTO varastotapahtumat (ttyyppinimi, luokkanimi, tarvikenimi, maara, yksikkonimi, kasittelija, pvm) VALUES (?, ?, ?, ?, ?, ?, ?)', [ttyyppinimi, luokkaID, nimi, maara, yksikkoID, kasittelija, pvm], function (error, results) {
				if (error) {
					console.log("Virhe luodessa varastotapahtumaa (OTTO), syy " + error);
					res.status(400);
				}
				else 
				{
					console.log("Varastotapahtuman luonti onnistui (OTTO)");
					res.send({"status": 201});
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

					res.json(results);
				}
			});  
		}

	}
