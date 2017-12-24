var AssemblyAPI = {};

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

class State {
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


function soundWasPlayedLastStep(state) {
	return state.sound_timestamps.last() == (state.time - 1);
}

AssemblyAPI.findFirstRecoveredFreq = function(instructionString) {
	const instructions = instructionString.split('\n');
	var state = new State();
	while(state.index >= 0 && state.index < instructions.length) {
		var command = state.doInstruction(instructions[state.index]);
		if (command == 'rcv' && soundWasPlayedLastStep(state)){
			return state.sounds.last();
		}
	}
};

var testInput = 'set a 1\nadd a 2\nmul a a\nmod a 5\nsnd a\nset a 0\nrcv a\njgz a -1\nset a 1\njgz a -2';
console.log(AssemblyAPI.findFirstRecoveredFreq(testInput)); 

var realInput = 'set i 31\nset a 1\nmul p 17\njgz p p\nmul a 2\nadd i -1\njgz i -2\nadd a -1\nset i 127\nset p 622\nmul p 8505\nmod p a\nmul p 129749\nadd p 12345\nmod p a\nset b p\nmod b 10000\nsnd b\nadd i -1\njgz i -9\njgz a 3\nrcv b\njgz b -1\nset f 0\nset i 126\nrcv a\nrcv b\nset p a\nmul p -1\nadd p b\njgz p 4\nsnd a\nset a b\njgz 1 3\nsnd b\nset f 1\nadd i -1\njgz i -11\nsnd a\njgz f -16\njgz a -19';
console.log(AssemblyAPI.findFirstRecoveredFreq(realInput));
/*
var s = new State();
var x = input.split('\n');
function next() {
	console.log(x[s.index]);
	s.doInstruction(x[s.index]);
	console.log(s);
}
*/