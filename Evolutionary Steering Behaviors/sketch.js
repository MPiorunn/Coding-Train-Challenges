var vehicles = [];
var food = [];
var poison = [];
var foods = 50;
var poisons = 10;
var vehiclesAmount = 10;

function setup() {
    // Add canvas and grab checkbox
    createCanvas(800, 600);
    for (var i = 0; i < vehiclesAmount; i++) {
        var a = random(width);
        var b = random(height);
        vehicles[i] = new Vehicle(a, b);
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


function draw() {
    background(51);


    if (random(1) < 0.05) {
        var x = random(width);
        var y = random(height);
        food.push(createVector(x, y));
    }
    // var target = createVector(mouseX, mouseY);
    //
    // fill(127);
    // stroke(200);
    // strokeWeight(2);
    // ellipse(target.x, target.y, 48, 48);
    drawFood();
    drawPoison();

    for (var i = vehicles.length - 1; i > 0; i--) {
        vehicles[i].behaviors(food, poison);
        // vehicle.seek(food);
        vehicles[i].update();
        vehicles[i].display();
        if (vehicles[i].dead()) {
            vehicles.splice(i, 1);
        }
    }

}

function drawFood() {
    for (var i = 0; i < food.length; i++) {
        fill(0, 255, 0);
        noStroke();
        ellipse(food[i].x, food[i].y, 8, 8);
    }
}

function drawPoison() {
    for (var i = 0; i < poison.length; i++) {
        fill(255, 0, 0);
        noStroke();
        ellipse(poison[i].x, poison[i].y, 8, 8);
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