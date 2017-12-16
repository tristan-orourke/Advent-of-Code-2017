<head>
    <title>AoC: Day 4</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 4 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/HighEntropyPassphraseAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 4: High-Entropy Passphrases</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Count the number of valid passphrases (phrases with no repeat words)', 
                         'form-1',
                         'input-1',
                         'passphrase list',
                         'solution-1');
        echo_js_tying_form_to_function('input-1', 'form-1', 'solution-1', 'HighEntropyPassphraseAPI.countValidPassphrases');
        /*echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Find first spiral cumulator value larget than input', 
                         'form-2',
                         'input-2',
                         'spiral value',
                         'solution-2');
        echo_js_tying_form_to_function('input-2', 'form-2', 'solution-2', 'SpiralMemoryAPI.findSpiralCumulatorValueLargerThanInput'); */     
        
    ?>
</body>