"use strict";

module.exports = function (req, res, next) {

    const Utils = require('../plugins/utils.class');
    const config = require('../config/app.config');
    const debug = require('debug')('app:middleware.init');

    // Get controller/action
    Object.assign(req, Utils.getControllerAction(req.path));

    // Check maintenance mode
    if (config.maintenance && req.action !== 'maintenance') {
        return res.redirect('/maintenance')
    }

    // Set config in req
    req.config = config;

    // Set config for view
    res.locals.req = req;
    // res.locals.controller = req.controller;
    // res.locals.action = req.action;
    // res.locals.color_theme = config.color_theme;
    // res.locals.logo_img = process.env.PERSONAL_LOGO_IMAGE;
    // res.locals.contact_website = process.env.PERSONAL_WEBSITE;
    // res.locals.copyright = process.env.PERSONAL_COPYRIGHT;

    // Check .env
    Utils.isEnvJs();

    // debug(Utils.getControllerAction(req.path));

    next()
};