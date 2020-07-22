/* Magic Mirror
 * Module: MMM-RBB-Weather
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

/**
 * This logger is used to proxy console.log messages inside the node_helper.js so that it can be mocked in tests.
 */
const LoggerProxy = {};

const levels = ['debug', 'log', 'info', 'warn', 'error'];
for (const level of levels) {
    LoggerProxy[level] = function(message) {
        console[level](`MMM-OnThisDay: ${message}`);
    }
}

module.exports = LoggerProxy;
