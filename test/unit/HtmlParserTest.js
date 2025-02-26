/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const assert = require('assert');

const HtmlParser = require('../../src/HtmlParser');

const domParserMock = {
    fragment(html) {
        return {
            querySelector(selector) {
                return {
                    innerHTML: selector,
                    outerHTML: selector,
                };
            },
        };
    },
};

describe('HtmlParser', () => {
    let htmlParser;

    beforeEach(() => {
        htmlParser = new HtmlParser(domParserMock);
    });

    describe('parse', () => {
        it('should return an object', () => {
            // Act
            const result = htmlParser.parse('dummy', 'en');

            // Assert selectors because of mocked values
            assert.ok(typeof result === 'object');
            assert.deepStrictEqual(result, {
                title: '#mp-otd > p',
                events: '#mp-otd > ul',
            });
        });
    });
});
