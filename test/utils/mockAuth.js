/*
 * ODE-FeatureService test mockAuth utility functions
 */
'use strict';
const jwt = require('jsonwebtoken');
var server = require('./server.js');

// We want to mock a token that will work with the actual server.
// So we need the auth secret defined in the config file, and server.js parses it for us.
var config = server.config.conf.default_project['x-modules'].find(project => {
    return project.path === 'projects/feature_service_default.yaml';
}).options.authentication;

// This function returns a valid token, as would v1/authentication/authenticate endpoint do.
function get_token(user) {
    return jwt.sign({ aud: user }, config.secret);
}

module.exports.get_token = get_token;
