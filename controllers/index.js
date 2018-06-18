/**
 * Controllers (route handlers).
 */
const homeController = require('./home');
const dbController = require('./db');
const coolController = require('./cool');
const timesController = require('./times');


/**
 * Controllers init
 * @param app
 */
exports.init = (app) => {
    /**
     * Primary app routes.
     */
    app.get('/', homeController.index);
    app.get('/cool', coolController.index);
    app.get('/times', timesController.index);
    app.get('/db', dbController.index);

};