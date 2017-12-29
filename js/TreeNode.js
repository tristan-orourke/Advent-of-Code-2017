class Node {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.children = [];
        this.parent = null;
    }
    
    addChild(node) {
        if (!this.children.includes(node)) {
            this.children.push(node);
        }
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
            var recurseResult = depthFirstSearch(node.children[i], condition);
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

function searchAllNodes(node, condition, results) {
    if (condition(node)) {
        results.push(node);
    }
    for (var i=0; i<node.children.length; i++) {
        searchAllNodes(node.children[i], condition, results);
    }
}
    
class Tree {
    constructor(root) {
        this.root = root;
    }
    depthFirstSearch(condition) {
        return depthFirstSearch(this.root, condition);
    }
    breadthFirstSearch(condition) {
        return breadthFirstSearch([this.root], condition);
    }
    search(condition) {
        //search defaults to breadth first
        return this.breadthFirstSearch(condition);
    }
    findNodeById(id) {
        return this.breadthFirstSearch((node)=>(node.id == id));
    }
    findAllNodes(condition) {
        //returns all nodes that satisfy condition
        var results = [];
        searchAllNodes(this.root, condition, results);
        return results;
    }
}

class TreeBuilder {
    constructor() {
        this.trees = [];
        this.parent2ChildMap = {};
        this.child2ParentMap = {};
    }
    
    addNode(node, childIds) {
        this.parent2ChildMap[node.id] = childIds;
        childIds.forEach((item, index) => this.child2ParentMap[item] = node.id);
        
        //Check if an already added node is this node's parent
        var parentId = this.child2ParentMap[node.id];
        if (parentId) {
            //Find the node with the parent id 
            for (var i=0;i<this.trees.length;i++) {
                var parent = this.trees[i].findNodeById(parentId)
                if (parent) {
                    parent.addChild(node);  
                    break;
                }
            }
        } else {
            //If this node's parent has not yet been added, this node can start a new tree
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