/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const sinon = require('sinon');

// Mock module registration
Module = {
    register: function() {},
};

// Mock config
config = {};

// Mock logging
Log = {
    info: function() {},
    warn: function() {},
};

// Mock DOMParser
DOMParser = class {
    parseFromString(str) {
        return {
            documentElement: {
                textContent: `${str} parsed from string`,
            },
        };
    }
}

// Load module definition
const moduleDefinition = require('../../MMM-OnThisDay');

// Export new module with function mocks/fakes
module.exports = function() {

    // Create module
    const module = Object.assign({}, moduleDefinition);
    module.config = module.defaults;
    module.config.updateInterval = 0;
    module.data = {};

    // Fake inherited methods
    module.updateDom = sinon.fake();
    module.sendSocketNotification = sinon.fake();

    return module;
};
