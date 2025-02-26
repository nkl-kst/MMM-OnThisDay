/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const assert = require('assert');
const { JSDOM } = require('jsdom');

const HtmlFetcher = require('../../src/HtmlFetcher');
const WIKI_CSS_SELECTORS = require('../../src/WikiCssSelectors');

describe('Wikipedia HTML', () => {
    for (const language in WIKI_CSS_SELECTORS) {
        if (!WIKI_CSS_SELECTORS.hasOwnProperty(language)) {
            continue;
        }

        const titleSelector = WIKI_CSS_SELECTORS[language].title;
        const eventsSelector = WIKI_CSS_SELECTORS[language].events;
        const itemsSelector = WIKI_CSS_SELECTORS[language].items;

        it(`should return HTML with necessary CSS selectors from Wikipedia (${language})`, async function () {
            this.timeout(5000);

            // Arrange
            const htmlFetcher = new HtmlFetcher();

            // Act
            const html = await htmlFetcher.fetch(language);
            const dom = new JSDOM(html);
            const document = dom.window.document;

            // Assert
            assert.ok(document.querySelector(titleSelector));
            assert.ok(document.querySelector(eventsSelector));

            if (itemsSelector) {
                assert.ok(document.querySelector(itemsSelector));
            }
        });
    }
});
