'use strict';

var assert = require('../utils/assert.js');
var db     = require('../../db');

describe('data-related models tests', function () {
    this.timeout(20000);

    before(async function () {
        await db.init();
    });

    it('newly created collection should have the right info', async function () {
        var collection = {
            name: 'test',
            desc: 'we are testing this',
            owner_id: 1
        }
        await db.Collection.query().insert(collection);
        var new_collection = await db.Collection.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_collection.name, collection['name']);
        assert.deepEqual(new_collection.desc, collection['desc']);
        assert.deepEqual(new_collection.owner_id, collection['owner_id']);
    });

    it('newly created dataset should have the right info', async function () {
        var dataset = {
            name: 'test',
            dataset_path: 'es:test',
            status: 1,
            dataset_type_id: 1,
            files_type: '.csv',
            start_date: new Date('2010-01-01'),
            end_date: new Date('2012-01-01'),
            geo_metadata_id: 1,
            audio_metadata_id: null,
            tabular_metadata_id: 1,
            owner_id: 1
        }
        await db.Dataset.query().insert(dataset);
        var new_dataset = await db.Dataset.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_dataset.name, dataset['name']);
        assert.deepEqual(new_dataset.dataset_path, dataset['dataset_path']);
        assert.deepEqual(new_dataset.status, dataset['status']);
        assert.deepEqual(new_dataset.dataset_type_id, dataset['dataset_type_id']);
        assert.deepEqual(new_dataset.files_type, dataset['files_type']);
        assert.deepEqual(new_dataset.start_date.toDateString(), dataset['start_date'].toDateString());
        assert.deepEqual(new_dataset.end_date.toDateString(), dataset['end_date'].toDateString());
        assert.deepEqual(new_dataset.geo_metadata_id, dataset['geo_metadata_id']);
        assert.deepEqual(new_dataset.audio_metadata_id, dataset['audio_metadata_id']);
        assert.deepEqual(new_dataset.tabular_metadata_id, dataset['tabular_metadata_id']);
        assert.deepEqual(new_dataset.owner_id, dataset['owner_id']);
    });

    it('newly created datasetfile should have the right info', async function () {
        var dataset_file = {
            dataset_id: 1,
            filename: 'test.csv',
            filepath: 'https://test.ode/test.csv',
            size: 500000,
            audio_metadata_id: null,
            tabular_metadata_id: 1
        }
        await db.DatasetFile.query().insert(dataset_file);
        var new_dataset_file = await db.DatasetFile.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_dataset_file.dataset_id, dataset_file['dataset_id']);
        assert.deepEqual(new_dataset_file.filename, dataset_file['filename']);
        assert.deepEqual(new_dataset_file.filepath, dataset_file['filepath']);
        assert.deepEqual(new_dataset_file.size, dataset_file['size']);
        assert.deepEqual(new_dataset_file.audio_metadata_id, dataset_file['audio_metadata_id']);
        assert.deepEqual(new_dataset_file.tabular_metadata_id, dataset_file['tabular_metadata_id']);
    });

    after(function() {
        db.close();
    });

});
