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
var mockAuth   = require('../../utils/mockAuth.js');


describe('annotation-campaign endpoints', function () {
    this.timeout(20000);

    // Start server and DB before running tests
    before(async function () {
        await server.start();
        await db.init();
    });

    var mockToken = mockAuth.get_token('admin@test.ode');

    var endpointDetail = '/annotation-campaign/1';

    it('should return 200 with the details of the campaign', function () {
        return preq.get({
            uri: server.config.fsURL + endpointDetail,
            headers: { authorization: 'Bearer ' + mockToken }
        }).then(res => {
            assert.deepEqual(res.status, 200);
            assert.deepEqual(Object.keys(res.body), ['campaign', 'tasks']);
            let campaign = res.body.campaign;
            assert.deepStrictEqual(campaign.id, 1);
            assert.deepStrictEqual(campaign.name, 'SPM whale annotation');
            assert.deepStrictEqual(campaign.desc, null);
            assert.deepStrictEqual(campaign.instructionsUrl, 'https://en.wikipedia.org/wiki/Saint_Pierre_and_Miquelon');
            assert.deepStrictEqual(new Date(campaign.start), new Date('2018-06-01'));
            assert.deepStrictEqual(new Date(campaign.end), new Date('2018-12-30'));
            assert.deepStrictEqual(campaign.annotation_set_id, 1);
            assert.deepStrictEqual(campaign.owner_id, 5);
            let tasks = res.body.tasks;
            assert.deepEqual(tasks.length, 1);
            assert.deepEqual(tasks[0].count, 1);
            assert.deepEqual(tasks[0].annotator_id, 3);
            assert.deepEqual(tasks[0].status, 1);
        });
    });

    it('should return 404 for the wrong campaign', function () {
        return preq.get({
            uri: server.config.fsURL + endpointDetail.replace(1,5),
            headers: { authorization: 'Bearer ' + mockToken }
        }).then(res => {
            throw 'Should not succeed'
        }).catch(res => {
            assert.deepEqual(res.status, 404);
        });
    });

    var endpointList = '/annotation-campaign/list';

    it('should return 200 with the list of campaigns', function () {
        return preq.get({
            uri: server.config.fsURL + endpointList,
            headers: { authorization: 'Bearer ' + mockToken }
        }).then(res => {
            assert.deepEqual(res.status, 200);
            // checking we have the right number of campaigns
            assert.deepEqual(res.body.length, 1);
            // checking first annotation campaign info
            var annotation_campaign = res.body[0];
            assert.deepStrictEqual(annotation_campaign.id, 1);
            assert.deepStrictEqual(annotation_campaign.name, 'SPM whale annotation');
            assert.deepStrictEqual(annotation_campaign.instructionsUrl, 'https://en.wikipedia.org/wiki/Saint_Pierre_and_Miquelon');
            assert.deepStrictEqual(new Date(annotation_campaign.start), new Date('2018-06-01'));
            assert.deepStrictEqual(new Date(annotation_campaign.end), new Date('2018-12-30'));
            assert.deepStrictEqual(annotation_campaign.annotation_set_id, 1);
            assert.deepStrictEqual(annotation_campaign.tasks_count, 1);
            assert.deepStrictEqual(annotation_campaign.complete_tasks_count, 0);
            assert.deepStrictEqual(annotation_campaign.user_tasks_count, 0);
            assert.deepStrictEqual(annotation_campaign.user_complete_tasks_count, 0);
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
        return db.AnnotationCampaign.query().count().first().then(db_query => {
            var first_count = parseInt(db_query.count);
            return preq.post({
                uri: server.config.fsURL + endpointCreate,
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + mockToken
                },
                body: annotation_campaign
            }).then(res => {
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
                return db.AnnotationCampaign.query().count().first().then(res => {
                    assert.deepStrictEqual(parseInt(res.count), first_count + 1);
                });
            });
        });
    });

    var endpointReport = '/annotation-campaign/report/1';

    it('should return 200 with the CSV report of the campaign', function () {
        return preq.get({
            uri: server.config.fsURL + endpointReport,
            headers: { authorization: 'Bearer ' + mockToken }
        }).then(res => {
            assert.deepEqual(res.status, 200);
            let lines = res.body.split('\n');
            assert.deepEqual(lines.length, 3);
            let first_line = lines[1].split(',');
            assert.deepEqual(first_line, [
                'SPMAuralA2010',
                'A32C0000.WAV',
                '1.72157641613321',
                '2.13639189984882',
                '',
                '',
                'Humpback Whale',
                'ek@test.ode'
            ]);
        });
    });

    it('should return 404 for the wrong campaign', function () {
        return preq.get({
            uri: server.config.fsURL + endpointReport.replace(1,5),
            headers: { authorization: 'Bearer ' + mockToken }
        }).then(res => {
            throw 'Should not succeed'
        }).catch(res => {
            assert.deepEqual(res.status, 404);
        });
    });

    after(function() {
        db.close();
        server.stop();
    });

});
