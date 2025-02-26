/* MagicMirror²
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const assert = require('assert');
const sinon = require('sinon');
const newNodeHelper = require('../env/HelperTestEnv');

describe('node_helper', () => {
    // Tested
    let helper;

    beforeEach(() => {
        // Create helper
        helper = newNodeHelper();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('socketNotificationReceived', () => {
        it('should do nothing on unknown notification', async () => {
            // Act
            await helper.socketNotificationReceived('UNKNOWN_NOTIFICATION');

            // Assert
            assert.ok(helper.sendSocketNotification.notCalled);
        });

        it('should send socket notification with title and events on LOAD_EVENTS notification', async () => {
            // Act
            await helper.socketNotificationReceived('LOAD_EVENTS', 'en');

            // Assert
            assert.ok(helper.sendSocketNotification.calledOnce);
            assert.ok(
                helper.sendSocketNotification.calledWith('EVENTS_LOADED', {
                    title: 'test title for en',
                    events: '<ul><li>test events for en</li></ul>',
                    items: [],
                }),
            );
        });
    });

    describe('loadEvents', () => {
        it('should return loaded and parsed html data', async () => {
            // Act
            const events = await helper.loadEvents('en');

            // Assert
            assert.deepStrictEqual(events, {
                title: 'test title for en',
                events: '<ul><li>test events for en</li></ul>',
                items: [],
            });
        });
    });
});
