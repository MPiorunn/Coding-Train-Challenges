var mouseSize = 50;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(255);
    drawDots();
}


function drawDots() {

    for (var i = 0; i < width; i += 30) {
        for (var j = 0; j < height; j += 30) {
            var number = dist(mouseX, mouseY, i, j);
            // colorPlay(number, i, j)
            sizePlay(number, i, j);
        }
    }
}

function sizePlay(number, i, j) {
    fill(0);
    noStroke();
    // if (number > mouseSize && number < mouseSize * 4) {
    var size = (i + j) / number;
    if (size > 50) {
        size = 50;
    }
    ellipse(i, j, size, size);
    // } else if (number > mouseSize * 4 && number < mouseSize * 6) {
    //     ellipse(i, j, 12, 12);
    // } else if (number > mouseSize * 6 && number < mouseSize * 8) {
    //     ellipse(i, j, 14, 14);
    // } else if (number > mouseSize * 8 && number < mouseSize * 10) {
    //     ellipse(i, j, 16, 16);
    // } else if (number > mouseSize) {
    //     ellipse(i, j, 20, 20);
    // }
}

function colorPlay(number, i, j) {
    if (number > mouseSize && number < mouseSize * 4) {
        fill(0, 0, 255);
        noStroke();
        ellipse(i, j, 10, 10);
    } else if (number > mouseSize * 4 && number < mouseSize * 6) {
        fill(0, 255, 0);
        noStroke();
        ellipse(i, j, 10, 10);
    } else if (number > mouseSize * 6 && number < mouseSize * 8) {
        fill(255, 255, 0);
        noStroke();
        ellipse(i, j, 10, 10);
    } else if (number > mouseSize * 8 && number < mouseSize * 10) {
        fill(0, 255, 255);
        noStroke();
        ellipse(i, j, 10, 10);
    } else if (number > mouseSize) {
        fill(123, 123, 123);
        noStroke();
        ellipse(i, j, 10, 10);
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