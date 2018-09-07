'use strict';

var assert = require('../utils/assert.js');
var db     = require('../../db');

describe('user-related models tests', function () {
    this.timeout(20000);

    before(async function () {
        await db.init();
    });

    it('newly created user should have the right info', async function () {
        var email = 'test@test.test';
        var password = 'pwd';
        await db.User.query().insert({ email: email, password: password });
        var new_user = await db.User.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_user.email, email);
        assert.deepEqual(new_user.password, password);
        assert.deepEqual(new_user.enabled, true);
        assert.deepEqual(new_user.valid_until, null);
    });

    it('newly created team should have the right info', async function () {
        var name = "team";
        var desc = "test team"
        await db.Team.query().insert({ name: name, desc: desc });
        var new_team = await db.Team.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_team.name, name);
        assert.deepEqual(new_team.desc, desc);
    });

    it('newly created permissions should have the right info', async function () {
        var permission = {
            collection_id: 1,
            permission_level: 1,
            team_id: 1
        }
        await db.Permission.query().insert(permission);
        var new_perm = await db.Permission.query().orderBy('id', 'desc').first();
        assert.deepEqual(new_perm.collection_id, permission['collection_id']);
        assert.deepEqual(new_perm.dataset_id, permission['dataset_id']);
        assert.deepEqual(new_perm.permission_level, permission['permission_level']);
        assert.deepEqual(new_perm.team_id, permission['team_id']);
        assert.deepEqual(new_perm.user_id, permission['user_id']);
        assert.deepEqual(new_perm.public, false);
    });

    after(function() {
        db.close();
    });

});
