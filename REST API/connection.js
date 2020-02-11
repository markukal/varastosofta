var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kissa123',
    database: 'varasto',
    timezone: 'Europe/Helsinki'

});
