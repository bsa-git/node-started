"use strict";

const path = require('path');
const HttpBox = require('../plugins/http.server.class');
const debug = require('debug')('app:base.controller');

class Base {
    constructor(context) {
        this.context = context ? context : {};
        this.req = this.context.req ? this.context.req : {};
        this.res = this.context.res ? this.context.res : {};
        // this.config = config;
        this.http = new HttpBox(this.req);
    }

    /**
     * Restart server
     * @param app Application
     * @param port integer
     */
    async restartServer(app, port) {
        // Restart the server
        if (this.req.app.get('httpServer')) {
            await this.req.app.get('httpServer').close();
            debug(`Restart server at ${process.env.BASE_URL}:${port}`);
            this.createServer(app);
        } else {
            this.createServer(app);
        }
    }

    /**
     * Create http.server
     * @param app Application
     * @param port integer
     */
    createServer(app, port) {
        const self = this;
        const http = require('http');
        const httpServer = http.createServer(app);
        httpServer.listen(port);
        httpServer.on('listening', () => {
            self.req.app.set('httpServer', httpServer);
            debug(`Create server at ${process.env.BASE_URL}:${port}`);
        });
    }

    /**
     * CORS middleware
     * @param app Application
     */
    corsMiddleware(app) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
            next();
        });
    }


    /**
     * Show error
     * @param err Error
     * @param req Request
     * @param res Response
     */
    // static showError(err, req, res) {
    //     // console.error('showError: ', err);
    //     // set locals, only providing error in development
    //     err.code = err.code || err.status || 500;
    //     err.type = err.type || err.statusText || HttpBox.httpCodes()[err.code];
    //     err.stack = req.app.get('env') === 'development' ? err.stack : '';
    //     err.request_info = err.request_info ? err.request_info : '';
    //     err.response_data = err.response_data ? err.response_data : '';
    //     res.locals.error = err;
    //     // render the error page
    //     res.status(err.code);
    //     res.render('./tmpls/error/error.html.twig');
    // }

}

module.exports = Base;
