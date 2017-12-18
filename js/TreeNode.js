export class Node {
    constructor(id, data) {
        this.id = id;
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

function depthFirstSearch(node, condition) {
    if (condition(node)) {
        return node;
    } 
    else {
        for (var i=0; i<node.children.length; i++) {
            var recurseResult = depthFirstSearch(node.children[i], validator);
            if (recurseResult) {
                return recurseResult;
            }
        }
        return null;
    }
}
    
function breadthFirstSearch(nodesOfGivenLevel, condition) {
    if (nodesOfGivenLevel.length == 0) {
        return null;
    }
    var nextLevel = [];
    //Check all nodes of this level
    for (var i=0; i<nodesOfGivenLevel.length; i++) {
        var node = nodesOfGivenLevel[i];
        if (condition(node)) {
            return node;
        } else {
            nextLevel.push(...node.children);
        }
    }
    return breadthFirstSearch(nextLevel, condition);
}
    
export class Tree {
    constructor(root) {
        this.root = root;
    }
    depthFirstSearch(condition) {
        return depthFirstSearch(this.root, condition);
    }
    breadthFirstSearch(condition) {
        return breadthFirstSearch([this.root], condition);
    }
    findNodeById(id) {
        return breadthFirstSearch((node)=>return node.id == id);
    }
}

export class TreeBuilder {
    constructor() {
        this.trees = [];
        this.parent2ChildMap = {};
        this.child2ParentMap = {};
    }
    
    addNode(node, childIds) {
        this.parent2ChildMap[node.id] = childIds;
        //search existing trees for this node's parent
        var parentFound = false;
        for (var i=0;i<this.trees.length;i++) {
            //Search tree for a node whose children (stored in seperate map) include node being added
            var parent = this.tree[i].depthFirstSearch((n) => this.parent2ChildMap[n.id].includes[node.id]);
            if (parent) {
                parentFound = true;
                parent.addChild(node);
                break;
            }
        }
        //If this node's parent is not yet in any of the trees, this node can start a new tree
        if (!parentFound) {
            this.trees.push(new Tree(node))
        }
        
        //Now check if any other root nodes are actually new node's child
        //Iterate backwards so its easier to remove trees from array
        for (var i=this.trees.length-1; i>=0; i--) {
            if (childIds.includes(this.trees[i].root.id)) {
                //Combine trees
                node.addChild(this.trees[i].root);
                this.trees.splice(i, 1);
            }
        }
    }
    
    
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