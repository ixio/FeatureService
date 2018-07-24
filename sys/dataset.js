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
 * ODE-FeatureService dataset-related functions
 * Author: Erwan Keribin
 */
'use strict';
var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'dataset.yaml'));

const db = require('../db');

class Dataset {
    constructor(options) {
        this.options = options;
    }

    list() {
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
            for (let dataset of datasets) {
                // Since PGSQL can return a bigint on count, knex will return a string
                // cf https://knexjs.org/#Builder-count
                dataset.files_count = parseInt(dataset.files_count);
            }
            return fsUtil.normalizeResponse({
                status: 200,
                body: datasets
            });
        });
    }
}

module.exports = function(options) {
    var tst = new Dataset(options);

    return {
        spec: spec,
        operations: {
            list: tst.list.bind(tst)
        }
    };
};
