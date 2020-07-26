/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const { https } = require('follow-redirects');

/**
 * Service object to fetch XML data from Wikipedia.
 */
class EventService {

    /*
     * ### Instance ###
     */
    _html = '';
    _resolve = null;
    _reject = null;

    /*
     * ### Listener ###
     */
    _onData(chunk) {
        this._html += chunk;
    }

    _onError(error) {
        this._reject(error);
    }

    _onEnd() {
        this._resolve(this._html);
    }

    _onResponse(response) {

        // Response listeners
        response
            .setEncoding('utf8')
            .on('data', chunk => this._onData(chunk))
            .on('error', error => this._onError(error))
            .on('timeout', error => this._onError(error))
            .on('end', () => this._onEnd());
    }

    _promiseExecutor(language) {

        // Wiki URL
        const url = `https://${language}.wikipedia.org`;

        // Request data
        https.get(url, response => this._onResponse(response));
    }

    /*
     * ### Public API ###
     */
    async getHtml(language) {

        // Create and return promise
        return new Promise((resolve, reject) => {

            // Internal state
            this._resolve = resolve;
            this._reject = reject;

            // Execute
            this._promiseExecutor(language)
        });
    }
}

module.exports = EventService;
