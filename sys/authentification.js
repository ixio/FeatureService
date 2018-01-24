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

var HyperSwitch = require('hyperswitch');
const URI = HyperSwitch.URI;
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'authentification.yaml'));

class DB_from_file {

    get_pwd_hash(login) {
        return 'hash'
    }

}

class Authentification {
    // Class that handles authentification requests

    constructor(options) {
        this.options = options;
        this.database = new DB_from_file()
    }

    authenticate(hyper, req) {
        var requestParams = req.params;

        var hash = this.database.get_pwd_hash(requestParams.username)
        if (hash == requestParams.password) {
            return fsUtil.normalizeResponse({
                status: 200,
                body: {
                    items: ['token']
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
