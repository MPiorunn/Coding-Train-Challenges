var cities = [];
var totalCities = 6;

var orders = [];
var recordDistance;
var bestEver = [];

function setup() {
    createCanvas(400, 600);
    for (var i = 0; i < totalCities; i++) {
        cities[i] = createVector(random(width), random(height / 2));
        orders[i] = i;
    }

    recordDistance = calcDistance(cities, orders);
}

function draw() {
    background(0);
    fill(255);
    // frameRate(1);
    //draw cities
    for (var i = 0; i < totalCities; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8);
    }


    //
    // var i = floor(random(totalCities));
    // var j = floor(random(totalCities));


    //shuffle the array
    // swap(cities, i, j);

    // brute force
    var distance = calcDistance(cities, orders);
    if (distance < recordDistance) {
        recordDistance = distance;
        bestEver = orders.slice();
    }

    textSize(64);
    var s = '';
    for (var j = 0; j < orders.length; j++) {
        s += orders[j]
    }

    fill(255);
    text(s, 20, height - 50);
    //draw the best path yet
    beginShape();
    stroke(255, 0, 255);
    noFill();
    strokeWeight(4);
    for (var i = 0; i < bestEver.length; i++) {
        var n = bestEver[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();

    translate(0, height / 2);
    //draw path between cities
    beginShape();
    stroke(255);
    noFill();
    strokeWeight(1);
    for (var i = 0; i < orders.length; i++) {
        var n = orders[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();


    nextOrder();
}


// change elements at index i and with each other
function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

// calculates road length
function calcDistance(points, order) {
    var sum = 0;
    for (var i = 0; i < order.length - 1; i++) {
        var cityA = points[order[i]];
        var cityB = points[order[i + 1]];
        sum += dist(cityA.x, cityA.y, cityB.x, cityB.y)
    }
    return sum;
}

function nextOrder() {
    var largestI = -1;
    //1
    for (var i = 0; i < orders.length - 1; i++) {
        if (orders[i] < orders[i + 1]) {
            largestI = i;
        }
    }

    if (largestI == -1) {
        noLoop();
        console.log("FINISHED")
    }
    //2
    var largestJ = -1;
    for (var j = 0; j < orders.length; j++) {
        if (orders[j] > orders[largestI]) {
            largestJ = j;
        }
    }
    //3
    swap(orders, largestI, largestJ);
    //4 reverse from largestI + 1 to the end of the array
    // take the end of the array
    var endArray = orders.splice(largestI + 1);
    // reverse its elements
    endArray.reverse();
    // add them back
    orders = orders.concat(endArray);
}

/*
* Travelling salesman :
* 2d space, cities on the map
* sales person wants to visit every city
* he wants to do it in the fastest way
* usually we brute force it :D
* having N cities , we have N! possibilities
* for only 6 cities we have 720 possibilities*/

/*
Lexicographic order - N!
abc - acb - bac - bca - cab - cba
We will use it for going through all possible paths in travelling salesman
 */