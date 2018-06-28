#!/bin/sh
#
# ODE-FeatureService test runner
# Widely adapted from Restbase
# Author: Joseph Allemandou
#

mod_dir=$( cd "$( dirname "$0" )"/../.. && pwd )/node_modules
mocha="$mod_dir"/mocha/bin/mocha
istanbul="$mod_dir"/istanbul/lib/cli.js


if [ "$1" = "test" ]; then
    NODE_ENV=test "${mocha}"
elif [ "$1" = "coverage" ]; then
    "${istanbul}" cover node_modules/.bin/_mocha -- -R spec
fi
