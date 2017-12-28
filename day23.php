<head>
    <title>AoC: Day 23</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 23 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/CoprocessorAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 23: Coprocessor Conflagration</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: how many times does the assembly program invoke mul?', 
                         'form-1',
                         'input-1',
                         'instructions',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'CoprocessorAPI.countMulsInvoked');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Count the packets steps', 
                         'form-2',
                         'input-2',
                         'instructions',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'CoprocessorAPI.countMulsInvoked');      
    ?>
</body>