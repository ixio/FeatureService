'use strict';

var assert = require('../utils/assert.js');
var db     = require('../../db');

describe('metadata-related models tests', function () {
    this.timeout(20000);

    before(async function () {
        await db.init();
    });

    it('newly created audio metadata should have the right info', async function () {
        var audio_metadata = {
            num_channels: 2,
            start: new Date('2018-01-01 10:00:00'),
            end: new Date('2018-01-01 10:10:00'),
            sample_rate_khz: 32000,
            total_samples: 88000000,
            sample_bits: 32,
            gain_db: 22,
            gain_rel: 0,
            dutycycle_rdm: 10,
            dutycycle_rim: 20
        }
        await db.AudioMetadata.query().insert(audio_metadata);
        var new_audio_metadata = await db.AudioMetadata.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_audio_metadata.num_channels, audio_metadata['num_channels']);
        assert.deepEqual(new_audio_metadata.start, audio_metadata['start']);
        assert.deepEqual(new_audio_metadata.end, audio_metadata['end']);
        assert.deepEqual(new_audio_metadata.sample_rate_khz, audio_metadata['sample_rate_khz']);
        assert.deepEqual(new_audio_metadata.total_samples, audio_metadata['total_samples']);
        assert.deepEqual(new_audio_metadata.sample_bits, audio_metadata['sample_bits']);
        assert.deepEqual(new_audio_metadata.gain_db, audio_metadata['gain_db']);
        assert.deepEqual(new_audio_metadata.gain_rel, audio_metadata['gain_rel']);
        assert.deepEqual(new_audio_metadata.dutycycle_rdm, audio_metadata['dutycycle_rdm']);
        assert.deepEqual(new_audio_metadata.dutycycle_rim, audio_metadata['dutycycle_rim']);
    });

    it('newly created dataset type should have the right info', async function () {
        var name = "special type";
        var desc = "mysterious unkown special type"
        await db.DatasetType.query().insert({ name: name, desc: desc });
        var new_dataset_type = await db.DatasetType.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_dataset_type.name, name);
        assert.deepEqual(new_dataset_type.desc, desc);
    });

    it('newly created geo metadata should have the right info', async function () {
        var lat = 48.3904;
        var lon = 4.4861;
        var geo_metadata = {
            name: "Brest",
            desc: "Big city at the edge of the world",
            location: lat + ',' + lon,
            region: null
        }
        await db.GeoMetadata.query().insert(geo_metadata);
        var new_geo_metadata = await db.GeoMetadata.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_geo_metadata.name, geo_metadata['name']);
        assert.deepEqual(new_geo_metadata.desc, geo_metadata['desc']);
        assert.deepEqual(new_geo_metadata.location, { x: lat, y: lon });
        assert.deepEqual(new_geo_metadata.region, geo_metadata['region']);
    });

    it('newly created tabular metadata should have the right info', async function () {
        var tabular_metadata = {
            name: "Weird NETCDF",
            desc: "Custom test NETCDF",
            dimension_count: 999,
            variable_count: 999
        }
        await db.TabularMetadata.query().insert(tabular_metadata);
        var new_tabular_metadata = await db.TabularMetadata.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_tabular_metadata.name, tabular_metadata['name']);
        assert.deepEqual(new_tabular_metadata.desc, tabular_metadata['desc']);
        assert.deepEqual(new_tabular_metadata.dimension_count, tabular_metadata['dimension_count']);
        assert.deepEqual(new_tabular_metadata.variable_count, tabular_metadata['variable_count']);
    });

    it('newly created tabular metadata variable should have the right info', async function () {
        var tm_variable = {
            tabular_metadata_id: 1,
            name: "Weird dimension",
            desc: "Custom test dimension",
            data_type: "imaginary number",
            dimension_size: 999,
            variable_position: 999
        }
        await db.TabularMetadataVariable.query().insert(tm_variable);
        var new_tm_variable = await db.TabularMetadataVariable.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_tm_variable.tabular_metadata_id, tm_variable['tabular_metadata_id']);
        assert.deepEqual(new_tm_variable.name, tm_variable['name']);
        assert.deepEqual(new_tm_variable.desc, tm_variable['desc']);
        assert.deepEqual(new_tm_variable.data_type, tm_variable['data_type']);
        assert.deepEqual(new_tm_variable.dimension_size, tm_variable['dimension_size']);
        assert.deepEqual(new_tm_variable.variable_position, tm_variable['variable_position']);
    });

    it('newly created tabular metadata shape should have the right info', async function () {
        var tm_shape = {
            tabular_metadata_variable_id: 1,
            tabular_metadata_dimension_id: 1,
            dimension_position: 999
        }
        await db.TabularMetadataShape.query().insert(tm_shape);
        var new_tm_shape = await db.TabularMetadataShape.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_tm_shape.tabular_metadata_variable_id, tm_shape['tabular_metadata_variable_id']);
        assert.deepEqual(new_tm_shape.tabular_metadata_dimension_id, tm_shape['tabular_metadata_dimension_id']);
        assert.deepEqual(new_tm_shape.dimension_position, tm_shape['dimension_position']);
    });

    after(function() {
        db.close();
    });

});
