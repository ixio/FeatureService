/*
 * EBDO-FeatureService Examples functions
 * Copyright (C) 2017 Project-EBDO
 * Author: Joseph Allemandou
 */
'use strict';

var HyperSwitch = require('hyperswitch');
var path = require('path');

var fsUtil = require('../lib/FeatureServiceUtil');

var spec = HyperSwitch.utils.loadSpec(path.join(__dirname, 'examples.yaml'));

// EXampleService
function EXS(options) {
    this.options = options;
}

const STEP_TO_SECONDS = {
    second:    1,
    minute:   60,
    hour:   3600,
    day:   86400
};

/*
 * Function called from endpoint to generate a fake timeserie
 */
EXS.prototype.fakeTimeserie = function(hyper, req) {
    var requestParams = req.params;

    fsUtil.validateFromAndTo(requestParams);

    var fromDate = requestParams.fromDate;
    var intervalSeconds = (requestParams.toDate - fromDate) / 1000;
    var stepSeconds = STEP_TO_SECONDS[requestParams.step];

    if (stepSeconds > intervalSeconds) {
        fsUtil.throwIfNeeded('Step should be smaller than [from, to[ interval');
    }

    var stepNumbers = intervalSeconds / stepSeconds;

    return fsUtil.normalizeResponse({
        status: 200,
        body: {
            items: [...Array(stepNumbers).keys()].map(idx => {
                return {
                    ts: (new Date(fromDate.getTime() + (idx * stepSeconds * 1000))).toISOString(),
                    val: Math.random()
                };
            })
        }
    });
};

module.exports = function(options) {
    var exs = new EXS(options);

    return {
        spec: spec,
        operations: {
            fakeTimeserie: exs.fakeTimeserie.bind(exs)
        }
    };
};
