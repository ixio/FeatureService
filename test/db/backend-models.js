'use strict';

var assert = require('../utils/assert.js');
var db     = require('../../db');

describe('backend-related models tests', function () {
    this.timeout(20000);

    before(async function () {
        await db.init();
    });

    it('newly created job should have the right info', async function () {
        var job = {
            to_execute: 'du -sh /',
            locked_at: new Date('2018-01-01 12:00:00'),
            locked_by: 'process@machine',
            status: 1,
            result: '107M   /',
            queue: 'sysadmin'
        }
        await db.Job.query().insert(job);
        var new_job = await db.Job.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_job.to_execute, job['to_execute']);
        assert.deepEqual(new_job.locked_at, job['locked_at']);
        assert.deepEqual(new_job.locked_by, job['locked_by']);
        assert.deepEqual(new_job.status, job['status']);
        assert.deepEqual(new_job.result, job['result']);
        assert.deepEqual(new_job.queue, job['queue']);
    });

    after(function() {
        db.close();
    });

});
