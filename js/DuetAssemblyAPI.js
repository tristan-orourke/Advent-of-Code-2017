//Requires Queue.js

var DuetAssemblyAPI = {};

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

class SoundProgram {
	constructor() {
		this.registers = {};
		this.index = 0;
		this.sounds = [];
		this.time = 0;
		this.sound_timestamps = [];
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
			case 'snd':
				this.sounds.push(this.getVal(args[0]));
				this.sound_timestamps.push(this.time);
				break;
			case 'set':
				this.setReg(args[0], this.getVal(args[1]));
				break;
			case 'add':
				this.setReg(args[0], this.getVal(args[0]) + this.getVal(args[1]));
				break;
			case 'mul':
				this.setReg(args[0], this.getVal(args[0]) * this.getVal(args[1]));
				break;
			case 'mod':
				this.setReg(args[0], this.getVal(args[0]) % this.getVal(args[1]));
				break;
			case 'rcv':
				if (this.getVal(args[0]) != 0 && this.sounds.length > 0) {
					this.sounds.push(this.sounds.last());
					this.sound_timestamps.push(this.time);
				}
				break;
			case 'jgz':
				if (this.getVal(args[0]) > 0) {
					jump = this.getVal(args[1]);
				}
				break;
		}
		this.time += 1;
		this.index += jump;
		return command;
	}
	runProgram(instructionString) {
		const instructions = instructionString.split('\n');
		const maxRunTime = 10*1000;
		var start = performance.now();
		var runtime = performance.now() - start;
		while(this.index >= 0 && this.index < instructions.length) {
			this.doInstruction(instructions[this.index]);
			var runtime = performance.now() - start;
			if (runtime > maxRunTime) {
				throw new Error('Program running too long, exiting early');
			}
		}
	}
}

class DuetProgram {
	constructor(id, instructions) {
        this.instructions = instructions;
		this.registers = {};
		this.index = 0;
		this.sounds = [];
		this.time = 0;
		this.sound_timestamps = [];
        this.sister = undefined;
        this.messages = new Queue();
        this.sleeping = false;
        this.waitingReg = undefined;
        this.setReg('p', id);
        this.numberOfSends = 0;
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
    
    send(val) {
        this.numberOfSends += 1;
        if(this.sister) {
            this.sister.messages.enqueue(val);
            this.sister.wake();
        }
    }
    
    recieve(name) {
        if(this.messages.isEmpty()) {
            this.sleeping = true;
            this.waitingReg = name;
        } else {
            this.setReg(name, this.messages.dequeue());
        }
    }
    
    wake() {
        if (this.sleeping) {
            this.sleeping = false;
            this.recieve(this.waitingReg);
            this.runProgram();
        }
    }
    
	doInstruction(instruction) {
		var command = instruction.substring(0,3);
		var args = instruction.substring(4).split(' ');
		var jump = 1;
		switch(command) {
			case 'snd':
				this.send(this.getVal(args[0]));
				break;
			case 'set':
				this.setReg(args[0], this.getVal(args[1]));
				break;
			case 'add':
				this.setReg(args[0], this.getVal(args[0]) + this.getVal(args[1]));
				break;
			case 'mul':
				this.setReg(args[0], this.getVal(args[0]) * this.getVal(args[1]));
				break;
			case 'mod':
				this.setReg(args[0], this.getVal(args[0]) % this.getVal(args[1]));
				break;
			case 'rcv':
				this.recieve(args[0]);
				break;
			case 'jgz':
				if (this.getVal(args[0]) > 0) {
					jump = this.getVal(args[1]);
				}
				break;
		}
		this.time += 1;
		this.index += jump;
		return command;
	}
	runProgram() {
		const maxRunTime = 20*1000;
		var start = performance.now();
		var runtime = performance.now() - start;
		while(this.index >= 0 && this.index < this.instructions.length && 
              !this.sleeping) {
			this.doInstruction(this.instructions[this.index]);
			var runtime = performance.now() - start;
			if (runtime > maxRunTime) {
				throw new Error('Program running too long, exiting early');
			}
		}
	}
}


function soundWasPlayedLastStep(soundProgram) {
	return soundProgram.sound_timestamps.last() == (soundProgram.time - 1);
}

DuetAssemblyAPI.findFirstRecoveredFreq = function(instructionString) {
	const instructions = instructionString.split('\n');
	var soundProgram = new SoundProgram();
	while(soundProgram.index >= 0 && soundProgram.index < instructions.length) {
		var command = soundProgram.doInstruction(instructions[soundProgram.index]);
		if (command == 'rcv' && soundWasPlayedLastStep(soundProgram)){
			return soundProgram.sounds.last();
		}
	}
};

DuetAssemblyAPI.countMsgsSentByProgram1 = function(instructionString) {
    const instructions = instructionString.split('\n');
    var p0 = new DuetProgram(0, instructions);
    var p1 = new DuetProgram(1, instructions);
    p0.sister = p1;
    p1.sister = p0;
    p0.runProgram();
    p1.runProgram();
    return p1.numberOfSends;
};

var testInput = 'set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2';
console.log(DuetAssemblyAPI.findFirstRecoveredFreq(testInput)); 

var realInput = 'set i 31\nset a 1\nmul p 17\njgz p p\nmul a 2\nadd i -1\njgz i -2\nadd a -1\nset i 127\nset p 622\nmul p 8505\nmod p a\nmul p 129749\nadd p 12345\nmod p a\nset b p\nmod b 10000\nsnd b\nadd i -1\njgz i -9\njgz a 3\nrcv b\njgz b -1\nset f 0\nset i 126\nrcv a\nrcv b\nset p a\nmul p -1\nadd p b\njgz p 4\nsnd a\nset a b\njgz 1 3\nsnd b\nset f 1\nadd i -1\njgz i -11\nsnd a\njgz f -16\njgz a -19';
console.log(DuetAssemblyAPI.findFirstRecoveredFreq(realInput));
console.log(DuetAssemblyAPI.countMsgsSentByProgram1(realInput));
/*
var s = new SoundProgram();
var x = input.split('\n');
function next() {
	console.log(x[s.index]);
	s.doInstruction(x[s.index]);
	console.log(s);
}
*/