'use strict';

const Model = require('objection').Model;

class AudioMetadata extends Model {
    static get tableName() {
        return 'audio_metadata';
    }
}

module.exports = AudioMetadata;
