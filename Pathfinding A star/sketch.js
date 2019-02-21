var cols = 25;
var rows = 25;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
// values to make a drawings cleaner
var w, h;

var path = [];

function Spot(i, j) {
    //coordinates
    this.x = i;
    this.y = j;
    //values from equation
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.previous = undefined;

    this.show = function (color) {
        fill(color);
        noStroke();
        rect(this.x * w, this.y * h, w - 1, h - 1);
    };

    this.addNeighbors = function (grid) {
        var x = this.x;
        var y = this.y;
        /* pushing all 4 neighbors
                    n
                  n s n
                    n
        */
        if (x < cols - 1)
            this.neighbors.push(grid[x + 1][y]);
        if (x > 0)
            this.neighbors.push(grid[x - 1][y]);
        if (y < rows - 1)
            this.neighbors.push(grid[x][y + 1]);
        if (y > 0)
            this.neighbors.push(grid[x][y - 1]);
    }

}

function removeFromArray(arr, item) {
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === item) {
            arr.splice(i, 1) //remove one element from array
        }
    }
}

function heuristic(a, b) {
    // euclidean distance
    // var d = dist(a.x, a.y, b.x, b.y);
    // manhattan value
    return abs(a.x - b.x) + abs(a.y - b.y);
}

function setup() {
    createCanvas(400, 400);
    console.log('A*');
    w = width / cols;
    h = height / rows;
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows)
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Spot(i, j);
        }
    }

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid)
        }
    }


    // setting start and end points
    start = grid[0][0];
    end = grid[cols - 1][3];

    openSet.push(start);

    console.log(grid);
}

// use it as a while loop
function draw() {
    if (openSet.length > 0) {
        //algorithm A*
        var win = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[win]) win = i;
        }
        var current = openSet[win];
        if (current == end) {
            // Find the path
            console.log("DONE!");
        }

        // openSet.remove(current); this funtion does not exist
        removeFromArray(openSet, current);
        closedSet.push(current);
        // for all neighbors of the current
        var neighbors = current.neighbors
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i];

            if (!closedSet.includes(neighbor)) {
                // we evaluate each  neighbor

                var tmpG = current.g + 1;
                if (openSet.includes(neighbor)) {
                    if (tmpG < neighbor.g) {
                        neighbor.g = tmpG;
                    }
                } else {
                    neighbor.g = tmpG;
                    openSet.push(neighbor);
                }

                // calculate h
                neighbor.h = this.heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;
                //to restore the path after algorithm finishes
                neighbor.previous = current;
            }
        }
    } else {
        // no solution
    }
    background(0);

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < cols; j++) {
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
    while (tmp.previous) {
        path.push(tmp.previous);
        tmp = tmp.previous;
    }

    for (var i = 0; i < path.length; i++) {
        path[i].show(color(0, 0, 255))
    }

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