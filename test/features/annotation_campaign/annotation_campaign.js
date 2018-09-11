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
 * ODE-FeatureService annotation campaigns related api tests
 * Author: Erwan Keribin
 */
'use strict';


var assert = require('../../utils/assert.js');
var preq   = require('preq');
var server = require('../../utils/server.js');
var db     = require('../../../db');


describe('annotation-campaign endpoints', function () {
    this.timeout(20000);

    // Start server and DB before running tests
    before(async function () {
        await server.start();
        await db.init();
    });

    var endpointList = '/annotation-campaign/list';

    it('should return 200 with the list of campaigns', function () {
        return preq.get({
            uri: server.config.fsURL + endpointList
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            // checking we have the right number of campaigns
            assert.deepEqual(res.body.length, 1);
            // checking first annotation campaign info
            var annotation_campaign = res.body[0];
            assert.deepStrictEqual(annotation_campaign.id, 1);
            assert.deepStrictEqual(annotation_campaign.name, 'SPM whale annotation');
            assert.deepStrictEqual(new Date(annotation_campaign.start), new Date('2018-06-01'));
            assert.deepStrictEqual(new Date(annotation_campaign.end), new Date('2018-12-30'));
            assert.deepStrictEqual(annotation_campaign.annotation_set_id, 1);
            assert.deepStrictEqual(annotation_campaign.tasks_count, 1);
            assert.deepStrictEqual(annotation_campaign.complete_tasks_count, 0);
            assert.deepStrictEqual(annotation_campaign.datasets_count, 2);
        });
    });

    var endpointAuthenticate = '/authentication/authenticate';
    var endpointCreate = '/annotation-campaign/new'

    it('should return 200 with a new annotation campaign', function () {
        var annotation_campaign = {
            name: 'testname',
            desc: 'testdescription',
            datasets: [1, 2],
            start: '2018-06-01',
            end: '2019-06-01',
            annotation_set: 1,
            annotators: [2, 3, 4],
            annotation_goal: 2,
            annotation_method: 1
        };
        return preq.post({
            uri: server.config.fsURL + endpointAuthenticate,
            headers: { 'content-type': 'multipart/form-data'},
            body: { username: 'dc@test.ode', password: 'password' }
        }).then(function(res) {
            assert.deepEqual(res.status, 200);
            return preq.post({
                uri: server.config.fsURL + endpointCreate,
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + res.body.token
                },
                body: annotation_campaign
            }).then(function(res) {
                assert.deepEqual(res.status, 200);
                assert.deepStrictEqual(res.body.id, 10);
                assert.deepStrictEqual(res.body.name, annotation_campaign.name);
                assert.deepStrictEqual(res.body.desc, annotation_campaign.desc);
                assert.deepStrictEqual(new Date(res.body.start), new Date(annotation_campaign.start));
                assert.deepStrictEqual(new Date(res.body.end), new Date(annotation_campaign.end));
                assert.deepStrictEqual(res.body.datasets.length, annotation_campaign.datasets.length);
                assert.deepStrictEqual(res.body.datasets[0].id, annotation_campaign.datasets[0]);
                assert.deepStrictEqual(res.body.annotation_set_id, annotation_campaign.annotation_set);
                assert.deepStrictEqual(res.body.annotation_tasks.length, 6);
                assert.deepStrictEqual(res.body.annotation_tasks[0].id, 10);
            });
        });
    });

    after(function() {
        db.close();
        server.stop();
    });

});
