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
                annotation_campaign['annotation_link'] = '#';
            }
            return fsUtil.normalizeResponse({
                status: 200,
                body: annotation_campaigns
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
            annotation_campaigns: tst.annotation_campaigns.bind(tst)
        }
    };
};
