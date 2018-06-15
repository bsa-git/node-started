const path = require('path');
const favicon = require('serve-favicon');
const debug = require('debug')('app:app');
const chalk = require('chalk');// Terminal string styling done right
const dotenv = require('dotenv');// Loads environment variables from .env file.
// const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const pg = require('pg');
// const cool = require('cool-ascii-faces');
const express = require('express');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load();

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('host', process.env.BASE_URL || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
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

/**
 * Server start
 */
app.listen(app.get('port'), function () {
    console.log('%s App is running at %s:%d in %s mode', chalk.green('✓'), app.get('host'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop');
});


