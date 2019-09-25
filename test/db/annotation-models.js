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
            owner_id: 2
        }
        await db.AnnotationCampaign.query().insert(annotation_campaign);
        var new_campaign = await db.AnnotationCampaign.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_campaign.name, annotation_campaign['name']);
        assert.deepEqual(new_campaign.desc, annotation_campaign['desc']);
        assert.deepEqual(new_campaign.start, annotation_campaign['start']);
        assert.deepEqual(new_campaign.end, annotation_campaign['end']);
        assert.deepEqual(new_campaign.annotation_set_id, annotation_campaign['annotation_set_id']);
        assert.deepEqual(new_campaign.owner_id, annotation_campaign['owner_id']);
    });

    it('newly created annotation session should have the right info', async function () {
        var annotation_session = {
            start: new Date('2018-06-01 19:15:00'),
            end: new Date('2018-06-01 19:20:00'),
            session_output: { "test": "this is a test" },
            annotation_task_id: 1
        }
        await db.AnnotationSession.query().insert(annotation_session);
        var new_session = await db.AnnotationSession.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_session.start, annotation_session['start']);
        assert.deepEqual(new_session.end, annotation_session['end']);
        assert.deepEqual(new_session.session_output, annotation_session['session_output']);
        assert.deepEqual(new_session.annotation_task_id, annotation_session['annotation_task_id']);
    });

    it('newly created annotation set should have the right info', async function () {
        var annotation_set = {
            name: 'test',
            desc: 'this is a test',
            tags: [{ id: 2 }, { id: 4 }, { id: 7 }],
            owner_id: 2
        }
        await db.AnnotationSet.query().insertGraph(annotation_set, { relate: true });
        var new_annotation_set = await db.AnnotationSet.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_annotation_set.name, annotation_set.name);
        assert.deepEqual(new_annotation_set.desc, annotation_set.desc);
        assert.deepEqual(new_annotation_set.owner_id, annotation_set.owner_id);
        var tags = await new_annotation_set.$relatedQuery('tags');
        var tag_ids = tags.map(tag => { return { id: tag.id }; });
        assert.deepEqual(tag_ids, annotation_set.tags);
    });

    it('newly created annotation tag should have the right info', async function () {
        var tag_name = 'test';
        await db.AnnotationSet.query().insert({name: tag_name});
        var new_annotation_tag = await db.AnnotationSet.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_annotation_tag.name, tag_name);
    });

    it('newly created annotation task should have the right info', async function () {
        var annotation_task = {
            annotation_campaign_id: 1,
            dataset_file_id: 1,
            status: 1,
            annotator_id: 4
        }
        await db.AnnotationTask.query().insert(annotation_task);
        var new_df_annotation = await db.AnnotationTask.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_df_annotation.annotation_campaign_id, annotation_task['annotation_campaign_id']);
        assert.deepEqual(new_df_annotation.dataset_file_id, annotation_task['dataset_file_id']);
        assert.deepEqual(new_df_annotation.annotation, annotation_task['annotation']);
        assert.deepEqual(new_df_annotation.status, annotation_task['status']);
        assert.deepEqual(new_df_annotation.annotator_id, annotation_task['annotator_id']);
    });

    it('newly created annotation result should have the right info', async function () {
        var annotation_result = {
            annotation_tag_id: 5,
            startTime: 2.2549841651658,
            endTime: 5.1919416519871,
            annotation_task_id: 1
        }
        await db.AnnotationResult.query().insert(annotation_result);
        var new_annotation_result = await db.AnnotationResult.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_annotation_result.annotation_tag_id, annotation_result.annotation_tag_id);
        assert.deepEqual(new_annotation_result.startTime, annotation_result.startTime);
        assert.deepEqual(new_annotation_result.endTime, annotation_result.endTime);
        assert.deepEqual(new_annotation_result.annotation_task_id, annotation_result.annotation_task_id);
    });

    after(function() {
        db.close();
    });

});
