'use strict';

const Model = require('objection').Model;

class TabularMetadata extends Model {
    static get tableName() {
        return 'tabular_metadata';
    }

    static get relationMappings() {
        return {
            variables: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/TabularMetadataVariable',
                join: {
                    from: 'tabular_metadata.id',
                    to: 'tabular_metadata_variables.tabular_metadata_id'
                }
            }
        };
    }
}

module.exports = TabularMetadata;
