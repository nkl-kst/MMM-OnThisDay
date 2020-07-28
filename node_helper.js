/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const { JSDOM } = require('jsdom');
const EventService = require('./EventService');
const Log = require('./LoggerProxy');
const WIKI_CSS_SELECTORS = require('./WikiCssSelectors');

module.exports = NodeHelper.create({

    socketNotificationReceived: async function(notification, payload) {
        Log.log(`Received socket notification ${notification}.`);

        if (notification === 'LOAD_EVENTS') {

            // Load data
            const events = await this.loadEvents(payload);

            // Send data to module
            this.sendSocketNotification('EVENTS_LOADED', events);
        }
    },

    loadEvents: async function(language) {
        Log.log('Load events ...');

        // Get HTML
        const eventService = new EventService();
        const html = await eventService.getHtml(language);

        // Return parsed data
        return this.parseEvents(html, language);
    },

    parseEvents: function(html, language = 'en') {
        Log.log('Parse HTML data ...');

        // Create dom
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Get title
        const titleSelector = WIKI_CSS_SELECTORS[language].title;
        const title = document.querySelector(titleSelector);

        // Get events
        const eventsSelector = WIKI_CSS_SELECTORS[language].events;
        const events = document.querySelector(eventsSelector);

        // Check data
        if (!events) {
            Log.log('Could not find events in HTML.')
            return {};
        }

        return {
            title: title ? title.innerHTML : null,
            events: events.outerHTML,
        };
    },
});
