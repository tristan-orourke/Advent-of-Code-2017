//include TreeNode.js

var StreamProcessingAPI = {};

const GROUP = 'group';
const GARBAGE = 'garbage';

StreamProcessingAPI.stripIgnoredCharacters = function (stream) {
    var strippedStream = '';
    var pattern = /!./g;
    var index = 0;
    while (match = pattern.exec(stream)) {
        strippedStream += stream.substring(index, match.index);
        index = match.index + 2;
    }
    strippedStream += stream.substring(index);
    return strippedStream;
};

function parseGarbageNode(stream) {
    if (stream[0] != '<') {
        throw new Error('Garbage must start with <, not ' + stream[0]);
    }
    
    var node = new Node(stream, {});
    node.data.streamType = GARBAGE;    
    //At start of group, find correct closing bracket
    var i = 1;
    while(stream[i] != '>') {
        //Garbag chunks have no children
        if (stream[i] == '!') {
            //! indicates the next character should be ignored
            i += 2;
        } else {
            i += 1;
        }
    }
    node.data.content = stream.substring(0,i+1);
    return node;
}

function parseGroupNode(stream) {
    if (stream[0] != '{') {
        throw new Error('Groups must start with {, not ' + stream[0]);
    }
    
    var node = new Node(stream, {});
    node.data.streamType = GROUP;
    
    //At start of group, find correct closing bracket
    var i = 1;
    while(stream[i] != '}') {
        if (stream[i] == '{') {
            child = parseGroupNode(stream.substring(i));
            node.children.push(child);
            i += child.data.content.length;
        } else if (stream[i] == '<') {
            child = parseGarbageNode(stream.substring(i));
            node.children.push(child);
            i += child.data.content.length;
        } else {
            i += 1;
        }
    }
    node.data.content = stream.substring(0,i+1);        
    return node;
}

StreamProcessingAPI.buildGroupGarbageTree = function (stream) {
    var root;
    
    if (stream[0] == '{')
        root = parseGroupNode(stream);
    else if (stream[0] == '<')
        root = parseGarbageNode(stream);
    else
        throw new Error('\'' + stream[0] + '\' is not the start of valid stream; must be { or <');
        
    var tree = new Tree(root);
    return tree;
}

function applyScoreToGroupNodes(node, score) {
    if (node.data.streamType == GROUP) {
        node.data.score = score;
    } else {
        node.data.score = 0;
    }
    node.children.forEach((item, index) => applyScoreToGroupNodes(item, score + 1)); 
}

function sumNodeScore(node) {
    if (node.children.length == 0) {
        return node.data.score;
    } else {
        return node.children.reduce((total, child) => {
            return total + sumNodeScore(child);
        }, node.data.score);
    }
}

StreamProcessingAPI.sumScoreOfStreamGroups = function (stream) {
    streamTree = StreamProcessingAPI.buildGroupGarbageTree(stream);
    applyScoreToGroupNodes(root, 1);
    return sumNodeScore(streamTree.root);
};

function countNonCancelledGarbageChararactersInNode(node) {
    if (node.data.streamType == GARBAGE) {
        //subtract 2 so as not to count enclosing < > characters
        return StreamProcessingAPI.stripIgnoredCharacters(node.data.content).length - 2;
    } else {
        return node.children.reduce((total, child) => total + countNonCancelledGarbageChararactersInNode(child), 0);
    }
}

StreamProcessingAPI.countNonCanceledGarbageCharacters = function(stream) {
    streamTree = StreamProcessingAPI.buildGroupGarbageTree(stream);
    return countNonCancelledGarbageChararactersInNode(streamTree.root);
};

// TESTING
function assert(expected, actual) {
    if (expected != actual) {
        var message = 'Expected ' + expected + ', recieved ' + actual;
        throw new Error(message);
    } else {
        //console.log('pass');
    }
}

assert("<>", StreamProcessingAPI.stripIgnoredCharacters("<!!>"));
assert("<>", StreamProcessingAPI.stripIgnoredCharacters("<!!!>>"));
assert("<>", StreamProcessingAPI.stripIgnoredCharacters("<>"));
