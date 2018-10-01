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
 * ODE-FeatureService annotation campaigns related functions
 * Author: Erwan Keribin
 */
'use strict';
var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');
var arrayUtil = require('../lib/ArrayUtil');
const db = require('../db');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'annotation_campaign.yaml'));

class AnnotationCampaign {
    constructor(options) {
        this.options = options;
    }

    detail(hyper, req) {
        let campaignID = req.params.id;
        return Promise.all([
            db.AnnotationCampaign.query().findOne('id', campaignID),
            db.AnnotationTask.query().where('annotation_campaign_id', campaignID)
            .groupBy('annotator_id', 'status').count().select('annotator_id', 'status')
        ]).then(([campaign, tasks]) => {
            tasks.forEach(task => {
                task.count = parseInt(task.count, 10);
            });
            if (campaign) {
                return fsUtil.normalizeResponse({
                    status: 200,
                    body: {
                        campaign: campaign,
                        tasks: tasks
                    }
                });
            } else {
                return fsUtil.normalizeResponse({
                    status: 404,
                    body: {
                        detail: 'Annotation campaign not found'
                    }
                });
            }
        });
    }

    list() {
        return db.AnnotationCampaign.query()
        .select(
            'id',
            'name',
            'start',
            'end',
            'annotation_set_id',
            db.AnnotationCampaign.relatedQuery('annotation_tasks').count().as('tasks_count'),
            db.AnnotationCampaign.relatedQuery('annotation_tasks').where('status', 2).count()
            .as('complete_tasks_count'),
            db.AnnotationCampaign.relatedQuery('datasets').count().as('datasets_count')
        ).then(annotationCampaigns => {
            for (let campaign of annotationCampaigns) {
                // Since PGSQL can return a bigint on count, knex will return a string
                // cf https://knexjs.org/#Builder-count
                campaign.tasks_count = parseInt(campaign.tasks_count);
                campaign.complete_tasks_count = parseInt(campaign.complete_tasks_count);
                campaign.datasets_count = parseInt(campaign.datasets_count);
            }
            return fsUtil.normalizeResponse({
                status: 200,
                body: annotationCampaigns
            });
        });
    }

    new(hyper, req) {
        var requestParams = req.body;
        return Promise.all([
            db.User.query().select('id').findOne('email', req.current_user),
            db.DatasetFile.query().select('id').where('dataset_id', 'in', requestParams.datasets),
            db.User.query().select('id').where('id', 'in', requestParams.annotators)
        ]).then(([currentUser, datasetFiles, annotators]) => {
            let distParams = [datasetFiles, requestParams.annotation_goal, annotators.length];
            let distRes;
            if (requestParams.annotation_method === 0) {
                distRes = arrayUtil.multDistributeRandom(...distParams);
            } else if (requestParams.annotation_method === 1) {
                distRes = arrayUtil.multDistributeSequential(...distParams);
            } else {
                throw "Unknown annotation tasks distribution method";
            }
            let annotationTasks = [];
            for (let x = 0; x < distRes.length; x++) {
                for (let datsetfile of distRes[x]) {
                    annotationTasks.push({
                        status: 0,
                        dataset_file_id: datsetfile.id,
                        annotator_id: annotators[x].id
                    });
                }
            }
            var annotationCampaignParams = {
                name: requestParams.name,
                desc: requestParams.desc,
                start: requestParams.start,
                end: requestParams.end,
                annotation_set_id: requestParams.annotation_set,
                owner_id: currentUser.id,
                datasets: requestParams.datasets.map(id => { return { '#dbRef': id }; }),
                annotation_tasks: annotationTasks
            };
            return db.AnnotationCampaign.query()
            .insertGraph(annotationCampaignParams)
            .then(annotationCampaign => {
                return fsUtil.normalizeResponse({
                    status: 200,
                    body: annotationCampaign
                });
            }).catch(error => {
                return fsUtil.normalizeResponse({
                    status: error.statusCode,
                    name: error.name,
                    type: error.type,
                    detail: error.message
                });
            });
        });
    }
}

module.exports = function(options) {
    var campaign = new AnnotationCampaign(options);

    return {
        spec: spec,
        operations: {
            detail: campaign.detail.bind(campaign),
            list: campaign.list.bind(campaign),
            new: campaign.new.bind(campaign)
        }
    };
};
