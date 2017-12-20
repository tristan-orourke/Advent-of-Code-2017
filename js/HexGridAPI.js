var HexGridAPI = {};

//see https://www.redblobgames.com/grids/hexagons/#distances for Axial vs Cube coordinates

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}

//Returns a direction in axial coordinates 
HexGridAPI.directionStringToPoint = function (direction) {
    var dir;
    switch (direction) {
        case ('n'):
            dir = new Point(0, 1);
            break;
        case ('ne'):
            dir = new Point(1, 0);
            break;
        case ('se'):
            dir = new Point(1, -1);
            break;
        case ('s'):
            dir = new Point(0, -1);
            break;
        case ('sw'):
            dir = new Point(-1, 0);
            break;
        case ('nw'):
            dir = new Point(-1, 1);
            break;
        default:
            dir = new Point(0, 0);
            break;
    }
    return dir;
};

function convertAxialToCubeCoordinates(point) {
    return [point.x, point.y, 0-point.x-point.y];
}


//Takes two points representing points in Axial coordinates
HexGridAPI.distanceBetweenHexPoints = function(point1, point2) {
    var a = convertAxialToCubeCoordinates(point1);
    var b = convertAxialToCubeCoordinates(point2);
    return Math.max(Math.abs(a[0]-b[0]), Math.abs(a[1]-b[1]), Math.abs(a[2]-b[2]));
};

HexGridAPI.shortestReturnDistance = function (path) {
    var steps = path.split(',');
    var pos = new Point(0, 0);
    for (var i = 0; i < steps.length; i++) {
        pos = pos.add(HexGridAPI.directionStringToPoint(steps[i]));
    }
    return HexGridAPI.distanceBetweenHexPoints(pos, new Point(0,0));
};

HexGridAPI.maxDistanceInPath = function (path) {
    var steps = path.split(',');
    var pos = new Point(0, 0);
    var origin = new Point(0,0);
    var maxDistance = 0;
    for (var i = 0; i < steps.length; i++) {
        pos = pos.add(HexGridAPI.directionStringToPoint(steps[i]));
        var distance = HexGridAPI.distanceBetweenHexPoints(pos, origin);
        maxDistance = Math.max(maxDistance, distance);
    }
    return maxDistance;
};

//TESTING
function assert(expected, actual) {
    if (expected != actual) {
        var message = 'Expected ' + expected + ', recieved ' + actual;
        throw new Error(message);
    } else {
        //console.log('pass');
    }
}

assert(3,HexGridAPI.shortestReturnDistance('ne,ne,ne'));
assert(0,HexGridAPI.shortestReturnDistance('ne,ne,sw,sw'));
assert(2,HexGridAPI.shortestReturnDistance('ne,ne,s,s'));
assert(3,HexGridAPI.shortestReturnDistance('se,sw,se,sw,sw'));

assert()