//Requires Graphs.js

var PipeGraphsAPI = {};

const UNDIRECTED_EDGE = '<->';
const UNDIRECTED_PIPE_PATTERN = /(\w+) <-> ((\w+)?(, \w+)*)/

function parseNodeDefinition(defintion, graphBuilder) {
    if (match = UNDIRECTED_PIPE_PATTERN.exec(defintion)) {
        var node = new GraphNode(match[1], null);
        var edges = match[2].split(', ');
        graphBuilder.addNode(node, edges, []);
    }
}

const graphBuildersCache = {};

PipeGraphsAPI.countNodesInGraphWithNode0 = function(nodeDefinitions) {
    var graphBuilder;
    //Check if this set of nodes was solved recenetly, and still is in the cache;
    if (graphBuildersCache[nodeDefinitions]) {
        graphBuilder = graphBuildersCache[nodeDefinitions];
    } else {
        var nodeDefs = nodeDefinitions.split('\n');
        graphBuilder = new GraphBuilder();
        nodeDefs.forEach((def) => parseNodeDefinition(def, graphBuilder));
        
        graphBuildersCache[nodeDefinitions] = graphBuilder;
    }   
    for (var i=0; i<graphBuilder.graphs.length; i++) {
        if (graphBuilder.graphs[i].findNodeById('0')) {
            return graphBuilder.graphs[i].getNodesAsArray().length;
        }
    }
    return 0;
};

PipeGraphsAPI.countNumberOfGraphs = function(nodeDefinitions) {
    var graphBuilder;
    //Check if this set of nodes was solved recenetly, and still is in the cache;
    if (graphBuildersCache[nodeDefinitions]) {
        graphBuilder = graphBuildersCache[nodeDefinitions];
    } else {
        var nodeDefs = nodeDefinitions.split('\n');
        graphBuilder = new GraphBuilder();
        nodeDefs.forEach((def) => parseNodeDefinition(def, graphBuilder));
        
        graphBuildersCache[nodeDefinitions] = graphBuilder;
    }   
    return graphBuilder.graphs.length;
};