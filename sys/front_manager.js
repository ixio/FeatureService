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
 * ODE-FeatureService authentication functions
 * Author: Erwan Keribin
 */
'use strict';
var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'front_manager.yaml'));

const db = require('../db')

class FrontManager {
    // Class that handles authentification requests

    constructor(options) {
        this.options = options;
    }

    datasets(hyper, req) {
        return db.Dataset.query()
        .select(
            'id',
            'name',
            'files_type',
            'start_date',
            'end_date',
            db.Dataset.relatedQuery('dataset_type').select('name').as('type'),
            db.Dataset.relatedQuery('files').count().as('files_count')
        ).then(datasets => {
            return fsUtil.normalizeResponse({
                status: 200,
                body: datasets
            });
        });
    }

    annotation_campaigns(hyper, req) {
        return db.AnnotationCampaign.query()
        .select(
            'id',
            'name',
            'start',
            'end',
            db.AnnotationCampaign.relatedQuery('annotation_set').select('id').as('annotation_set'),
            db.AnnotationCampaign.relatedQuery('datasets').count().as('datasets_count')
        ).then(annotation_campaigns => {
            for (var annotation_campaign of annotation_campaigns) {
                annotation_campaign['annotation_link'] = '/annotation_tasks/' + annotation_campaign.id;
            }
            return fsUtil.normalizeResponse({
                status: 200,
                body: annotation_campaigns
            });
        });
    }

    get_create_annotation_campaign(hyper, req) {
        return Promise.all([
            db.Dataset.query().select('id', 'name'),
            db.AnnotationSet.query().select('id', 'tags')
        ]).then(values => {
            var res = {
                datasets: values[0],
                annotation_sets: values[1]
            };
            return fsUtil.normalizeResponse({
                status: 200,
                body: res
            });
        });
    }

    post_create_annotation_campaign(hyper, req) {
        var annotation_campaign_params = {
            name: req.body.name,
            desc: req.body.desc,
            start: req.body.start,
            end: req.body.end,
            annotation_set_id: req.body.annotation_set_id,
            owner_id: 1,
            datasets: req.body.datasets.map(id => { return { '#dbRef': id }; })
        }
        return db.AnnotationCampaign.query()
        .insertGraph(annotation_campaign_params)
        .then(annotation_campaign => {
            return fsUtil.normalizeResponse({
                status: 200,
                body: annotation_campaign
            });
        }).catch(error => {
            return fsUtil.normalizeResponse({
                status: error.statusCode,
                name: error.name,
                type: error.type,
                detail: error.message
            });
        });
    }

    annotation_tasks(hyper, req) {
        let campaign_id = req.params.annotation_campaign_id;
        return db.AnnotationCampaign.query().where('id', campaign_id).first()
        .then(annotation_campaign => {
            return annotation_campaign.$relatedQuery('datasets')
        }).then(datasets => {
            return Promise.all(
                datasets.map(dataset => {
                    return dataset.$relatedQuery('files').then(files => {
                        return Promise.all(files.map(file => {
                            return db.DatasetfileAnnotation.query()
                            .where('dataset_file_id', file.id)
                            .where('annotation_campaign_id', campaign_id)
                            .first().then(annotation => {
                                if (annotation) {
                                    return {filename: file.filename, status: annotation.status, link: '#'}
                                } else {
                                    return {filename: file.filename, status: -1, link: '#'}
                                }
                            })
                        }));
                    });
                })
            );
        }).then(files_array => {
            let files = files_array.reduce((acc, val) => acc.concat(val), []);
            let res = files.map((file, id) => { file['id'] = id; return file });
            return fsUtil.normalizeResponse({
                status: 200,
                body: res
            });
        });
    }
}

module.exports = function(options) {
    var tst = new FrontManager(options);

    return {
        spec: spec,
        operations: {
            datasets: tst.datasets.bind(tst),
            annotation_campaigns: tst.annotation_campaigns.bind(tst),
            get_create_annotation_campaign: tst.get_create_annotation_campaign.bind(tst),
            post_create_annotation_campaign: tst.post_create_annotation_campaign.bind(tst),
            annotation_tasks: tst.annotation_tasks.bind(tst)
        }
    };
};
