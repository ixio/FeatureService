'use strict';

const Model = require('objection').Model;

class AnnotationSession extends Model {
    static get tableName() {
        return 'annotation_sessions';
    }

    static get relationMappings() {
        return {
            annotation_task: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/AnnotationTask',
                join: {
                    from: 'annotation_sessions.annotation_task_id',
                    to: 'annotation_tasks.id'
                }
            }
        };
    }
}

module.exports = AnnotationSession;
