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

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'annotation_campaign.yaml'));

const db = require('../db');

// https://stackoverflow.com/a/2450976/2730032
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

class AnnotationCampaign {
    constructor(options) {
        this.options = options;
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
        return db.User.query().select('id').findOne('email', req.current_user).then(currentUser => {
            return Promise.all([
                Promise.all(requestParams.datasets.map(id => { return db.DatasetFile.query().select('id').where('dataset_id', id) })),
                Promise.all(requestParams.annotators.map(id => { return db.User.query().select('id').findOne('id', id) }))
            ]).then(([datasetFiles, annotators]) => {
                datasetFiles = [].concat.apply([], datasetFiles);
                let targetDF = [];
                for (let x = 0; x <= annotators.length - requestParams.annotation_goal; x++) {
                    targetDF = targetDF.concat(datasetFiles);
                }
                // If the chosen method is random then shuffle, otherwise leave intact
                if (requestParams.annotation_method == 0) {
                    targetDF = shuffle(targetDF);
                }
                let annotation_tasks = [];
                let files_per_annotator = targetDF.length / annotators.length;
                for (let x = 0; x < annotators.length; x++) {
                    let start = x * files_per_annotator;
                    let end = (x + 1) * files_per_annotator;
                    annotation_tasks = annotation_tasks.concat(targetDF.slice(start, end).map(datasetFile => {
                        return { status: 0, dataset_file_id: datasetFile.id, annotator_id: annotators[x].id };
                    }));
                }
                // TODO this method is not good because with random you can get many times the same dataset_file to annotate
                console.log(annotation_tasks);
                var annotationCampaignParams = {
                    name: requestParams.name,
                    desc: requestParams.desc,
                    start: requestParams.start,
                    end: requestParams.end,
                    annotation_set_id: requestParams.annotation_set,
                    owner_id: currentUser.id,
                    datasets: requestParams.datasets.map(id => { return { '#dbRef': id }; }),
                    annotation_tasks: annotation_tasks
                }
                console.log(annotation_tasks);
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
        });
    }
}

module.exports = function(options) {
    var campaign = new AnnotationCampaign(options);

    return {
        spec: spec,
        operations: {
            list: campaign.list.bind(campaign),
            new: campaign.new.bind(campaign)
        }
    };
};
