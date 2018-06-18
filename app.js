const path = require('path');
const favicon = require('serve-favicon');
const debug = require('debug')('app:app');
const dotenv = require('dotenv');// Loads environment variables from .env file.
// const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./models');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load();

/**
 * Connect to MongoDB.
 */
db.connect();


/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'img/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
// app.use(flash());

app.use(express.static(__dirname + '/public'));

/**
 * Controllers init
 */
const controllers = require('./controllers');
controllers.init(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.title = 'Error';
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
});

debug('Bootstrap application - OK');

module.exports = app;


