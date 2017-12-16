<head>
    <title>AoC: Day 3</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 3 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/SpiralMemoryAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 3: Corruption Checksum</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Find distance to spiral memory element', 
                         'spiral-form-1',
                         'spiral-input-1',
                         'spiral index',
                         'spiral-solution-1');
        echo_js_tying_form_to_function('spiral-input-1', 'spiral-form-1', 'spiral-solution-1', 'SpiralMemoryAPI.findManhattanDistForSpiralIndex');
        echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Find first spiral cumulator value larget than input', 
                         'spiral-form-2',
                         'spiral-input-2',
                         'spiral value',
                         'spiral-solution-2');
        echo_js_tying_form_to_function('spiral-input-2', 'spiral-form-2', 'spiral-solution-2', 'SpiralMemoryAPI.findSpiralCumulatorValueLargerThanInput');      
        
    ?>
</body>