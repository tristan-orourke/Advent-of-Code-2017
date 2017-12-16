var JumpMazeAPI = {};

JumpMazeAPI.stepsToLeaveIncrementingJumpMaze = function(jumpMazeString) {
    var maze = jumpMazeString.split('\n');
    var index = 0;
    var steps = 0;
    while(index < maze.length) {
        var jump = parseInt(maze[index]);
        maze[index] = parseInt(maze[index]) + 1; // increment previous position
        index += jump; // jump to next position
        steps += 1;
    }
    return steps;
};