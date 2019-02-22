var cols = 50;
var rows = 50;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
// values to make a drawings cleaner
var w, h;

var path = [];


function removeFromArray(arr, item) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === item) {
            arr.splice(i, 1) //remove one element from array
        }
    }
}

function heuristic(a, b) {
    // euclidean distance
    var d = dist(a.x, a.y, b.x, b.y);

    // manhattan value
    // var d =  abs(a.x - b.x) + abs(a.y - b.y);
    return d;
}

function setup() {
    createCanvas(400, 400);
    console.log('A*');
    w = width / cols;
    h = height / rows;
    for (var i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid)
        }
    }


    // setting start and end points
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    openSet.push(start);

}

// use it as a while loop
function draw() {
    //algorithm A*
    if (openSet.length > 0) {
        var win = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[win].f) {
                win = i;
            }
        }
        var current = openSet[win];
        if (current == end) {
            // Found the path
            noLoop();
            console.log("DONE!");
        }

        // openSet.remove(current); this funtion does not exist
        removeFromArray(openSet, current);
        closedSet.push(current);
        // for all neighbors of the current
        var neighbors = current.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!closedSet.includes(neighbor) && !neighbor.wall) {
                // we evaluate each  neighbor

                var tmpG = current.g + heuristic(neighbor, current);
                var newPath = false;
                if (openSet.includes(neighbor)) {
                    if (tmpG < neighbor.g) {
                        neighbor.g = tmpG;
                        newPath = true;
                    }
                } else {
                    neighbor.g = tmpG;
                    newPath = true;
                    openSet.push(neighbor);
                }
                if (newPath) {
                    // calculate h
                    neighbor.h = this.heuristic(neighbor, end);
                    neighbor.f = neighbor.g + neighbor.h;
                    //to restore the path after algorithm finishes
                    neighbor.previous = current;
                }
            }
        }
    } else {
        // no solution
        console.log("no solution");
        noLoop();
        return;
    }
    background(255);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255))
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        closedSet[i].show(color(255, 0, 0))
    }

    for (var i = 0; i < openSet.length; i++) {
        openSet[i].show(color(0, 255, 0))
    }

    path = [];
    var tmp = current;
    path.push(tmp);
    while (tmp.previous) {
        path.push(tmp.previous);
        tmp = tmp.previous;
    }

    noFill();
    stroke(255,0,200);
    strokeWeight(w / 2);
    beginShape();
    for (var i = 0; i < path.length; i++) {
        vertex(path[i].x * w + w / 2, path[i].y * h + h / 2);
    }
    endShape();
}


/*
Notes a* is an algorithm used to find an optimal route in a space of points.
Example : Find a quickest route between two cities through other cities.
Dijkstra algorithm - brute force, works but it's super inefficient.
A* uses heuristics - guesses which way is pooooosibly the best. We skip a lot of wrong guesses
f(n) = g(n) + h(n)
f-  cost function  for each node
g - actual cost(distance/time) from two nodes
h - heuristics
Works by reducing distance from current node to the end point
For each node we check how long it took us to get here, and how long will it take to get to each of neighbor nodes

we imagine a grid with cities, where each city is like a cartesian point (x,y)
______________________________
|o o o o o o o o o
|o o o o o o o o o ...
|                .
|                .
|                .
|

open set , closed set
closed set = stores a list of all nodes that were visited
open set - nodes that still need to be evaluated

algorithm is finished when open set is empty or the route was found

current should be the node in the open set with the lowest f(n)
 */