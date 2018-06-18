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
 * Entry point for ODE-FeatureService Database models and utils
 * Author: Erwan Keribin
 */

"use strict";

const Knex = require('knex');
const { Model } = require('objection');

// Setting Knex config and binding it to objection.js
const knexConfig = require('../knexfile');
const knexEnv = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
var knex = new Knex(knexConfig[knexEnv]);
Model.knex(knex);
// DB utils
exports.knex = knex;
exports.init = () => {
    knex = new Knex(knexConfig[knexEnv]);
    Model.knex(knex);
    knex.migrate.latest()
    .then(function() {
        return knex.seed.run();
    });
};
exports.close = () => {
    return knex.destroy();
};

// Annotation models
exports.AnnotationCampaign = require('./models/annotation-models/AnnotationCampaign');
exports.AnnotationSession = require('./models/annotation-models/AnnotationSession');
exports.AnnotationSet = require('./models/annotation-models/AnnotationSet');
exports.DatasetfileAnnotation = require('./models/annotation-models/DatasetfileAnnotation');
// Backend models
exports.Job = require('./models/backend-models/Job');
// Data models
exports.Collection = require('./models/data-models/Collection');
exports.DatasetFile = require('./models/data-models/DatasetFile');
exports.Dataset = require('./models/data-models/Dataset');
// Metadata models
exports.AudioMetadata = require('./models/metadata-models/AudioMetadata');
exports.DatasetType = require('./models/metadata-models/DatasetType');
exports.GeoMetadata = require('./models/metadata-models/GeoMetadata');
exports.TabularMetadata = require('./models/metadata-models/TabularMetadata');
exports.TabularMetadataShape = require('./models/metadata-models/TabularMetadataShape');
exports.TabularMetadataVariable = require('./models/metadata-models/TabularMetadataVariable');
// User models
exports.Permission = require('./models/user-models/Permission');
exports.Team = require('./models/user-models/Team');
exports.User = require('./models/user-models/User');
