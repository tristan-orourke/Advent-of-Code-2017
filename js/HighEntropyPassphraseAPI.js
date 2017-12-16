var HighEntropyPassphraseAPI = {};

function countElementOccurences(list) {
    var count = {};
    for (var i=0; i<list.length; i++) {
        var element = list[i];
        if (!count[element]) {
            count[element] = 1;
        } else {
            count[element] += 1;
        }
    }
    return count;
}

HighEntropyPassphraseAPI.phraseHasNoRepeatWords = function(phrase) {
    var words = phrase.split(' ');
    var count = countElementOccurences(words);
    for(var word in count) {
        if(count[word] > 1) {
            return false;
        }
    }
    return true;
};

HighEntropyPassphraseAPI.countValidPassphrases = function (passphrases) {
    var count = 0;
    var phrases = passphrases.split('\n');
    phrases.forEach(function(phrase, i) {
        if (HighEntropyPassphraseAPI.phraseHasNoRepeatWords(phrase)) {
            count += 1;
        }
    });
    return count;
};
