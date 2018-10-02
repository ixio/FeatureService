/*
 * ODE-FeatureService test auth utility functions
 */
'use strict';
const jwt = require('jsonwebtoken');
var server = require('./server.js');

var config = server.config.conf.default_project['x-modules'][1].options.authentication;

function get_token(user) {
    return jwt.sign({ aud: user }, config.secret);
}

module.exports.get_token = get_token;
