var BalanceTreeAPI = {};

BalanceTreeAPI.parseNodeFromLine = function(line) {
    var pattern = /(\w+) \((\d+)\)( ->( \w+,?)+)?/;
    var match = pattern.exec(line);
    var id = match[1];
    var data = {};
    data.weight = parseInt(match[2]);
    data.full_weight = 0;
    data.child_ids = [];
    if (match[3]) {
        data.child_ids = match[3].slice(4).split(", ");
    }
    return new Node(id, data);
};

BalanceTreeAPI.generateTrees = function(treeDescription) {
    var treeBuilder = new TreeBuilder();
    treeDescription.split('\n').forEach(function(line, index) {
        var node = BalanceTreeAPI.parseNodeFromLine(line);
        treeBuilder.addNode(node, node.data.child_ids); 
    });
    return treeBuilder.trees;
}

/*
Returns name of the root node
*/
BalanceTreeAPI.findRootNode = function(treeDescription) {
    var trees = BalanceTreeAPI.generateTrees(treeDescription);
    if (trees.length > 1) {
        return "Tree description resulted in multiple disconnected trees!";
    } else {
        return trees[0].root.id;
    }
};

function recalculateFullWeight(node) {
    if (node.children.length == 0) {
        node.data.full_weight = node.data.weight;
    } else {
        node.data.full_weight = node.data.weight + node.children.reduce((total, node)=>total+recalculateFullWeight(node), 0);
    }
    return node.data.full_weight;
}

function childrenAllWeighSame(node) {
    if (node.children.length <= 1) {
        return true;
    }
    return node.children.every(child => child.data.full_weight == node.children[0].data.full_weight);
}

/*
Odd in terms of full_weight. If only 2 siblings, the heavier is the odd one out.
*/
function oddSiblingOut(node) {
    if (node == null || node.parent == null) {
        return false;
    } else if (node.parent.children.length == 2) {
        var sibling = node.parent.children[0];
        if (sibling == node) {
            sibling = node.parent.children[1];
        }
        return (node.data.full_weight > sibling.data.full_weight);
    } else {
        //if node weight matches at least one other sibling, its not the odd one out
        for (var i=0; i<node.parent.children.length; i++) {
            var sibling = node.parent.children[i];
            if (sibling != node && sibling.data.full_weight == node.data.full_weight) {
                return false;
            }
        }
        return true;
    }
}

function nodeIsImbalancedButChildrenAreBalanced(node) {
    
    return (oddSiblingOut(node) && childrenAllWeighSame(node) && !childrenAllWeighSame(node.parent));
}

function childWeight(node) {
    return node.children.reduce((total, child) => total += child.data.full_weight, 0);
}

/*
Returns what the specified node SHOULD weigh, to be balanced.
This function assumes that all nodes, except the specified one, are already balanced.
*/
function calculateBalancedWeight(node) {
    if (node.parent.children.length > 1) {
        //find a sibling node
        var sibling = node.parent.children[0];
        if (sibling == node) {
            sibling = node.parent.children[1];
        }
        return sibling.data.full_weight - childWeight(node);
    } else {
        //assuming all weight imbalance is node's fault, we can find the different between node's parent's
        //correct and 'true' weight, and that is the difference for node.
        var discrepency = calculateBalancedWeight(node.parent) - node.parent.data.full_weight;
        return node.data.weight + discrepency;
    }
}

BalanceTreeAPI.findCorrectionForIncorrectWeight = function(treeDescription) {
    var trees = BalanceTreeAPI.generateTrees(treeDescription);
    if (trees.length > 1) {
        return "Tree description resulted in multiple disconnected trees!";
    } else {
        t = trees[0];
        recalculateFullWeight(t.root);
        var incorrectNode = t.search(nodeIsImbalancedButChildrenAreBalanced);
        return calculateBalancedWeight(incorrectNode);
    }
}




//TESTING
/*
function assert(expected, value, fail_message) {
    var message = (value == expected) ? "pass" : fail_message;
    console.log(message);
}

var x = new BalanceNode('x', 12, ['y']);
var y = new BalanceNode('y', 9, ['z']);
x.addChild(y);
t = new BalanceTree();

t.addNode(x);
assert(x, t.root, 'addNode makes first node root');

assert(y, t.searchForName('y'), "searchForName Failed");
assert(y, t.leafNodes()[0], "leafNodes Failed");

var z = new BalanceNode('z', 999, []);
t.addNode(z);
assert(true, y.children.includes(z), "addNode failed to find parent node in tree");

var w = new BalanceNode('w', 0, ['x']);
t.addNode(w);
assert(w, t.root, "addNode failed to replace root");
assert(true, w.children.includes(x), "addNode failed to find child as root");

var u = new BalanceNode('u', 23, ['v']);
t.addNode(u);
assert(true, t.orphan_nodes.includes(u), 'addNode failed to add to orphan_nodes');

var v = new BalanceNode('v', 55, []);
t.addNode(v);
assert(true, u.children.includes(v), 'addNode failed to add child to orphan_node');

var a = new BalanceNode('a', 100, ['w','u']);
t.addNode(a);
assert(true, a.children.includes(u), 'addNode failed to find child in orphan_nodes');
assert(false, t.orphan_nodes.includes(u), 'addNode failed to remove node from orphan_nodes when parent was added');

var n = BalanceTreeAPI.parseNodeFromLine('qgcmjz (87) -> skzkx, pzkofch');
assert(true, n ? true : false, "parseNode returned a valid object");
assert('qgcmjz', n.name, "pareNodeFromLine failed to record name");
assert(87, n.weight, "pareNodeFromLine failed to record weight, got " + n.weight);
assert(true, n.child_names.length==2 && n.child_names[0]=='skzkx' && n.child_names[1]=='pzkofch', "pareNodeFromLine to record child names, got " + n.child_names);
*/