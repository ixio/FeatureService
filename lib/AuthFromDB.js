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
 * ODE-FeatureService class to access passwords from DB
 * Author: Erwan Keribin
 */
'use strict';

const bcrypt = require('bcryptjs'); // Package chosen over bcrypt because it has fewer dependencies

const db = require('../db');

class AuthFromDB {
    validUser(login) {
        return db.User.query().findOne('email', login).then(user => {
            if (user && user.enabled) {
                if (user.valid_until === null || user.valid_until > new Date()) {
                    return user;
                }
                return null;
            }
            return null;
        });
    }

    authorize(login, password) {
        return this.validUser(login).then(user => {
            if (user === null) {
                return false;
            }
            return bcrypt.compare(password, user.password);
        });
    }
}

module.exports = AuthFromDB;
