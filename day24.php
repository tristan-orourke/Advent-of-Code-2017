<head>
    <title>AoC: Day 24</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 24 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/TreeNode.js"></script>
    <script type="text/javascript" src="./js/BridgesAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 24: Electromagnetic Bridges</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Determine the strength of the strongest possible bridge', 
                         'form-1',
                         'input-1',
                         'bridge components',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'BridgesAPI.strengthOfStrongestBridge');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2:', 
                         'form-2',
                         'input-2',
                         'bridge components',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'BridgesAPI.strengthOfStrongestBridge');      
    ?>
</body>