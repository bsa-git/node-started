"use strict";

const debug = require('debug')('app:view');
import lodashTemplate from 'lodash/template'

class View {
    constructor(options) {
        this.opts = {
            closeClass: 'close',
            hiddenClass: 'invisible',
            idMsgBox: 'message-box',
            idMsgError: 'message-error'
        };
        Object.assign(this.opts, options);
    }

    init() {
        // Init metisMenu
        this.initMetisMenu('top-menu');
        // Init Message
        // this.initMessage(this.opts.idMsgBox);
        // this.initMessage(this.opts.idMsgError);
        return this;
    }

    initMetisMenu(id) {
        // metisMenu init
        $(`#${id}`).metisMenu({
            toggle: true
        });
        // Close menu
        $("body").mouseup(function (e) {
            const subject = $(`#${id}`);
            if (e.target.id != subject.attr('id') && !subject.has(e.target).length) {
                const liActive = $(`#${id} li.active`);
                if (liActive.length) {
                    liActive.find("a[aria-expanded='true']").attr("aria-expanded", false);
                    liActive.find("ul[aria-expanded='true']").removeClass("in");
                    liActive.find("ul[aria-expanded='true']").attr("aria-expanded", false);
                    liActive.removeClass("active");
                }
            }
        });

        const url = window.location;
        let element = $('ul.nav a').filter(function () {
            return this.href == url;
        }).addClass('active').parent();

        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent();
            } else {
                break;
            }
        }
    }

    initMessage(id) {
        const self = this;
        const $deleteButtons = Array.prototype.slice.call(document.querySelectorAll(`#${id} button.${this.opts.closeClass}`), 0);
        if ($deleteButtons.length > 0) {
            // Add a click event on each of them
            for (let i = 0, len = $deleteButtons.length; i < len; i++) {
                let $deleteButton = $deleteButtons[i];
                $deleteButton.addEventListener('click', function () {
                    // Get element for id
                    let $msg = document.getElementById(id);
                    // Add class hiddenClass
                    $msg.classList.add(self.opts.hiddenClass);
                });
            }
        }
    }


    isClass(query, className) {
        let _isClass = false;
        // Get all elements for query
        const $elms = Array.prototype.slice.call(document.querySelectorAll(query), 0);
        // Check if there are any query items
        if ($elms.length > 0) {
            // Is class
            for (let i = 0, len = $elms.length; i < len; i++) {
                let $el = $elms[i];
                _isClass = $el.classList.contains(className);
            }
        }
        return _isClass;
    }

    /**
     * Show message
     * @param type String // 'danger', 'info', 'warning', 'success'
     * @param messages Array // [ 'Message-1', ... , 'Message-N' ]
     */
    showMessage(type, messages) {

        const $msg = document.getElementById(this.opts.idMsgBox);
        if ($msg) {
            // Render ejs template
            const {tmplFlashMessage} = require('../../tmpls');
            const compiled = lodashTemplate(tmplFlashMessage);
            const html = compiled({type: type, messages: messages});
            $msg.innerHTML = html;
        }
    }

    showError(err) {
        const $msg = document.getElementById(this.opts.idMsgBox);
        if ($msg) {
            // Set error values
            err.code = err.code || err.status || 500;
            err.type = err.type || err.statusText || 'Request Error';
            err.stack = process.env.NODE_ENV === 'development' ? err.stack : '';
            err.request_info = err.request_info ? err.request_info : '';
            err.response_data = err.response_data ? err.response_data : '';

            // Render ejs template
            const {tmplErrorMessage} = require('../../tmpls');
            const compiled = lodashTemplate(tmplErrorMessage);
            const html = compiled({error: err});
            $msg.innerHTML = html;
        }
    }

    addMessage(message) {
        const self = this;
        //----------------------
        const $msg = document.getElementById(this.opts.idMsgBox);
        if ($msg) {
            // Get "message-body" element
            const $elms = Array.prototype.slice.call(document.querySelectorAll(`#${this.opts.idMsgBox} .message-body`), 0);
            // Check if there are any query items
            if ($elms.length > 0) {
                // Add my message to message-box
                for (let i = 0, len = $elms.length; i < len; i++) {
                    let $el = $elms[i];
                    let _message = $el.innerHTML;
                    $el.innerHTML = _message + message;
                }
            }
        }
    }

    addListener(query, cb) {
        const $elms = Array.prototype.slice.call(document.querySelectorAll(query), 0);
        if ($elms.length > 0) {
            // Add a click event on each of them
            for (let i = 0, len = $elms.length; i < len; i++) {
                let $elm = $elms[i];
                $elm.addEventListener('click', cb);
            }
        }
    }

    removeClass(query, classForRemove) {
        // Get all elements for query
        const $elms = Array.prototype.slice.call(document.querySelectorAll(query), 0);
        // Check if there are any query items
        if ($elms.length > 0) {
            // Remove class
            for (let i = 0, len = $elms.length; i < len; i++) {
                let $el = $elms[i];
                if ($el.classList.contains(classForRemove)) {
                    $el.classList.remove(classForRemove);
                }
            }
        }
    }
}

export default View
