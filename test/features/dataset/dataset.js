/* Copyright (C) 2017-2018 Project-ODE
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * ODE-FeatureService dataset-related api tests
 * Author: Erwan Keribin
 */
'use strict';


var assert = require('../../utils/assert.js');
var preq   = require('preq');
var server = require('../../utils/server.js');
var db     = require('../../../db');


describe('dataset endpoints', function () {
    this.timeout(20000);

    // Start server and DB before running tests
    before(async function () {
        await server.start();
        await db.init();
    });

    var endpointList = '/dataset/list';

    it('should return 200 with the list of datasets', function () {
        return preq.get({
            uri: server.config.fsURL + endpointList
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            // checking we have the right number of datasets
            assert.deepEqual(res.body.length, 3);
            // checking first dataset info
            var dataset = res.body[0];
            assert.deepStrictEqual(dataset.id, 1);
            assert.deepStrictEqual(dataset.name, 'SPMAuralA2010');
            assert.deepStrictEqual(dataset.files_type, '.wav');
            assert.deepStrictEqual(dataset.start_date, '2010-08-18T22:00:00.000Z');
            assert.deepStrictEqual(dataset.end_date, '2010-11-01T23:00:00.000Z');
            assert.deepStrictEqual(dataset.type, 'PAM');
            assert.deepStrictEqual(dataset.files_count, 2);
        });
    });

    after(function() {
        db.close();
        server.stop();
    });

});
