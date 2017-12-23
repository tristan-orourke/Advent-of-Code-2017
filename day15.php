<head>
    <title>AoC: Day 15</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 15 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/DuelingGeneratorsAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 15: Dueling Generators</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Judge number of matches in 40 million generated values', 
                         'form-1',
                         'input-1',
                         'initial values',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'DuelingGeneratorsAPI.judgeMatchesIn40MilGenerations');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Determine the number of groups of adjecent filled squares on disk', 
                         'form-2',
                         'input-2',
                         'disk key string',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'DuelingGeneratorsAPI.judgeMatchesIn40MilGenerations');      
    ?>
</body>