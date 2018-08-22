'use strict';

const Model = require('objection').Model;

class AnnotationTag extends Model {
    static get tableName() {
        return 'annotation_tags';
    }

    static get relationMappings() {
        return {
            annotation_sets: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/AnnotationSet',
                join: {
                    from: 'annotation_tags.id',
                    through: {
                        from: 'annotation_set_tags.annotation_tag_id',
                        to: 'annotation_set_tags.annotation_set_id'
                    },
                    to: 'annotation_sets.id'
                }
            },
            annotation_results: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/AnnotationResult',
                join: {
                    from: 'annotation_tags.id',
                    to: 'annotation_results.annotation_tag_id'
                }
            }
        };
    }
}

module.exports = AnnotationTag;
