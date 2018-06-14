const path = require('path');
const favicon = require('serve-favicon');
const pg = require('pg');
const cool = require('cool-ascii-faces');
const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3000));
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.png')));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index')
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

app.get('/times', function (request, response) {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++){
        result += i + ' ';
    }
    response.send(result);
});

app.get('/db', function (request, response) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query('SELECT * FROM test_table', function (err, result) {
            done();
            if (err) {
                console.error(err);
                response.send("Error " + err);
            }
            else {
                response.render('pages/db', {results: result.rows});
            }
        });
    });
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


