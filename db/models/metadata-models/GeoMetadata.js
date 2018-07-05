'use strict';

const Model = require('objection').Model;

class GeoMetadata extends Model {
    static get tableName() {
        return 'geo_metadata';
    }
}

module.exports = GeoMetadata;
