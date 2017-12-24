var SpinLock = {};

SpinLock.insertValue = function(arr, val, lastPos, stepSize) {
    var pos = ((lastPos + stepSize) % arr.length) + 1;
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

SpinLock.findFinalValueAtIndex = function(i, insertions, stepSize) {
    
    
    var arr = SpinLock.createArrayAfterNInsertions(2017, stepSize);
    return arr[arr.indexOf(2017) + 1];
};

console.log(SpinLock.findValueAfterLastInsertion(3))
console.log(SpinLock.findValueAfterLastInsertion(376))