/* Copyright (C) 2017 Project-EBDO
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
 * EBDO-FeatureService authentification functions
 * Author: Erwan Keribin
 */
'use strict';
const bcrypt = require('bcryptjs'); // Package chosen over bcrypt because it has fewer dependencies
const jwt = require('jsonwebtoken');

var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');
var AuthFromHTPasswdFile = require('../lib/AuthFromHTPasswdFile');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'authentification.yaml'));


class Authentification {
    // Class that handles authentification requests

    constructor(options) {
        this.options = options;
        this.database = new AuthFromHTPasswdFile(options.db_file);
        this.secret = options.secret;
        this.tokenLifetime = options.token_lifetime;
    }

    authenticate(hyper, req) {
        var requestParams = req.body;
        var hash;

        try {
            hash = this.database.getHash(requestParams.username);
        }
        catch (err) {
            if (err === 'Unknown login') {
                return fsUtil.authErrorResponse();
            }
            // TODO shouldn't we return 401 on other errors and log them for security?
        }
        if (bcrypt.compareSync(requestParams.password, hash)) {
            var token = jwt.sign(
              { aud: requestParams.username },
              this.secret,
              { expiresIn: this.tokenLifetime }
            );
            return fsUtil.normalizeResponse({
                status: 200,
                body: {
                    token: token
                }
            });
        } else {
            return fsUtil.authErrorResponse();
        }
    }

    verifyToken(hyper, req) {
        // Authorization header should be in the form of "Bearer TOKEN", we directly take the token
        var token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ').pop();
        } else {
            return fsUtil.authErrorResponse("Authorization header not found");
        }
        var res;
        try {
            res = jwt.verify(token, this.secret);
        } catch (err) {
            return fsUtil.authErrorResponse(err);
        }
        return fsUtil.normalizeResponse({
                status: 200,
                body: {
                    token: res
                }
            });
    }
}

module.exports = function(options) {
    var tst = new Authentification(options);

    return {
        spec: spec,
        operations: {
            authenticate: tst.authenticate.bind(tst),
            verifyToken: tst.verifyToken.bind(tst)
        }
    };
};
