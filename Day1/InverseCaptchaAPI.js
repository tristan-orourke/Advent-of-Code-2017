var InverseCaptchaAPI = {}

InverseCaptchaAPI.sumMatchingAdjacentDigits = function(digits) {
    digits = digits.toString();
    var sum = 0;
    for(var i=0; i<(digits.length - 1); i++) {
        if (digits[i] == digits[i+1]) {
            sum += parseInt(digits[i]);
        }
    }
    //comparison wraps around at end of string
    if (digits[digits.length - 1] == digits[0]) {
        sum += parseInt(digits[digits.length-1]);
    }
    return sum;
};

InverseCaptchaAPI.solveCaptcha = function() {
    var input = document.getElementById("captcha-input");
    if (input) {
        var solution = InverseCaptchaAPI.sumMatchingAdjacentDigits(input.value);
        var outputElem = document.getElementById("captcha-solution");
        if (outputElem) {
            outputElem.textContent = solution;
        }
    }
};