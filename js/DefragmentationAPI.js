//REQUIRES KnotHashAPI.js

var DefragmentationAPI = {};

function checkHex(n) {
    return /^[0-9A-Fa-f]{1,64}$/.test(n)
}

function hex2Bin(n) {
    if (!checkHex(n)) return 0;
    return parseInt(n, 16).toString(2)
}

function padString(str, width, filler) {
    return (filler.repeat(width) + str).substr(-width);
}

function hexStringToBinBytes(hex) {
    var bytes = '';
    for (var j = 0; j < hex.length; j++) {
        var c = hex[j];
        var bin = padString(hex2Bin(c), 4, '0');
        bytes += bin;
    }
    return bytes;
}

/*
Returns an array of length 128 (rows)
Each element is a string of length 128 (columns), each char a 1 or 0
*/
DefragmentationAPI.determineDiskState = function (keyString) {
    var rows = [];
    for (var i = 0; i < 128; i++) {
        var rowKey = keyString + '-' + i;
        //runKnotHash returns a string of hex digits
        var hash = KnotHashAPI.runKnotHash(rowKey);
        var row = hexStringToBinBytes(hash);
        rows.push(row);
    }
    return rows;
};

function countOnesInArrayOfStrings(strings) {
    var count = 0;
    for (var i = 0; i < strings.length; i++) {
        for (var j = 0; j < strings.length; j++) {
            if (strings[i][j] == '1') {
                count += 1;
            }
        }
    }
    return count;
}

function positionIsValid(pos) {
    return pos[0] >= 0 && pos[0] < 128 && pos[1] >= 0 && pos[1] < 128;
}

function adjacentPositions(position) {
    var x = position[0];
    var y = position[1];
    var adjacent = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    adjacent = adjacent.filter(positionIsValid);
    return adjacent;
}

function replaceIndexOfString(str, index, replacement) {
    return str.substring(0,index) + replacement + str.substring(index+1);
}

function charFourWayFill(arrayOfStrings, position, target, replacement) {
    if (target == replacement) {
        return; //trivial case
    }
    var x = position[0];
    var y = position[1];    
    if (arrayOfStrings[x][y] == target) {
        arrayOfStrings[x] = replaceIndexOfString(arrayOfStrings[x], y, replacement);
        var adjacent = adjacentPositions(position);
        for (i in adjacent) {
            charFourWayFill(arrayOfStrings, adjacent[i], target, replacement);
        }
    }
    return;
}

DefragmentationAPI.usedSquaresGivenKeyString = function (keyString) {
    var diskState = DefragmentationAPI.determineDiskState(keyString);
    return countOnesInArrayOfStrings(diskState);
};

DefragmentationAPI.numberOfFilledGroups = function (keyString) {
    var diskState = DefragmentationAPI.determineDiskState(keyString);
    var groups = 0;
    for (var i = 0; i < 128; i++) {
        for (var j = 0; j < 128; j++) {
            if (diskState[i][j] == '1') {
                charFourWayFill(diskState, [i,j], '1', '2');
                groups += 1;
            }
        }
    }
    return groups;
};
