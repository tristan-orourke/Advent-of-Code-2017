<head>
    <title>AoC: Day 19</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 19 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/Vector.js"></script>
    <script type="text/javascript" src="./js/PacketRoutingAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 19: Packet Routing</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: What does the packet\'s path spell out?', 
                         'form-1',
                         'input-1',
                         'routing map',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'PacketRoutingAPI.spellThePacketsPath');
        
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Count the packets steps', 
                         'form-2',
                         'input-2',
                         'routing map',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'PacketRoutingAPI.countThePacketsSteps');      
    ?>
</body>