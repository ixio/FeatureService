'use strict';

const Model = require('objection').Model;

class AnnotationSet extends Model {
    static get tableName() {
        return 'annotation_sets';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/../user-models/User',
                join: {
                    from: 'annotation_sets.user_id',
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
            }
        };
    }
}

module.exports = AnnotationSet;
