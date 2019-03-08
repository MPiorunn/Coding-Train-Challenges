var vehicle;

function setup() {
    // Add canvas and grab checkbox
    var canvas = createCanvas(800, 600);
    vehicle = new Vehicle(540, 230);
}


function draw() {
    background(51);


    var target = createVector(mouseX, mouseY);

    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(target.x, target.y, 48, 48)

    vehicle.seek(target);
    vehicle.update();
    vehicle.display()

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