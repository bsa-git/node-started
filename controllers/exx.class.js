"use strict";

const path = require('path');
const Utils = require('../plugins/utils.class');
const Base = require('./base.class');
const Message = require('../models/Message');
const debug = require('debug')('app:exx.controller');

class Exx extends Base {

    constructor(context) {
        super(context);
    }

    /**
     *  Action - cool ascii faces
     */
    cool() {
        const cool = require('cool-ascii-faces');
        this.res.render('pages/exx/cool/index', {title: 'Cool Ascii Faces', coolFaces: cool()});
        debug("Action: Show cool ascii faces - OK");
    }

    /**
     *  Action - Times
     */
    times() {
        let result = '';
        const times = process.env.TIMES || 5;
        for (let i = 0; i < times; i++){
            result += i + ' ';
        }
        this.res.render('pages/exx/times/index', {title: 'Times', times: result});
        debug("Action: Show times - OK");
    }

    /**
     *  Action - get messages from MongoDB
     */
    async dbMessages() {

        const _saveMessages = (value) => {
            return new Promise((resolve, reject) => {

                Message.findOne({counter: value}, (err, existingMessage) => {
                    if (err) {
                        console.error(err);
                        // res.send("Error " + err);
                        reject("Error " + err);
                    }
                    if (!existingMessage) {
                        const times = process.env.TIMES || 5;
                        for (let i = 1; i < times; i++) {
                            const message = new Message({
                                counter: i,
                                message: `Message - ${i}`
                            });
                            message.save((err) => {
                                if (err) {
                                    console.error(err);
                                    // res.send("Error " + err);
                                    reject("Error " + err);
                                }
                            });
                        }
                    }
                    resolve(existingMessage);
                });
            });
        };

        const _showMessages = (res) => {
            return new Promise((resolve, reject) => {
                Message.find(function (err, messages) {
                    if (err) {
                        console.error(err);
                        reject("Error " + err);
                    } else {
                        res.render('pages/exx/db-messages/index', {title: 'DataBase', results: messages});
                        resolve(messages);
                    }
                })
            });
        };
        const existingMessage = await _saveMessages(1);
        if (!existingMessage) {
            const times = process.env.TIMES || 5;
            debug(`Created messages ${times} - OK`);
        }
        const messages = await _showMessages(this.res);
        debug("Action: Get messages from MongoDB - OK");
        return messages
    }

    /**
     *  Action - create client component
     */
    clientComp() {
        this.res.render('pages/exx/client-comp/index', {title: 'Client/Component'});
        debug("Action: Create client component - OK");
    }

    /**
     *  Action - create client component
     */
    flashMessage() {
        const flashType = this.req.query.type;
        switch (flashType) {
            case 'errors':
                this.req.flash('errors', {msg: 'This is an example <strong>error</strong> flash message.'});
                return this.res.redirect('/exx/flash-message');
                break;
            case 'info':
                this.req.flash('info', {msg: 'This is an example <strong>info</strong> flash message.'});
                return this.res.redirect('/exx/flash-message');
                break;
            case 'warning':
                this.req.flash('warning', {msg: 'This is an example <strong>warning</strong> flash message.'});
                return this.res.redirect('/exx/flash-message');
                break;
            case 'success':
                this.req.flash('success', {msg: 'This is an example <strong>success</strong> flash message.'});
                return this.res.redirect('/exx/flash-message');
                break;
            default:
                this.res.render('pages/exx/flash-message/index', {title: 'Flash Message'});
                debug("Action: Send flash message - OK");
        }
    }
}

module.exports = Exx;
