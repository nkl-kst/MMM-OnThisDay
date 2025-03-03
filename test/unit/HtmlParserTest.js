/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const fs = require('node:fs');

const assert = require('assert');
const { JSDOM } = require('jsdom');

const HtmlParser = require('../../src/HtmlParser');
const TEST_DE_HTML = fs.readFileSync('test/unit/Test.de.html');

describe('HtmlParser', () => {
    let htmlParser;

    beforeEach(() => {
        htmlParser = new HtmlParser(JSDOM);
    });

    describe('parse', () => {
        it('should return an object', () => {
            // Act
            const result = htmlParser.parse(TEST_DE_HTML, 'de');

            // Assert
            assert.ok(typeof result === 'object');
            assert.ok(typeof result.title === 'string');
            assert.ok(Array.isArray(result.events));

            assert.ok(result.title.includes('Was geschah am 26. Februar?'));
            assert.ok(result.events[0].includes('Alex­an­dra Povò­rina'));
            assert.ok(result.events[1].includes('August Strindberg'));
            assert.ok(result.events[2].includes('Robert Watson-Watt'));
            assert.ok(result.events[3].includes('Nick Leeson'));
            assert.ok(result.events[4].includes('Henry Grunwald'));
        });
    });
});
