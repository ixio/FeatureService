'use strict';

var dbm;
var type;
var seed;
var async = require('async');

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  async.series([
    db.createTable.bind(db, 'users', {
      id: { type: 'int', primaryKey: true },
      email: 'string',
      password: 'string'
    }),
    db.createTable.bind(db, 'datasets', {
      id: { type: 'int', primaryKey: true },
      name: 'string',
      storage_backend: 'string',
      storage_location: 'string',
      ES_location: 'string',
      owner: {
        type: 'int',
        foreignKey: {
          name: 'datasets_owner_fk',
          table: 'users',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      }
    }),
    db.createTable.bind(db, 'jobs', {
      id: { type: 'int', primaryKey: true },
      to_execute: 'text',    // Command to be used to launch job
      locked_at: 'datetime', // Show that a job is taken by given a locked_at time
      locked_by: 'string',   // Process@Machine that has taken the job
      status: 'int',         // 0: unprocessed, 1: succeeded, 2: failed
      result: 'text',        // Success or error message
      queue: 'string'        // Type of job, which queue it belongs to
    })
  ], callback);
};

exports.down = function(db, callback) {
  async.series([
    db.dropTable.bind(db, 'users'),
    db.dropTable.bind(db, 'datasets'),
    db.dropTable.bind(db, 'jobs')
  ], callback);
};

exports._meta = {
  "version": 1
};
