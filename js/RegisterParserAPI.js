var RegisterParserAPI = {};

const commandPattern = /(\w+) (\w+) (-?\d+) if (\w+) (.*)/
/*
Returns the registry which was modified, or null if nothing was
*/
RegisterParserAPI.parseRegisterCommand = function(registerMap, command) {
    var match = commandPattern.exec(command);
    
    var reg = match[1];
    var dir = match[2];
    var val = parseInt(match[3]);
    var conditionRef = match[4];
    var conditionExpression = match[5];
    
    if(!registerMap[reg]) {
        registerMap[reg] = 0;
    }
    if(!registerMap[conditionRef]) {
        registerMap[conditionRef] = 0;
    }
    
    //build an eval expression
    var condition = "registerMap['" + conditionRef + "']" + conditionExpression;
    if (eval(condition)) {
        if (dir == 'inc') {
            registerMap[reg] += val;
        } else if (dir == 'dec') {
            registerMap[reg] -= val;
        }
        return reg;
    } else {
        return null;
    }
}

RegisterParserAPI.highestRegisterValueAfterCommands = function(commands) {
    var regMap = {};
    commands.split('\n').forEach((line, index) => RegisterParserAPI.parseRegisterCommand(regMap, line));
    var max = Number.MIN_SAFE_INTEGER;
    for(var key in regMap) {
        max = Math.max(max, regMap[key]);
    }
    return max;
};

RegisterParserAPI.highestEverRegisterValueDuringCommands = function(commands) {
    var regMap = {};
    var max = Number.MIN_SAFE_INTEGER;
    commands.split('\n').forEach((line, index) => {
        var modifiedReg = RegisterParserAPI.parseRegisterCommand(regMap, line);
        if (modifiedReg) {
            max = Math.max(max, regMap[modifiedReg]);
        }
    });
    return max;
};