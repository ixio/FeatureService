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
 * ODE-FeatureService annotation sets related functions
 * Author: Erwan Keribin
 */
'use strict';
var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'annotation_set.yaml'));

const db = require('../db');

class AnnotationSet {
    constructor(options) {
        this.options = options;
    }

    list() {
        return db.AnnotationSet.query().then(AnnotationSets => {
            return Promise.all(AnnotationSets.map(AnnotationSet => {
                return AnnotationSet.$relatedQuery('tags').then(tags => {
                    return {
                        id: AnnotationSet.id,
                        name: AnnotationSet.name,
                        desc: AnnotationSet.desc,
                        tags: tags.map(tag => { return tag.name; })
                    };
                });
            })).then(AnnotationSets => {
                return fsUtil.normalizeResponse({
                    status: 200,
                    body: AnnotationSets
                });
            });
        });
    }
}

module.exports = function(options) {
    var set = new AnnotationSet(options);

    return {
        spec: spec,
        operations: {
            list: set.list.bind(set)
        }
    };
};
