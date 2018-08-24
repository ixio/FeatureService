'use strict';

const Model = require('objection').Model;

class AnnotationSet extends Model {
    static get tableName() {
        return 'annotation_sets';
    }

    static get relationMappings() {
        return {
            owner: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'annotation_sets.owner_id',
                    to: 'users.id'
                }
            },
            annotation_campaigns: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/AnnotationCampaign',
                join: {
                    from: 'annotation_sets.id',
                    to: 'annotation_campaigns.annotation_set_id'
                }
            },
            tags:  {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/AnnotationTag',
                join: {
                    from: 'annotation_sets.id',
                    through: {
                        from: 'annotation_set_tags.annotation_set_id',
                        to: 'annotation_set_tags.annotation_tag_id'
                    },
                    to: 'annotation_tags.id'
                }
            }
        };
    }
}

module.exports = AnnotationSet;
