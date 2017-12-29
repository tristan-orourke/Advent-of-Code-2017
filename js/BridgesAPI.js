//Requires TreeNode.js

var BridgesAPI = {};

function expandBridges(bridgeNode, components) {
    var matchingComponents = components.filter(item => item.startsWith(bridgeNode.data.out + '/') || item.endsWith('/' + bridgeNode.data.out));
    for (i in matchingComponents) {
        var comp = matchingComponents[i];
        if (bridgeNode.id == '')
            var id = comp;
        else 
            var id = bridgeNode.id + '--' + comp;
        var data = {};
        data.in = parseInt(comp.split('/')[0]);
        data.out = parseInt(comp.split('/')[1]);
        if (bridgeNode.data.out != data.in) {
            //component is reversed, switch in and out
            var temp = data.in;
            data.in = data.out;
            data.out = temp;
        }
        var node = new Node(id, data);
        bridgeNode.addChild(node);
        var componentsCopy = components.slice();
        //remove the current component from copy
        componentsCopy.splice(componentsCopy.indexOf(comp), 1); 
        //recurse to expand tree
        expandBridges(node, componentsCopy);
    }
}

BridgesAPI.buildBridgeTree = function(components){
    /*
    var componentNodes = components.map((item, index)=> {
        var data = {};
        data.in = parseInt(item.split('/')[0]);
        data.out = parseInt(item.split('/')[1]);
        var node = new Node(index, data);
        return node;
    });
    */
    var root = new Node('', {in:0, out:0})
    expandBridges(root, components);
    return new Tree(root);
};

function calculateBridgeNodeStrength(bridgeNode) {
    var components = bridgeNode.id.split('--');
    return components.reduce((total, item) => {
        var compStrength = parseInt(item.split('/')[0]) + parseInt(item.split('/')[1]);
        return total + compStrength;
    }, 0);
    return components;
}

function calculateMaxStrengthOfLongestBridge(bridgeNode, parentDepth) {
    var strength = bridgeNode.data.in + bridgeNode.data.out; 
    var depth = parentDepth+1;
    if (bridgeNode.children.length == 0) {
        return {depth:depth, strength:strength};
    } else {
        var childBridges = bridgeNode.children.map(item=>calculateMaxStrengthOfLongestBridge(item, depth));
        var maxLength = childBridges.reduce((total, item) => Math.max(total, item.depth), 0);
        var maxLengthChildren = childBridges.filter(item=>item.depth == maxLength);
        var maxChildStrength = maxLengthChildren.reduce((total, item) => Math.max(total, item.strength), 0);
        return {depth:maxLength, strength:strength + maxChildStrength};
    }
}

BridgesAPI.strengthOfStrongestBridge = function(componentsStr) {
    var components = componentsStr.split('\n');
    var bridgeTree = BridgesAPI.buildBridgeTree(components);
    return calculateMaxBridgeStrength(bridgeTree.root);
    //var leaves = bridgeTree.findAllNodes(node=>node.children.length == 0);
    //var leafStrengths = leaves.map(item=>calculateBridgeNodeStrength(item));
    //return Math.max(...leafStrengths);
};

BridgesAPI.strengthOfLongestBridge = function(componentsStr) {
    var components = componentsStr.split('\n');
    var bridgeTree = BridgesAPI.buildBridgeTree(components);
    return calculateMaxStrengthOfLongestBridge(bridgeTree.root, 0).strength;
}