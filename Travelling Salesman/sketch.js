var cities = [];
var totalCities = 6;


var recordDistance;
var bestEver;

function setup() {
    createCanvas(400, 300);
    for (var i = 0; i < totalCities; i++) {
        cities[i] = createVector(random(width), random(height));
    }

    recordDistance = calcDistance(cities);
}

function draw() {
    background(0);
    fill(255);

    //draw cities
    for (var i = 0; i < totalCities; i++) {
        ellipse(cities[i].x, cities[i].y, 8, 8);
    }


    //draw path between cities
    beginShape();
    stroke(255);
    noFill();
    strokeWeight(1);
    for (var i = 0; i < totalCities; i++) {
        vertex(cities[i].x, cities[i].y);
    }
    endShape();

    var i = floor(random(totalCities));
    var j = floor(random(totalCities));

    //shuffle the array
    swap(cities, i, j);

    // brute force
    var distance = calcDistance(cities);
    if (distance < recordDistance) {
        recordDistance = distance;
        bestEver = cities.slice();
        console.log(recordDistance);
    }

    //draw the best path yet
    beginShape();
    stroke(255,0,255);
    noFill();
    strokeWeight(4);
    for (var i = 0; i < totalCities; i++) {
        vertex(bestEver[i].x, bestEver[i].y);
    }
    endShape();
}


// change elements at index i and with each other
function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

// calculates road length
function calcDistance(points) {
    var sum = 0;
    for (var i = 0; i < points.length - 1; i++) {
        sum += dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    }
    return sum;
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
We will use it for going through all possible paths in travelling
 */