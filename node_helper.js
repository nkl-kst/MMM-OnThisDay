/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const { JSDOM } = require('jsdom');

const HtmlFetcher = require('./src/HtmlFetcher');
const HtmlParser = require('./src/HtmlParser');

module.exports = NodeHelper.create({
    htmlFetcher: null,
    htmlParser: null,

    start: function (htmlFetcher, htmlParser, logger) {
        this.htmlFetcher = htmlFetcher || new HtmlFetcher();
        this.htmlParser = htmlParser || new HtmlParser(JSDOM);
        this.logger = logger || require('logger');
    },

    socketNotificationReceived: async function (notification, payload) {
        this.logger.log(`Received socket notification ${notification}.`);

        if (notification === 'LOAD_EVENTS') {
            // Load data
            const events = await this.loadEvents(payload);

            // Send data to module
            this.sendSocketNotification('EVENTS_LOADED', events);
        }
    },

    loadEvents: async function (language) {
        this.logger.log('Load events ...');

        // Get HTML
        const html = await this.htmlFetcher.fetch(language);

        // Return parsed data
        return this.htmlParser.parse(html, language);
    },
});
