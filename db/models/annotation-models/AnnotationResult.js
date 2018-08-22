'use strict';

const Model = require('objection').Model;

class AnnotationResult extends Model {
    static get tableName() {
        return 'annotation_results';
    }

    static get relationMappings() {
        return {
            tag: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/AnnotationTag',
                join: {
                    from: 'annotation_results.annotation_tag_id',
                    to: 'annotation_tags.id'
                }
            },
            annotation_task: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/AnnotationTask',
                join: {
                    from: 'annotation_results.annotation_task_id',
                    to: 'annotation_tasks.id'
                }
            }
        };
    }
}

module.exports = AnnotationResult;
