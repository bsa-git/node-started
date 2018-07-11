"use strict";

import Base from './base.client.class'
import View from '../plugins/view.class'
const debug = require('debug')('app:exx.controller');

class Exx extends Base {
    constructor() {
        super();
    }

    /**
     * createComponent - Create component on client
     */
    createComponent() {
        require('../../css/style.css');
        const lodashValues = require('lodash/values');
        const lodashJoin = require('lodash/join');
        const datXml = require('../../data/data.xml');
        const datJson = require('../../data/data.json');
        // const Icon = require('../../img/feather.png');
        // const ViewClass = require('../plugins/view.class');
        //----------------------------------------------

        function component() {
            // Create element "div"
            const element = document.createElement('div');
            // Add the text to our existing div.
            const hello = 'Hello';
            const webpack = 'webpack';
            const values = lodashValues({hello, webpack});
            debug('Values: ', values);

            // Get times
            let result = '';
            const times = process.env.TIMES || 5;
            for (let i = 0; i < times; i++){
                result += i + ' ';
            }

            element.innerHTML = lodashJoin(values, ' ') + ' - ' + result;
            // Add the class to our existing div.
            element.classList.add('hello');
            // Add the image to our existing div.
            // const myImg = new Image();
            // myImg.src = Icon;
            // element.appendChild(myImg);
            // Show data.xml, data.json
            debug('Xml Data: ', datXml);

            debug('Json Data: ', datJson);

            return element;
        }


        const $el = document.getElementById('client-comp');
        if($el){
            $el.appendChild(component())
        }
        const view = new View();
        const messages = [
            'Component created on client -  successfully!'
        ];
        view.showMessage('success', messages)
    }
}

export default Exx
