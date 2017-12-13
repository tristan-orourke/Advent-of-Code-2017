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