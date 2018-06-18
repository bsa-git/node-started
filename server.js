/**
 * Module dependencies.
 */

const app = require('./app');
const debug = require('debug')('app:server');
const chalk = require('chalk');// Terminal string styling done right
const http = require('http');

/**
 * Get port from environment and store in Express.
 */
const _port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
const port = normalizePort(_port);
app.set('port', port);

/**
 * Get host from environment and store in Express.
 */
const _host = process.env.BASE_URL || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.set('host', _host);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(app.get('port'));
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    debug('%s App is running at %s:%d in %s mode', chalk.green('✓'), app.get('host'), app.get('port'), app.get('env'));
    debug('Press CTRL-C to stop');
    // console.log('%s App is running at %s:%d in %s mode', chalk.green('✓'), app.get('host'), app.get('port'), app.get('env'));
    // console.log('Press CTRL-C to stop');
}
