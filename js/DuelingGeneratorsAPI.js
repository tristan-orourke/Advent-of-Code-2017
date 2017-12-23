var DuelingGeneratorsAPI = {};

const MOD_DIVISOR = 2147483647;
const GEN_A_FACTOR = 16807;
const GEN_B_FACTOR = 48271;

function padString(str, width, filler) {
    return (filler.repeat(width) + str).substr(-width);
}

DuelingGeneratorsAPI.generator = function* generator(init, factor, modDivisor) {
    var val = init;
    while(true) {
        val = (val * factor) % modDivisor;
        var rt = yield val;
        if (rt != undefined) {
            val = rt;
        }
    }
};

DuelingGeneratorsAPI.judge = function(val1, val2) {
    var bin1 = padString(val1.value.toString(2), 16, '0');
    var bin2 = padString(val2.value.toString(2), 16, '0');
    return bin1 == bin2;
};


DuelingGeneratorsAPI.judgeGenerators = function(init1, init2, iterations) {
    var gen1 = DuelingGeneratorsAPI.generator(init1, GEN_A_FACTOR, MOD_DIVISOR);
    var gen2 = DuelingGeneratorsAPI.generator(init2, GEN_B_FACTOR, MOD_DIVISOR);
    var count = 0;
    for (var i=0; i<iterations; i++) {
        if (DuelingGeneratorsAPI.judge(gen1.next(), gen2.next())) {
            count += 1;
        }
    }
    return count;
};

DuelingGeneratorsAPI.judgeMatchesIn40MilGenerations = function(initialValuesString) {
    vals = initialValuesString.split(',');
    return DuelingGeneratorsAPI.judgeGenerators(parseInt(vals[0]), parseInt(vals[1]), 40000000);
};

//TESTING
var testCount = DuelingGeneratorsAPI.judgeGenerators(65, 8921, 5);
if (testCount != 1) throw new Error("testCount == " + testCount);
var realCount = DuelingGeneratorsAPI.judgeGenerators(634, 301, 4000000);
if (realCount != 1) throw new Error("realCount == " + realCount);
else console.log("realCount == " + realCount);