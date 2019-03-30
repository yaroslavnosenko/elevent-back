var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '35.246.154.124',
    user: 'root',
    password: 'w2a6c8wvk',
    database: 'elevent'
});


app.get('/', function (req, res) {
    res.send('Hello World!');
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

connection.end();

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
