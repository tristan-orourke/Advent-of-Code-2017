<head>
    <title>AoC: Day 3</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 2 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/SpiralMemoryAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 2: Corruption Checksum</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Find distance to spiral memory element', 
                         'index-form-1',
                         'index-input-1',
                         'spiral index',
                         'index-solution-1');
        echo_js_tying_form_to_function('index-input-1', 'index-form-1', 'index-solution-1', 'SpiralMemoryAPI.findManhattanDistForSpiralIndex');
        /*echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Checksum using even divisors in each row', 
                         'checksum-form-2',
                         'checksum-input-2',
                         'spreadsheet',
                         'checksum-solution-2');
        echo_js_tying_form_to_function('checksum-input-2', 'checksum-form-2', 'checksum-solution-2', 'CorruptionChecksumAPI.sumWholeQuotientsPerRow');      
        */
    ?>
</body>