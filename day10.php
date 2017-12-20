<head>
    <title>AoC: Day 10</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 10 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/KnotHashAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 10: Knot Hash</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Multiply the first two digits after running the specified reversals on 0-255', 
                         'form-1',
                         'input-1',
                         'reversal lengths',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'KnotHashAPI.multiplyFirstTwoDigitsResultingFromOneRoundKnotHash');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2:', 
                         'form-2',
                         'input-2',
                         'hashing key',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'KnotHashAPI.runKnotHash');      
    ?>
</body>