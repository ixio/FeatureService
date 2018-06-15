'use strict';

const Model = require('objection').Model;

class DatasetFile extends Model {
    static get tableName() {
        return 'dataset_files';
    }

    static get relationMappings() {
        return {
            dataset: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Dataset',
                join: {
                    from: 'dataset_files.dataset_id',
                    to: 'datasets.id'
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
            }
        };
    }
}

module.exports = DatasetFile;
