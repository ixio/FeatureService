'use strict';

const Model = require('objection').Model;

class AnnotationSession extends Model {
    static get tableName() {
        return 'annotation_sessions';
    }

    static get relationMappings() {
        return {
            datasetfile_annotation: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/DatasetfileAnnotation',
                join: {
                    from: 'annotation_sessions.datasetfile_annotation_id',
                    to: 'datasetfile_annotations.id'
                }
            }
        };
    }
}

module.exports = AnnotationSession;
