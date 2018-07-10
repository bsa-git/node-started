const path = require('path');
const favicon = require('serve-favicon');
const debug = require('debug')('app:app');
const dotenv = require('dotenv');// Loads environment variables from .env file.
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const flash = require('express-flash');
const expressSession = require('express-session');
const expressValidator = require('express-validator');// Easy form validation for Express.
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
app.use(favicon(path.join(__dirname, 'public/dist', 'img/favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(__dirname + '/public/dist'));

/**
 * Express flash.
 */
app.use(expressSession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1209600000} // two weeks in milliseconds
}));
app.use(flash());


/**
 * Middleware init app
 */
const initApp = require('./middleware/init-app.server');
// app.use('*', initApp);
app.use(initApp);


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
    const HttpBox = require('./plugins/http.server.class');
    //-------------------------------------
    // set locals, only providing error in development
    err.code = err.code || err.status || 500;
    err.type = err.type || err.statusText || HttpBox.httpCodes()[err.code];
    err.stack = req.app.get('env') === 'development' ? err.stack : '';
    err.request_info = err.request_info ? err.request_info : '';
    err.response_data = err.response_data ? err.response_data : '';
    res.locals.error = err;
    res.locals.title = 'Error';

    debug('Error: ', err);

    // render the error page
    res.status(err.code);
    res.render('pages/error');

});

debug('Bootstrap application - OK');

module.exports = app;


