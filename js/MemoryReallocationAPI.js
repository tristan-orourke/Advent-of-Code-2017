var MemoryReallocationAPI = {};

function getIndexOfMax(arr) {
    return arr.indexOf(Math.max(...arr));
}

function incrementLoopingIndex(index, arrayLength) {
    return (index + 1) % arrayLength;
}

MemoryReallocationAPI.reallocateBlocks = function(banks) {
    var i = getIndexOfMax(banks);
    var n = banks[i]; //Take the blocks from the memory bank with the most
    banks[i] = 0;
    while (n > 0) {
        //Move one block into the next bank
        i = incrementLoopingIndex(i, banks.length);
        banks[i] += 1;
        n -= 1;
    }
};

MemoryReallocationAPI.countRedistributionCyclesToLoop = function(banksString) {
    var banks = banksString.split('\t');
    banks = banks.reduce((total, item) => {
        total.push(parseInt(item));
        return total;
    }, []);
    var prevStates = [];
    var state = banks.join('\t');
    var steps = 0;
    while (!prevStates.includes(state)) {
        prevStates.push(state);
        MemoryReallocationAPI.reallocateBlocks(banks);
        state = banks.join('\t');
        steps += 1;
    }
    return steps;
};
