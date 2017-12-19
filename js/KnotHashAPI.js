var KnotHashAPI = {};

function initializeNumberedArray(len) {
    hash = [];
    for (var i=0; i<len; i++) {
        hash.push(i);
    }
    return hash;
}

function shiftCircularArray(arr, shift) {
    shift = shift % arr.length;
    return arr.slice(shift).concat(arr.slice(0,shift));
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
    for (var i=0; i<key.length; i++) {
        var len = key.charCodeAt(i);
        
        if ((pos + len) > hash.length) {
            //adjust hash and displacement (and pos) to account for circular nature of hash string
            hash = shiftCircularArray(hash, pos);
            displacement += pos;
            pos = 0;
        }
        
        //reverse the selected length
        hash = hash.slice(0, pos).concat(hash.slice(pos, pos+len).reverse()).concat(hash.slice(pos+len));
        //move position forward
        pos += len + skipSize; 
        //increment skipSize
        skipSize += 1;
    }
    //return circular hash string to original position
    hash = shiftCircularArray(hash, -displacement);
    hashObject.hash = hash;
    hashObject.pos = pos;
    hashObject.skipSize = skipSize;
    hashObject.hashRounds += 1;
}

/*
Key is a string
*/
KnotHashAPI.runKnotHash = function(key) {
    var hash = initializeNumberedArray(256);
    var displacement = 0;
    var pos = 0;
    var skipSize = 0;
    for (var i=0; i<lengths.length; i++) {
        var len = parseInt(lengths[i]);
        
        if ((pos + len) > hash.length) {
            //adjust hash and displacement (and pos) to account for circular nature of hash string
            hash = shiftCircularArray(hash, pos);
            displacement += pos;
            pos = 0;
        }
        
        //reverse the selected length
        hash = hash.slice(0, pos).concat(hash.slice(pos, pos+len).reverse()).concat(hash.slice(pos+len));
        //move position forward
        pos += len + skipSize; 
        //increment skipSize
        skipSize += 1;
    }
    
    //return circular hash string to original position
    hash = shiftCircularArray(hash, -displacement);
    return hash;
};

function convertNumbersToAsciiString(arrayOfNumbers) {
    var ascii = [];
    arrayOfNumbers.forEach((number, i) => ascii.push(String.fromCharCode(number)));
    return ascii.join('');
}

KnotHashAPI.multiplyFirstTwoDigitsResultingFromKnotHash = function(lengths) {
    key = convertNumbersToAsciiString(lengths.split(','));
    hashObj = new KnotHashObject(key);
    runKnotHashOneRound(hashObj);
    return hashObj.hash[0]*hashObj.hash[1];
};