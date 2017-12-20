<head>
    <title>AoC: Day 11</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 11 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/HexGridAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 11: Hex Grid</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Determine shortest distance to return from path on hex grid', 
                         'form-1',
                         'input-1',
                         'path steps',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'HexGridAPI.shortestReturnDistance');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2:', 
                         'form-2',
                         'input-2',
                         'hashing key',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'KnotHashAPI.runKnotHash');      
    ?>
</body>