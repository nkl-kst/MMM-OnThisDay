/* Magic Mirror
 * Module: MMM-RBB-Weather
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

/**
 * This logger is used to proxy console.log messages inside the node_helper.js so that it can be mocked in tests.
 */

const levels = ['debug', 'log', 'info', 'warn', 'error'];
const ProxyLogger = {};

for (const level of levels) {
    ProxyLogger[level] = function(message) {
        console[level](`MMM-OnThisDay: ${message}`);
    }
}

module.exports = ProxyLogger;
