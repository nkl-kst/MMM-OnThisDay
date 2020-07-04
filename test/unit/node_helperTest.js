/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const assert = require('assert');
const sinon = require('sinon');
const { newHelper } = require('./HelperTestEnv');

describe('node_helper', () => {

    // Tested
    let helper;

    beforeEach(() => {

        // Create helper
        helper = newHelper();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('socketNotificationReceived', () => {

        it('should do nothing on unknown notification', () => {

            // Act
            helper.socketNotificationReceived();

            // Assert
            assert.ok(helper.sendSocketNotification.notCalled);
        });
    });

    describe('loadEvents', () => {

        // TODO: Use sinon https fake
    });

    describe('parseEvents', () => {

        it('should return nothing if no data is available', () => {

            // Act
            const data = helper.parseEvents('');

            // Assert
            assert.deepStrictEqual(data, {});
        });

        it('should return nothing if no rss data is available', () => {

            // Arrange
            const xml = '<json>no_rss</json>';

            // Act
            const data = helper.parseEvents(xml);

            // Assert
            assert.deepStrictEqual(data, {});
        });

        it('should return nothing if no channel data is available', () => {

            // Arrange
            const xml = '<json><rss>no_channel</rss></json>';

            // Act
            const data = helper.parseEvents(xml);

            // Assert
            assert.deepStrictEqual(data, {});
        });

        it('should return nothing if no item data is available', () => {

            // Arrange
            const xml = '<json><rss><channel>no_item</channel></rss></json>';

            // Act
            const data = helper.parseEvents(xml);

            // Assert
            assert.deepStrictEqual(data, {});
        });

        it('should return title and events if it is available', () => {

            // Arrange
            const xml = `
                <rss>
                    <channel>
                        <item>dummy</item>
                        <item>
                            <title>test title</title>
                            <description>test events</description>
                        </item>
                    </channel>
                </rss>`;

            // Act
            const data = helper.parseEvents(xml);

            // Assert
            assert.deepStrictEqual(data, { title: 'test title', events: 'test events' });
        });
    });
});
