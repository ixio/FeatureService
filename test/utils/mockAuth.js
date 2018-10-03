/*
 * ODE-FeatureService test auth utility functions
 */
'use strict';
const jwt = require('jsonwebtoken');
var server = require('./server.js');

// We need the auth secret from the config file, server.js already parses it for us
var config = server.config.conf.default_project['x-modules'][1].options.authentication;

// This function is meant to return a token like the v1/authentication/authenticate endpoint
function get_token(user) {
    return jwt.sign({ aud: user }, config.secret);
}

module.exports.get_token = get_token;
