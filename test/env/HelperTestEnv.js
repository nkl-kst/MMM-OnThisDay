/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

// Mock helper creation
const NodeHelperFake = {
    create: function (helperDefinition) {
        return helperDefinition;
    },
};

const htmlFetcherMock = {
    fetch: (language) => {
        return `
            <div id="mp-otd">
                <p>test title for ${language}</p>
                <ul><li>test events for ${language}</li></ul>
            </div>
		`;
    },
};

// Mock proxy logger
const LoggerProxyFake = {
    log: function () {},
};

// Load helper definition
const nodeHelperDefinition = proxyquire('../../node_helper', {
    node_helper: NodeHelperFake,
    './src/LoggerProxy': LoggerProxyFake,
});

module.exports = function () {
    const nodeHelper = Object.assign({}, nodeHelperDefinition);

    nodeHelper.start(htmlFetcherMock);

    // Fake inherited methods
    nodeHelper.sendSocketNotification = sinon.fake();

    return nodeHelper;
};
