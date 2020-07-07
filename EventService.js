/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const https = require('https');

/**
 * Service object to fetch XML data from Wikipedia.
 */
const EventService = {

    /*
     * ### Instance ###
     */
    _xml: '',

    /*
     * ### Listener ###
     */
    _onData: function(chunk) {
        this._xml += chunk;
    },

    _onError: function(reject, error) {
        reject(error);
    },

    _onEnd: function(resolve) {
        resolve(this._xml);
    },

    _onResponse: function(resolve, reject, response) {

        // Response listeners
        response
            .setEncoding('utf8')
            .on('data', chunk => this._onData(chunk))
            .on('error', error => this._onError(reject, error))
            .on('timeout', error => this._onError(reject, error))
            .on('end', () => this._onEnd(resolve));
    },

    _promiseExecutor: function(resolve, reject, language) {

        // Reset data
        this._xml = '';

        // Wiki URL
        const url = `https://${language}.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday`;

        // Request data
        https.get(url, response => this._onResponse(resolve, reject, response));
    },

    /*
     * ### API ###
     */
    getXml: async function(language) {

        // Create and return promise
        return new Promise((resolve, reject) => this._promiseExecutor(resolve, reject, language));
    },
};

module.exports = EventService;
