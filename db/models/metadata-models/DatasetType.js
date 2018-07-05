'use strict';

const Model = require('objection').Model;

class DatasetType extends Model {
    static get tableName() {
        return 'dataset_types';
    }
}

module.exports = DatasetType;
