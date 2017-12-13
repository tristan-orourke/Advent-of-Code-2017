<header>
    <?php
        if ($_SERVER['REQUEST_URI'] != '/index.html' &&
           $_SERVER['REQUEST_URI'] != '/index.php') {
            echo "<a class='home-btn' href=''>HOME</a>";
        }
    ?>
    <h1>Advent of Code 2017</h1>
</header>