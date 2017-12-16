var JumpMazeAPI = {};

JumpMazeAPI.stepsToLeaveIncrementingJumpMaze = function(jumpMazeString) {
    var maze = jumpMazeString.split('\n');
    var index = 0;
    var steps = 0;
    while(index < maze.length) {
        var jump = parseInt(maze[index]);
        maze[index] = parseInt(maze[index]) + 1; // increment at previous position
        index += jump; // jump to next position
        steps += 1;
    }
    return steps;
};

JumpMazeAPI.stepsToLeaveVariableJumpMaze = function(jumpMazeString) {
    var maze = jumpMazeString.split('\n');
    var index = 0;
    var steps = 0;
    while(index < maze.length) {
        var jump = parseInt(maze[index]);
        if (jump >= 3) {
            maze[index] = parseInt(maze[index]) - 1; // decrement at previous position if it was too high
        } else {
            maze[index] = parseInt(maze[index]) + 1; // otherwise increment at previous position 
        }
        index += jump; // jump to next position
        steps += 1;
    }
    return steps;
};