/**
 * Controllers (route handlers).
 */
// const path = require('path');
const Utils = require('../plugins/utils.class');
const homeController = require('./home');
const maintenanceController = require('./maintenance');
const ExxController = require('./exx.server.class');
// const debug = require('debug')('app:routes.controllers');

/**
 * Controllers init
 * @param app
 */
exports.init = (app) => {
    /**
     * Primary app routes.
     */
    app.get('/', homeController.index);
    app.get('/maintenance', maintenanceController.index);
    app.get('/exx/cool', function (req, res, next) {
        try {
            const context = {req, res};
            const exx = new ExxController(context);
            exx.cool();
        } catch (ex) {
            Utils.showError(ex, req, res);
        }
    });
    app.get('/exx/times', function (req, res, next) {
        try {
            const context = {req, res};
            const exx = new ExxController(context);
            exx.times();
        } catch (ex) {
            Utils.showError(ex, req, res);
        }
    });
    app.get('/exx/client-comp', function (req, res, next) {
        try {
            const context = {req, res};
            const exx = new ExxController(context);
            exx.clientComp();
        } catch (ex) {
            Utils.showError(ex, req, res);
        }
    });
    app.get('/exx/db-messages', async function (req, res, next) {
        try {
            const context = {req, res};
            const exx = new ExxController(context);
            await exx.dbMessages();
        } catch (ex) {
            Utils.showError(ex, req, res);
        }
    });
    app.get('/exx/flash-message', function (req, res, next) {
        try {
            const context = {req, res};
            const exx = new ExxController(context);
            exx.flashMessage();
        } catch (ex) {
            Utils.showError(ex, req, res);
        }
    });
};