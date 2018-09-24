'use strict';

const Model = require('objection').Model;

class AnnotationTask extends Model {
    static get tableName() {
        return 'annotation_tasks';
    }

    static get relationMappings() {
        return {
            annotation_campaign: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/AnnotationCampaign',
                join: {
                    from: 'annotation_tasks.annotation_campaign_id',
                    to: 'annotation_campaigns.id'
                }
            },
            dataset_file: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../data-models/DatasetFile',
                join: {
                    from: 'annotation_tasks.dataset_file_id',
                    to: 'dataset_files.id'
                }
            },
            dataset: {
                relation: Model.HasOneThroughRelation,
                modelClass: __dirname + '/../data-models/Dataset',
                join: {
                    from: 'annotation_tasks.dataset_file_id',
                    through: {
                        from: 'dataset_files.id',
                        to: 'dataset_files.dataset_id'
                    },
                    to: 'datasets.id'
                }
            },
            annotator: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'annotation_tasks.annotator_id',
                    to: 'users.id'
                }
            },
            annotation_sessions: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/AnnotationSession',
                join: {
                    from: 'annotation_tasks.id',
                    to: 'annotation_sessions.annotation_task_id'
                }
            },
            results: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/AnnotationResult',
                join: {
                    from: 'annotation_tasks.id',
                    to: 'annotation_results.annotation_task_id'
                }
            },
            tags: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/AnnotationTag',
                join: {
                    from: 'annotation_tasks.id',
                    through: {
                        from: 'annotation_results.annotation_task_id',
                        to: 'annotation_results.annotation_tag_id'
                    },
                    to: 'annotation_tags.id'
                }
            }
        };
    }
}

module.exports = AnnotationTask;
