"use strict";

class Utils {

    /**
     * Delay time
     * @param sec
     * @return {Promise}
     */
    static delayTime(sec){
        return new Promise(function(resolve, reject) {
            setTimeout(() => resolve("done!"), sec * 1000);
        });
    }

    /**
     * Strip slashes
     * @param name String
     * @return {XML|string|*|void}
     */
    static stripSlashes(name) {
        return name.replace(/^(\/*)|(\/*)$/g, '');
    }

    /**
     * Show error
     * @param err Error
     * @param req Request
     * @param res Response
     */
    static showError(err, req, res) {
        // set locals, only providing error in development
        res.locals.title = 'Error';
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('pages/error');
    }
}

module.exports = Utils;