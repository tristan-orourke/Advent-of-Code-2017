var TuringMachineAPI = {};

class Action {
    constructor(write, move, state) {
        this.write = write;
        this.move = move;
        this.state = state;
    }
}

class StateMachine {
    constructor(initialState, states) {
        this.states = states; //map of state names to {0:action0, 1:action1}
        this.state = states[initialState];
        this.position = 0;
        this.tape = new Set(); //stores the position of all 1's
    }
    getVal() {
        if (this.tape.has(this.position)) 
            return 1;
        else 
            return 0;
    }
    writeVal(val) {
        if (val == 1)
            this.tape.add(this.position);
        else
            this.tape.delete(this.position);
    }
    
    
    step() {
        var val = this.getVal();
        var action = this.state[val];
        if (action.write != val)
            this.writeVal(action.write);
        this.position += action.move;
        this.state = this.states[action.state];
    }
}


const initPattern = /Begin in state (\w+)./
const stepsPattern = /Perform a diagnostic checksum after (\d+) steps./
const statePattern = /In state (\w+):\n  If the current value is 0:\n    - Write the value (\d).\n    - Move one slot to the (\w+).\n    - Continue with state (\w+).\n  If the current value is 1:\n    - Write the value (\d).\n    - Move one slot to the (\w+).\n    - Continue with state (\w+)./g

TuringMachineAPI.buildStateMachineFromBlueprints = function(blueprints) {
    var initialState = initPattern.exec(blueprints)[1];
    var states = {};
    while(match = statePattern.exec(blueprints)) {
        var state = {};
        state[0] = new Action(parseInt(match[2]), match[3]=='right'? 1:-1, match[4]);
        state[1] = new Action(parseInt(match[5]), match[6]=='right'? 1:-1, match[7]);
        states[match[1]] = state;
    }
    return new StateMachine(initialState, states);
};

TuringMachineAPI.getDiagnosticChecksumForStateMachine = function(blueprints) {
    var steps = parseInt(stepsPattern.exec(blueprints)[1]);
    var stateMachine = TuringMachineAPI.buildStateMachineFromBlueprints(blueprints);
    for(var i = 0; i<steps; i++) {
        stateMachine.step();
    }
    return stateMachine.tape.size;
};