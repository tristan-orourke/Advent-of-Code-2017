<head>
    <title>AoC: Day 14</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 14 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/KnotHashAPI.js"></script>
    <script type="text/javascript" src="./js/DefragmentationAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 14: Disk Defragmentation</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Determine the number of used squares given a key string that represents disk state', 
                         'form-1',
                         'input-1',
                         'key string',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'DefragmentationAPI.usedSquaresGivenKeyString');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Determine the number of groups of adjecent filled squares on disk', 
                         'form-2',
                         'input-2',
                         'disk key string',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'DefragmentationAPI.numberOfFilledGroups');      
    ?>
</body>