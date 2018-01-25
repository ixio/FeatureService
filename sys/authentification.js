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

const fs = require('fs');
const bcrypt = require('bcryptjs'); // Package chosen over bcrypt because it has fewer dependencies
const jwt = require('jsonwebtoken');

var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'authentification.yaml'));

// TODO move secret out of code
const secret = 'a89e5dc64a4cc85d778fb41ec581d0e30424bae32f61756aff87ead116a75a11';
const tokenLifetime = '1h'

class DBFromFile {

    // htpasswd is expected to be created by the htpasswd utility with Bcrypt hashes
    constructor(filepath = 'htpasswd') {
        this.filepath = filepath;
        this.login_to_hash = {};
        fs.readFile('htpasswd', 'utf8', (err, data) => {
            for (let line of data.split('\n')) {
                if (line !== '') {
                    var [login, hash] = line.split(':');
                    this.login_to_hash[login] = hash;
                }
            }
        });
    }

    getHash(login) {
        if (login in this.login_to_hash) {
            return this.login_to_hash[login];
        } else {
            throw 'Unknown login';
        }
    }

}

class Authentification {
    // Class that handles authentification requests

    constructor(options) {
        this.options = options;
        this.database = new DBFromFile();
    }

    authenticate(hyper, req) {
        var requestParams = req.params;
        var hash = '';

        try {
            hash = this.database.getHash(requestParams.username);
        }
        catch (e) {
            if (e === 'Unknown login') {
                return fsUtil.normalizeResponse({
                    status: 401
                });
            }
            // TODO shouldn't we return 401 on other errors and log them for security?
        }
        if (bcrypt.compareSync(requestParams.password, hash)) {
            var token = jwt.sign({ aud: requestParams.username }, secret, { expiresIn: tokenLifetime });
            return fsUtil.normalizeResponse({
                status: 200,
                body: {
                    items: token
                }
            });
        } else {
            return fsUtil.normalizeResponse({
                status: 401
            });
        }

    }
}

module.exports = function(options) {
    var tst = new Authentification(options);

    return {
        spec: spec,
        operations: {
            authenticate: tst.authenticate.bind(tst)
        }
    };
};
