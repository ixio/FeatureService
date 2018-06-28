'use strict';

exports.seed = function(knex, Promise) {
    return Promise.all([
        knex('users').del()
        .then(function() {
            return knex('users').insert([
                { id: 2, email: 'dc@test.ode', password: 'password' },
                { id: 3, email: 'ek@test.ode', password: 'password' },
                { id: 4, email: 'ja@test.ode', password: 'password' },
                { id: 5, email: 'pnhd@test.ode', password: 'password' },
                { id: 6, email: 'ad@test.ode', password: 'password' }
            ]);
        }),
        knex('dataset_types').del()
        .then(function() {
            return knex('dataset_types').insert([
                { id: 1, name: 'PAM', desc: 'Passive Accoustic Monitoring' },
                { id: 2, name: 'Meteo data' }
            ]);
        }),
        knex('geo_metadata').del()
        .then(function() {
            return knex('geo_metadata').insert([
                { id: 1, name: 'SPM', desc: 'Saint Pierre & Miquelon' }
            ]);
        }),
        knex('tabular_metadata').del()
        .then(function() {
            return knex('tabular_metadata').insert([
                { id: 1, name: 'ECMWF', desc: 'Meteo data', dimension_count: 3,
                    variable_count: 11 }
            ]);
        }),
        knex('tabular_metadata_variables').del()
        .then(function() {
            return knex('tabular_metadata_variables').insert([
                { id: 1, tabular_metadata_id: 1, name: 'longitude',
                    data_type: 'float32', dimension_size: 480, variable_position: 1 },
                { id: 2, tabular_metadata_id: 1, name: 'latitude',
                    data_type: 'float32', dimension_size: 241, variable_position: 2 },
                { id: 3, tabular_metadata_id: 1, name: 'time',
                    data_type: 'int32', dimension_size: 249, variable_position: 3 },
                { id: 4, tabular_metadata_id: 1, name: 'sst',
                    desc: 'sea-surface temperature', data_type: 'int16', variable_position: 4 }
            ]);
        }),
        knex('tabular_metadata_shapes').del()
        .then(function() {
            return knex('tabular_metadata_shapes').insert([
                { id: 1, tabular_metadata_variable_id: 4,
                    tabular_metadata_dimension_id: 1, dimension_position: 1 },
                { id: 2, tabular_metadata_variable_id: 4,
                    tabular_metadata_dimension_id: 2, dimension_position: 2 },
                { id: 3, tabular_metadata_variable_id: 4,
                    tabular_metadata_dimension_id: 3, dimension_position: 3 }
            ]);
        }),
        knex('audio_metadata').del()
        .then(function() {
            return knex('audio_metadata').insert([
                {
                    id: 1, num_channels: 1, sample_rate_khz: 32768, total_samples: 88473600,
                    sample_bits: 32, gain_db: 22, gain_rel: -165, dutycycle_rdm: 45,
                    dutycycle_rim: 60
                },
                { id: 2, start: '2010-08-19 17:00:00', end: '2010-08-19 17:45:00' },
                { id: 3, start: '2010-08-19 18:00:00', end: '2010-08-19 18:45:00' },
                { id: 4, start: '2010-08-19 17:00:00', end: '2010-08-19 17:45:00' },
            ]);
        }),
        knex('datasets').del()
        .then(function() {
            return knex('datasets').insert([
                {
                    id: 1, name: 'SPMAuralA2010',
                    dataset_path: 'datarmor:/home/ode/spm/spmaurala2010', status: 1,
                    dataset_type_id: 1, files_type: '.wav', start_date: '2010-08-19',
                    end_date: '2010-11-02', geo_metadata_id: 1, audio_metadata_id: 1, owner_id: 5
                },
                {
                    id: 2, name: 'SPMAuralB2010',
                    dataset_path: 'datarmor:/home/ode/spm/spmauralb2010', status: 1,
                    dataset_type_id: 1, files_type: '.wav', start_date: '2010-08-19',
                    end_date: '2010-11-02', geo_metadata_id: 1, audio_metadata_id: 1, owner_id: 5
                },
                {
                    id: 3, name: 'SPM-ECMWF', dataset_path: 'datarmor:/home/ode/spm/ecmwf',
                    status: 1, dataset_type_id: 2, files_type: '.nc', start_date: '2010-08-01',
                    end_date: '2010-09-01', geo_metadata_id: 1, tabular_metadata_id: 1, owner_id: 5
                },
            ]);
        }),
        knex('dataset_files').del()
        .then(function() {
            return knex('dataset_files').insert([
                {
                    id: 1, dataset_id: 1, filename: 'A32C0000.WAV',
                    filepath: 'datarmor:/home/ode/spm/spmaurala2010/A32C0000.WAV', size: 176951296,
                    audio_metadata_id: 2
                },
                {
                    id: 2, dataset_id: 1, filename: 'A32C0001.WAV',
                    filepath: 'datarmor:/home/ode/spm/spmaurala2010/A32C0001.WAV', size: 176951296,
                    audio_metadata_id: 3
                },
                {
                    id: 3, dataset_id: 2, filename: '7F210000.WAV',
                    filepath: 'datarmor:/home/ode/spm/spmauralb2010/7F210000.WAV', size: 176951296,
                    audio_metadata_id: 4
                },
                {
                    id: 4, dataset_id: 3, filename: 'AuxDataNECTCDF_201009.nc',
                    filepath: 'datarmor:/home/ode/spm/spmauralb2010/AuxDataNECTCDF_201009.nc',
                    size: 460875840, tabular_metadata_id: 1
                }
            ]);
        }),
        knex('collections').del()
        .then(function() {
            return knex('collections').insert([
                { id: 1, name: 'SPM', desc: 'Saint Pierre & Miquelon PAM and aux data' }
            ]);
        }),
        knex('collection_datasets').del()
        .then(function() {
            return knex('collection_datasets').insert([
                { id: 1, collection_id: 1, dataset_id: 1 },
                { id: 2, collection_id: 1, dataset_id: 2 },
                { id: 3, collection_id: 1, dataset_id: 3 }
            ]);
        }),
        knex('teams').del()
        .then(function() {
            return knex('teams').insert([
                { id: 1, name: 'ode', desc: 'all of ode' },
                { id: 2, name: 'tech', desc: 'all of ode tech people' },
                { id: 3, name: 'research', desc: 'all of ode research people' }
            ]);
        }),
        knex('team_users').del()
        .then(function() {
            return knex('team_users').insert([
                { id: 1, team_id: 1, user_id: 2 },
                { id: 2, team_id: 1, user_id: 3 },
                { id: 3, team_id: 1, user_id: 4 },
                { id: 4, team_id: 1, user_id: 5 },
                { id: 5, team_id: 1, user_id: 6 },
                { id: 6, team_id: 2, user_id: 3 },
                { id: 7, team_id: 2, user_id: 4 },
                { id: 8, team_id: 2, user_id: 6 },
                { id: 9, team_id: 3, user_id: 2 },
                { id: 10, team_id: 3, user_id: 5 }
            ]);
        }),
        knex('permissions').del()
        .then(function() {
            return knex('permissions').insert([
                { id: 1, collection_id: 1, permission_level: 0, team_id: 1, public: false }
            ]);
        }),
        knex('annotation_sets').del()
        .then(function() {
            return knex('annotation_sets').insert([
                {
                    id: 1, tags: '{ "annotationTag": ["Mysticète", "Humpback Whale",' +
                    '"Minke Whale", "Odontocète", "Killer Whale", "Beluga", "Sperm Whale",' +
                    '"Common Dolphin", "Striped Dolphin", "Pilot Whale", "Rain", "Vessel",' +
                    '"Chain"]}'
                }
            ]);
        }),
        knex('annotation_campaigns').del()
        .then(function() {
            return knex('annotation_campaigns').insert([
                { id: 1, name: 'SPM whale annotation', start: '2018-06-01', end: '2018-12-30',
                    annotation_set_id: 1, user_id: 1 }
            ]);
        }),
        knex('annotation_campaign_datasets').del()
        .then(function() {
            return knex('annotation_campaign_datasets').insert([
                { id: 1, annotation_campaign_id: 1, dataset_id: 1 },
                { id: 2, annotation_campaign_id: 1, dataset_id: 2 }
            ]);
        }),
        knex('datasetfile_annotations').del()
        .then(function() {
            return knex('datasetfile_annotations').insert([
                {
                    id: 1, annotation_campaign_id: 1, dataset_file_id: 1,
                    annotation: '[{"id":"wavesurfer_heanet5g5hg","start":1.7215764161332052,' +
                    '"end":2.136391899848815,"annotation":"Humpback Whale"},{"id":' +
                    '"wavesurfer_joce511pet4","start":3.4582705746225595,"end":3.956049155081292' +
                    ',"annotation":"Sperm Whale"}]',
                    status: 1, user_id: 3
                }
            ]);
        }),
        knex('annotation_sessions').del()
        .then(function() {
            return knex('annotation_sessions').insert([
                {
                    id: 1, datasetfile_annotation_id: 1, start: '2018-06-28 9:31:42',
                    end: '2018-06-28 9:31:52',
                    session_output: '{"task_start_time":1530178302136,"task_end_time":' +
                    '1530178311689,"visualization":"spectrogram","annotations":[{"id":' +
                    '"wavesurfer_heanet5g5hg","start":1.7215764161332052,"end":' +
                    '2.136391899848815,"annotation":"Humpback Whale"},{"id":' +
                    '"wavesurfer_joce511pet4","start":3.4582705746225595,"end":3.956049155081292' +
                    ',"annotation":"Sperm Whale"}],"deleted_annotations":[],"annotation_events":' +
                    '[{"event":"start-to-create","time":1530178304585,"region_id":' +
                    '"wavesurfer_heanet5g5hg"},{"event":"offline-create","time":1530178304808,' +
                    '"region_id":"wavesurfer_heanet5g5hg","region_start":1.7215764161332052,' +
                    '"region_end":2.136391899848815},{"event":"add-annotation-label","time":' +
                    '1530178305711,"region_id":"wavesurfer_heanet5g5hg","region_label":' +
                    '"dog barking"},{"event":"start-to-create","time":1530178306899,"region_id":' +
                    '"wavesurfer_joce511pet4"},{"event":"offline-create","time":1530178307268,' +
                    '"region_id":"wavesurfer_joce511pet4","region_start":3.4582705746225595,' +
                    '"region_end":3.956049155081292},{"event":"add-annotation-label","time":' +
                    '1530178308449,"region_id":"wavesurfer_joce511pet4","region_label":' +
                    '"siren wailing"}],"play_events":[],"final_solution_shown":false}'
                }
            ]);
        }),
        knex('jobs').del()
        .then(function() {
            return knex('jobs').insert([
                { id: 1, to_execute: 'pwd; ls', status: 0, queue: 'test' }
            ]);
        }),
    ]);
};
