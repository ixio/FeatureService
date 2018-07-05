'use strict';

const Model = require('objection').Model;

class AnnotationCampaign extends Model {
    static get tableName() {
        return 'annotation_campaigns';
    }

    static get relationMappings() {
        return {
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
            datasetfile_annotations: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/DatasetfileAnnotation',
                join: {
                    from: 'annotation_campaigns.id',
                    to: 'datasetfile_annotations.annotation_campaign_id'
                }
            }
        };
    }
}

module.exports = AnnotationCampaign;
