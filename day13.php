<head>
    <title>AoC: Day 13</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 13 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/FirewallAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 13: Firewall Scanners</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Determine trip severity starting at t=0, given scanner set', 
                         'form-1',
                         'input-1',
                         'scanner list as [depth: range]',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'FirewallAPI.tripSeverityStartingAtTZero');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: ', 
                         'form-2',
                         'input-2',
                         'scanner list as [depth: range]',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'FirewallAPI.tripSeverityStartingAtTZero');      
    ?>
</body>