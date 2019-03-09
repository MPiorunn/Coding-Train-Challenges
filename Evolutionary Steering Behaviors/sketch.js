var vehicles = [];
var food = [];
var poison = [];
var foods = 50;
var poisons = 10;
var vehiclesAmount = 10;
var debug;

function setup() {
    // Add canvas and grab checkbox
    createCanvas(800, 600);
    debug = createCheckbox();

    for (var i = 0; i < vehiclesAmount; i++) {
        addVehicle(random(width), random(height));
    }
    for (var i = 0; i < foods; i++) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
    for (var i = 0; i < poisons; i++) {
        var x = random(width);
        var y = random(height);
        poison.push(createVector(x, y));
    }
}

function addVehicle(a, b) {
    vehicles.push(new Vehicle(a, b));
}


function mouseDragged() {
    addVehicle(mouseX, mouseY)
}

function draw() {
    background(51);

    drawFood();
    drawPoison();
    drawVehicles();
}

function drawFood() {
    addFood();
    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        noStroke();
        ellipse(food[i].x, food[i].y, 4, 4);
    }
}

function addFood() {
    if (random(1) < 0.1) {
        food.push(createVector(random(width), random(height)));
    }
}

function drawPoison() {
    addPoison();
    for (var i = 0; i < poison.length; i++) {
        fill(255, 0, 0);
        noStroke();
        ellipse(poison[i].x, poison[i].y, 4, 4);
    }
}

function addPoison() {
    if (random(1) < 0.01) {
        poison.push(createVector(random(width), random(height)));
    }
}


function drawVehicles() {
    for (var i = vehicles.length - 1; i > 0; i--) {
        vehicles[i].boundaries();
        vehicles[i].behaviors(food, poison);
        // vehicle.seek(food);
        vehicles[i].update();
        vehicles[i].display();

        var newVehicle = vehicles[i].clone();
        if (newVehicle !== null) {
            vehicles.push(newVehicle);
        }

        if (vehicles[i].dead()) {
            // if vehicle dies, we create a food in this place
            food.push(createVector(vehicles[i].position.x, vehicles[i].position.y));
            vehicles.splice(i, 1);
        }


    }
}


/*
we have a 2D world with dots (food - green , poison - red)
there will be agents(particles,vehicles)
they move through the space and they nned food as the energy
vehicle will have some physics : position , vel, acc, health
if it eats  food , Hp goes up, otherwise goes down(poison)
how they move through space? we evolve the properties how they move
they have to gather fod quickly and avoid poison
Reinforcement learning - reward based learning, you learn to do the stuff that rewards you the most.
We do not use this, we goo for evaluational learning.
We need a function for steering. Seek algorithm:
We are a 'something' that is moving in a particular dimension and we need to go to the target.
 */