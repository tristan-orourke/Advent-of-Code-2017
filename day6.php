<head>
    <title>AoC: Day 6</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 6 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/MemoryReallocationAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 6: Memory Reallocation</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: How many steps does it take to leave the jump maze?', 
                         'form-1',
                         'input-1',
                         'jump maze',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'MemoryReallocationAPI.stepsToLeaveIncrementingJumpMaze');
        
        /*echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Count the number of valid passphrases (phrases with no anagram words)', 
                         'form-2',
                         'input-2',
                         'jump maze',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'JumpMazeAPI.stepsToLeaveVariableJumpMaze');      
        */
    ?>
</body>