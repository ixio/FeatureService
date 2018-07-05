'use strict';

const Model = require('objection').Model;

class Collection extends Model {
    static get tableName() {
        return 'collections';
    }

    static get relationMappings() {
        return {
            datasets: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Dataset',
                join: {
                    from: 'collections.id',
                    through: {
                        from: 'collection_datasets.collection_id',
                        to: 'collection_datasets.dataset_id'
                    },
                    to: 'datasets.id'
                }
            },
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'collections.owner_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Collection;
