'use strict';

var assert = require('../utils/assert.js');
var db     = require('../../db');

describe('model relationships tests', function () {
    this.timeout(20000);

    before(() => {
      return db.init();
    });

    // Tests for annotation-related models relationships

    it('annotation campaign should have the right relationships', function () {
        return db.AnnotationCampaign.query().first()
        .then((annotation_campaign) => {
            return Promise.all([
                annotation_campaign.$relatedQuery('datasets')
                .then((datasets) => {
                    assert.deepEqual(datasets.length, 2);
                    assert.deepEqual(datasets[0].name, 'SPMAuralA2010');
                    assert.deepEqual(datasets[1].name, 'SPMAuralB2010');
                }),
                annotation_campaign.$relatedQuery('user')
                .then((user) => {
                    assert.deepEqual(user.email, 'pnhd@test.ode');
                }),
                annotation_campaign.$relatedQuery('datasetfile_annotations')
                .then((datasetfile_annotations) => {
                    assert.deepEqual(datasetfile_annotations.length, 1);
                    assert.deepEqual(datasetfile_annotations[0].status, 1);
                })
            ]);

        });
    });

    it('annotation session should have the right relationships', async function () {
        var annotation_session = await db.AnnotationSession.query().first();

        // Testing datasetfile_annotation relationship
        var datasetfile_annotation = await annotation_session.$relatedQuery('datasetfile_annotation');
        assert.deepEqual(datasetfile_annotation.id, 1);
    });

    it('annotation set should have the right relationships', async function () {
        var annotation_set = await db.AnnotationSet.query().first();

        // Testing user relationship
        var user = await annotation_set.$relatedQuery('user');
        assert.deepEqual(user.email, 'pnhd@test.ode');

        // Testing annotation_campaigns relationship
        var annotation_campaigns = await annotation_set.$relatedQuery('annotation_campaigns');
        assert.deepEqual(annotation_campaigns.length, 1);
        assert.deepEqual(annotation_campaigns[0].name, 'SPM whale annotation');
    });

    it('datasetfile annotation should have the right relationships', async function () {
        var datasetfile_annotation = await db.DatasetfileAnnotation.query().first();

        // Testing annotation_campaign relationship
        var annotation_campaign = await datasetfile_annotation.$relatedQuery('annotation_campaign');
        assert.deepEqual(annotation_campaign.name, 'SPM whale annotation');

        // Testing dataset_file relationship
        var dataset_file = await datasetfile_annotation.$relatedQuery('dataset_file');
        assert.deepEqual(dataset_file.filename, 'A32C0000.WAV');

        // Testing user relationship
        var user = await datasetfile_annotation.$relatedQuery('user');
        assert.deepEqual(user.email, 'ek@test.ode');

        // Testing annotation_sessions relationship
        var annotation_sessions = await datasetfile_annotation.$relatedQuery('annotation_sessions');
        assert.deepEqual(annotation_sessions.length, 1);
        assert.deepEqual(annotation_sessions[0].id, 1);
    });

    // Tests for data-related models relationships

    it('collection should have the right relationships', async function () {
        var collection = await db.Collection.query().first();

        // Testing datasets relationship
        var datasets = await collection.$relatedQuery('datasets');
        assert.deepEqual(datasets.length, 3);
        assert.deepEqual(datasets[0].name, 'SPMAuralA2010');
        assert.deepEqual(datasets[1].name, 'SPMAuralB2010');
        assert.deepEqual(datasets[2].name, 'SPM-ECMWF');

        // Testing owner relationship
        var owner = await collection.$relatedQuery('owner');
        assert.deepEqual(owner.email, 'pnhd@test.ode');
    });

    it('dataset should have the right relationships', async function () {
        var dataset = await db.Dataset.query().first();

        // Testing collections relationship
        var collections = await dataset.$relatedQuery('collections');
        assert.deepEqual(collections.length, 1);
        assert.deepEqual(collections[0].name, 'SPM');

        // Testing annotation_campaigns relationship
        var annotation_campaigns = await dataset.$relatedQuery('annotation_campaigns');
        assert.deepEqual(annotation_campaigns.length, 1);
        assert.deepEqual(annotation_campaigns[0].name, 'SPM whale annotation');

        // Testing dataset_type relationship
        var dataset_type = await dataset.$relatedQuery('dataset_type');
        assert.deepEqual(dataset_type.name, 'PAM');

        // Testing geo_metadata relationship
        var geo_metadata = await dataset.$relatedQuery('geo_metadata');
        assert.deepEqual(geo_metadata.name, 'SPM');

        // Testing tabular_metadata relationship
        var dataset3 = await db.Dataset.query().where('id', 3).first();
        var tabular_metadata = await dataset3.$relatedQuery('tabular_metadata');
        assert.deepEqual(tabular_metadata.name, 'ECMWF');

        // Testing audio_metadata relationship
        var audio_metadata = await dataset.$relatedQuery('audio_metadata');
        assert.deepEqual(audio_metadata.id, 1);

        // Testing owner relationship
        var owner = await dataset.$relatedQuery('owner');
        assert.deepEqual(owner.email, 'pnhd@test.ode');

        // Testing files relationship
        var files = await dataset.$relatedQuery('files');
        assert.deepEqual(files.length, 2);
        assert.deepEqual(files[0].filename, 'A32C0000.WAV');
        assert.deepEqual(files[1].filename, 'A32C0001.WAV');

    });

    it('dataset file should have the right relationships', async function () {
        var dataset_file = await db.DatasetFile.query().first();

        // Testing dataset relationship
        var dataset = await dataset_file.$relatedQuery('dataset');
        assert.deepEqual(dataset.name, 'SPMAuralA2010');

        // Testing tabular_metadata relationship
        var dataset_file4 = await db.DatasetFile.query().where('id', 4).first();
        var tabular_metadata = await dataset_file4.$relatedQuery('tabular_metadata');
        assert.deepEqual(tabular_metadata.name, 'ECMWF');

        // Testing audio_metadata relationship
        var audio_metadata = await dataset_file.$relatedQuery('audio_metadata');
        assert.deepEqual(audio_metadata.id, 2);
    });

    // Tests for metadata-related models relationships

    it('tabular metadata should have the right relationships', async function () {
        var tabular_metadata = await db.TabularMetadata.query().first();

        // Testing variables relationship
        var variables = await tabular_metadata.$relatedQuery('variables');
        assert.deepEqual(variables.length, 4);
        assert.deepEqual(variables[0].name, 'longitude');
        assert.deepEqual(variables[1].name, 'latitude');
        assert.deepEqual(variables[2].name, 'time');
        assert.deepEqual(variables[3].name, 'sst');
    });

    it('tabular metadata variable should have the right relationships', async function () {
        var tm_variable = await db.TabularMetadataVariable.query().where('id', 4).first();

        // Testing tabular_metadata relationship
        var tabular_metadata = await tm_variable.$relatedQuery('tabular_metadata');
        assert.deepEqual(tabular_metadata.name, 'ECMWF');

        // Testing shape relationship
        var shape = await tm_variable.$relatedQuery('shape');
        assert.deepEqual(shape.length, 3);
        assert.deepEqual(shape[0].id, 1);
        assert.deepEqual(shape[1].id, 2);
        assert.deepEqual(shape[2].id, 3);
    });

    it('tabular metadata shape should have the right relationships', async function () {
        var tm_shape = await db.TabularMetadataShape.query().first();

        // Testing variable relationship
        var variable = await tm_shape.$relatedQuery('variable');
        assert.deepEqual(variable.name, 'sst');

        // Testing dimension relationship
        var dimension = await tm_shape.$relatedQuery('dimension');
        assert.deepEqual(dimension.name, 'longitude');
    });

    // Tests for user-related models relationships

    it('user should have the right relationships', async function () {
        var user = await db.User.query().where('id', 2).first();

        // Testing teams relationship
        var teams = await user.$relatedQuery('teams');
        assert.deepEqual(teams.length, 2);
        assert.deepEqual(teams[0].name, 'ode');
        assert.deepEqual(teams[1].name, 'research');
    });

    it('team should have the right relationships', async function () {
        var team = await db.Team.query().where('id', 3).first();

        // Testing users relationship
        var users = await team.$relatedQuery('users');
        assert.deepEqual(users.length, 2);
        assert.deepEqual(users[0].email, 'dc@test.ode');
        assert.deepEqual(users[1].email, 'pnhd@test.ode');
    });

    it('permission should have the right relationships', async function () {
        var permission1 = await db.Permission.query().first();
        var permission2 = await db.Permission.query().where('id', 2).first();

        // Testing collection permission
        var collection = await permission1.$relatedQuery('collection');
        assert.deepEqual(collection.name, 'SPM');

        // Testing dataset permission
        var dataset = await permission2.$relatedQuery('dataset');
        assert.deepEqual(dataset.name, 'SPMAuralA2010');

        // Testing team relationship
        var team = await permission1.$relatedQuery('team');
        assert.deepEqual(team.name, 'ode');

        // Testing user relationship
        var user = await permission2.$relatedQuery('user');
        assert.deepEqual(user.email, 'ek@test.ode');
    });

    after(function() {
        db.close();
    });

});
