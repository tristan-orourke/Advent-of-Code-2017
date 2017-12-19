<head>
    <title>AoC: Day 9</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 9 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/TreeNode.js"></script>
    <script type="text/javascript" src="./js/StreamProcessingAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 9: Stream Processing</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: What is the sum score of non-garbage groups in the stream?', 
                         'form-1',
                         'input-1',
                         'stream',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'StreamProcessingAPI.sumScoreOfStreamGroups');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: How many non-canceled garbage characters are there?', 
                         'form-2',
                         'input-2',
                         'register commands',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'StreamProcessingAPI.countNonCanceledGarbageCharacters');      
    ?>
</body>