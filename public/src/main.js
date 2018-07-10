"use strict";

// Add generator-runtime for babel-loader
import './js/plugins/runtime'
import ExxController from './js/controllers/exx.class'
import HttpBox from './js/plugins/http.client.class'
import View from './js/plugins/view.class'
const debug = require('debug')('app:main');

const view = new View();

const main = async () => {
    const exx = new ExxController();
    const http = new HttpBox();
    // View init
    view.init();
    switch (`${http.controller}/${http.action}`) {
        case 'exx/client-comp':
            exx.createComponent();
            return `Path 'exx/client-comp' completed successfully!`
            break;
        default:
            const pathname = http.pathname ? http.pathname : '/';
            return `Path '${pathname}' completed successfully!`
    }
};

main().then(
    result => {
        debug('OK: ', result)
    },
    error => {
        debug('Error: ', error.message);
        view.showError(error);
    }
);


