<head>
    <title>AoC: Day 2</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 2 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/CorruptionChecksumAPI.js"></script>
    <script type="text/javascript" src="./js/TestingAPI.js"></script>

</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 2: Corruption Checksum</h2>
    <?php
        require_once("puzzleSolverTemplates.php");
        echo_puzzle_form('puzzle-1',
                         'Puzzle 1: Checksum using max difference in each row', 
                         'checksum-form-1',
                         'checksum-input-1',
                         'spreadsheet',
                         'checksum-solution-1');
        echo_js_tying_form_to_function('checksum-input-1', 'checksum-form-1', 'checksum-solution-1', 'CorruptionChecksumAPI.sumMaxDiffPerRow');
        /*echo_puzzle_form('puzzle-2',
                         'Puzzle 2: Sum matching digits halfway around string', 
                         'captcha-form-2',
                         'captcha-input-2',
                         'captcha string',
                         'captcha-solution-2');
        echo_js_tying_form_to_function('captcha-input-2', 'captcha-form-2', 'captcha-solution-2', 'InverseCaptchaAPI.sumMatchingDigitsHalfwayAround');
        */        
    ?>
</body>