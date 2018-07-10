"use strict";

const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:utils');

class Utils {

    /**
     * Delay time
     * @param sec
     * @return {Promise}
     */
    static delayTime(sec){
        return new Promise(function(resolve, reject) {
            setTimeout(() => resolve("done!"), sec * 1000);
        });
    }

    /**
     * Strip slashes
     * @param name String
     * @return {XML|string|*|void}
     */
    static stripSlashes(name) {
        return name.replace(/^(\/*)|(\/*)$/g, '');
    }

    /**
     * Show error
     * @param err Error
     * @param req Request
     * @param res Response
     */
    static showError(err, req, res) {
        const HttpBox = require('./http.server.class');
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
    }

    /**
     * Render Ejs template
     * @param fileName String
     * @param data {*}
     * @param options {*}
     * @return Promise
     */
    static ejsRender(fileName, data, options={}) {
        return new Promise(function (resolve, reject) {
            const ejs = require('ejs');
            let _options = {};
            _options = Object.assign(_options, options);
            //-------------------------
            ejs.renderFile(fileName, data, _options, function(err, html){
                if (err) {
                    reject(err);
                }
                resolve(html);
            });
        });
    }

    /**
     * Get controller/action
     * @param baseUrl String
     * @return Object
     */
    static getControllerAction(baseUrl) {
        let controller, action;
        baseUrl = baseUrl.startsWith('/') ? baseUrl.slice(1) : baseUrl;
        const arrBaseUrl = baseUrl ? baseUrl.split('/') : [];
        if (arrBaseUrl.length === 0) {
            controller = 'index';
            action = 'index';
        } else if (arrBaseUrl.length === 1) {
            controller = 'index';
            action = arrBaseUrl[0];
        } else {
            controller = arrBaseUrl[0];
            action = arrBaseUrl[1];
        }
        return {controller, action}
    }

    /**
     * Check env.js
     * If the env.js file is missing, an error occurs.
     */
    static isEnvJs() {
        try {
            const filePath = path.join(__dirname, '../.env');
            fs.accessSync(filePath);
        } catch (err) {
            const errEnv = new Error(`Can not find '.env' file! <br>Please create a file '/.env', see the example '/.env.example'`);
            errEnv.code = 500;
            throw errEnv;
        }
    }
}

module.exports = Utils;