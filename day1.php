<head>
    <title>AoC: Day 1</title>
    <meta name="author" content="Tristan O'Rourke" />
    <meta name="description" content="Advent of Code 2017 Day 1 Solution" />
    <link rel="stylesheet" type="text/css" href="./css/style.css"/>
    <script type="text/javascript" src="./js/InverseCaptchaAPI.js"></script>
</head>

<body>
    <?php
        require("header.php");
    ?>
    <h2>Day 1: Inverse Captcha</h1>
    <div class="puzzle" id="puzzle-1">
        <h3 class="puzzle-title">Puzzle 1: Sum matching adjacent digits</h3>
        <form id="captcha-form-1">
            <span>
                <input type="text" id="captcha-input-1" name="captcha-input-1" placeholder="captcha input string"/>
                <input class="btn btn-primary" type="button" value="solve" onclick="InverseCaptchaAPI.solveCaptcha()"/>
            </span>
        </form>
        <div>
            <span>
                <strong>Solution:</strong>
                <span id="captcha-solution-1"></span>
            </span>
        </div>
    </div>
    <br/>
    <div class="puzzle" id="puzzle-2">
        <h3 class="puzzle-title">Puzzle 2: Sum matching digits halfway around string</h3>
        <form id="captcha-form-2">
            <span>
                <input type="text" id="captcha-input-2" name="captcha-input-2" placeholder="captcha input string"/>
                <input class="btn btn-primary" type="button" value="solve" onclick="InverseCaptchaAPI.solveCaptcha()"/>
            </span>
        </form>
        <div>
            <span>
                <strong>Solution:</strong>
                <span id="captcha-solution-2"></span>
            </span>
        </div>
    </div>
    
</body>
