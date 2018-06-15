'use strict';

const Model = require('objection').Model;

class TabularMetadataVariable extends Model {
    static get tableName() {
        return 'tabular_metadata_variables';
    }

    static get relationMappings() {
        return {
            tabular_metadata: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/TabularMetadata',
                join: {
                    from: 'tabular_metadata_variables.tabular_metadata_id',
                    to: 'tabular_metadatas.id'
                }
            },
            shape: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/TabularMetadataShape',
                join: {
                    from: 'tabular_metadata_variables.id',
                    to: 'tabular_metadata_shapes.tabular_metadata_variable_id'
                }
            }
        };
    }
}

module.exports = TabularMetadataVariable;
