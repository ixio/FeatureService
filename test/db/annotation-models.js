'use strict';

var assert = require('../utils/assert.js');
var db     = require('../../db');

describe('annotation-related models tests', function () {
    this.timeout(20000);

    before(async function () {
        await db.init();
    });

    it('newly created annotation campaign should have the right info', async function () {
        var annotation_campaign = {
            name: 'test',
            desc: 'we are testing this',
            start: new Date('2018-01-01 12:00:00'),
            end: new Date('2019-01-01 12:00:00'),
            annotation_set_id: 1,
            user_id: 2
        }
        await db.AnnotationCampaign.query().insert(annotation_campaign);
        var new_campaign = await db.AnnotationCampaign.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_campaign.name, annotation_campaign['name']);
        assert.deepEqual(new_campaign.desc, annotation_campaign['desc']);
        assert.deepEqual(new_campaign.start, annotation_campaign['start']);
        assert.deepEqual(new_campaign.end, annotation_campaign['end']);
        assert.deepEqual(new_campaign.annotation_set_id, annotation_campaign['annotation_set_id']);
        assert.deepEqual(new_campaign.user_id, annotation_campaign['user_id']);
    });

    it('newly created annotation session should have the right info', async function () {
        var annotation_session = {
            start: new Date('2018-06-01 19:15:00'),
            end: new Date('2018-06-01 19:20:00'),
            session_output: { "test": "this is a test" },
            datasetfile_annotation_id: 1
        }
        await db.AnnotationSession.query().insert(annotation_session);
        var new_session = await db.AnnotationSession.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_session.start, annotation_session['start']);
        assert.deepEqual(new_session.end, annotation_session['end']);
        assert.deepEqual(new_session.session_output, annotation_session['session_output']);
        assert.deepEqual(new_session.datasetfile_annotation_id, annotation_session['datasetfile_annotation_id']);
    });

    it('newly created annotation set should have the right info', async function () {
        var tags = { "test": "this is a test" }
        var user_id = 2
        await db.AnnotationSet.query().insert({ tags: tags, user_id: user_id });
        var new_annotation_set = await db.AnnotationSet.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_annotation_set.tags, tags);
        assert.deepEqual(new_annotation_set.user_id, user_id);
    });

    it('newly created datasetfile annotation should have the right info', async function () {
        var datasetfile_annotation = {
            annotation_campaign_id: 1,
            dataset_file_id: 1,
            annotation: { "test": "this is a test" },
            status: 1,
            user_id: 4
        }
        await db.DatasetfileAnnotation.query().insert(datasetfile_annotation);
        var new_df_annotation = await db.DatasetfileAnnotation.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_df_annotation.annotation_campaign_id, datasetfile_annotation['annotation_campaign_id']);
        assert.deepEqual(new_df_annotation.dataset_file_id, datasetfile_annotation['dataset_file_id']);
        assert.deepEqual(new_df_annotation.annotation, datasetfile_annotation['annotation']);
        assert.deepEqual(new_df_annotation.status, datasetfile_annotation['status']);
        assert.deepEqual(new_df_annotation.user_id, datasetfile_annotation['user_id']);
    });

    after(function() {
        db.close();
    });

});
