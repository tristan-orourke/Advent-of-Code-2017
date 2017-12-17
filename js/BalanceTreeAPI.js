var BalanceTreeAPI = {};

function BalanceNode(name, weight, child_names) {
    this.name = name;
    this.weight = weight;
    this.child_names = child_names;
    this.children = [];
    this.parent = null;
}

function BalanceTree() {
    this.root = null;
    this.orphan_nodes = [];
}


BalanceNode.prototype.addChild = function(child) {
    this.children.push(child);
    child.parent = this;
};

BalanceNode.prototype.setParent = function(parent) {
    this.parent = parent;
    parent.children.push(this);
}

BalanceNode.prototype.rootParent = function(parent) {
    if(this.parent == null) {
        return this;
    } else {
        return this.parent.rootParent();
    }
}

function depthFirstLeafSearch(node) {
    if (node.children.length == 0) {
        return [node];
    } else {
        leaves = [];
        for (var i=0; i<node.children.length; i++) {
            leaves = leaves.concat(depthFirstLeafSearch(node.children[i]));
        }
        return leaves;
    }
}

function recursiveNodeSearch(node, validator) {
    if (validator(node)) {
        return node;
    } 
    for (var i=0; i<node.children.length; i++) {
        var recurseResult = recursiveNodeSearch(node.children[i], validator);
        if (recurseResult) {
            return recurseResult;
        }
    }
    return null;
}

function treeSearch(tree, validator) {
    //search first in the root
    var node = recursiveNodeSearch(tree.root, validator);
    if (!node) {
        //search in the orphan nodes if not in the root
        for (var i=0;i<tree.orphan_nodes.length; i++) {
            node = recursiveNodeSearch(tree.orphan_nodes[i], validator);
            if (node) {
                break;
            }
        }
    }
    return node;
}

/*
    Search for a node in the tree that returns true for validator(node)
*/
BalanceTree.prototype.search = function(validator) {
    //search first in the root
    var node = recursiveNodeSearch(this.root, validator);
    if (!node) {
        //search in the orphan nodes if not in the root
        for (var i=0;i<this.orphan_nodes.length; i++) {
            node = recursiveNodeSearch(this.orphan_nodes[i], validator);
            if (node) {
                break;
            }
        }
    }
    return node;
};

BalanceTree.prototype.leafNodes = function() {
    return depthFirstLeafSearch(this.root);
};

BalanceTree.prototype.searchForName = function(nodeName) {
    return this.search((node) => (node.name == nodeName));
};

BalanceTree.prototype.searchForNodeWithChild = function(childName) {
    return this.search((node) => node.child_names.includes(childName));
}



BalanceTree.prototype.addNode = function(node) {
    //if root doesn't exist, make this root
    if (this.root == null) {
        this.root = node;
    } else if (node.child_names.includes(this.root.name)) {
        //if new node is root's parent, make it the new root
        node.addChild(this.root);
        this.root = node;
        
        //need to search orphan_nodes for something that could be this node's parent
        var parent = this.searchForNodeWithChild(node.name);
        if (parent) {
            parent.addChild(node);
            this.root = parent.rootParent();
            //Now that its root, remove it from orphans
            this.orphan_nodes.splice(this.orphan_nodes.indexOf(this.root), 1); 
        }
        
        
    } else {
        
        //Search for this node's parent in the tree;
        var parent = this.searchForNodeWithChild(node.name);
        if (parent) {
            parent.addChild(node);
        } else {
            //if parent not in tree, add this to orphan nodes
            this.orphan_nodes.push(node);
        }
    }
    
    //check for children of this node among the orphan nodes
    //iterate backward so we can splice un-orphaned nodes out easily
    for (var i=this.orphan_nodes.length-1; i>=0; i--) {
        if (node.child_names.includes(this.orphan_nodes[i].name)) {
            node.addChild(this.orphan_nodes[i]);
            this.orphan_nodes.splice(i, 1);
        }
    }
};

BalanceTreeAPI.parseNodeFromLine = function(line) {
    var pattern = /(\w+) \((\d+)\)( ->( \w+,?)+)?/;
    var match = pattern.exec(line);
    var name = match[1];
    var weight = parseInt(match[2]);
    var child_names = [];
    if (match[3]) {
        child_names = match[3].slice(4).split(", ");
    }
    return new BalanceNode(name, weight, child_names);
};

BalanceTreeAPI.generateTree = function(treeDescription) {
    t = new BalanceTree();
    treeDescription.split('\n').forEach(function(line, index) {
       t.addNode(BalanceTreeAPI.parseNodeFromLine(line)); 
    });
    return t;
}

/*
Returns name of the root node
*/
BalanceTreeAPI.findRootNode = function(treeDescription) {
    t = BalanceTreeAPI.generateTree(treeDescription);
    if (t.orphan_nodes.length > 0) {
        return "Orphan nodes remain!";
    } else {
        return t.root.name;
    }
};

function assert(expected, value, fail_message) {
    var message = (value == expected) ? "pass" : fail_message;
    console.log(message);
}

//TESTING
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