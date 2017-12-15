var CorruptionChecksumAPI = {};

CorruptionChecksumAPI.sumMaxDiffPerRow = function(spreadsheet) {
    var checksum = 0;
    var rows = spreadsheet.split('/\r\n|\r|\n/');
    if (rows.length == 1)
        rows = spreadsheet.split(' ');
    rows.forEach(function(row, i) {
        var min = false;
        var max = false;
        if (row.length > 0) {
            var numbers = row.split('\t');
            numbers.forEach( function(number, j) {
                number = parseInt(number);
                if (min==false || number < min) 
                    min = number;
                if (max==false || number > max)
                    max = number;
            });
            checksum += (max - min);
        }
    });
    return checksum;
};

CorruptionChecksumAPI.returnQuotient = function(num1, num2) {
    if (num1 > num2) {
        return num1 / num2;
    } else {
        return num2 / num1;
    }
};

CorruptionChecksumAPI.numbersAreEventlyDivisible = function(num1, num2) {
    var modResult = false;
    if (num1 > num2) {
        modResult = num1 % num2;
    } else {
        modResult = num2 % num1;
    }
    return modResult == 0;
};

CorruptionChecksumAPI.sumWholeQuotientsPerRow = function(spreadsheet) {
    var checksum = 0;
    var rows = spreadsheet.split('/\r\n|\r|\n/');
    if (rows.length == 1)
        rows = spreadsheet.split(' ');
    rows.forEach(function(row, i) {
        var numbers = row.split('\t');
        for (var i=0; i<numbers.length; i++) {
            var divisorsFound = false;
            for (var j=i+1; j<numbers.length; j++){
                if (CorruptionChecksumAPI.numbersAreEventlyDivisible(numbers[i], numbers[j])) {
                    checksum += CorruptionChecksumAPI.returnQuotient(numbers[i], numbers[j]);
                    divisorsFound = true;
                    break;
                }
            } 
            if (divisorsFound) break;
        }
    });
    return checksum;
};