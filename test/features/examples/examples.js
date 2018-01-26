/*
 * EBDO-FeatureService Examples tests
 * Author: Joseph Allemandou
 */
'use strict';


var assert = require('../../utils/assert.js');
var preq   = require('preq');
var server = require('../../utils/server.js');


describe('examples endpoints', function () {
    this.timeout(20000);

    //Start server before running tests
    before(function () { return server.start(); });

    var endpoint = '/examples/fake-timeserie';

    // Test Endpoint
    it('should return 400 when fake-timeserie parameters are wrong', function () {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/2017-wrong-01/2017-02-01/day'
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 400);
        });
    });

    it('should return 400 when to is before from', function () {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/2017-03-01/2017-02-01/day'
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 400);
        });
    });

    it('should return 400 when date-time is invalid', function () {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/2017-01-01/2017-02-35/day'
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 400);
        });
    });

    it('should return 200 with a month of day-step fake random data', function () {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/2017-01-01/2017-02-01/day'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            assert.deepEqual(res.body.items.length, 31);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].ts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[30].ts, '2017-01-31T00:00:00.000Z');

        });
    });

    it('should return 200 with a day of hour-step fake random data', function () {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/2017-01-01/2017-01-02/hour'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            assert.deepEqual(res.body.items.length, 24);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].ts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[23].ts, '2017-01-01T23:00:00.000Z');
        });
    });

    it('should return 200 with an hour of minute-tick fake random data', function () {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/2017-01-01T00:00:00/2017-01-01T01:00:00/minute'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            assert.deepEqual(res.body.items.length, 60);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].ts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[59].ts, '2017-01-01T00:59:00.000Z');
        });
    });

    it('should return 200 with a minute of second-tick fake random data', function () {
        return preq.get({
            uri: server.config.fsURL + endpoint +'/2017-01-01T00:00:00/2017-01-01T00:01:00/second'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            assert.deepEqual(res.body.items.length, 60);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].ts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[59].ts, '2017-01-01T00:00:59.000Z');
        });
    });

    var endpointMean = '/examples/mean-fake-timeserie';

    it('should return 400 when to is before from', function () {
        return preq.get({
            uri: server.config.fsURL + endpointMean + '/2017-03-01/2017-02-01/day'
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 400);
        });
    });

    it('should return 400 when date-time is invalid', function () {
        return preq.get({
            uri: server.config.fsURL + endpointMean + '/2017-01-01/2017-02-35/day'
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 400);
        });
    });

    it('should return 200 with the mean of day-step fake random data on a month', function () {
        return preq.get({
            uri: server.config.fsURL + endpointMean + '/2017-01-01/2017-02-01/day'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            //assert.deepEqual(res.body.items[0].length, 4);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].startts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[0].endts, '2017-02-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[0].length, 31);
            assert.deepStrictEqual(typeof(res.body.items[0].mean), 'number');
            assert.deepStrictEqual(0 < res.body.items[0].mean && res.body.items[0].mean < 1, true);

        });
    });

    it('should return 200 with the mean of hour-step fake random data on a day', function () {
        return preq.get({
            uri: server.config.fsURL + endpointMean + '/2017-01-01/2017-01-02/hour'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].startts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[0].endts, '2017-01-02T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[0].length, 24);
            assert.deepStrictEqual(typeof(res.body.items[0].mean), 'number');
            assert.deepStrictEqual(0 < res.body.items[0].mean && res.body.items[0].mean < 1, true);
        });
    });

    it('should return 200 with the mean of minute-tick fake random data on a hour', function () {
        return preq.get({
            uri: server.config.fsURL + endpointMean + '/2017-01-01T00:00:00/2017-01-01T01:00:00/minute'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].startts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[0].endts, '2017-01-01T01:00:00.000Z');
            assert.deepStrictEqual(res.body.items[0].length, 60);
            assert.deepStrictEqual(typeof(res.body.items[0].mean), 'number');
            assert.deepStrictEqual(0 < res.body.items[0].mean && res.body.items[0].mean < 1, true);
        });
    });

    it('should return 200 with the mean of second-tick fake random data on a minute', function () {
        return preq.get({
            uri: server.config.fsURL + endpointMean +'/2017-01-01T00:00:00/2017-01-01T00:01:00/second'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            // checking first and last timestamps
            assert.deepStrictEqual(res.body.items[0].startts, '2017-01-01T00:00:00.000Z');
            assert.deepStrictEqual(res.body.items[0].endts, '2017-01-01T00:01:00.000Z');
            assert.deepStrictEqual(res.body.items[0].length, 60);
            assert.deepStrictEqual(typeof(res.body.items[0].mean), 'number');
            assert.deepStrictEqual(0 < res.body.items[0].mean && res.body.items[0].mean < 1, true);
        });
    });

    // These tests assume an htpasswd file in root project folder
    // The following command can generate the needed file:
    // htpasswd -Bb htpasswd login password
    var endpointAuthenticate = '/examples/authenticate';

    it('should return 200 with a none empty string', function () {
        return preq.get({
            uri: server.config.fsURL + endpointAuthenticate + '/login/password'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            assert.notDeepStrictEqual(res.body.token, '');
        });
    });

    it('should return 401', function () {
        return preq.get({
            uri: server.config.fsURL + endpointAuthenticate + '/alogin/password'
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 401);
        });
    });

    it('should return 401', function () {
        return preq.get({
            uri: server.config.fsURL + endpointAuthenticate + '/login/apassword'
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 401);
        });
    });

    var endpointToken = '/examples/verify-token';

    it('should return 401 without token', function () {
        return preq.get({
            uri: server.config.fsURL + endpointToken
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 401);
        });
    });

    it('should return 401 with a wrong token', function () {
        return preq.get({
            uri: server.config.fsURL + endpointToken,
            headers: {
              authorization: 'Bearer WrongBearer'
            }
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 401);
        });
    });

    it('should return 200 with a correct token', function () {
        return preq.get({
            uri: server.config.fsURL + endpointAuthenticate + '/login/password'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            preq.get({
                uri: server.config.fsURL + endpointToken,
                headers: {
                  authorization: 'Bearer ' + res.body.token
                }
            }).then(function(res) {
              assert.deepEqual(res.status, 200);
            });
        });
    });

    var endpointAuthTS = '/examples/authentified-fake-timeserie/2017-01-01/2017-02-01/day';

    it('should return 401 without token', function () {
        return preq.get({
            uri: server.config.fsURL + endpointAuthTS
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 401);
        });
    });

    it('should return 401 with a wrong token', function () {
        return preq.get({
            uri: server.config.fsURL + endpointAuthTS,
            headers: {
              authorization: 'Bearer WrongBearer'
            }
        }).then(function(res) {
          throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 401);
        });
    });

    it('should return 200 with a correct token', function () {
        return preq.get({
            uri: server.config.fsURL + endpointAuthenticate + '/login/password'
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            preq.get({
                uri: server.config.fsURL + endpointAuthTS,
                headers: {
                  authorization: 'Bearer ' + res.body.token
                }
            }).then(function(res) {
                assert.deepEqual(res.status, 200);
                assert.deepEqual(res.status, 200);
                assert.deepEqual(res.body.items.length, 31);
                // checking first and last timestamps
                assert.deepStrictEqual(res.body.items[0].ts, '2017-01-01T00:00:00.000Z');
                assert.deepStrictEqual(res.body.items[30].ts, '2017-01-31T00:00:00.000Z');
            });
        });
    });




});
