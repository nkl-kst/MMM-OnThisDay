/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const assert = require('assert');
const EventService = require('../../EventService');

describe('Wikipedia XML', () => {

    const supportedLanguages = ['en', 'de'];

    for (const language of supportedLanguages) {

        it(`should return valid XML from Wikipedia (${language})`, async () => {

            // Arrange
            const service = new EventService();

            // Act
            const xml = await service.getXml(language);

            // Assert
            assert.match(xml, /<item>[^]*<title>/g)
            assert.match(xml, /<item>[^]*<description>/g)
        });
    }
});
