'use strict';

const Model = require('objection').Model;

class AnnotationSession extends Model {
    static get tableName() {
        return 'annotation_sessions';
    }

    static get relationMappings() {
        return {
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

module.exports = AnnotationSession;
