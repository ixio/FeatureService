/*
 * ODE-FeatureService test ArrayUtil functions
 * Author: Erwan Keribin
 */
'use strict';


var assert = require('../../utils/assert.js');
var arrayUtil = require('../../../lib/ArrayUtil');

describe('array utils testing: multDistributeSequential', function () {

    it('should return nBags-size arrays', function () {
        var array = [1, 2, 3, 4, 5];
        var multiplier = 3;
        assert.deepStrictEqual(arrayUtil.multDistributeSequential(array, multiplier, 1).length, 1);
        assert.deepStrictEqual(arrayUtil.multDistributeSequential(array, multiplier, 7).length, 7);
    });

    it('should have a total size of multiplier times array size', function () {
        var array = [1, 2, 3, 4, 5];
        var nBags = 3;
        assert.deepStrictEqual([].concat.apply([], arrayUtil.multDistributeSequential(array, 1, nBags)).length, 5);
        assert.deepStrictEqual([].concat.apply([], arrayUtil.multDistributeSequential(array, 4, nBags)).length, 20);
    });

    it('should return the correct response', function () {
        var array = [1, 2, 3, 4, 5];
        var multiplier = 3;
        var nBags = 4;
        var response = arrayUtil.multDistributeSequential(array, multiplier, nBags);
        var expectedResponse = [ [ 1, 2, 3 ], [ 4, 5, 1, 2 ], [ 3, 4, 5, 1 ], [ 2, 3, 4, 5 ] ];
        assert.deepStrictEqual(response, expectedResponse);
    });

});


describe('array utils testing: multDistributeRandom', function () {

    it('should return nBags-size arrays', function () {
        var array = [1, 2, 3, 4, 5];
        var multiplier = 3;
        assert.deepStrictEqual(arrayUtil.multDistributeRandom(array, multiplier, 1).length, 1);
        assert.deepStrictEqual(arrayUtil.multDistributeRandom(array, multiplier, 7).length, 7);
    });

    it('should have a total size of multiplier times array size', function () {
        var array = [1, 2, 3, 4, 5];
        var nBags = 3;
        assert.deepStrictEqual([].concat.apply([], arrayUtil.multDistributeRandom(array, 1, nBags)).length, 5);
        assert.deepStrictEqual([].concat.apply([], arrayUtil.multDistributeRandom(array, 4, nBags)).length, 20);
    });

    it('should return the correct response', function () {
        var seed = 42;
        // https://stackoverflow.com/a/19303725/2730032
        arrayUtil.random = () => {
            var x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };
        var array = [1, 2, 3, 4, 5];
        var multiplier = 3;
        var nBags = 4;
        var response = arrayUtil.multDistributeRandom(array, multiplier, nBags);
        var expectedResponse = [ [ 5, 3, 1, 2 ], [ 4, 5, 1, 2 ], [ 3, 4, 2, 5 ], [ 1, 4, 3 ] ]
        assert.deepStrictEqual(response, expectedResponse);
        arrayUtil.random = Math.random;
    });

});