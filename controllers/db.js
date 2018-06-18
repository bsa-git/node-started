const Utils = require('../plugins/utils.class');
const Message = require('../models/Message');
const debug = require('debug')('app:db');

const saveMessages = (value) => {
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

const showMessages = (res) => {
    return new Promise((resolve, reject) => {
        Message.find(function (err, messages) {
            if (err) {
                console.error(err);
                reject("Error " + err);
            } else {
                // debug('Messages:', messages);
                res.render('pages/db', {title: 'DataBase', results: messages});
                resolve(messages);
            }
        })
    });
};


/**
 * GET /
 * DataBase page.
 */
exports.index = async (req, res) => {
    try {
        const existingMessage = await saveMessages(1);
        if (!existingMessage) {
            const times = process.env.TIMES || 5;
            debug(`Created messages ${times} - OK`);
        }
        const messages = await showMessages(res);
        debug(`Show messages ${messages.length} - OK`);
    } catch (ex) {
        Utils.showError(ex, req, res);
    }
};
