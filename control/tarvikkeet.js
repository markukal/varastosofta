var sqlQuery;
var connection = require('./connection');

module.exports = 
    {
        //Tietojen haku tarvikkeet taulusta
        fetchAll: function (req, res){


            if (req.query.muokkaus !== null && req.query.muokkaus !== undefined && req.query.tarvikeID) {
                connection.query('SELECT * FROM tarvikkeet WHERE tarvikeID = "' + req.query.tarvikeID + '"', function(error, results) {
                    if (error) {
                        console.log("Virhe haettaessa tuotteita, syy " + error);
                        res.send({"status":500, "error": error, "response": null});
                    }
                    else
                    {
                        res.json(results);
                        console.log("Tuotteen haku onnistui.");
                    }
                });
            }
            else
            {



                //Haetaan kaikki tiedot jos hakuehtoja ei tule
                sqlQuery = "SELECT tarvikkeet.tarvikeID AS ID, tarviketyypit.nimi AS tyyppi, tarvikkeet.nimi AS nimi, varastot.nimi AS varasto, tarvikkeet.hinta AS hinta, " +
                    "tarvikkeet.kuvaus AS kuvaus, tarvikkeet.maara AS maara, yksikot.nimi AS yksikko, tarvikkeet.rarvo AS halytysraja, tarvikkeet.hpaikka AS hankintapaikka FROM tarvikkeet " +
                    "INNER JOIN tarviketyypit ON tarvikkeet.tyyppiID = tarviketyypit.tyyppiID " +
                    "INNER JOIN varastot ON tarvikkeet.varastoID = varastot.varastoID " +
                    "INNER JOIN yksikot ON tarvikkeet.yksikkoID = yksikot.yksikkoID";

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
                        console.log("Virhe haettaessa dataa tarvikkeet-taulusta, syy: " + error);
                        res.send({ "status": 500, "error": error, "response": null });
                    }
                    else {
                        res.json(results);
                    }
                });
            }
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

                    res.json(results);
                }
            });
        },

        //Tarvikkeen tietojen päivitys
        update: function (req, res){
            var tyyppiID = req.query.tyyppiID;
            var varastoID = req.query.varastoID;
            var yksikkoID = req.query.yksikkoID;
            var nimi = req.query.nimi;
            var kuvaus = req.query.kuvaus;
            var maara = req.query.maara;
            var hinta = req.query.hinta;
            var hpaikka = req.query.hpaikka;
            var rarvo = req.query.rarvo;
            var tarvikeID = req.query.tarvikeID;
            var kasittelija = req.query.kasittelija;
            var luokkaID = req.query.luokkaID;

            // päivitetään tarvikemäärää noutolistasta
            if (req.body.nimi !== undefined && req.body.maara !== undefined && req.body.noutolista !== undefined && req.body.noutolista !== null) {
                sqlQuery = "UPDATE tarvikkeet SET maara ="+ connection.escape(req.body.maara) + " WHERE nimi=" + connection.escape(req.body.nimi);
                connection.query(sqlQuery, function (error, results, fields) {
                    if (error) {
                        console.log("Virhe päivittäessä dataa tarvikkeet-tauluun, syy: " + error);
                        res.send({ "status": 500, "error": error, "response": null });
                    }
                    else {
                        res.json(results);

                        // varastotapahtuman luominen (OTTO) , noutolistasta 
                        var pvm = new Date().toJSON().slice(0, 19).replace('T', ' ');

                        connection.query('INSERT INTO varastotapahtumat (ttyyppinimi, luokkanimi, tarvikenimi, tarvikehpaikka, maara, yksikkonimi, kasittelija, pvm) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [2, luokkaID, nimi, hpaikka, maara, yksikkoID, kasittelija, pvm], function (error, results) {
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
                    }
                });
            }


                // päivitetään tarvikemäärää tarvikkeet sivun muokkaa valikon kautta (opettajan toimesta)
                else {
                    connection.query('UPDATE tarvikkeet SET tyyppiID = ?, varastoID = ?, yksikkoID = ?, nimi = ?, kuvaus = ?, maara = ?, hinta = ?, hpaikka = ?, rarvo = ? WHERE tarvikeID = ?', [tyyppiID, varastoID, yksikkoID, nimi, kuvaus, maara, hinta, hpaikka, rarvo, tarvikeID], function (error,results) {
                        if (error) {
                            console.log("Virhe muokatessa tarviketta, syy " + error);
                            res.send({"status":500, "error": error, "response": null});
                        }
                        else 
                        {
                            console.log("Tarvikkeen muokkaus onnistui.");
                            res.send({"status": 201});
                        }
                    });
                }

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
