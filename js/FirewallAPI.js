var FirewallAPI = {};

class Scanner {
    constructor(depth, range) {
        this.depth = depth;
        this.range = range;
    }
    
    severity() {
        return this.depth * this.range;
    }
    
    period() {
        return Math.max(2*this.range - 2, 1);
    }
    
    positionAtTime(t) {
        var pos = 0;
        var step = t % this.period();
        if (step < this.range) {
            pos = step;
        } else {
            var overflow = step - this.range + 1; //add 1 because this is not an index; it starts at 1, not 0
            var lastPos = this.range - 1;
            pos = lastPos - overflow;
        }
        return pos;
    }
}

const SCANNER_PATTERN = /(\d+): (\d+)/
function parseScannerDescription(description) {
    if (match = SCANNER_PATTERN.exec(description)) {
        return new Scanner(parseInt(match[1]), parseInt(match[2]));
    } else {
        throw new Error('Line doesn\'t describe a valid scanner');
    }
}

FirewallAPI.calculateTripSeverityStartingAtTime = function(t, scannerSet) {
    var severity = 0;
    scannerSet.forEach(scanner=>{
        //There is a collision if scanner is at position 0 at time t+depth
        if (scanner.positionAtTime(t+scanner.depth) == 0) {
            severity += scanner.severity();
        }
    });
    return severity;
};

FirewallAPI.tripSeverityStartingAtTZero = function(scannerDescriptions) {
    var scannerSet = new Set();
    var scannerLines = scannerDescriptions.split('\n');
    for(var i=0; i<scannerLines.length; i++) {
        var scanner = parseScannerDescription(scannerLines[i]);
        scannerSet.add(scanner);
    }
    return FirewallAPI.calculateTripSeverityStartingAtTime(0, scannerSet);
}