/* eslint no-global-assign: "off" */

// Mock module registration
Module = {
    definitions: {},

    register: function(name, moduleDefinition) {

        // Module properties
        moduleDefinition.name = name;
        moduleDefinition.config = moduleDefinition.defaults;
        moduleDefinition.config.updateInterval = 0; // Update immediately in tests
        moduleDefinition.data = {};

        // Inherited functions
        moduleDefinition.updateDom = function () {};

        this.definitions[name] = moduleDefinition;
    },
};

// Mock config
config = {};

// Mock logging
Log = {
    info: function() {},
    warn: function() {},
};

// Mock DOMParser
global.DOMParser = class {
    parseFromString(str) {
        return {
            documentElement: {
                textContent: `${str} parsed from string`,
            },
        };
    }
}

// Register module
require('../../../MMM-OnThisDay');

// Export new module with function mocks/fakes
module.exports.newModule = function() {
    return Object.assign({}, Module.definitions['MMM-OnThisDay']);
};
