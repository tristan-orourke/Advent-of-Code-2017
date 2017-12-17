<head>
    <title>AoC: Day 8</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 8 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/RegisterParserAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 7: Recursive Circus</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: What is the root node?', 
                         'form-1',
                         'input-1',
                         'node names, weights, and children',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'BalanceTreeAPI.findRootNode');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: One node is imbalanced. What should its weight be', 
                         'form-2',
                         'input-2',
                         'node names, weights, and children',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'BalanceTreeAPI.findCorrectionForIncorrectWeight');      
    ?>
</body>