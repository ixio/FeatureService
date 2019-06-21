/*
 * ODE-FeatureService Examples tests
 * Author: Erwan Keribin
 */
'use strict';


var assert = require('../../utils/assert.js');
var path = require('path');
var preq = require('preq');
var server = require('../../utils/server.js');
var fileSystem = require('fs');
var db = require('../../../db');

describe('spectro endpoints', function() {
    this.timeout(20000);

    //Start server before running tests
    before(async function () {
        await server.start();
        await db.init();
    });

    var endpoint = '/spectro';

    it('should return 200 with the requested png file', function() {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/1'
        }).then(function(res) {
            var spectro = res.body;

            var filePath = path.join(__dirname, '../../../resources/annotator/png/A32C0000.png');
            var expectedSpectro = fileSystem.readFileSync(filePath);

            assert.deepEqual(spectro, expectedSpectro);
        });
    });

    it('should return 404 when requested png file doesn\'t exist', function() {
        return preq.get({
            uri: server.config.fsURL + endpoint + '/0'
        }).then(function() {
            throw 'Should not succeed'
        }).catch(function(res) {
            assert.deepEqual(res.status, 404);
            assert.deepEqual(res.body.type, "https://mediawiki.org/wiki/HyperSwitch/errors/ENOENT");
        });
    });

    after(function() {
        db.close();
        server.stop();
    });
});
