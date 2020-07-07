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
const resolveFake = sinon.fake();
const rejectFake = sinon.fake();
const responseFake = {
    setEncoding: sinon.fake(() => { return responseFake }),
    on: sinon.fake(() => { return responseFake }),
};

// Mock HTTPS
const HttpsFake = {
    get: sinon.fake((url, callback) => {
        callback(responseFake);
    }),
};

describe('EventService', () => {

    // Tested
    let service;

    beforeEach(() => {
        service = proxyquire('../../EventService', { https: HttpsFake });
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
            assert.strictEqual(service._xml, 'test chunk');
        });
    });

    describe('_onError', () => {

        it('should reject with error', () => {

            // Act
            service._onError(rejectFake, 'test error');

            // Assert
            assert.ok(rejectFake.calledOnce);
            assert.ok(rejectFake.calledWith('test error'));
        });
    });

    describe('_onEnd', () => {

        it('should resolve with xml', () => {

            // Act
            service._onData('test xml');
            service._onEnd(resolveFake);

            // Assert
            assert.ok(resolveFake.calledOnce);
            assert.ok(resolveFake.calledWith('test xml'));
        });
    });

    describe('_onResponse', () => {

        it('should set all listeners', () => {

            // Act
            service._onResponse(resolveFake, rejectFake, responseFake);

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
            service._promiseExecutor(resolveFake, rejectFake, 'en');

            // Assert
            assert.ok(HttpsFake.get.calledOnceWith('https://en.wikipedia.org/w/api.php?action=featuredfeed&feed=onthisday'));
            assert.ok(service._onResponse.calledOnceWith(resolveFake, rejectFake, responseFake));
        });
    });

    describe('getXml', () => {

        it('should return the xml', async () => {

            // TODO
        });
    });
});
