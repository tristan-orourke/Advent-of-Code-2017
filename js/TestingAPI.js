var TestingAPI = {};

TestingAPI.check_solver = function(input_solution_map, solver) {
    for (var i=0; i<input_solution_map.length; i++) {
        var input = input_solution_map[i].input;
        var solution = input_solution_map[i].solution;
        if (solver(input) != solution)
            return false;
    }
    return true;
}

/*
inputs:
    io_json: a json string with a puzzle-1 object and puzzle-2 object, each holding "input" and "solution" mapped values.
    js_solver_1: a javascript function which accepts one parameter and returns a value.
    js_solver_2: a javascript function which accepts one parameter and returns a value.
returns:
    boolean
description:
    returns true if js_solver_1 outputs the correct solution to each input in the puzzle_1 json object, and js_solver_2 does the same for the puzzle_2 object.
*/
TestingAPI.test_js_solvers = function(io_json, js_solver_1, js_solver_2) {
    var io_obj = JSON.parse(io_json);

    var both_passed = TestingAPI.check_solver(io_obj.puzzle_1, js_solver_1) && TestingAPI.check_solver(io_obj.puzzle_2, js_solver_2);
    
    return both_passed;
}

