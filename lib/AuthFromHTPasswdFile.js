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
 * EBDO-FeatureService class to access htpasswd file
 * Author: Erwan Keribin
 */
'use strict';

const fs = require('fs');
const bcrypt = require('bcryptjs'); // Package chosen over bcrypt because it has fewer dependencies

class AuthFromHTPasswdFile {

    // htpasswd is expected to be created by the htpasswd utility with Bcrypt hashes
    constructor(filepath = 'htpasswd') {
        this.filepath = filepath;
        this.login_to_hash = {};
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                err.suggestion = "Have you set the correct path in your config.yaml file?";
                throw err;
            }
            for (let line of data.split('\n')) {
                if (line !== '') {
                    var [login, hash] = line.split(':');
                    this.login_to_hash[login] = hash;
                }
            }
        });
    }

    authorize(login, password) {
        var hash;
        if (login in this.login_to_hash) {
            hash = this.login_to_hash[login];
        } else {
            throw 'Unknown login';
        }
        return bcrypt.compareSync(password, hash);
    }

}

module.exports = AuthFromHTPasswdFile;
