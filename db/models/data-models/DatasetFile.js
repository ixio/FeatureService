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
                    from: 'dataset_files.tabular_metadata_id',
                    to: 'tabular_metadata.id'
                }
            },
            audio_metadata: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../metadata-models/AudioMetadata',
                join: {
                    from: 'dataset_files.audio_metadata_id',
                    to: 'audio_metadata.id'
                }
            }
        };
    }
}

module.exports = DatasetFile;
