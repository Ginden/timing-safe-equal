var timingSafeEqual = require('..');
var compareEqual = timingSafeEqual.compareConstantLengthBuffers;
var assert = require('assert');
var crypto = require('crypto');
var thisFileContent = require('fs').readFileSync(module.filename);
var thisFileContentCopy = cloneBuffer(thisFileContent);
var randomString = Buffer.from(crypto.randomBytes(thisFileContent.length));
var randomStringCopy = cloneBuffer(randomString);
var iterations = 50*1000;

describe('String compare', function(){
    it('Rejects not equal strings', function(){
        compareStrings(Math.random().toString(), Math.random().toString());
        compareStrings('aaaa', 'bbb');
    });
    it('Accepts equal strings', function(){
        compareStrings('aaaa', 'aaaa');
        assert(timingSafeEqual(thisFileContent, thisFileContent));
    });

    it('Takes the same time for different strings', function() {
        var endTime1 = (function(){
            var startTime = process.hrtime();
            for(var i = 0; i < iterations; i++) {
                timingSafeEqual(thisFileContent, randomString);
                timingSafeEqual(randomString, thisFileContent);
            }
            return process.hrtime(startTime);
        }());

        var endTime2 = (function(){
            var startTime = process.hrtime();
            for(var i = 0; i < iterations; i++) {
                timingSafeEqual(thisFileContent, thisFileContentCopy);
                timingSafeEqual(randomString, randomStringCopy);
            }
            return process.hrtime(startTime);
        }());

        assert(Math.abs(toNs(endTime1) - toNs(endTime2)) > toNs(endTime1)/10000, JSON.stringify({
            differentTimes: toNs(endTime1),
            equalStringsTimes: toNs(endTime2)
        }));

    });
});

function toNs(time) {
    return ((+time[0]) * 1e9) + (+time[1]);
}

function compareStrings(a,b) {
    if (a === b) {
        assert(timingSafeEqual(a, b), 'Expected ' + JSON.stringify(a) + ' to equal ' + JSON.stringify(b));
    } else {
        assert(!(timingSafeEqual(a, b)), 'Expected ' + JSON.stringify(a) + ' not to equal ' + JSON.stringify(b));
    }
}

function cloneBuffer(buff) {
    var ret = Buffer.alloc(buff.length);
    buff.copy(ret);
    return ret;
}