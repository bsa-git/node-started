'use strict';

export default class LocationHelper {
    constructor(url) {
        let location = document.createElement("a");
        location.href = url ? url : window.location.href;

        this.url = location.href.split('?')[0];
        this.hash = location.hash;
        this.host = location.host;
        this.hostname = location.hostname;
        this.href = location.href;
        this.origin = location.origin;
        this.pathname = location.pathname;
        this.port = location.port;
        this.protocol = location.protocol;
        this.search = location.search;
        this.source = location;
        this.params = {};
        this.setParams();
    }

    /**
     * Strip slashes
     * @param name String
     * @return {XML|string|*|void}
     */
    stripSlashes(name) {
        return name.replace(/^(\/*)|(\/*)$/g, '');
    }

    /**
     * Get controller/action
     * @return Object // { controller: 'controller', action: 'action' }
     */
    getControllerAction() {
        let controller, action;
        const pathname = this.stripSlashes(this.pathname);
        const arrPathName = pathname ? pathname.split('/') : [];
        if (arrPathName.length === 0) {
            controller = 'index';
            action = 'index';
        } else if (arrPathName.length === 1) {
            controller = 'index';
            action = arrPathName[0];
        } else {
            controller = arrPathName[0];
            action = arrPathName[1];
        }
        return {controller, action}
    }

    mergeParams(params) {
        if (({}).toString.call(params) !== '[object Object]') return this;

        for (let name in params) {
            if (params.hasOwnProperty(name)) {
                this.params[name] = params[name];
            }
        }
        return this;
    }

    setParams(params) {
        if (({}).toString.call(params) === '[object Object]') return this.mergeParams(params);

        let arr = [], paramsArr = typeof params === 'string' ? params : this.search.replace(/^\?/, '').split('&');

        for (let i = 0; i < paramsArr.length; i++) {
            if (!paramsArr[i]) continue;
            arr = paramsArr[i].split('=');

            if (!arr[0]) continue;
            this.params[arr[0]] = arr[1];
        }
        return this;
    }

    getParams(name) {
        return name ? this.params[name] : this.params;
    }

    removeParams(params) {
        if (!params) {
            this.params = {};
            return this;
        }
        if (typeof params === 'string') params = [params];
        if (({}).toString.call(params) !== "[object Array]") return this;
        for (let i = 0; i < params.length; i++) {
            if (this.params.hasOwnProperty(params[i])) {
                delete this.params[params[i]];
            }
        }
        return this;
    }

    serialize(traditional) {
        if (traditional) {
            let result = [], params = this.getParams();
            for (let name in params) {
                if (params.hasOwnProperty(name)) {
                    result.push(name + '=' + params[name]);
                }
            }
            return this.url + (result.length > 0 ? '?' + result.join('&') : '');
        }
        return {url: this.url, params: this.getParams()};
    }
}