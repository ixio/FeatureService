/* Copyright (C) 2017-2018 Project-ODE
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
 * ODE-FeatureService user related functions
 * Author: Erwan Keribin
 */
'use strict';
var HyperSwitch = require('hyperswitch');
var path = require('path');
var fsUtil = require('../lib/FeatureServiceUtil');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'user.yaml'));

const db = require('../db');

class User {
    constructor(options) {
        this.options = options;
    }

    list() {
        return db.User.query().select(['id', 'email']).then(Users => {
            return fsUtil.normalizeResponse({
                status: 200,
                body: Users
            });
        });
    }
}

module.exports = function(options) {
    var user = new User(options);

    return {
        spec: spec,
        operations: {
            list: user.list.bind(user)
        }
    };
};
