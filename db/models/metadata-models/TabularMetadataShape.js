'use strict';

const Model = require('objection').Model;

class TabularMetadataShape extends Model {
    static get tableName() {
        return 'tabular_metadata_shapes';
    }

    static get relationMappings() {
        return {
            variable: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/TabularMetadataVariable',
                join: {
                    from: 'tabular_metadata_shapes.tabular_metadata_variable_id',
                    to: 'tabular_metadata_variables.id'
                }
            },
            dimension: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/TabularMetadataVariable',
                join: {
                    from: 'tabular_metadata_shapes.tabular_metadata_dimension_id',
                    to: 'tabular_metadata_variables.id'
                }
            }
        };
    }
}

module.exports = TabularMetadataShape;
