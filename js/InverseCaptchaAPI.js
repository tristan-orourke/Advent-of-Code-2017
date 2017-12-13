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

InverseCaptchaAPI.sumMatchingDigitsHalfwayAround = function(digits) {
    digits = digits.toString();
    var sum = 0;
    var halfway = parseInt(digits.length / 2);
    for(var i=0; i<digits.length; i++) {
        var opposite = (i + halfway) % digits.length;
        if (digits[i] == digits[opposite]) {
            sum += parseInt(digits[opposite]);
        }
    }
    return sum;
};

InverseCaptchaAPI.solveCaptcha = function() {
    var input1 = document.getElementById("captcha-input-1");
    if (input1) {
        var solution1 = InverseCaptchaAPI.sumMatchingAdjacentDigits(input1.value);
        var outputElem1 = document.getElementById("captcha-solution-1");
        if (outputElem1) {
            outputElem1.textContent = solution1;
        }
    }
    
    var input2 = document.getElementById("captcha-input-2");
    if (input2) {
        var solution2 = InverseCaptchaAPI.sumMatchingDigitsHalfwayAround(input2.value);
        var outputElem2 = document.getElementById("captcha-solution-2");
        if (outputElem2) {
            outputElem2.textContent = solution2;
        }
    }
};