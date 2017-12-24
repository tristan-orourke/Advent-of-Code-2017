<head>
    <title>AoC: Day 18</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 18 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/Queue.js"></script>
    <script type="text/javascript" src="./js/DuetAssemblyAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 18: Duet Assembly</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Sound Assembly: what is the first recovered sound?', 
                         'form-1',
                         'input-1',
                         'assembly instructions',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'DuetAssemblyAPI.findFirstRecoveredFreq');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Duet Assembly: count number of messages sent by program 2', 
                         'form-2',
                         'input-2',
                         'assembly instructions',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'DuetAssemblyAPI.countMsgsSentByProgram1');      
    ?>
</body>