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
 * ODE-FeatureService annotation tasks related functions
 * Author: Erwan Keribin
 */
'use strict';
var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');
const db = require('../db');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'annotation_task.yaml'));

class AnnotationTask {
    constructor(options) {
        this.options = options;
    }

    currentUserCampaignList(hyper, req) {
        let campaignID = req.params.id;
        return db.User.query().findOne('email', req.current_user).then(currentUser => {
            return db.AnnotationTask.query()
            .where('annotator_id', currentUser.id)
            .where('annotation_campaign_id', campaignID)
            .joinRelation('dataset_file')
            .join('audio_metadata', 'dataset_file.audio_metadata_id', 'audio_metadata.id')
            .join('datasets', 'dataset_file.dataset_id', 'datasets.id')
            .select(
                'annotation_tasks.id',
                'annotation_tasks.status',
                'filename',
                'name as dataset_name',
                'start',
                'end'
            ).then(annotationTasks => {
                if (annotationTasks.length === 0) {
                    return fsUtil.normalizeResponse({
                        status: 404,
                        body: {
                            detail: 'No tasks found for selected campaign and user'
                        }
                    });
                }
                return fsUtil.normalizeResponse({
                    status: 200,
                    body: annotationTasks
                });
            });
        });
    }
}

module.exports = function(options) {
    var task = new AnnotationTask(options);

    return {
        spec: spec,
        operations: {
            currentUserCampaignList: task.currentUserCampaignList.bind(task)
        }
    };
};
