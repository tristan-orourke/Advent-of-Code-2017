<?php
function echo_puzzle_form(
    $puzzle_id,
    $puzzle_description,
    $form_id,
    $input_id,
    $input_placeholder,
    $output_id)
{
    echo "<div class='puzzle' id='$puzzle_id'>";
    echo "<h3 class='puzzle-title'>$puzzle_description</h3>";
    
    echo "<form id='$form_id'>";
    echo "<span>";
    echo "<input type='text' id='$input_id' name='$input_id' placeholder='$input_placeholder'/>";
    echo "<input class='btn btn-primary' type='submit' value='solve'/>";
    echo "</span>";
    
    echo "<div>";
    echo "<span>";
    echo "<strong>Solution:</strong>";
    echo "<span id='$output_id'></span>";
    echo "</span>";
    echo "</div>";
    echo "</form>";
    echo "</div>";
}

/*
inputs:
    $input_id: id of <input type='text'> element.
    $form_id: id of the form containing the input element.
    $function_name: javascript function with 1 argument and return value.
    $output_id: id of element which can hold text content.
returns:
    nothing
description:
    Adds a js script to page so that when $form_id is submitted, $function_name will be called with the input element's value as the parameter. The functions return value will be set as text content in the output element.
*/
function echo_js_tying_form_to_function($input_id, $form_id, $output_id, $function_name) {
    echo "<script type='text/JavaScript'>";
    echo "var form = document.getElementById('$form_id');";
    echo "if (form) {";
    echo "form.addEventListener('submit', function(event) {";

    //the inline function called by submit button
    echo "event.preventDefault();";
    echo "var input = document.getElementById('$input_id');";
    echo "if (input) {";
    echo "var solution = $function_name(input.value);";
    echo "var outputElem = document.getElementById('$output_id');";
    echo "if (outputElem) {";
    echo "outputElem.textContent = solution;";
    echo "}";
    echo "}";
    echo "return false;";
    //end of inline function
    
    echo "}, false);";
    echo "} else { alert('Form $form_id not found'); }";
    
    echo "</script>";
}
?>