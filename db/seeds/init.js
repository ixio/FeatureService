'use strict';

exports.seed = function(knex, Promise) {
    return Promise.all([
        knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE dataset_types_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE geo_metadata_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE audio_metadata_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE datasets_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE dataset_files_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE annotation_sets_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE annotation_tags_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE annotation_set_tags_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE annotation_campaigns_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE annotation_campaign_datasets_id_seq RESTART WITH 100"),
        knex.raw("ALTER SEQUENCE annotation_tasks_id_seq RESTART WITH 100")
    ])
    .then(() => {
        return knex('users').del();
    })
    .then(() => {
        return knex('users').insert(
            [{'id': 1, 'email': 'admin@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 2, 'email': 'dc@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 3, 'email': 'ek@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 4, 'email': 'ja@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 5, 'email': 'pnhd@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 6, 'email': 'ad@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 7, 'email': 'rv@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}]
        );
    })
    .then(() => {
        return knex('dataset_types').del();
    })
    .then(() => {
        return knex('dataset_types').insert(
            [{'name': 'Coastal audio recordings', 'desc': 'Recordings made with AURAL A M2, South of SPM', 'id': 1}, {'name': 'Coastal audio recordings at 600m deep', 'desc': 'Recordings made with HARP', 'id': 2}, {'name': 'Deep sea zone audio recordings', 'desc': 'Recordings made with HARP', 'id': 3}]
        );
    })
    .then(() => {
        return knex('geo_metadata').del();
    })
    .then(() => {
        return knex('geo_metadata').insert(
            [{'name': 'Saint-Pierre-et-Miquelon', 'desc': 'South of Saint-Pierre-et-Miquelon', 'id': 1}, {'name': 'Channel Islands National Marine Sanctuary site B', 'desc': 'Channel Islands National Marine Sanctuary site B', 'id': 2}, {'name': 'Southern  California site R', 'desc': 'Southern  California site R', 'id': 3}]
        );
    })
    
    .then(() => {
        return knex.raw("UPDATE geo_metadata SET location = POINT(46.66765695359446, -56.2750928645425) WHERE id = 1");
    })
    
    .then(() => {
        return knex.raw("UPDATE geo_metadata SET location = POINT(34.2833333, -120.01861111111111) WHERE id = 2");
    })
    
    .then(() => {
        return knex.raw("UPDATE geo_metadata SET location = POINT(33.1516667, -120.00166666666667) WHERE id = 3");
    })
    .then(() => {
        return knex('audio_metadata').del();
    })
    .then(() => {
        return knex('audio_metadata').insert(
            [{'num_channels': '1', 'sample_rate_khz': '32768', 'total_samples': '88473600', 'sample_bits': '16', 'gain_db': '22', 'gain_rel': '-165', 'dutycycle_rdm': '45', 'dutycycle_rim': '60', 'id': 1}, {'num_channels': '1', 'sample_rate_khz': '2000', 'total_samples': '1200000', 'sample_bits': '16', 'id': 2}, {'num_channels': '1', 'sample_rate_khz': '200000', 'total_samples': '444000030', 'sample_bits': '16', 'id': 3}, {'start': '2010-08-30 07:00:00', 'end': '2010-08-30 07:15:00', 'sample_rate_khz': '32768', 'id': 4}, {'start': '2010-08-30 07:15:00', 'end': '2010-08-30 07:30:00', 'sample_rate_khz': '32768', 'id': 5}, {'start': '2010-08-30 07:30:00', 'end': '2010-08-30 07:45:00', 'sample_rate_khz': '32768 ', 'id': 6}, {'start': '2012-06-22 05:57:31', 'end': '2012-06-22 06:57:31', 'sample_rate_khz': '2000', 'id': 7}, {'start': '2012-06-22 10:57:31', 'end': '2012-06-22 11:57:31', 'sample_rate_khz': '2000', 'id': 8}, {'start': '2012-06-22 11:57:31', 'end': '2012-06-22 12:57:31', 'sample_rate_khz': '2000', 'id': 9}, {'start': '2012-06-22 12:57:31', 'end': '2012-06-22 13:57:31', 'sample_rate_khz': '2000', 'id': 10}, {'start': '2012-06-22 13:57:31', 'end': '2012-06-22 14:57:31', 'sample_rate_khz': '2000', 'id': 11}, {'start': '2012-06-22 14:57:31', 'end': '2012-06-22 15:57:31', 'sample_rate_khz': '2000', 'id': 12}, {'start': '2012-06-22 15:57:31', 'end': '2012-06-22 16:57:31', 'sample_rate_khz': '2000', 'id': 13}, {'start': '2012-06-22 16:57:31', 'end': '2012-06-22 17:57:31', 'sample_rate_khz': '2000', 'id': 14}, {'start': '2012-06-22 17:57:31', 'end': '2012-06-22 18:57:31', 'sample_rate_khz': '2000', 'id': 15}, {'start': '2012-06-22 18:57:31', 'end': '2012-06-22 19:57:31', 'sample_rate_khz': '2000', 'id': 16}, {'start': '2012-06-22 19:57:31', 'end': '2012-06-22 20:57:31', 'sample_rate_khz': '2000', 'id': 17}, {'start': '2012-06-22 20:57:31', 'end': '2012-06-22 21:57:31', 'sample_rate_khz': '2000', 'id': 18}, {'start': '2012-06-22 21:57:31', 'end': '2012-06-22 22:57:31', 'sample_rate_khz': '2000', 'id': 19}, {'start': '2012-06-22 22:57:31', 'end': '2012-06-22 23:57:31', 'sample_rate_khz': '2000', 'id': 20}, {'start': '2012-06-22 23:57:31', 'end': '2012-06-23 00:57:31', 'sample_rate_khz': '2000', 'id': 21}, {'start': '2012-06-23 05:57:31', 'end': '2012-06-23 06:57:31', 'sample_rate_khz': '2000', 'id': 22}, {'start': '2009-11-06 22:38:45', 'end': '2009-11-06 22:43:45 ', 'sample_rate_khz': '200000', 'id': 23}]
        );
    })
    .then(() => {
        return knex('datasets').del();
    })
    .then(() => {
        return knex('datasets').insert(
            [{'name': 'SPM Aural A 2010', 'start_date': '2010-08-19', 'end_date': '2010-11-02', 'files_type': 'WAV files', 'status': 1, 'dataset_type_id': 1, 'geo_metadata_id': 1, 'audio_metadata_id': 1, 'owner_id': 1, 'id': 1}, {'name': 'Challenge DCLDE LF 2015', 'start_date': '2012-06-22', 'end_date': '2012-06-26', 'files_type': 'WAV files', 'status': 1, 'dataset_type_id': 2, 'geo_metadata_id': 2, 'audio_metadata_id': 2, 'owner_id': 1, 'id': 2}, {'name': 'Challenge DCLDE HF 2015', 'start_date': '2009-11-06', 'end_date': '2009-11-06', 'files_type': 'WAV files', 'status': 1, 'dataset_type_id': 3, 'geo_metadata_id': 3, 'audio_metadata_id': 3, 'owner_id': 1, 'id': 3}]
        );
    })
    .then(() => {
        return knex('dataset_files').del();
    })
    .then(() => {
        return knex('dataset_files').insert(
            [{'filename': 'spmA000.wav', 'size': 58982478, 'dataset_id': 1, 'audio_metadata_id': 4, 'id': 1}, {'filename': 'spmA001.wav', 'size': 58982478, 'dataset_id': 1, 'audio_metadata_id': 5, 'id': 2}, {'filename': 'spmA002.wav', 'size': 58982478, 'dataset_id': 1, 'audio_metadata_id': 6, 'id': 3}, {'filename': 'out000.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 7, 'id': 4}, {'filename': 'out005.wav', 'size': 14397518, 'dataset_id': 2, 'audio_metadata_id': 8, 'id': 5}, {'filename': 'out006.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 9, 'id': 6}, {'filename': 'out007.wav', 'size': 14397518, 'dataset_id': 2, 'audio_metadata_id': 10, 'id': 7}, {'filename': 'out008.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 11, 'id': 8}, {'filename': 'out009.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 12, 'id': 9}, {'filename': 'out010.wav', 'size': 14397518, 'dataset_id': 2, 'audio_metadata_id': 13, 'id': 10}, {'filename': 'out011.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 14, 'id': 11}, {'filename': 'out012.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 15, 'id': 12}, {'filename': 'out013.wav', 'size': 14397518, 'dataset_id': 2, 'audio_metadata_id': 16, 'id': 13}, {'filename': 'out014.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 17, 'id': 14}, {'filename': 'out015.wav', 'size': 14397518, 'dataset_id': 2, 'audio_metadata_id': 18, 'id': 15}, {'filename': 'out016.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 19, 'id': 16}, {'filename': 'out017.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 20, 'id': 17}, {'filename': 'out018.wav', 'size': 14397518, 'dataset_id': 2, 'audio_metadata_id': 21, 'id': 18}, {'filename': 'out024.wav', 'size': 14401614, 'dataset_id': 2, 'audio_metadata_id': 22, 'id': 19}, {'filename': '091106_222845002.wav', 'size': 120000614, 'dataset_id': 3, 'audio_metadata_id': 23, 'id': 20}]
        );
    })
    .then(() => {
        return knex('annotation_sets').del();
    })
    .then(() => {
        return knex('annotation_sets').insert(
            [{'name': 'Test SPM campaign', 'desc': 'Annotation set made for Test SPM campaign', 'owner_id': 1, 'id': 1}, {'name': 'Test DCLDE LF campaign', 'desc': 'Annotation set made for Test DCLDE LF campaign', 'owner_id': 1, 'id': 2}, {'name': 'Test DCLDE HF campaign', 'desc': 'Annotation set made for Test DCLDE HF campaign', 'owner_id': 1, 'id': 3}]
        );
    })
    .then(() => {
        return knex('annotation_tags').del();
    })
    .then(() => {
        return knex('annotation_tags').insert(
            [{'id': 1, 'name': 'Mysticetes'}, {'id': 2, 'name': 'Odoncetes'}, {'id': 3, 'name': 'Boat'}, {'id': 4, 'name': 'Rain'}, {'id': 5, 'name': 'Drummingnoise'}, {'id': 6, 'name': 'Other'}, {'id': 7, 'name': 'Dcall'}, {'id': 8, 'name': '40-Hz'}, {'id': 9, 'name': 'Spermwhale'}, {'id': 10, 'name': 'BeakedWhales'}]
        );
    })
    .then(() => {
        return knex('annotation_set_tags').del();
    })
    .then(() => {
        return knex('annotation_set_tags').insert(
            [{'id': 1, 'annotation_set_id': 1, 'annotation_tag_id': 1}, {'id': 2, 'annotation_set_id': 1, 'annotation_tag_id': 2}, {'id': 3, 'annotation_set_id': 1, 'annotation_tag_id': 3}, {'id': 4, 'annotation_set_id': 1, 'annotation_tag_id': 4}, {'id': 5, 'annotation_set_id': 1, 'annotation_tag_id': 5}, {'id': 6, 'annotation_set_id': 1, 'annotation_tag_id': 6}, {'id': 7, 'annotation_set_id': 2, 'annotation_tag_id': 7}, {'id': 8, 'annotation_set_id': 2, 'annotation_tag_id': 8}, {'id': 9, 'annotation_set_id': 3, 'annotation_tag_id': 9}, {'id': 10, 'annotation_set_id': 3, 'annotation_tag_id': 10}]
        );
    })
    .then(() => {
        return knex('annotation_campaigns').del();
    })
    .then(() => {
        return knex('annotation_campaigns').insert(
            [{'name': 'Test SPM campaign', 'desc': 'Test annotation campaign', 'start': '2010-08-19', 'end': '2010-11-02', 'annotation_set_id': 1, 'owner_id': 1, 'id': 1}, {'name': 'Test DCLDE LF campaign', 'desc': 'Test annotation campaign DCLDE LF 2015', 'start': '2012-06-22', 'end': '2012-06-26', 'annotation_set_id': 2, 'owner_id': 1, 'id': 2}, {'name': 'Test DCLDE HF campaign', 'desc': 'Test annotation campaign DCLDE HF 2015', 'start': '2009-11-06', 'end': '2009-11-06', 'annotation_set_id': 3, 'owner_id': 1, 'id': 3}]
        );
    })
    .then(() => {
        return knex('annotation_campaign_datasets').del();
    })
    .then(() => {
        return knex('annotation_campaign_datasets').insert(
            [{'id': 1, 'annotation_campaign_id': 1, 'dataset_id': 1}, {'id': 2, 'annotation_campaign_id': 2, 'dataset_id': 2}, {'id': 3, 'annotation_campaign_id': 3, 'dataset_id': 3}]
        );
    })
    .then(() => {
        return knex('annotation_tasks').del();
    })
    .then(() => {
        return knex('annotation_tasks').insert(
            [{'id': 1, 'annotation_campaign_id': 1, 'dataset_file_id': 1, 'status': 0, 'annotator_id': 1}, {'id': 2, 'annotation_campaign_id': 1, 'dataset_file_id': 1, 'status': 0, 'annotator_id': 2}, {'id': 3, 'annotation_campaign_id': 1, 'dataset_file_id': 1, 'status': 0, 'annotator_id': 3}, {'id': 4, 'annotation_campaign_id': 1, 'dataset_file_id': 1, 'status': 0, 'annotator_id': 4}, {'id': 5, 'annotation_campaign_id': 1, 'dataset_file_id': 1, 'status': 0, 'annotator_id': 5}, {'id': 6, 'annotation_campaign_id': 1, 'dataset_file_id': 1, 'status': 0, 'annotator_id': 6}, {'id': 7, 'annotation_campaign_id': 1, 'dataset_file_id': 1, 'status': 0, 'annotator_id': 7}, {'id': 8, 'annotation_campaign_id': 1, 'dataset_file_id': 2, 'status': 0, 'annotator_id': 1}, {'id': 9, 'annotation_campaign_id': 1, 'dataset_file_id': 2, 'status': 0, 'annotator_id': 2}, {'id': 10, 'annotation_campaign_id': 1, 'dataset_file_id': 2, 'status': 0, 'annotator_id': 3}, {'id': 11, 'annotation_campaign_id': 1, 'dataset_file_id': 2, 'status': 0, 'annotator_id': 4}, {'id': 12, 'annotation_campaign_id': 1, 'dataset_file_id': 2, 'status': 0, 'annotator_id': 5}, {'id': 13, 'annotation_campaign_id': 1, 'dataset_file_id': 2, 'status': 0, 'annotator_id': 6}, {'id': 14, 'annotation_campaign_id': 1, 'dataset_file_id': 2, 'status': 0, 'annotator_id': 7}, {'id': 15, 'annotation_campaign_id': 1, 'dataset_file_id': 3, 'status': 0, 'annotator_id': 1}, {'id': 16, 'annotation_campaign_id': 1, 'dataset_file_id': 3, 'status': 0, 'annotator_id': 2}, {'id': 17, 'annotation_campaign_id': 1, 'dataset_file_id': 3, 'status': 0, 'annotator_id': 3}, {'id': 18, 'annotation_campaign_id': 1, 'dataset_file_id': 3, 'status': 0, 'annotator_id': 4}, {'id': 19, 'annotation_campaign_id': 1, 'dataset_file_id': 3, 'status': 0, 'annotator_id': 5}, {'id': 20, 'annotation_campaign_id': 1, 'dataset_file_id': 3, 'status': 0, 'annotator_id': 6}, {'id': 21, 'annotation_campaign_id': 1, 'dataset_file_id': 3, 'status': 0, 'annotator_id': 7}, {'id': 22, 'annotation_campaign_id': 2, 'dataset_file_id': 4, 'status': 0, 'annotator_id': 1}, {'id': 23, 'annotation_campaign_id': 2, 'dataset_file_id': 4, 'status': 0, 'annotator_id': 2}, {'id': 24, 'annotation_campaign_id': 2, 'dataset_file_id': 4, 'status': 0, 'annotator_id': 3}, {'id': 25, 'annotation_campaign_id': 2, 'dataset_file_id': 4, 'status': 0, 'annotator_id': 4}, {'id': 26, 'annotation_campaign_id': 2, 'dataset_file_id': 4, 'status': 0, 'annotator_id': 5}, {'id': 27, 'annotation_campaign_id': 2, 'dataset_file_id': 4, 'status': 0, 'annotator_id': 6}, {'id': 28, 'annotation_campaign_id': 2, 'dataset_file_id': 4, 'status': 0, 'annotator_id': 7}, {'id': 29, 'annotation_campaign_id': 2, 'dataset_file_id': 5, 'status': 0, 'annotator_id': 1}, {'id': 30, 'annotation_campaign_id': 2, 'dataset_file_id': 5, 'status': 0, 'annotator_id': 2}, {'id': 31, 'annotation_campaign_id': 2, 'dataset_file_id': 5, 'status': 0, 'annotator_id': 3}, {'id': 32, 'annotation_campaign_id': 2, 'dataset_file_id': 5, 'status': 0, 'annotator_id': 4}, {'id': 33, 'annotation_campaign_id': 2, 'dataset_file_id': 5, 'status': 0, 'annotator_id': 5}, {'id': 34, 'annotation_campaign_id': 2, 'dataset_file_id': 5, 'status': 0, 'annotator_id': 6}, {'id': 35, 'annotation_campaign_id': 2, 'dataset_file_id': 5, 'status': 0, 'annotator_id': 7}, {'id': 36, 'annotation_campaign_id': 2, 'dataset_file_id': 6, 'status': 0, 'annotator_id': 1}, {'id': 37, 'annotation_campaign_id': 2, 'dataset_file_id': 6, 'status': 0, 'annotator_id': 2}, {'id': 38, 'annotation_campaign_id': 2, 'dataset_file_id': 6, 'status': 0, 'annotator_id': 3}, {'id': 39, 'annotation_campaign_id': 2, 'dataset_file_id': 6, 'status': 0, 'annotator_id': 4}, {'id': 40, 'annotation_campaign_id': 2, 'dataset_file_id': 6, 'status': 0, 'annotator_id': 5}, {'id': 41, 'annotation_campaign_id': 2, 'dataset_file_id': 6, 'status': 0, 'annotator_id': 6}, {'id': 42, 'annotation_campaign_id': 2, 'dataset_file_id': 6, 'status': 0, 'annotator_id': 7}, {'id': 43, 'annotation_campaign_id': 2, 'dataset_file_id': 7, 'status': 0, 'annotator_id': 1}, {'id': 44, 'annotation_campaign_id': 2, 'dataset_file_id': 7, 'status': 0, 'annotator_id': 2}, {'id': 45, 'annotation_campaign_id': 2, 'dataset_file_id': 7, 'status': 0, 'annotator_id': 3}, {'id': 46, 'annotation_campaign_id': 2, 'dataset_file_id': 7, 'status': 0, 'annotator_id': 4}, {'id': 47, 'annotation_campaign_id': 2, 'dataset_file_id': 7, 'status': 0, 'annotator_id': 5}, {'id': 48, 'annotation_campaign_id': 2, 'dataset_file_id': 7, 'status': 0, 'annotator_id': 6}, {'id': 49, 'annotation_campaign_id': 2, 'dataset_file_id': 7, 'status': 0, 'annotator_id': 7}, {'id': 50, 'annotation_campaign_id': 2, 'dataset_file_id': 8, 'status': 0, 'annotator_id': 1}, {'id': 51, 'annotation_campaign_id': 2, 'dataset_file_id': 8, 'status': 0, 'annotator_id': 2}, {'id': 52, 'annotation_campaign_id': 2, 'dataset_file_id': 8, 'status': 0, 'annotator_id': 3}, {'id': 53, 'annotation_campaign_id': 2, 'dataset_file_id': 8, 'status': 0, 'annotator_id': 4}, {'id': 54, 'annotation_campaign_id': 2, 'dataset_file_id': 8, 'status': 0, 'annotator_id': 5}, {'id': 55, 'annotation_campaign_id': 2, 'dataset_file_id': 8, 'status': 0, 'annotator_id': 6}, {'id': 56, 'annotation_campaign_id': 2, 'dataset_file_id': 8, 'status': 0, 'annotator_id': 7}, {'id': 57, 'annotation_campaign_id': 2, 'dataset_file_id': 9, 'status': 0, 'annotator_id': 1}, {'id': 58, 'annotation_campaign_id': 2, 'dataset_file_id': 9, 'status': 0, 'annotator_id': 2}, {'id': 59, 'annotation_campaign_id': 2, 'dataset_file_id': 9, 'status': 0, 'annotator_id': 3}, {'id': 60, 'annotation_campaign_id': 2, 'dataset_file_id': 9, 'status': 0, 'annotator_id': 4}, {'id': 61, 'annotation_campaign_id': 2, 'dataset_file_id': 9, 'status': 0, 'annotator_id': 5}, {'id': 62, 'annotation_campaign_id': 2, 'dataset_file_id': 9, 'status': 0, 'annotator_id': 6}, {'id': 63, 'annotation_campaign_id': 2, 'dataset_file_id': 9, 'status': 0, 'annotator_id': 7}, {'id': 64, 'annotation_campaign_id': 2, 'dataset_file_id': 10, 'status': 0, 'annotator_id': 1}, {'id': 65, 'annotation_campaign_id': 2, 'dataset_file_id': 10, 'status': 0, 'annotator_id': 2}, {'id': 66, 'annotation_campaign_id': 2, 'dataset_file_id': 10, 'status': 0, 'annotator_id': 3}, {'id': 67, 'annotation_campaign_id': 2, 'dataset_file_id': 10, 'status': 0, 'annotator_id': 4}, {'id': 68, 'annotation_campaign_id': 2, 'dataset_file_id': 10, 'status': 0, 'annotator_id': 5}, {'id': 69, 'annotation_campaign_id': 2, 'dataset_file_id': 10, 'status': 0, 'annotator_id': 6}, {'id': 70, 'annotation_campaign_id': 2, 'dataset_file_id': 10, 'status': 0, 'annotator_id': 7}, {'id': 71, 'annotation_campaign_id': 2, 'dataset_file_id': 11, 'status': 0, 'annotator_id': 1}, {'id': 72, 'annotation_campaign_id': 2, 'dataset_file_id': 11, 'status': 0, 'annotator_id': 2}, {'id': 73, 'annotation_campaign_id': 2, 'dataset_file_id': 11, 'status': 0, 'annotator_id': 3}, {'id': 74, 'annotation_campaign_id': 2, 'dataset_file_id': 11, 'status': 0, 'annotator_id': 4}, {'id': 75, 'annotation_campaign_id': 2, 'dataset_file_id': 11, 'status': 0, 'annotator_id': 5}, {'id': 76, 'annotation_campaign_id': 2, 'dataset_file_id': 11, 'status': 0, 'annotator_id': 6}, {'id': 77, 'annotation_campaign_id': 2, 'dataset_file_id': 11, 'status': 0, 'annotator_id': 7}, {'id': 78, 'annotation_campaign_id': 2, 'dataset_file_id': 12, 'status': 0, 'annotator_id': 1}, {'id': 79, 'annotation_campaign_id': 2, 'dataset_file_id': 12, 'status': 0, 'annotator_id': 2}, {'id': 80, 'annotation_campaign_id': 2, 'dataset_file_id': 12, 'status': 0, 'annotator_id': 3}, {'id': 81, 'annotation_campaign_id': 2, 'dataset_file_id': 12, 'status': 0, 'annotator_id': 4}, {'id': 82, 'annotation_campaign_id': 2, 'dataset_file_id': 12, 'status': 0, 'annotator_id': 5}, {'id': 83, 'annotation_campaign_id': 2, 'dataset_file_id': 12, 'status': 0, 'annotator_id': 6}, {'id': 84, 'annotation_campaign_id': 2, 'dataset_file_id': 12, 'status': 0, 'annotator_id': 7}, {'id': 85, 'annotation_campaign_id': 2, 'dataset_file_id': 13, 'status': 0, 'annotator_id': 1}, {'id': 86, 'annotation_campaign_id': 2, 'dataset_file_id': 13, 'status': 0, 'annotator_id': 2}, {'id': 87, 'annotation_campaign_id': 2, 'dataset_file_id': 13, 'status': 0, 'annotator_id': 3}, {'id': 88, 'annotation_campaign_id': 2, 'dataset_file_id': 13, 'status': 0, 'annotator_id': 4}, {'id': 89, 'annotation_campaign_id': 2, 'dataset_file_id': 13, 'status': 0, 'annotator_id': 5}, {'id': 90, 'annotation_campaign_id': 2, 'dataset_file_id': 13, 'status': 0, 'annotator_id': 6}, {'id': 91, 'annotation_campaign_id': 2, 'dataset_file_id': 13, 'status': 0, 'annotator_id': 7}, {'id': 92, 'annotation_campaign_id': 2, 'dataset_file_id': 14, 'status': 0, 'annotator_id': 1}, {'id': 93, 'annotation_campaign_id': 2, 'dataset_file_id': 14, 'status': 0, 'annotator_id': 2}, {'id': 94, 'annotation_campaign_id': 2, 'dataset_file_id': 14, 'status': 0, 'annotator_id': 3}, {'id': 95, 'annotation_campaign_id': 2, 'dataset_file_id': 14, 'status': 0, 'annotator_id': 4}, {'id': 96, 'annotation_campaign_id': 2, 'dataset_file_id': 14, 'status': 0, 'annotator_id': 5}, {'id': 97, 'annotation_campaign_id': 2, 'dataset_file_id': 14, 'status': 0, 'annotator_id': 6}, {'id': 98, 'annotation_campaign_id': 2, 'dataset_file_id': 14, 'status': 0, 'annotator_id': 7}, {'id': 99, 'annotation_campaign_id': 2, 'dataset_file_id': 15, 'status': 0, 'annotator_id': 1}, {'id': 100, 'annotation_campaign_id': 2, 'dataset_file_id': 15, 'status': 0, 'annotator_id': 2}, {'id': 101, 'annotation_campaign_id': 2, 'dataset_file_id': 15, 'status': 0, 'annotator_id': 3}, {'id': 102, 'annotation_campaign_id': 2, 'dataset_file_id': 15, 'status': 0, 'annotator_id': 4}, {'id': 103, 'annotation_campaign_id': 2, 'dataset_file_id': 15, 'status': 0, 'annotator_id': 5}, {'id': 104, 'annotation_campaign_id': 2, 'dataset_file_id': 15, 'status': 0, 'annotator_id': 6}, {'id': 105, 'annotation_campaign_id': 2, 'dataset_file_id': 15, 'status': 0, 'annotator_id': 7}, {'id': 106, 'annotation_campaign_id': 2, 'dataset_file_id': 16, 'status': 0, 'annotator_id': 1}, {'id': 107, 'annotation_campaign_id': 2, 'dataset_file_id': 16, 'status': 0, 'annotator_id': 2}, {'id': 108, 'annotation_campaign_id': 2, 'dataset_file_id': 16, 'status': 0, 'annotator_id': 3}, {'id': 109, 'annotation_campaign_id': 2, 'dataset_file_id': 16, 'status': 0, 'annotator_id': 4}, {'id': 110, 'annotation_campaign_id': 2, 'dataset_file_id': 16, 'status': 0, 'annotator_id': 5}, {'id': 111, 'annotation_campaign_id': 2, 'dataset_file_id': 16, 'status': 0, 'annotator_id': 6}, {'id': 112, 'annotation_campaign_id': 2, 'dataset_file_id': 16, 'status': 0, 'annotator_id': 7}, {'id': 113, 'annotation_campaign_id': 2, 'dataset_file_id': 17, 'status': 0, 'annotator_id': 1}, {'id': 114, 'annotation_campaign_id': 2, 'dataset_file_id': 17, 'status': 0, 'annotator_id': 2}, {'id': 115, 'annotation_campaign_id': 2, 'dataset_file_id': 17, 'status': 0, 'annotator_id': 3}, {'id': 116, 'annotation_campaign_id': 2, 'dataset_file_id': 17, 'status': 0, 'annotator_id': 4}, {'id': 117, 'annotation_campaign_id': 2, 'dataset_file_id': 17, 'status': 0, 'annotator_id': 5}, {'id': 118, 'annotation_campaign_id': 2, 'dataset_file_id': 17, 'status': 0, 'annotator_id': 6}, {'id': 119, 'annotation_campaign_id': 2, 'dataset_file_id': 17, 'status': 0, 'annotator_id': 7}, {'id': 120, 'annotation_campaign_id': 2, 'dataset_file_id': 18, 'status': 0, 'annotator_id': 1}, {'id': 121, 'annotation_campaign_id': 2, 'dataset_file_id': 18, 'status': 0, 'annotator_id': 2}, {'id': 122, 'annotation_campaign_id': 2, 'dataset_file_id': 18, 'status': 0, 'annotator_id': 3}, {'id': 123, 'annotation_campaign_id': 2, 'dataset_file_id': 18, 'status': 0, 'annotator_id': 4}, {'id': 124, 'annotation_campaign_id': 2, 'dataset_file_id': 18, 'status': 0, 'annotator_id': 5}, {'id': 125, 'annotation_campaign_id': 2, 'dataset_file_id': 18, 'status': 0, 'annotator_id': 6}, {'id': 126, 'annotation_campaign_id': 2, 'dataset_file_id': 18, 'status': 0, 'annotator_id': 7}, {'id': 127, 'annotation_campaign_id': 2, 'dataset_file_id': 19, 'status': 0, 'annotator_id': 1}, {'id': 128, 'annotation_campaign_id': 2, 'dataset_file_id': 19, 'status': 0, 'annotator_id': 2}, {'id': 129, 'annotation_campaign_id': 2, 'dataset_file_id': 19, 'status': 0, 'annotator_id': 3}, {'id': 130, 'annotation_campaign_id': 2, 'dataset_file_id': 19, 'status': 0, 'annotator_id': 4}, {'id': 131, 'annotation_campaign_id': 2, 'dataset_file_id': 19, 'status': 0, 'annotator_id': 5}, {'id': 132, 'annotation_campaign_id': 2, 'dataset_file_id': 19, 'status': 0, 'annotator_id': 6}, {'id': 133, 'annotation_campaign_id': 2, 'dataset_file_id': 19, 'status': 0, 'annotator_id': 7}, {'id': 134, 'annotation_campaign_id': 3, 'dataset_file_id': 20, 'status': 0, 'annotator_id': 1}, {'id': 135, 'annotation_campaign_id': 3, 'dataset_file_id': 20, 'status': 0, 'annotator_id': 2}, {'id': 136, 'annotation_campaign_id': 3, 'dataset_file_id': 20, 'status': 0, 'annotator_id': 3}, {'id': 137, 'annotation_campaign_id': 3, 'dataset_file_id': 20, 'status': 0, 'annotator_id': 4}, {'id': 138, 'annotation_campaign_id': 3, 'dataset_file_id': 20, 'status': 0, 'annotator_id': 5}, {'id': 139, 'annotation_campaign_id': 3, 'dataset_file_id': 20, 'status': 0, 'annotator_id': 6}, {'id': 140, 'annotation_campaign_id': 3, 'dataset_file_id': 20, 'status': 0, 'annotator_id': 7}]
        );
    })
    .then(() => {
        return Promise.all([
            knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE dataset_types_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE geo_metadata_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE audio_metadata_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE datasets_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE dataset_files_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE annotation_sets_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE annotation_tags_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE annotation_set_tags_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE annotation_campaigns_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE annotation_campaign_datasets_id_seq RESTART WITH 1000"),
            knex.raw("ALTER SEQUENCE annotation_tasks_id_seq RESTART WITH 1000")
        ]);
    });
};
