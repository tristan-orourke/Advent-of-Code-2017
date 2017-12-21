<head>
    <title>AoC: Day 12</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 12 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/Graphs.js"></script>
    <script type="text/javascript" src="./js/PipeGraphsAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 12: Pipe Graphs</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Determine how many nodes are there in the graph containing node 0', 
                         'form-1',
                         'input-1',
                         'node definitions',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'PipeGraphsAPI.countNodesInGraphWithNode0');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Count number of disconnected graphs', 
                         'form-2',
                         'input-2',
                         'node definitions',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'PipeGraphsAPI.countNumberOfGraphs');      
    ?>
</body>