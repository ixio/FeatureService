'use strict';

const Model = require('objection').Model;

class Job extends Model {
    static get tableName() {
        return 'jobs';
    }
}

module.exports = Job;
