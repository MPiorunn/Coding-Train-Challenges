// Create a new vehicle
function Vehicle(x, y) {

    // All the physics stuff
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxspeed = 2;
    this.maxforce = 0.5;
    this.dna = [];
    this.dna[0] = random(-5, 5);
    this.dna[1] = random(-5, 5);

    this.health = 1;

    this.behaviors = function (good, bad) {
        var steerGood = this.eat(good, 0.1);
        var steerBad = this.eat(bad, -0.5);

        steerGood.mult(this.dna[0]);
        steerBad.mult(this.dna[1]);

        this.applyForce(steerGood);
        this.applyForce(steerBad);
    };

    this.eat = function (list, nutrition) {
        var record = Infinity;
        var closestIndex = null;
        for (var i = 0; i < list.length; i++) {
            var d = this.position.dist(list[i]);
            if (d < record) {
                record = d;
                closestIndex = i;
            }
        }

        if (record < 5) {
            list.splice(closestIndex, 1);
            console.log(this.health + " : " + nutrition );
            this.health += nutrition;
            console.log(this.health);
        } else if (closestIndex > 0) {
            return this.seek(list[closestIndex]);
        }

        return createVector(0, 0);
    };

    this.dead = function () {
        return this.health < 0
    }


}

// Method to update location
Vehicle.prototype.update = function () {
    this.health -= -0.01;
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
};

// Add force to acceleration
Vehicle.prototype.applyForce = function (force) {
    this.acceleration.add(force);
};

// A method that calculates a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Vehicle.prototype.seek = function (target) {

    // A vector pointing from the location to the target
    var desired = p5.Vector.sub(target, this.position);

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    var steer = p5.Vector.sub(desired, this.velocity);

    steer.limit(this.maxforce);
    this.applyForce(steer);
    return steer;
};


Vehicle.prototype.display = function () {
    // Draw a triangle rotated in the direction of velocity
    var angle = this.velocity.heading() + 3.14 / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    stroke(0, 255, 0);
    line(0, 0, 0, -this.dna[0] * 20);
    stroke(255, 0, 0);
    line(0, 0, 0, -this.dna[1] * 20);
    // Draw the vehicle itself

    var green = color(0, 255, 0);
    var red = color(255, 0, 0);
    var col = lerpColor(green, red, this.health);
    fill(col);
    stroke(col);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();


    pop();
};
