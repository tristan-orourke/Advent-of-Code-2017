<head>
    <title>AoC: Day 25</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 25 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/TuringMachineAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 25: Turing Machine</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Get the diagnostic checksum for the described turing machine', 
                         'form-1',
                         'input-1',
                         'blueprints',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'TuringMachineAPI.getDiagnosticChecksumForStateMachine');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: ', 
                         'form-2',
                         'input-2',
                         'blueprints',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'TuringMachineAPI.getDiagnosticChecksumForStateMachine');      
    ?>
</body>