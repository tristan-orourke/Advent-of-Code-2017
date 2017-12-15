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

function addNextSpiralIndexToPositionMap(lastPosition, pos2IndexMap) {
    var newPos;
    if (lastPosition = false) {
        pos2IndexMap.set([0,0], 1);
        return [0,0];
    } else if (lastPosition = [0,0]) {
        newPos = right(lastPosition);
    } else {
        if (pos2IndexMap.has(left(lastPosition))) {
            newPos = up(lastPosition);
        } else if (pos2IndexMap.has(down(lastPosition))) {
            newPos = left(lastPosition);
        } else if (pos2IndexMap.has(right(lastPosition))) {
            newPos = down(lastPosition);
        } else {
            newPos = right(lastPosition);
        }
    }
    lastIndex = pos2IndexMap.get(lastPosition);
    pos2IndexMap.set(newPos, lastIndex + 1);
    return newPos;
}

SpiralMemoryAPI.findManhattanDistForSpiralIndex = function(spiralIndex) {
    spiralIndex = parseInt(spiralIndex);
    if (spiralIndex >= 1000000000) {
        return "Index is too high. Please enter index less than 1 billion."
    }
    var pos2IndexMap = new Map();
    pos2IndexMap.set([0,0], 1);
    
    lastPosition = [0,0];
    while(pos2IndexMap.get(lastPosition) != spiralIndex) {
        lastPosition = addNextSpiralIndexToPositionMap(lastPosition, pos2IndexMap);
    }
    return lastPosition[0] + lastPosition[1];
};