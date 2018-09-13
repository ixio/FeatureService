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
 * ODE-FeatureService annotation tasks related api tests
 * Author: Erwan Keribin
 */
'use strict';


var assert = require('../../utils/assert.js');
var preq   = require('preq');
var server = require('../../utils/server.js');
var db     = require('../../../db');


describe('annotation-task endpoints', function () {
    this.timeout(20000);

    // Start server and DB before running tests
    before(async function () {
        await server.start();
        await db.init();
    });

    var endpointAuthenticate = '/authentication/authenticate';
    var endpointList = '/annotation-task/campaign/1/my-list';

    it('should return 200 with a list of annotation tasks', function () {
        return preq.post({
            uri: server.config.fsURL + endpointAuthenticate,
            headers: { 'content-type': 'multipart/form-data'},
            body: { username: 'ek@test.ode', password: 'password' }
        }).then(auth => {
            assert.deepEqual(auth.status, 200);
            return preq.get({
                uri: server.config.fsURL + endpointList,
                headers: {
                  authorization: 'Bearer ' + auth.body.token
                }
            }).then(res => {
                assert.deepEqual(res.status, 200);
                assert.deepEqual(res.body.length, 1);
                let annotation_task = res.body[0];
                assert.deepStrictEqual(annotation_task.id, 1);
                assert.deepStrictEqual(annotation_task.status, 1);
                assert.deepStrictEqual(annotation_task.filename, 'A32C0000.WAV');
                assert.deepStrictEqual(annotation_task.dataset_name, 'SPMAuralA2010');
                assert.deepStrictEqual(annotation_task.start, '2010-08-19T17:00:00.000Z');
                assert.deepStrictEqual(annotation_task.end, '2010-08-19T17:45:00.000Z');
            });
        });
    });

    it('should return 404 for user without annotation tasks', function () {
        return preq.post({
            uri: server.config.fsURL + endpointAuthenticate,
            headers: { 'content-type': 'multipart/form-data'},
            body: { username: 'dc@test.ode', password: 'password' }
        }).then(auth => {
            assert.deepEqual(auth.status, 200);
            return preq.get({
                uri: server.config.fsURL + endpointList,
                headers: {
                  authorization: 'Bearer ' + auth.body.token
                }
            }).then(res => {
                throw 'Should not succeed'
            }).catch(res => {
                assert.deepEqual(res.status, 404);
            });
        });
    });

    it('should return 404 for unknown campaign', function () {
        return preq.post({
            uri: server.config.fsURL + endpointAuthenticate,
            headers: { 'content-type': 'multipart/form-data'},
            body: { username: 'ek@test.ode', password: 'password' }
        }).then(auth => {
            assert.deepEqual(auth.status, 200);
            return preq.get({
                uri: server.config.fsURL + endpointList.replace(1, 2),
                headers: {
                  authorization: 'Bearer ' + auth.body.token
                }
            }).then(res => {
                throw 'Should not succeed'
            }).catch(res => {
                assert.deepEqual(res.status, 404);
            });
        });
    });

    after(function() {
        db.close();
        server.stop();
    });

});
