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
            assert.ok(typeof result.events === 'string');

            assert.ok(
                result.title.includes('Was geschah am 26.&nbsp;Februar?'),
            );
            assert.ok(result.events.includes('Alexandra Povòrina'));
            assert.ok(result.events.includes('Robert Watson-Watt'));
            assert.ok(result.events.includes('Nick Leeson'));
            assert.ok(result.events.includes('Henry Grunwald'));
        });
    });
});
