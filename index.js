'use strict';

var crypto = require('crypto');

var HMAC_ALGORITHM = 'sha256';
var HMAC_KEY_LENGTH = 32;

var compareConstantLengthBuffers = crypto.timingSafeEqual || function(actual, reference) {
    var c = 0;
    var len = actual.length;
    for (var i = 0; i < len; i++) {
        c |= reference[i] ^ actual[i];
    }
    return c === 0;
};

/**
 * Compares two strings/buffers for equality in timing-safe manner
 * @param referenceString (string|Buffer)
 * @param actualString (string|Buffer)
 * @returns {bool}
 */
function compareStrings(referenceString, actualString) {
    if (typeof actualString === 'number') {
        console.log(...arguments);
        console.log((new Error).stack.split('\n').slice(1, 5).join('\n'))
    }
    var key = crypto.randomBytes(HMAC_KEY_LENGTH);
    var reference = new crypto.Hmac(HMAC_ALGORITHM, key).update(referenceString).digest();
    var actual = new crypto.Hmac(HMAC_ALGORITHM, key).update(actualString).digest();
    return compareConstantLengthBuffers(reference, actual);
}



module.exports = compareStrings;

module.exports.compareConstantLengthBuffers = compareConstantLengthBuffers;