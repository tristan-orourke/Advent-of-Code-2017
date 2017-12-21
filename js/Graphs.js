class GraphNode {
    constructor(id, data) {
        this.id = id;
        this.data = data;
        this.allEdges = [];
        this.undirectedEdges = [];
        this.childEdges = []; //this node is the source of directed edges to child nodes
        this.parentEdges = []; //parent nodes are the source of directed edges to this node
    }
    
    addUndirectedEdge(node) {
        if (!this.undirectedEdges.includes(node)) {
            this.undirectedEdges.push(node);
            this.allEdges.push(node);
            node.addUndirectedEdge(this);
        }
    }
    addChildNode(node) {
        if (!this.childEdges.includes(node)) {
            this.childEdges.push(node);
            this.allEdges.push(node);
            node.addParentNode(this);
        }
    }
    addParentNode(node) {
        if (!this.parentEdges.includes(node)) {
            this.parentEdges.push(node);
            this.allEdges.push(node);
            node.addChildNode(this);
        }
    }
    removeEdge(node) {
        [this.allEdges, this.undirectedEdges, this.childEdges, this.parentEdges].forEach((arr, i) => {
           if (arr.includes(node)) {
               arr.splice(arr.indexOf(node), 1);
           } 
        });
    }
    
}

class Graph {
    constructor(root) {
        this.root = root;
    }
    depthFirstSearch(condition) {
        return depthFirstSearch(this.root, condition, []);
    }
    breadthFirstSearch(condition) {
        return breadthFirstSearch([this.root], condition, []);
    }
    search(condition) {
        //search defaults to breadth first
        return this.breadthFirstSearch(condition);
    }
    findNodeById(id) {
        return this.breadthFirstSearch((node)=>(node.id == id));
    }
    getNodesAsArray() {
        var checkedNodes = [];
        breadthFirstSearch([this.root], n=>false, checkedNodes);
        return checkedNodes;
    }
}

function depthFirstSearch(node, condition, checkedNodes) {
    if (condition(node)) {
        return node;
    } 
    else {
        checkedNodes.push(node);
        //edges can create a loop, but we only want to check each node once
        var connections = node.allEdges.filter((node)=>!checkedNodes.includes(node));
        for (var i=0; i<connections.length; i++) {
            var recurseResult = depthFirstSearch(connections[i], condition, checkedNodes);
            if (recurseResult) {
                return recurseResult;
            }
        }
        return null;
    }
}
    
function breadthFirstSearch(nodesOfGivenLevel, condition, checkedNodes) {
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
            checkedNodes.push(node);
            //Ensure each node is only checked once
            connections = node.allEdges.filter((node)=>!checkedNodes.includes(node));
            nextLevel = nextLevel.concat(connections);
        }
    }
    return breadthFirstSearch(nextLevel, condition, checkedNodes);
}

class GraphBuilder {
    constructor() {
        this.graphs = [];
        this.undirectedEdgeId2Node = {};
        this.childId2ParentNode = {};
    }
    
    addNode(node, undirectedEdgeIds, childEdgeIds) {
        //Check each of this node's edge ids, to see if these nodes are already in a graph
        var allEdges = undirectedEdgeIds.concat(childEdgeIds);
        var edgeFound = false;
        for(var i=0; i<allEdges.length; i++) {
            var edgeId = allEdges[i];
            for(var j=0; j<this.graphs.length; j++) {
                var graph = this.graphs[j];
                var connectedNode = graph.findNodeById(edgeId);
                if (connectedNode) {
                    //node has been found!
                    if (undirectedEdgeIds.includes(edgeId)) 
                        node.addUndirectedEdge(connectedNode);
                    else 
                        node.addChildNode(connectedNode);
                    edgeFound = true;
                }
            }
        }
        //If no connection was found, this node starts its own graph
        if (!edgeFound) {
            this.graphs.push(new Graph(node));
        }
        
        //Note all edge connections for later nodes
        undirectedEdgeIds.forEach(id => {
           if (this.undirectedEdgeId2Node[edgeId]) {
                this.undirectedEdgeId2Node[edgeId].push(node);
            } else {
                this.undirectedEdgeId2Node[edgeId] = [node];
            } 
        });
        childEdgeIds.forEach((id) => {
           if (this.childId2ParentNode[edgeId]) {
                this.childId2ParentNode[edgeId].push(node);
            } else {
                this.childId2ParentNode[edgeId] = [node];
            } 
        });

        //Now check if this node satisfies any previously noted edges
        if (this.undirectedEdgeId2Node[node.id]) {
            this.undirectedEdgeId2Node[node.id].forEach(function(n){
                n.addUndirectedEdge(node);
            }, this);
        }
        if (this.childId2ParentNode[node.id]) {
            this.childId2ParentNode[node.id].forEach(n => {
                //Note that n is the source of this dirrected edge and node is the child
                n.addChildNode(node);
            }, this);
        }
        
        //Now merge all graphs this node appeares in                                
        var containingGraphInds = [];
        for (var i = 0; i<this.graphs.length; i++) {
            if (this.graphs[i].findNodeById(node.id)) {
                containingGraphInds.push(i);
            }
        }   
        //The graphs are already merged through their nodes, just remove all but one
        //iterate backwards for removal, not incuding the first, so we keep the first containing graph
        for (var i = containingGraphInds.length-1; i > 0; i--) {
            var removalIndex = containingGraphInds[i];
            this.graphs.splice(removalIndex, 1);
        }
    }
}