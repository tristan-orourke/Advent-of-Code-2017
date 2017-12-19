var KnotHashAPI = {};

function initializeHash(len) {
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

KnotHashAPI.runKnotHash = function(inputDigits, lengths) {
    var hash = inputDigits;
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

KnotHashAPI.multiplyFirstTwoDigitsResultingFromKnotHash = function(lengthsString) {
    hash = initializeHash(256);
    lengths = lengthsString.split(',');
    hash = KnotHashAPI.runKnotHash(hash, lengths);
    return hash[0]*hash[1];
};