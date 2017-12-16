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

function regularizeString(word) {
    return word.toLowerCase().split('').sort().join('');
}

HighEntropyPassphraseAPI.wordsAreAnagrams = function(w1, w2) {
    return regularizeString(w1) == regularizeString(w2);
};

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

HighEntropyPassphraseAPI.phraseHasNoAnagramWords = function(phrase) {
    var words = phrase.split(' ');
    for (var i=0; i < words.length-1; i++) {
        for (var j=i+1; j < words.length; j++) {
            if (HighEntropyPassphraseAPI.wordsAreAnagrams(words[i], words[j])) {
                return false;
            }
        }
    }
    return true;
};

HighEntropyPassphraseAPI.countPhrasesWithoutDuplicates = function (passphrases) {
    return passphrases.split('\n').reduce((count,phrase) => HighEntropyPassphraseAPI.phraseHasNoRepeatWords(phrase) ? count+1 : count, 0) ; 
};

HighEntropyPassphraseAPI.countPhrasesWithoutAnagrams = function (passphrases) {
    return passphrases.split('\n').reduce((count,phrase) => HighEntropyPassphraseAPI.phraseHasNoAnagramWords(phrase) ? count+1 : count, 0) ; 
};

/*
TESTING

var testCases2 = {};
testCases2['abcde fghij'] = true;
testCases2['abcde xyz ecdab'] = false;
testCases2['a ab abc abd abf abj'] = true;
testCases2['iiii oiii ooii oooi oooo'] = true;
testCases2['oiii ioii iioi iiio'] = false;

for (var item in testCases2) {
    if (HighEntropyPassphraseAPI.phraseHasNoAnagramWords(item) == testCases2[item]) {
        console.log('pass');
    } else {
        console.log('CASE FAILED: expected ' + testCases2[item] + ' for ' + item);
    }
}
*/