'use strict';

exports.seed = function(knex, Promise) {
    return Promise.all([
        
    ])
    .then(() => {
        return knex('users').del();
    })
    .then(() => {
        return knex('users').insert(
            [{'id': 101, 'email': 'admin@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 102, 'email': 'dc@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 103, 'email': 'ek@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 104, 'email': 'ja@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 105, 'email': 'pnhd@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 106, 'email': 'ad@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}, {'id': 107, 'email': 'rv@test.ode', 'password': '$2a$10$RTELpt2ltJpjDEYRhU1NR.uK8hw4pdVCWZNl5FCRYx.ejUI7LMzb.'}]
        );
    })
    .then(() => {
        return knex('dataset_types').del();
    })
    .then(() => {
        return knex('dataset_types').insert(
            [{'name': 'Coastal audio recordings', 'desc': 'Recordings made with AURAL A M2, South of SPM', 'id': 101}, {'name': 'Coastal audio recordings at 600m deep', 'desc': 'Recordings made with HARP', 'id': 102}, {'name': 'Deep sea zone audio recordings', 'desc': 'Recordings made with HARP', 'id': 103}]
        );
    })
    .then(() => {
        return knex('geo_metadata').del();
    })
    .then(() => {
        return knex('geo_metadata').insert(
            [{'name': 'Saint-Pierre-et-Miquelon', 'desc': 'South of Saint-Pierre-et-Miquelon', 'id': 101}, {'name': 'Channel Islands National Marine Sanctuary site B', 'desc': 'Channel Islands National Marine Sanctuary site B', 'id': 102}, {'name': 'Southern  California site R', 'desc': 'Southern  California site R', 'id': 103}]
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
            [{'num_channels': '1', 'sample_rate_khz': '32768', 'total_samples': '88473600', 'sample_bits': '16', 'gain_db': '22', 'gain_rel': '-165', 'dutycycle_rdm': '45', 'dutycycle_rim': '60', 'id': 101}, {'num_channels': '1', 'sample_rate_khz': '2000', 'total_samples': '1200000', 'sample_bits': '16', 'id': 102}, {'num_channels': '1', 'sample_rate_khz': '200000', 'total_samples': '444000030', 'sample_bits': '16', 'id': 103}, {'start': '2010-08-30 07:00:00', 'end': '2010-08-30 07:15:00', 'sample_rate_khz': '32768', 'id': 104}, {'start': '2010-08-30 07:15:00', 'end': '2010-08-30 07:30:00', 'sample_rate_khz': '32768', 'id': 105}, {'start': '2010-08-30 07:30:00', 'end': '2010-08-30 07:45:00', 'sample_rate_khz': '32768 ', 'id': 106}, {'start': '2012-06-22 05:57:31', 'end': '2012-06-22 06:57:31', 'sample_rate_khz': '2000', 'id': 107}, {'start': '2012-06-22 10:57:31', 'end': '2012-06-22 11:57:31', 'sample_rate_khz': '2000', 'id': 108}, {'start': '2012-06-22 11:57:31', 'end': '2012-06-22 12:57:31', 'sample_rate_khz': '2000', 'id': 109}, {'start': '2012-06-22 12:57:31', 'end': '2012-06-22 13:57:31', 'sample_rate_khz': '2000', 'id': 110}, {'start': '2012-06-22 13:57:31', 'end': '2012-06-22 14:57:31', 'sample_rate_khz': '2000', 'id': 111}, {'start': '2012-06-22 14:57:31', 'end': '2012-06-22 15:57:31', 'sample_rate_khz': '2000', 'id': 112}, {'start': '2012-06-22 15:57:31', 'end': '2012-06-22 16:57:31', 'sample_rate_khz': '2000', 'id': 113}, {'start': '2012-06-22 16:57:31', 'end': '2012-06-22 17:57:31', 'sample_rate_khz': '2000', 'id': 114}, {'start': '2012-06-22 17:57:31', 'end': '2012-06-22 18:57:31', 'sample_rate_khz': '2000', 'id': 115}, {'start': '2012-06-22 18:57:31', 'end': '2012-06-22 19:57:31', 'sample_rate_khz': '2000', 'id': 116}, {'start': '2012-06-22 19:57:31', 'end': '2012-06-22 20:57:31', 'sample_rate_khz': '2000', 'id': 117}, {'start': '2012-06-22 20:57:31', 'end': '2012-06-22 21:57:31', 'sample_rate_khz': '2000', 'id': 118}, {'start': '2012-06-22 21:57:31', 'end': '2012-06-22 22:57:31', 'sample_rate_khz': '2000', 'id': 119}, {'start': '2012-06-22 22:57:31', 'end': '2012-06-22 23:57:31', 'sample_rate_khz': '2000', 'id': 120}, {'start': '2012-06-22 23:57:31', 'end': '2012-06-23 00:57:31', 'sample_rate_khz': '2000', 'id': 121}, {'start': '2012-06-23 05:57:31', 'end': '2012-06-23 06:57:31', 'sample_rate_khz': '2000', 'id': 122}, {'start': '2009-11-06 22:38:45', 'end': '2009-11-06 22:43:45 ', 'sample_rate_khz': '200000', 'id': 123}]
        );
    })
    .then(() => {
        return knex('datasets').del();
    })
    .then(() => {
        return knex('datasets').insert(
            [{'name': 'SPM Aural A 2010', 'start_date': '2010-08-19', 'end_date': '2010-11-02', 'files_type': 'WAV files', 'status': 1, 'dataset_type_id': 101, 'geo_metadata_id': 101, 'audio_metadata_id': 101, 'owner_id': 101, 'id': 101}, {'name': 'Challenge DCLDE LF 2015', 'start_date': '2012-06-22', 'end_date': '2012-06-26', 'files_type': 'WAV files', 'status': 1, 'dataset_type_id': 102, 'geo_metadata_id': 102, 'audio_metadata_id': 102, 'owner_id': 101, 'id': 102}, {'name': 'Challenge DCLDE HF 2015', 'start_date': '2009-11-06', 'end_date': '2009-11-06', 'files_type': 'WAV files', 'status': 1, 'dataset_type_id': 103, 'geo_metadata_id': 103, 'audio_metadata_id': 103, 'owner_id': 101, 'id': 103}]
        );
    })
    .then(() => {
        return knex('dataset_files').del();
    })
    .then(() => {
        return knex('dataset_files').insert(
            [{'filename': 'spmA000.wav', 'size': 58982478, 'dataset_id': 101, 'audio_metadata_id': 104, 'id': 101}, {'filename': 'spmA001.wav', 'size': 58982478, 'dataset_id': 101, 'audio_metadata_id': 105, 'id': 102}, {'filename': 'spmA002.wav', 'size': 58982478, 'dataset_id': 101, 'audio_metadata_id': 106, 'id': 103}, {'filename': 'out000.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 107, 'id': 104}, {'filename': 'out005.wav', 'size': 14397518, 'dataset_id': 102, 'audio_metadata_id': 108, 'id': 105}, {'filename': 'out006.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 109, 'id': 106}, {'filename': 'out007.wav', 'size': 14397518, 'dataset_id': 102, 'audio_metadata_id': 110, 'id': 107}, {'filename': 'out008.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 111, 'id': 108}, {'filename': 'out009.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 112, 'id': 109}, {'filename': 'out010.wav', 'size': 14397518, 'dataset_id': 102, 'audio_metadata_id': 113, 'id': 110}, {'filename': 'out011.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 114, 'id': 111}, {'filename': 'out012.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 115, 'id': 112}, {'filename': 'out013.wav', 'size': 14397518, 'dataset_id': 102, 'audio_metadata_id': 116, 'id': 113}, {'filename': 'out014.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 117, 'id': 114}, {'filename': 'out015.wav', 'size': 14397518, 'dataset_id': 102, 'audio_metadata_id': 118, 'id': 115}, {'filename': 'out016.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 119, 'id': 116}, {'filename': 'out017.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 120, 'id': 117}, {'filename': 'out018.wav', 'size': 14397518, 'dataset_id': 102, 'audio_metadata_id': 121, 'id': 118}, {'filename': 'out024.wav', 'size': 14401614, 'dataset_id': 102, 'audio_metadata_id': 122, 'id': 119}, {'filename': '091106_222845002.wav', 'size': 120000614, 'dataset_id': 103, 'audio_metadata_id': 123, 'id': 120}]
        );
    })
    .then(() => {
        return knex('annotation_sets').del();
    })
    .then(() => {
        return knex('annotation_sets').insert(
            [{'name': 'Test SPM campaign', 'desc': 'Annotation set made for Test SPM campaign', 'owner_id': 101, 'id': 101}, {'name': 'Test DCLDE LF campaign', 'desc': 'Annotation set made for Test DCLDE LF campaign', 'owner_id': 101, 'id': 102}, {'name': 'Test DCLDE HF campaign', 'desc': 'Annotation set made for Test DCLDE HF campaign', 'owner_id': 101, 'id': 103}]
        );
    })
    .then(() => {
        return knex('annotation_tags').del();
    })
    .then(() => {
        return knex('annotation_tags').insert(
            [{'id': 101, 'name': 'Mysticetes'}, {'id': 102, 'name': 'Odoncetes'}, {'id': 103, 'name': 'Boat'}, {'id': 104, 'name': 'Rain'}, {'id': 105, 'name': 'Drummingnoise'}, {'id': 106, 'name': 'Other'}, {'id': 107, 'name': 'Dcall'}, {'id': 108, 'name': '40-Hz'}, {'id': 109, 'name': 'Spermwhale'}, {'id': 110, 'name': 'BeakedWhales'}]
        );
    })
    .then(() => {
        return knex('annotation_set_tags').del();
    })
    .then(() => {
        return knex('annotation_set_tags').insert(
            [{'id': 101, 'annotation_set_id': 101, 'annotation_tag_id': 101}, {'id': 102, 'annotation_set_id': 101, 'annotation_tag_id': 102}, {'id': 103, 'annotation_set_id': 101, 'annotation_tag_id': 103}, {'id': 104, 'annotation_set_id': 101, 'annotation_tag_id': 104}, {'id': 105, 'annotation_set_id': 101, 'annotation_tag_id': 105}, {'id': 106, 'annotation_set_id': 101, 'annotation_tag_id': 106}, {'id': 107, 'annotation_set_id': 102, 'annotation_tag_id': 107}, {'id': 108, 'annotation_set_id': 102, 'annotation_tag_id': 108}, {'id': 109, 'annotation_set_id': 103, 'annotation_tag_id': 109}, {'id': 110, 'annotation_set_id': 103, 'annotation_tag_id': 110}]
        );
    })
    .then(() => {
        return knex('annotation_campaigns').del();
    })
    .then(() => {
        return knex('annotation_campaigns').insert(
            [{'name': 'Test SPM campaign', 'desc': 'Test annotation campaign', 'instructions_url': 'https://en.wikipedia.org/wiki/Saint_Pierre_and_Miquelon', 'start': '2010-08-19', 'end': '2010-11-02', 'annotation_set_id': 101, 'owner_id': 101, 'id': 101}, {'name': 'Test DCLDE LF campaign', 'desc': 'Test annotation campaign DCLDE LF 2015', 'start': '2012-06-22', 'end': '2012-06-26', 'annotation_set_id': 102, 'owner_id': 101, 'id': 102}, {'name': 'Test DCLDE HF campaign', 'desc': 'Test annotation campaign DCLDE HF 2015', 'start': '2009-11-06', 'end': '2009-11-06', 'annotation_set_id': 103, 'owner_id': 101, 'id': 103}]
        );
    })
    .then(() => {
        return knex('annotation_campaign_datasets').del();
    })
    .then(() => {
        return knex('annotation_campaign_datasets').insert(
            [{'id': 101, 'annotation_campaign_id': 101, 'dataset_id': 101}, {'id': 102, 'annotation_campaign_id': 102, 'dataset_id': 102}, {'id': 103, 'annotation_campaign_id': 103, 'dataset_id': 103}]
        );
    })
    .then(() => {
        return knex('annotation_tasks').del();
    })
    .then(() => {
        return knex('annotation_tasks').insert(
            [{'id': 101, 'annotation_campaign_id': 101, 'dataset_file_id': 101, 'status': 0, 'annotator_id': 101}, {'id': 102, 'annotation_campaign_id': 101, 'dataset_file_id': 101, 'status': 0, 'annotator_id': 102}, {'id': 103, 'annotation_campaign_id': 101, 'dataset_file_id': 101, 'status': 0, 'annotator_id': 103}, {'id': 104, 'annotation_campaign_id': 101, 'dataset_file_id': 101, 'status': 0, 'annotator_id': 104}, {'id': 105, 'annotation_campaign_id': 101, 'dataset_file_id': 101, 'status': 0, 'annotator_id': 105}, {'id': 106, 'annotation_campaign_id': 101, 'dataset_file_id': 101, 'status': 0, 'annotator_id': 106}, {'id': 107, 'annotation_campaign_id': 101, 'dataset_file_id': 101, 'status': 0, 'annotator_id': 107}, {'id': 108, 'annotation_campaign_id': 101, 'dataset_file_id': 102, 'status': 0, 'annotator_id': 101}, {'id': 109, 'annotation_campaign_id': 101, 'dataset_file_id': 102, 'status': 0, 'annotator_id': 102}, {'id': 110, 'annotation_campaign_id': 101, 'dataset_file_id': 102, 'status': 0, 'annotator_id': 103}, {'id': 111, 'annotation_campaign_id': 101, 'dataset_file_id': 102, 'status': 0, 'annotator_id': 104}, {'id': 112, 'annotation_campaign_id': 101, 'dataset_file_id': 102, 'status': 0, 'annotator_id': 105}, {'id': 113, 'annotation_campaign_id': 101, 'dataset_file_id': 102, 'status': 0, 'annotator_id': 106}, {'id': 114, 'annotation_campaign_id': 101, 'dataset_file_id': 102, 'status': 0, 'annotator_id': 107}, {'id': 115, 'annotation_campaign_id': 101, 'dataset_file_id': 103, 'status': 0, 'annotator_id': 101}, {'id': 116, 'annotation_campaign_id': 101, 'dataset_file_id': 103, 'status': 0, 'annotator_id': 102}, {'id': 117, 'annotation_campaign_id': 101, 'dataset_file_id': 103, 'status': 0, 'annotator_id': 103}, {'id': 118, 'annotation_campaign_id': 101, 'dataset_file_id': 103, 'status': 0, 'annotator_id': 104}, {'id': 119, 'annotation_campaign_id': 101, 'dataset_file_id': 103, 'status': 0, 'annotator_id': 105}, {'id': 120, 'annotation_campaign_id': 101, 'dataset_file_id': 103, 'status': 0, 'annotator_id': 106}, {'id': 121, 'annotation_campaign_id': 101, 'dataset_file_id': 103, 'status': 0, 'annotator_id': 107}, {'id': 122, 'annotation_campaign_id': 102, 'dataset_file_id': 104, 'status': 0, 'annotator_id': 101}, {'id': 123, 'annotation_campaign_id': 102, 'dataset_file_id': 104, 'status': 0, 'annotator_id': 102}, {'id': 124, 'annotation_campaign_id': 102, 'dataset_file_id': 104, 'status': 0, 'annotator_id': 103}, {'id': 125, 'annotation_campaign_id': 102, 'dataset_file_id': 104, 'status': 0, 'annotator_id': 104}, {'id': 126, 'annotation_campaign_id': 102, 'dataset_file_id': 104, 'status': 0, 'annotator_id': 105}, {'id': 127, 'annotation_campaign_id': 102, 'dataset_file_id': 104, 'status': 0, 'annotator_id': 106}, {'id': 128, 'annotation_campaign_id': 102, 'dataset_file_id': 104, 'status': 0, 'annotator_id': 107}, {'id': 129, 'annotation_campaign_id': 102, 'dataset_file_id': 105, 'status': 0, 'annotator_id': 101}, {'id': 130, 'annotation_campaign_id': 102, 'dataset_file_id': 105, 'status': 0, 'annotator_id': 102}, {'id': 131, 'annotation_campaign_id': 102, 'dataset_file_id': 105, 'status': 0, 'annotator_id': 103}, {'id': 132, 'annotation_campaign_id': 102, 'dataset_file_id': 105, 'status': 0, 'annotator_id': 104}, {'id': 133, 'annotation_campaign_id': 102, 'dataset_file_id': 105, 'status': 0, 'annotator_id': 105}, {'id': 134, 'annotation_campaign_id': 102, 'dataset_file_id': 105, 'status': 0, 'annotator_id': 106}, {'id': 135, 'annotation_campaign_id': 102, 'dataset_file_id': 105, 'status': 0, 'annotator_id': 107}, {'id': 136, 'annotation_campaign_id': 102, 'dataset_file_id': 106, 'status': 0, 'annotator_id': 101}, {'id': 137, 'annotation_campaign_id': 102, 'dataset_file_id': 106, 'status': 0, 'annotator_id': 102}, {'id': 138, 'annotation_campaign_id': 102, 'dataset_file_id': 106, 'status': 0, 'annotator_id': 103}, {'id': 139, 'annotation_campaign_id': 102, 'dataset_file_id': 106, 'status': 0, 'annotator_id': 104}, {'id': 140, 'annotation_campaign_id': 102, 'dataset_file_id': 106, 'status': 0, 'annotator_id': 105}, {'id': 141, 'annotation_campaign_id': 102, 'dataset_file_id': 106, 'status': 0, 'annotator_id': 106}, {'id': 142, 'annotation_campaign_id': 102, 'dataset_file_id': 106, 'status': 0, 'annotator_id': 107}, {'id': 143, 'annotation_campaign_id': 102, 'dataset_file_id': 107, 'status': 0, 'annotator_id': 101}, {'id': 144, 'annotation_campaign_id': 102, 'dataset_file_id': 107, 'status': 0, 'annotator_id': 102}, {'id': 145, 'annotation_campaign_id': 102, 'dataset_file_id': 107, 'status': 0, 'annotator_id': 103}, {'id': 146, 'annotation_campaign_id': 102, 'dataset_file_id': 107, 'status': 0, 'annotator_id': 104}, {'id': 147, 'annotation_campaign_id': 102, 'dataset_file_id': 107, 'status': 0, 'annotator_id': 105}, {'id': 148, 'annotation_campaign_id': 102, 'dataset_file_id': 107, 'status': 0, 'annotator_id': 106}, {'id': 149, 'annotation_campaign_id': 102, 'dataset_file_id': 107, 'status': 0, 'annotator_id': 107}, {'id': 150, 'annotation_campaign_id': 102, 'dataset_file_id': 108, 'status': 0, 'annotator_id': 101}, {'id': 151, 'annotation_campaign_id': 102, 'dataset_file_id': 108, 'status': 0, 'annotator_id': 102}, {'id': 152, 'annotation_campaign_id': 102, 'dataset_file_id': 108, 'status': 0, 'annotator_id': 103}, {'id': 153, 'annotation_campaign_id': 102, 'dataset_file_id': 108, 'status': 0, 'annotator_id': 104}, {'id': 154, 'annotation_campaign_id': 102, 'dataset_file_id': 108, 'status': 0, 'annotator_id': 105}, {'id': 155, 'annotation_campaign_id': 102, 'dataset_file_id': 108, 'status': 0, 'annotator_id': 106}, {'id': 156, 'annotation_campaign_id': 102, 'dataset_file_id': 108, 'status': 0, 'annotator_id': 107}, {'id': 157, 'annotation_campaign_id': 102, 'dataset_file_id': 109, 'status': 0, 'annotator_id': 101}, {'id': 158, 'annotation_campaign_id': 102, 'dataset_file_id': 109, 'status': 0, 'annotator_id': 102}, {'id': 159, 'annotation_campaign_id': 102, 'dataset_file_id': 109, 'status': 0, 'annotator_id': 103}, {'id': 160, 'annotation_campaign_id': 102, 'dataset_file_id': 109, 'status': 0, 'annotator_id': 104}, {'id': 161, 'annotation_campaign_id': 102, 'dataset_file_id': 109, 'status': 0, 'annotator_id': 105}, {'id': 162, 'annotation_campaign_id': 102, 'dataset_file_id': 109, 'status': 0, 'annotator_id': 106}, {'id': 163, 'annotation_campaign_id': 102, 'dataset_file_id': 109, 'status': 0, 'annotator_id': 107}, {'id': 164, 'annotation_campaign_id': 102, 'dataset_file_id': 110, 'status': 0, 'annotator_id': 101}, {'id': 165, 'annotation_campaign_id': 102, 'dataset_file_id': 110, 'status': 0, 'annotator_id': 102}, {'id': 166, 'annotation_campaign_id': 102, 'dataset_file_id': 110, 'status': 0, 'annotator_id': 103}, {'id': 167, 'annotation_campaign_id': 102, 'dataset_file_id': 110, 'status': 0, 'annotator_id': 104}, {'id': 168, 'annotation_campaign_id': 102, 'dataset_file_id': 110, 'status': 0, 'annotator_id': 105}, {'id': 169, 'annotation_campaign_id': 102, 'dataset_file_id': 110, 'status': 0, 'annotator_id': 106}, {'id': 170, 'annotation_campaign_id': 102, 'dataset_file_id': 110, 'status': 0, 'annotator_id': 107}, {'id': 171, 'annotation_campaign_id': 102, 'dataset_file_id': 111, 'status': 0, 'annotator_id': 101}, {'id': 172, 'annotation_campaign_id': 102, 'dataset_file_id': 111, 'status': 0, 'annotator_id': 102}, {'id': 173, 'annotation_campaign_id': 102, 'dataset_file_id': 111, 'status': 0, 'annotator_id': 103}, {'id': 174, 'annotation_campaign_id': 102, 'dataset_file_id': 111, 'status': 0, 'annotator_id': 104}, {'id': 175, 'annotation_campaign_id': 102, 'dataset_file_id': 111, 'status': 0, 'annotator_id': 105}, {'id': 176, 'annotation_campaign_id': 102, 'dataset_file_id': 111, 'status': 0, 'annotator_id': 106}, {'id': 177, 'annotation_campaign_id': 102, 'dataset_file_id': 111, 'status': 0, 'annotator_id': 107}, {'id': 178, 'annotation_campaign_id': 102, 'dataset_file_id': 112, 'status': 0, 'annotator_id': 101}, {'id': 179, 'annotation_campaign_id': 102, 'dataset_file_id': 112, 'status': 0, 'annotator_id': 102}, {'id': 180, 'annotation_campaign_id': 102, 'dataset_file_id': 112, 'status': 0, 'annotator_id': 103}, {'id': 181, 'annotation_campaign_id': 102, 'dataset_file_id': 112, 'status': 0, 'annotator_id': 104}, {'id': 182, 'annotation_campaign_id': 102, 'dataset_file_id': 112, 'status': 0, 'annotator_id': 105}, {'id': 183, 'annotation_campaign_id': 102, 'dataset_file_id': 112, 'status': 0, 'annotator_id': 106}, {'id': 184, 'annotation_campaign_id': 102, 'dataset_file_id': 112, 'status': 0, 'annotator_id': 107}, {'id': 185, 'annotation_campaign_id': 102, 'dataset_file_id': 113, 'status': 0, 'annotator_id': 101}, {'id': 186, 'annotation_campaign_id': 102, 'dataset_file_id': 113, 'status': 0, 'annotator_id': 102}, {'id': 187, 'annotation_campaign_id': 102, 'dataset_file_id': 113, 'status': 0, 'annotator_id': 103}, {'id': 188, 'annotation_campaign_id': 102, 'dataset_file_id': 113, 'status': 0, 'annotator_id': 104}, {'id': 189, 'annotation_campaign_id': 102, 'dataset_file_id': 113, 'status': 0, 'annotator_id': 105}, {'id': 190, 'annotation_campaign_id': 102, 'dataset_file_id': 113, 'status': 0, 'annotator_id': 106}, {'id': 191, 'annotation_campaign_id': 102, 'dataset_file_id': 113, 'status': 0, 'annotator_id': 107}, {'id': 192, 'annotation_campaign_id': 102, 'dataset_file_id': 114, 'status': 0, 'annotator_id': 101}, {'id': 193, 'annotation_campaign_id': 102, 'dataset_file_id': 114, 'status': 0, 'annotator_id': 102}, {'id': 194, 'annotation_campaign_id': 102, 'dataset_file_id': 114, 'status': 0, 'annotator_id': 103}, {'id': 195, 'annotation_campaign_id': 102, 'dataset_file_id': 114, 'status': 0, 'annotator_id': 104}, {'id': 196, 'annotation_campaign_id': 102, 'dataset_file_id': 114, 'status': 0, 'annotator_id': 105}, {'id': 197, 'annotation_campaign_id': 102, 'dataset_file_id': 114, 'status': 0, 'annotator_id': 106}, {'id': 198, 'annotation_campaign_id': 102, 'dataset_file_id': 114, 'status': 0, 'annotator_id': 107}, {'id': 199, 'annotation_campaign_id': 102, 'dataset_file_id': 115, 'status': 0, 'annotator_id': 101}, {'id': 200, 'annotation_campaign_id': 102, 'dataset_file_id': 115, 'status': 0, 'annotator_id': 102}, {'id': 201, 'annotation_campaign_id': 102, 'dataset_file_id': 115, 'status': 0, 'annotator_id': 103}, {'id': 202, 'annotation_campaign_id': 102, 'dataset_file_id': 115, 'status': 0, 'annotator_id': 104}, {'id': 203, 'annotation_campaign_id': 102, 'dataset_file_id': 115, 'status': 0, 'annotator_id': 105}, {'id': 204, 'annotation_campaign_id': 102, 'dataset_file_id': 115, 'status': 0, 'annotator_id': 106}, {'id': 205, 'annotation_campaign_id': 102, 'dataset_file_id': 115, 'status': 0, 'annotator_id': 107}, {'id': 206, 'annotation_campaign_id': 102, 'dataset_file_id': 116, 'status': 0, 'annotator_id': 101}, {'id': 207, 'annotation_campaign_id': 102, 'dataset_file_id': 116, 'status': 0, 'annotator_id': 102}, {'id': 208, 'annotation_campaign_id': 102, 'dataset_file_id': 116, 'status': 0, 'annotator_id': 103}, {'id': 209, 'annotation_campaign_id': 102, 'dataset_file_id': 116, 'status': 0, 'annotator_id': 104}, {'id': 210, 'annotation_campaign_id': 102, 'dataset_file_id': 116, 'status': 0, 'annotator_id': 105}, {'id': 211, 'annotation_campaign_id': 102, 'dataset_file_id': 116, 'status': 0, 'annotator_id': 106}, {'id': 212, 'annotation_campaign_id': 102, 'dataset_file_id': 116, 'status': 0, 'annotator_id': 107}, {'id': 213, 'annotation_campaign_id': 102, 'dataset_file_id': 117, 'status': 0, 'annotator_id': 101}, {'id': 214, 'annotation_campaign_id': 102, 'dataset_file_id': 117, 'status': 0, 'annotator_id': 102}, {'id': 215, 'annotation_campaign_id': 102, 'dataset_file_id': 117, 'status': 0, 'annotator_id': 103}, {'id': 216, 'annotation_campaign_id': 102, 'dataset_file_id': 117, 'status': 0, 'annotator_id': 104}, {'id': 217, 'annotation_campaign_id': 102, 'dataset_file_id': 117, 'status': 0, 'annotator_id': 105}, {'id': 218, 'annotation_campaign_id': 102, 'dataset_file_id': 117, 'status': 0, 'annotator_id': 106}, {'id': 219, 'annotation_campaign_id': 102, 'dataset_file_id': 117, 'status': 0, 'annotator_id': 107}, {'id': 220, 'annotation_campaign_id': 102, 'dataset_file_id': 118, 'status': 0, 'annotator_id': 101}, {'id': 221, 'annotation_campaign_id': 102, 'dataset_file_id': 118, 'status': 0, 'annotator_id': 102}, {'id': 222, 'annotation_campaign_id': 102, 'dataset_file_id': 118, 'status': 0, 'annotator_id': 103}, {'id': 223, 'annotation_campaign_id': 102, 'dataset_file_id': 118, 'status': 0, 'annotator_id': 104}, {'id': 224, 'annotation_campaign_id': 102, 'dataset_file_id': 118, 'status': 0, 'annotator_id': 105}, {'id': 225, 'annotation_campaign_id': 102, 'dataset_file_id': 118, 'status': 0, 'annotator_id': 106}, {'id': 226, 'annotation_campaign_id': 102, 'dataset_file_id': 118, 'status': 0, 'annotator_id': 107}, {'id': 227, 'annotation_campaign_id': 102, 'dataset_file_id': 119, 'status': 0, 'annotator_id': 101}, {'id': 228, 'annotation_campaign_id': 102, 'dataset_file_id': 119, 'status': 0, 'annotator_id': 102}, {'id': 229, 'annotation_campaign_id': 102, 'dataset_file_id': 119, 'status': 0, 'annotator_id': 103}, {'id': 230, 'annotation_campaign_id': 102, 'dataset_file_id': 119, 'status': 0, 'annotator_id': 104}, {'id': 231, 'annotation_campaign_id': 102, 'dataset_file_id': 119, 'status': 0, 'annotator_id': 105}, {'id': 232, 'annotation_campaign_id': 102, 'dataset_file_id': 119, 'status': 0, 'annotator_id': 106}, {'id': 233, 'annotation_campaign_id': 102, 'dataset_file_id': 119, 'status': 0, 'annotator_id': 107}, {'id': 234, 'annotation_campaign_id': 103, 'dataset_file_id': 120, 'status': 0, 'annotator_id': 101}, {'id': 235, 'annotation_campaign_id': 103, 'dataset_file_id': 120, 'status': 0, 'annotator_id': 102}, {'id': 236, 'annotation_campaign_id': 103, 'dataset_file_id': 120, 'status': 0, 'annotator_id': 103}, {'id': 237, 'annotation_campaign_id': 103, 'dataset_file_id': 120, 'status': 0, 'annotator_id': 104}, {'id': 238, 'annotation_campaign_id': 103, 'dataset_file_id': 120, 'status': 0, 'annotator_id': 105}, {'id': 239, 'annotation_campaign_id': 103, 'dataset_file_id': 120, 'status': 0, 'annotator_id': 106}, {'id': 240, 'annotation_campaign_id': 103, 'dataset_file_id': 120, 'status': 0, 'annotator_id': 107}]
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