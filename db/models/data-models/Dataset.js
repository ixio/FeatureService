'use strict';

const Model = require('objection').Model;

class Dataset extends Model {
    static get tableName() {
        return 'datasets';
    }

    static get relationMappings() {
        return {
            collections: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Collection',
                join: {
                    from: 'datasets.id',
                    through: {
                        from: 'collection_datasets.dataset_id',
                        to: 'collection_datasets.collection_id'
                    },
                    to: 'collections.id'
                }
            },
            annotation_campaigns: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/../annotation-models/AnnotationCampaign',
                join: {
                    from: 'datasets.id',
                    through: {
                        from: 'annotation_campaign_datasets.dataset_id',
                        to: 'annotation_campaign_datasets.annotation_campaign_id'
                    },
                    to: 'annotation_campaigns.id'
                }
            },
            dataset_type: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../metadata-models/DatasetType',
                join: {
                    from: 'datasets.dataset_type_id',
                    to: 'dataset_types.id'
                }
            },
            geo_metadata: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../metadata-models/GeoMetadata',
                join: {
                    from: 'datasets.geo_metadata_id',
                    to: 'geo_metadata.id'
                }
            },
            tabular_metadata: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../metadata-models/TabularMetadata',
                join: {
                    from: 'datasets.tabular_metadata_id',
                    to: 'tabular_metadata.id'
                }
            },
            audio_metadata: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../metadata-models/AudioMetadata',
                join: {
                    from: 'datasets.audio_metadata_id',
                    to: 'audio_metadata.id'
                }
            },
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'datasets.owner_id',
                    to: 'users.id'
                }
            },
            files: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/DatasetFile',
                join: {
                    from: 'datasets.id',
                    to: 'dataset_files.dataset_id'
                }
            }
        };
    }
}

module.exports = Dataset;
