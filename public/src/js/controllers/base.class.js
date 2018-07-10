"use strict";

const debug = require('debug')('app:base.controller');
import HttpBox from '../plugins/http.client.class'

class Base {
    constructor() {
        this.req = new HttpBox();
    }

    /**
     * Load script
     * @param url String
     * @param callback Function
     * @return {Promise.<void>}
     */
    static loadScript(url, callback) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement("script")
            script.type = "text/javascript";
            // script.async = false;

            if (script.readyState) {  //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
                        script.onreadystatechange = null;
                        debug('Loaded - ' + url);
                        if (callback) {
                            callback();
                        }
                        resolve('ok');
                    }
                };
            } else {  //Others
                script.onload = function () {
                    debug('Loaded - ' + url);
                    if (callback) {
                        callback();
                    }
                    resolve('ok');
                };
            }
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        });
    }
}

export default Base
