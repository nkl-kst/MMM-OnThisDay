/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

// Mock helper creation
const NodeHelperFake = {
    create: function(helperDefinition) {
        return helperDefinition;
    }
};

// Mock data service
const EventServiceFake = {
    getXml: function(language) {
        return `
            <rss>
                <channel>
                    <item>dummy</item>
                    <item>
                        <title>test title for ${language}</title>
                        <description>test events for ${language}</description>
                    </item>
                </channel>
            </rss>`;
    },
};

// Mock proxy logger
const LoggerProxyFake = {
    log: function() {},
};

// Load helper definition
const nodeHelperDefinition = proxyquire('../../node_helper', {
    'node_helper': NodeHelperFake,
    './EventService': EventServiceFake,
    './LoggerProxy': LoggerProxyFake,
});

module.exports = function() {

    const nodeHelper = Object.assign({}, nodeHelperDefinition);

    // Fake inherited methods
    nodeHelper.sendSocketNotification = sinon.fake();

    return nodeHelper;
};
