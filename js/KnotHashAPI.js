var KnotHashAPI = {};

function initializeNumberedArray(len) {
    hash = [];
    for (var i = 0; i < len; i++) {
        hash.push(i);
    }
    return hash;
}

function shiftCircularArray(arr, shift) {
    shift = shift % arr.length;
    return arr.slice(shift).concat(arr.slice(0, shift));
}

class KnotHashObject {
    constructor(key) {
        this.key = key;
        this.hash = initializeNumberedArray(256);
        this.pos = 0;
        this.skipSize = 0;
        this.hashRounds = 0;
    }
}

function runKnotHashOneRound(hashObject) {
    var key = hashObject.key;
    var hash = hashObject.hash;
    var pos = hashObject.pos;
    var skipSize = hashObject.skipSize;
    var displacement = 0;
    for (var i = 0; i < key.length; i++) {
        var len = key.charCodeAt(i);

        if ((pos + len) > hash.length) {
            //adjust hash and displacement (and pos) to account for circular nature of hash string
            hash = shiftCircularArray(hash, pos);
            displacement += pos;
            pos = 0;
        }

        //reverse the selected length
        hash = hash.slice(0, pos).concat(hash.slice(pos, pos + len).reverse()).concat(hash.slice(pos + len));
        //move position forward
        pos += len + skipSize;
        //increment skipSize
        skipSize += 1;
    }
    //return circular hash string to original position
    hash = shiftCircularArray(hash, -displacement);
    hashObject.hash = hash;
    hashObject.pos = (pos + displacement) % hash.length ;
    hashObject.skipSize = skipSize;
    hashObject.hashRounds += 1;
}

function convertSparseHashToDenseHash(sparseHash) {
    var denseHash = [];
    const blockSize = 16;
    for (var i = 0; i < sparseHash.length; i += blockSize) {
        denseHash.push(sparseHash.slice(i, i+blockSize).reduce((total, num) => total ^ num));
    }
    return denseHash;
}

function convertNumbersToHexString(arr) {
    return arr.reduce((total, num)=>total + ('00'+(num).toString(16)).slice(-2), '');
}

/*
Key is a string
*/
KnotHashAPI.runKnotHash = function (key) {
    key = key + convertNumbersToAsciiString([17, 31, 73, 47, 23]);
    var hashObj = new KnotHashObject(key);
    for (var i = 0; i < 64; i++) {
        runKnotHashOneRound(hashObj);
    }
    var denseHash = convertSparseHashToDenseHash(hashObj.hash);
    var hexHash = convertNumbersToHexString(denseHash);
    return hexHash;
};

function convertNumbersToAsciiString(arrayOfNumbers) {
    var ascii = [];
    arrayOfNumbers.forEach((number, i) => ascii.push(String.fromCharCode(number)));
    return ascii.join('');
}

KnotHashAPI.multiplyFirstTwoDigitsResultingFromOneRoundKnotHash = function (lengths) {
    key = convertNumbersToAsciiString(lengths.split(','));
    hashObj = new KnotHashObject(key);
    runKnotHashOneRound(hashObj);
    return hashObj.hash[0] * hashObj.hash[1];
};

//TESTING
function assert(expected, actual) {
    if (expected != actual) {
        var message = 'Expected ' + expected + ', recieved ' + actual;
        throw new Error(message);
    } else {
        //console.log('pass');
    }
}

assert(64, convertSparseHashToDenseHash([65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22]));
assert("4007ff", convertNumbersToHexString([64,7,255]));
assert('a2582a3a0e66e6e86e3812dcb672a272', KnotHashAPI.runKnotHash(''));
assert('33efeb34ea91902bb2f59c9920caa6cd', KnotHashAPI.runKnotHash('AoC 2017'));
assert('3efbe78a8d82f29979031a4aa0b16a9d', KnotHashAPI.runKnotHash('1,2,3'));
assert('63960835bcdc130f0b66d7ff4f6a5a8e', KnotHashAPI.runKnotHash('1,2,4'));