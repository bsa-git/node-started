const db = require('../models');
const Message = require('../models/Message');
const debug = require('debug')('app:db');

const saveMessages = (value)=>{
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
            resolve();
        });
    });
};

const showMessages = (res)=>{
    Message.find(function (err, messages) {
        if (err){
            console.error(err);
            res.send("Error " + err);
        } else {
            debug('Messages:', messages);
            res.render('pages/db', {title: 'DataBase', results: messages});
        }
    })
};


/**
 * GET /
 * DataBase page.
 */
exports.index = async (req, res) => {

    /**
     * Connect to MongoDB.
     */
    db.connect();

    await saveMessages(1);

    showMessages(res);
};
