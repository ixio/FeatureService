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
 * ODE-FeatureService spectrogram services
 * Author: Erwan Keribin
 */

'use strict';

var HyperSwitch = require('hyperswitch');
var path = require('path');
var fileSystem = require('fs');
const HTTPError = HyperSwitch.HTTPError;
const db = require('../db');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'spectro.yaml'));


class Spectro {
    constructor(options) {
        this.options = options;
        this.pngBasePath = "../resources/annotator/png";
    }

    getSpectro(hyper, req) {
        return db.DatasetFile.query().findOne('id', req.params.fileId).then(file => {
            let filename = file.filename.replace('.WAV', '.png').replace('.wav', '.png');

            var filePath = path.join(__dirname, this.pngBasePath, filename);

            var resquestExists = fileSystem.existsSync(filePath);

            if (!resquestExists) {
                // return 404 if requested spectro doesn't exist
                throw new HTTPError({
                    status: 404,
                    body: {
                        type: 'ENOENT',
                        detail: 'no such file',
                    }
                });
            }

            var stat = fileSystem.statSync(filePath);

            var response = {
                status: 200,
                headers: {
                    'content-type': 'image/png',
                    'content-length': stat.size
                },
                body: fileSystem.createReadStream(filePath)
            };

            return response;
        });
    }
}

module.exports = function(options) {
    var spectro = new Spectro(options);

    return {
        spec: spec,
        operations: {
            getSpectro: spectro.getSpectro.bind(spectro)
        }
    };
};
