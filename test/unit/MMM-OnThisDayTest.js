/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const assert = require('assert');
const sinon = require('sinon');
const newModule = require('../env/ModuleTestEnv');

describe('MMM-OnThisDay', () => {

    // Tested
    let module;

    // Fake clock (don't run setTimeout calls)
    let clock;

    beforeEach(() => {

        // Create module
        module = newModule();

        // Fake clock
        clock = sinon.useFakeTimers(0);
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('getScripts', () => {

        it('should return an array', () => {

            // Act
            const scripts = module.getScripts();

            // Assert
            assert.ok(Array.isArray(scripts));
        });
    });

    describe('getStyles', () => {

        it('should return an array', () => {

            // Act
            const styles = module.getStyles();

            // Assert
            assert.ok(Array.isArray(styles));
        });
    });

    describe('getTranslations', () => {

        it('should return an object', () => {

            // Act
            const translations = module.getTranslations();

            // Assert
            assert.deepStrictEqual(translations, Object(translations));
        });
    });

    describe('getTemplate', () => {

        it('should return a string', () => {

            // Act
            const template = module.getTemplate();

            // Assert
            assert.strictEqual(typeof template, 'string');
        });
    });

    describe('getTemplateData', () => {

        it('should return an object', () => {

            // Act
            const templateData = module.getTemplateData();

            // Assert
            assert.deepStrictEqual(templateData, Object(templateData));
        });
    });

    describe('getHeader', () => {

        it('should return user header if set', () => {

            // Arrange
            module.data.header = 'User header';

            // Act
            const header = module.getHeader();

            // Assert
            assert.strictEqual(header, 'User header');
        });

        it('should return module title if user header is unset', () => {

            // Arrange
            module.title = 'Module title';

            // Act
            const header = module.getHeader();

            // Assert
            assert.strictEqual(header, 'Module title');
        });
    });

    describe('start', () => {

        it('should set user language', () => {

            // Arrange
            config.language = 'de';

            // Act
            module.start();

            // Assert
            assert.strictEqual(module.usedLanguage, 'de');
        });

        it('should set fallback language if user language is not supported', () => {

            // Arrange
            config.language = 'not supported';

            // Act
            module.start();

            // Assert
            assert.strictEqual(module.usedLanguage, 'en');
        });
    });

    describe('notificationReceived', () => {

        it('should do nothing on unknown notification', () => {

            // Arrange
            module.loadEvents = sinon.spy();

            // Act
            module.notificationReceived('UNKNOWN_NOTIFICATION');

            // Assert
            assert.ok(module.loadEvents.notCalled);
        });

        it('should load events on dom creation', () => {

            // Arrange
            module.loadEvents = sinon.spy();

            // Act
            module.notificationReceived('MODULE_DOM_CREATED');

            // Assert
            assert.ok(module.loadEvents.calledOnce);
        });
    });

    describe('socketNotificationReceived', () => {

        it('should do nothing on unknown notifications', () => {

            // Arrange
            const payload = {
                title: 'Should not appear',
                events: 'Should not appear',
            };

            // Act
            module.socketNotificationReceived('UNKNOWN_NOTIFICATION', payload);

            // Assert
            assert.strictEqual(module.title, null);
            assert.strictEqual(module.events, null);
        });

        it('should do nothing if no events were found', () => {

            // Arrange
            const payload = {
                title: 'Should not appear',
                events: null,
            };

            // Act
            module.socketNotificationReceived('EVENTS_LOADED', payload);

            // Assert
            assert.strictEqual(module.title, null);
            assert.strictEqual(module.events, null);
        });

        it('should set title and events', () => {

            // Arrange
            const payload = {
                title: 'Test title',
                events: 'Test events',
            };

            // Act
            module.socketNotificationReceived('EVENTS_LOADED', payload);

            // Assert
            assert.strictEqual(module.title, 'Test title');
            assert.strictEqual(module.events, 'Test events');
        });
    });

    describe('loadEvents', () => {

        it('should send socket notification', () => {

            // Act
            module.loadEvents();

            // Assert
            module.sendSocketNotification.calledWith('LOAD_EVENTS', 'en');
        });

        it('should schedule refresh', () => {

            // Arrange
            module.scheduleRefresh = sinon.spy();

            // Act
            module.loadEvents();

            // Assert
            assert.ok(module.scheduleRefresh.calledOnce);
        });
    });

    describe('scheduleRefresh', () => {

        it('should not load events before update interval', () => {

            // Arrange
            module.config.updateInterval = 1;
            module.loadEvents = sinon.spy();

            // Act
            module.scheduleRefresh();
            clock.tick(999);

            // Assert
            assert.ok(module.loadEvents.notCalled);
        });

        it('should not load events on update interval', () => {

            // Arrange
            module.config.updateInterval = 1;
            module.loadEvents = sinon.spy();

            // Act
            module.scheduleRefresh();
            clock.tick(1000);

            // Assert
            assert.ok(module.loadEvents.calledOnce);
        });
    });
});
