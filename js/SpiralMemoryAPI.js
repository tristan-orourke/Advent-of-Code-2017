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
    if (lastPosition == false) {
        pos2IndexMap.set([0,0].toString(), 1);
        return [0,0];
    } else if (lastPosition[0] == 0 && lastPosition[1]==0) {
        newPos = right(lastPosition);
    } else {
        if (pos2IndexMap.has(left(lastPosition).toString()) && !pos2IndexMap.has(up(lastPosition).toString())) {
            newPos = up(lastPosition);
        } else if (pos2IndexMap.has(down(lastPosition).toString())) {
            newPos = left(lastPosition);
        } else if (pos2IndexMap.has(right(lastPosition).toString())) {
            newPos = down(lastPosition);
        } else {
            newPos = right(lastPosition);
        }
    }
    var lastIndex = pos2IndexMap.get(lastPosition.toString());
    pos2IndexMap.set(newPos.toString(), lastIndex + 1);
    return newPos;
}

function findSpiralIndexPosition(targetIndex, lastIndex, lastPosition) {
    
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