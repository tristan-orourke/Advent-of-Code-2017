/*
inputs:
    $io_json: a json file with a puzzle-1 object and puzzle-2 object, each holding "input" and "solution" mapped values.
    $js_solver_1: a javascript function which accepts one parameter and returns a value.
    $js_solver_2: a javascript function which accepts one parameter and returns a value.
returns:
    boolean
description:
    returns true if $js_solver_1 outputs the correct solution to each input in the puzzle-1 json object, and $js_solver_2 does the same for the puzzle-2 object.
*/
function test_js_solvers($io_json, $js_solver_1, $js_solver_2) {
    $json_string = file_get_contents("/home/michael/test.json");
}

