/*
 * ODE-FeatureService Authentification from file tests
 * Author: Joseph Allemandou
 */
'use strict';


var assert = require('../../utils/assert.js');
var path = require('path');
var AuthFromDB = require('../../../lib/AuthFromDB');
var db = require('../../../db');

describe('authentication-from-file lib', function () {

    // Start DB before running tests
    before(async function () {
        await db.init();
    });

    it('should authorize correct login/password', function () {
        let auth = new AuthFromDB();
        return auth.authorize('admin@test.ode', 'password').then(authorized => {
            assert.deepEqual(authorized, true);
        });
    });

    it('should NOT authorize incorrect login', function () {
        let auth = new AuthFromDB();
        return auth.authorize('aadmin@test.ode', 'password').then(authorized => {
            assert.deepEqual(authorized, false);
        });
    });

    it('should NOT authorize incorrect password', function () {
        let auth = new AuthFromDB();
        return auth.authorize('admin@test.ode', 'apassword').then(authorized => {
            assert.deepEqual(authorized, false);
        });
    });

    after(function() {
        db.close();
    });


});
