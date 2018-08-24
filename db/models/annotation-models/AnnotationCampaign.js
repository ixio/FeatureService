'use strict';

const Model = require('objection').Model;

class AnnotationCampaign extends Model {
    static get tableName() {
        return 'annotation_campaigns';
    }

    static get relationMappings() {
        return {
            annotation_set: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/AnnotationSet',
                join: {
                    from: 'annotation_campaigns.annotation_set_id',
                    to: 'annotation_sets.id'
                }
            },
            datasets: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/../data-models/Dataset',
                join: {
                    from: 'annotation_campaigns.id',
                    through: {
                        from: 'annotation_campaign_datasets.annotation_campaign_id',
                        to: 'annotation_campaign_datasets.dataset_id'
                    },
                    to: 'datasets.id'
                }
            },
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'annotation_campaigns.owner_id',
                    to: 'users.id'
                }
            },
            annotation_tasks: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/AnnotationTask',
                join: {
                    from: 'annotation_campaigns.id',
                    to: 'annotation_tasks.annotation_campaign_id'
                }
            }
        };
    }
}

module.exports = AnnotationCampaign;
