/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const proxyquire = require('proxyquire').noCallThru();
const sinon = require('sinon');

// Mock helper creation
const helperFake = {
    create: function(helperDefinition) {
        return helperDefinition;
    }
}

// Mock proxy logger
const proxyLoggerFake = {
    log: function() {},
}

// Load helper definition
const helperDefinition = proxyquire('../../node_helper', { 'node_helper': helperFake, './ProxyLogger': proxyLoggerFake });

module.exports.newHelper = function() {

    const helper = Object.assign({}, helperDefinition);

    // Fake inherited methods
    helper.sendSocketNotification = sinon.fake();

    return helper;
};
