'use strict';

const Model = require('objection').Model;

class Team extends Model {
    static get tableName() {
        return 'teams';
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'teams.id',
                    through: {
                        from: 'team_users.team_id',
                        to: 'team_users.user_id'
                    },
                    to: 'users.id'
                }
            }
        };
    }
}

module.exports = Team;
