var SpiralMemoryAPI = {};

function left(pos) {
    return [pos[0]-1, pos[1]];
}
function right(pos) {
    return [pos[0]+1, pos[1]];
}
function up(pos) {
    return [pos[0], pos[1]+1];
}
function down(pos) {
    return [pos[0], pos[1]-1];
}

function findNextSpiralPosition(lastPosition, positionMap) {
    var newPos;
    if (lastPosition == false) {
        return [0,0];
    } else if (lastPosition[0] == 0 && lastPosition[1]==0) {
        newPos = right(lastPosition);
    } else {
        if (positionMap.has(left(lastPosition).toString()) && !positionMap.has(up(lastPosition).toString())) {
            newPos = up(lastPosition);
        } else if (positionMap.has(down(lastPosition).toString())) {
            newPos = left(lastPosition);
        } else if (positionMap.has(right(lastPosition).toString())) {
            newPos = down(lastPosition);
        } else {
            newPos = right(lastPosition);
        }
    }
    return newPos;
}

function addNextSpiralIndexToPositionMap(lastPosition, pos2IndexMap) {
    var newPos = findNextSpiralPosition(lastPosition, pos2IndexMap);
    var lastIndex = pos2IndexMap.get(lastPosition.toString());
    pos2IndexMap.set(newPos.toString(), lastIndex + 1);
    return newPos;
}

SpiralMemoryAPI.findManhattanDistForSpiralIndex = function(spiralIndex) {
    spiralIndex = parseInt(spiralIndex);
    if (spiralIndex >= 1000000000) {
        return "Index is too high. Please enter index less than 1 billion."
    }
    var pos2IndexMap = new Map();
    var lastPosition = [0,0];
    pos2IndexMap.set(lastPosition.toString(), 1);
    
    while(pos2IndexMap.get(lastPosition.toString()) != spiralIndex) {
        lastPosition = addNextSpiralIndexToPositionMap(lastPosition, pos2IndexMap);
    }
    return Math.abs(lastPosition[0]) + Math.abs(lastPosition[1]);
};

function sumSurroundingValues(pos, pos2ValueMap) {
    var sum = 0;
    var surroundings = [];
    surroundings.push(left(pos), up(pos), right(pos), down(pos), left(up(pos)), right(up(pos)), left(down(pos)), right(down(pos)));
    for (var i=0; i<surroundings.length; i++) {
        var position = surroundings[i];
        if (pos2ValueMap.has(position.toString())) {
            sum += pos2ValueMap.get(position.toString());
        }
    }
    return sum;
}

function addNextSpiralCumulator(lastPosition, pos2ValueMap) {
    var newPos = findNextSpiralPosition(lastPosition, pos2ValueMap);
    var newValue = sumSurroundingValues(newPos, pos2ValueMap);
    pos2ValueMap.set(newPos.toString(), newValue);
    return newPos;
}

SpiralMemoryAPI.findSpiralCumulatorValueLargerThanInput = function(inputValue) {
    inputValue = parseInt(inputValue);
    if (inputValue >= 1000000000) {
        return "Value is too high. Please enter value less than 1 billion."
    }
    var pos2ValueMap = new Map();
    var lastPosition = [0,0];
    pos2ValueMap.set(lastPosition.toString(), 1);
    
    while(pos2ValueMap.get(lastPosition.toString()) <= inputValue) {
        lastPosition = addNextSpiralCumulator(lastPosition, pos2ValueMap);
    }
    return pos2ValueMap.get(lastPosition.toString());
}