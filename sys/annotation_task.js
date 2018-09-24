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
            .orderBy('annotation_tasks.id')
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

    audioAnnotator(hyper, req) {
        let taskID = req.params.id;
        return db.User.query().findOne('email', req.current_user).then(currentUser => {
            return db.AnnotationTask.query()
            .where('annotator_id', currentUser.id)
            .findOne('annotation_tasks.id', taskID)
            .joinRelation('[dataset_file, annotation_campaign]')
            .select('annotation_tasks.id', 'filename', 'annotation_set_id')
            .then(annotationTask => {
                if (!annotationTask) {
                    return fsUtil.normalizeResponse({
                        status: 404,
                        body: {
                            detail: 'Task not found for user'
                        }
                    });
                }
                let url = this.options.play_url.replace('$filename', annotationTask.filename);
                return db.AnnotationSet.query()
                .findOne('id', annotationTask.annotation_set_id)
                .then(annotationSet => {
                    return annotationSet.$relatedQuery('tags').then(tags => {
                        return fsUtil.normalizeResponse({
                            status: 200,
                            body: {
                                task: {
                                    feedback: 'none',
                                    visualization: 'spectrogram',
                                    proximityTag: [],
                                    annotationTag: tags.map(tag => { return tag.name; }),
                                    url: url,
                                    alwaysShowTags: true
                                }
                            }
                        });
                    });
                });
            });
        });
    }

    updateResults(hyper, req) {
        let taskID = req.params.id;
        return db.User.query().findOne('email', req.current_user).then(currentUser => {
            return db.AnnotationTask.query()
            .where('annotator_id', currentUser.id)
            .findOne('annotation_tasks.id', taskID)
            .joinRelation('annotation_campaign')
            .select(
                'annotation_tasks.id',
                'annotation_campaign.id as campaign_id',
                'annotation_set_id'
            )
            .then(annotationTask => {
                if (!annotationTask) {
                    return fsUtil.normalizeResponse({
                        status: 404,
                        body: {
                            detail: 'Task not found for user'
                        }
                    });
                }
                return db.AnnotationSet.query()
                .where('annotation_sets.id', annotationTask.annotation_set_id)
                .joinRelation('tags')
                .select('tags.id as id', 'tags.name as name')
                .then(tags => {
                    return tags.reduce((obj, tag) => {
                        obj[tag.name] = tag.id;
                        return obj;
                    }, {});
                }).then(tagsId => {
                    let results = req.body.annotations.map(annotation => {
                        return {
                            start: annotation.start,
                            end: annotation.end,
                            annotation_tag_id: tagsId[annotation.annotation],
                            annotation_task_id: annotationTask.id
                        };
                    });
                    let session = {
                        start: new Date(req.body.task_start_time),
                        end: new Date(req.body.task_end_time),
                        session_output: req.body,
                        annotation_task_id: annotationTask.id
                    };
                    return Promise.all([
                        annotationTask.$query().patch({ status: 2 }),
                        db.AnnotationSession.query().insert(session),
                        db.AnnotationResult.query()
                        .where('annotation_task_id', annotationTask.id)
                        .delete()
                        .then(() => {
                            return db.AnnotationResult.query().insert(results);
                        })
                    ]).then(() => {
                        return db.AnnotationTask.query()
                        .where('annotator_id', currentUser.id)
                        .where('annotation_campaign_id', annotationTask.campaign_id)
                        .where('status', '!=', 2)
                        .orderBy('id')
                        .findOne('id', '!=', annotationTask.id)
                        .then(nextAnnotationTask => {
                            if (!nextAnnotationTask) {
                                return fsUtil.normalizeResponse({
                                    status: 200,
                                    body: {
                                        next_task: null,
                                        campaign_id: annotationTask.campaign_id
                                    }
                                });
                            }
                            return fsUtil.normalizeResponse({
                                status: 200,
                                body: {
                                    next_task: nextAnnotationTask.id
                                }
                            });
                        });
                    });
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
            currentUserCampaignList: task.currentUserCampaignList.bind(task),
            audioAnnotator: task.audioAnnotator.bind(task),
            updateResults: task.updateResults.bind(task)
        }
    };
};
