'use strict';

const Model = require('objection').Model;

class Permission extends Model {
    static get tableName() {
        return 'permissions';
    }

    static get relationMappings() {
        return {
            collection: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../data-models/Collection',
                join: {
                    from: 'permissions.collection_id',
                    to: 'collections.id'
                }
            },
            dataset: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../data-models/Dataset',
                join: {
                    from: 'permissions.dataset_id',
                    to: 'datasets.id'
                }
            },
            team: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Team',
                join: {
                    from: 'permissions.team_id',
                    to: 'teams.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'permissions.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Permission;
