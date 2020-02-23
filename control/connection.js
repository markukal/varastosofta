var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kissa123',
    database: 'stdb',
    timezone: 'Europe/Helsinki'

});
connection.connect(function(error){
    if(!!error){
      console.log(error);
    }else{
      console.log('Connected!:)');
    }
  });
module.exports = connection;
