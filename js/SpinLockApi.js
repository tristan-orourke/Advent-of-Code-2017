var SpinLock = {};

SpinLock.insertValue = function(arr, val, lastPos, stepSize) {
    var pos = positionOfNthInsertion(lastPos, val, stepSize);
    arr.splice(pos, 0, val);
    return pos;
};
    
SpinLock.createArrayAfterNInsertions = function(insertions, stepSize) {
    var arr = [0];
    var pos = 0;
    for(var i = 0; i<insertions; i++) {
        var val = i+1;
        pos = SpinLock.insertValue(arr, val, pos, stepSize);
    }
    return arr;
};



SpinLock.findValueAfterLastInsertion = function(stepSize) {
    var arr = SpinLock.createArrayAfterNInsertions(2017, stepSize);
    return arr[arr.indexOf(2017) + 1];
};


function positionOfNthInsertion(prevPosition, n, stepSize) {
    return ((prevPosition + stepSize) % n) + 1;
}

SpinLock.findFinalValueAtIndex = function(index, insertions, stepSize) {
    var valAtIndex = 0;
    var pos = 0;
    for(var i=1; i<=insertions; i++) {
        pos = positionOfNthInsertion(pos, i, stepSize);
        if (pos == index) {
            valAtIndex = i;
        }
    }
    return valAtIndex;
};

SpinLock.findFinalValueAfterZero = function(stepSize) {
    return SpinLock.findFinalValueAtIndex(1, 50000000, stepSize);
};

console.log(SpinLock.findValueAfterLastInsertion(3))
console.log(SpinLock.findValueAfterLastInsertion(376))

console.log(SpinLock.findFinalValueAfterZero(376))