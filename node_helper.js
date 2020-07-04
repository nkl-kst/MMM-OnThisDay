/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const Log = require('./ProxyLogger');
const https = require('https');
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

        return new Promise((resolve, reject) => {

            // Request wiki data
            const url = `https://${language}.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday`;
            https.get(url, (response) => {
                response.setEncoding('utf8');
                let xml = '';

                // Concat data chunk
                response.on('data', (chunk) => {
                    xml += chunk;
                });

                // Error
                response.on('error', (error) => {
                    reject(error);
                });

                // Timeout
                response.on('timeout', (error) => {
                    reject(error);
                });

                // Response complete, parse full xml
                response.on('end', () => {
                    const data = this.parseEvents(xml);
                    resolve(data);
                });
            });
        });
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
