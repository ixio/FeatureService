'use strict';

const Model = require('objection').Model;

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get relationMappings() {
        return {
            teams: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Team',
                join: {
                    from: 'users.id',
                    through: {
                        from: 'team_users.user_id',
                        to: 'team_users.team_id'
                    },
                    to: 'teams.id'
                }
            }
        };
    }
}

module.exports = User;
