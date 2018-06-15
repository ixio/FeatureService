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
                    from: 'dataset_annotations.annotation_campaign_id',
                    to: 'annotation_campaigns.id'
                }
            },
            dataset_file: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../data-models/DatasetFile',
                join: {
                    from: 'dataset_annotations.dataset_file_id',
                    to: 'dataset_files.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'dataset_annotations.user_id',
                    to: 'users.id'
                }
            },
            annotation_sessions: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/AnnotationSession',
                join: {
                    from: 'datasetfile_annotations.annotation_session_id',
                    to: 'annotation_sessions.id'
                }
            }
        };
    }
}

module.exports = DatasetfileAnnotation;
