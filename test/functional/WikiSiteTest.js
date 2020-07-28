/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const assert = require('assert');
const { JSDOM } = require('jsdom');
const EventService = require('../../EventService');
const WIKI_CSS_SELECTORS = require('../../WikiCssSelectors');

describe('Wikipedia HTML', () => {

    for (const language in WIKI_CSS_SELECTORS) {

        if (!WIKI_CSS_SELECTORS.hasOwnProperty(language)) {
            continue;
        }

        const titleSelector = WIKI_CSS_SELECTORS[language].title;
        const eventsSelector = WIKI_CSS_SELECTORS[language].events;

        it(`should return HTML with necessary CSS selectors from Wikipedia (${language})`, async () => {

            // Arrange
            const service = new EventService();

            // Act
            const html = await service.getHtml(language);
            const dom = new JSDOM(html);
            const document = dom.window.document;

            // Assert
            assert.ok(document.querySelector(titleSelector));
            assert.ok(document.querySelector(eventsSelector));
        });
    }
});
