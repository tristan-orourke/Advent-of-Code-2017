var CoprocessorAPI = {};

class Program {
	constructor(instructions) {
        this.instructions = instructions;
		this.registers = {};
		this.index = 0;
		this.time = 0;
	}
	getReg(name) {
		if (this.registers[name])
			return this.registers[name];
		else
			return 0;
	}
	setReg(name, val) {
		this.registers[name] = val;
	}
	getVal(v) {
		if (isNaN(v))
			return this.getReg(v);
		else
			return parseInt(v);
	}
    
	doInstruction(instruction) {
		var command = instruction.substring(0,3);
		var args = instruction.substring(4).split(' ');
		var jump = 1;
		switch(command) {
			case 'set':
				this.setReg(args[0], this.getVal(args[1]));
				break;
			case 'sub':
				this.setReg(args[0], this.getVal(args[0]) - this.getVal(args[1]));
				break;
			case 'mul':
				this.setReg(args[0], this.getVal(args[0]) * this.getVal(args[1]));
				break;
			case 'jnz':
				if (this.getVal(args[0]) != 0) {
					jump = this.getVal(args[1]);
				}
				break;
		}
		this.time += 1;
		this.index += jump;
		return command;
	}
	runProgramCountMuls() {
        var mulCount = 0;
		const maxRunTime = 10*1000; //10 seconds
		var start = performance.now();
		var runtime = performance.now() - start;
		while(this.index >= 0 && this.index < this.instructions.length && 
              !this.sleeping) {
			var command = this.doInstruction(this.instructions[this.index]);
            if (command == 'mul') {
                mulCount += 1;
            }
			var runtime = performance.now() - start;
			if (runtime > maxRunTime) {
				throw new Error('Program running too long, exiting early, with mulCount at ' + mulCount);
			}
		}
        return mulCount;
	}
}

function runProgramRewrittenByHand() {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var f = 0;
    var g = 0;
    
    b = 93;
    c = b;
    b = b * 100;
    b = b + 100000; // b = 109300
    c = b;
    c += 17000;
    while (true) {
        f = 1;
        d = 2;
        while(true) {
            e = 2; //rm
            while(true) {
                if ((d*e) == b) {
                    f = 0
                }
                e = e + 1;
                g = e;
                g = g - b
                if (e == b)
                    break;
                }
            }
            d += 1;
            g = d;
            g = g - b;
            if (g == 0) {
                break;
            }
        }
        if (f == 0) {
            h += 1;
        }
        g = b;
        g = g - c;
        if (g == 0) {
            //EXIT
            break;
        }
        b += 17;   
    }
    return h;
}




CoprocessorAPI.countMulsInvoked = function(instructionsStr) {
    const instructions = instructionsStr.split('\n');
    p = new Program(instructions);
    return p.runProgramCountMuls()
};

CoprocessorAPI.finalValueOfH = function(instructionStr) {
    const instructions = instructionsStr.split('\n');
    p = new Program(instructions);
    p.setReg('a', 1)
    return p.runProgramCountMuls()
};

