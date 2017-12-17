export class Node {
    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.children = [];
        this.parent = null;
    }
    
    addChild(node) {
        this.children.push(node);
        node.parent = this;
    }
    addParent(parent) {
        parent.addChild(this);
    }
    removeChild(node) {
        var index = this.children.indexOf(node);
        if (index > 1) {
            this.children.splice(index, 1);
        }
    }
    
    rootParent() {
        if(this.parent == null) {
            return this;
        } else {
            return this.parent.rootParent();
        } 
    }
}

export class Tree {
    constructor() {
        root = null;
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

function depthFirstSearch(node, validator) {
    if (validator(node)) {
        return node;
    } 
    for (var i=0; i<node.children.length; i++) {
        var recurseResult = depthFirstSearch(node.children[i], validator);
        if (recurseResult) {
            return recurseResult;
        }
    }
    return null;
}

/*
    Search for a node in the tree that returns true for validator(node)
*/
BalanceTree.prototype.search = function(validator) {
    //search first in the root
    var node = depthFirstSearch(this.root, validator);
    if (!node) {
        //search in the orphan nodes if not in the root
        for (var i=0;i<this.orphan_nodes.length; i++) {
            node = depthFirstSearch(this.orphan_nodes[i], validator);
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