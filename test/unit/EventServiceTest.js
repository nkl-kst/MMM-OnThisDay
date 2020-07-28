/* Magic Mirror
 * Module: MMM-OnThisDay
 *
 * By Nikolai Keist (github.com/nkl-kst)
 * MIT Licensed.
 */

const proxyquire = require('proxyquire').noCallThru();
const assert = require('assert');
const sinon = require('sinon');

// Mock callbacks
const responseFake = {
    setEncoding: sinon.fake(() => { return responseFake }),
    on: sinon.fake((event, callback) => {
        callback();
        return responseFake
    }),
};

// Mock HTTPS
const HttpsFake = {
    get: sinon.fake((url, callback) => {
        callback(responseFake);
    }),
};

const EventService = proxyquire('../../EventService', { 'follow-redirects': { https: HttpsFake } });

describe('EventService', () => {

    // Tested
    let service;

    beforeEach(() => {
        service = new EventService();

        service._resolve = sinon.spy();
        service._reject = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe('_onData', () => {

        it('should concat chunks', () => {

            // Act
            service._onData('test');
            service._onData(' chunk');

            // Assert
            assert.strictEqual(service._html, 'test chunk');
        });
    });

    describe('_onError', () => {

        it('should reject with error', () => {

            // Act
            service._onError('test error');

            // Assert
            assert.ok(service._reject.calledOnceWith('test error'));
        });
    });

    describe('_onEnd', () => {

        it('should resolve with xml', () => {

            // Act
            service._onData('test xml');
            service._onEnd();

            // Assert
            assert.ok(service._resolve.calledOnceWith('test xml'));
        });
    });

    describe('_onResponse', () => {

        it('should set all listeners', () => {

            // Act
            service._onResponse(responseFake);

            // Assert
            assert.ok(responseFake.setEncoding.calledOnceWith('utf8'));

            assert.ok(responseFake.on.calledWith('data'));
            assert.ok(responseFake.on.calledWith('error'));
            assert.ok(responseFake.on.calledWith('timeout'));
            assert.ok(responseFake.on.calledWith('end'));
        });
    });

    describe('_promiseExecutor', () => {

        it('should call the wiki url', () => {

            // Arrange
            service._onResponse = sinon.spy();

            // Act
            service._promiseExecutor('en');

            // Assert
            assert.ok(HttpsFake.get.calledOnceWith('https://en.wikipedia.org'));
            assert.ok(service._onResponse.calledOnceWith(responseFake));
        });
    });

    describe('getHtml', () => {

        it('should return html data', (done) => {

            // Arrange (no callbacks here)
            responseFake.on = sinon.fake(() => {
                return responseFake
            });

            // Act
            service.getHtml().then(html => {

                // Assert
                assert.strictEqual(html, 'test html');
                done();
            });

            // Act #2 (resolve promise)
            service._onData('test html');
            service._onEnd();
        });
    });
});
