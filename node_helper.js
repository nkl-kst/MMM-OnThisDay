/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const EventService = require('./EventService');
const Log = require('./LoggerProxy');
const xmlParser = require('fast-xml-parser');

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

        // Get xml
        const xml = await EventService.getXml(language);

        // Return parsed data
        return this.parseEvents(xml);
    },

    parseEvents: function(xml) {
        Log.log('Parse XML data ...');

        // Parse XML data to json
        const json = xmlParser.parse(xml);

        // Check data
        if (!json || !json.rss || !json.rss.channel || !json.rss.channel.item) {
            Log.log('Could not parse XML.')
            return {};
        }

        // Get last item
        const items = json.rss.channel.item
        const itemsCount = items.length;
        const item = items[itemsCount - 1];

        return {
            title: item.title,
            events: item.description,
        };
    },
});
