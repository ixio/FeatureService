'use strict';

const Model = require('objection').Model;

class DatasetfileAnnotation extends Model {
    static get tableName() {
        return 'datasetfile_annotations';
    }

    static get relationMappings() {
        return {
            annotation_campaign: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/AnnotationCampaign',
                join: {
                    from: 'datasetfile_annotations.annotation_campaign_id',
                    to: 'annotation_campaigns.id'
                }
            },
            dataset_file: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../data-models/DatasetFile',
                join: {
                    from: 'datasetfile_annotations.dataset_file_id',
                    to: 'dataset_files.id'
                }
            },
            annotator: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'datasetfile_annotations.annotator_id',
                    to: 'users.id'
                }
            },
            annotation_sessions: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/AnnotationSession',
                join: {
                    from: 'datasetfile_annotations.id',
                    to: 'annotation_sessions.datasetfile_annotation_id'
                }
            }
        };
    }
}

module.exports = DatasetfileAnnotation;
