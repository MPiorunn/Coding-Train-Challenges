// Create a new vehicle
function Vehicle(x, y) {

    // All the physics stuff
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxspeed = 8;
    this.maxforce = 0.2;

}


// Method to update location
Vehicle.prototype.update = function () {
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

    // Not limiting here
    steer.limit(this.maxforce);
    this.applyForce(steer);
    return steer;
};


Vehicle.prototype.display = function () {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + 3.14 / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    // Draw the vehicle itself
    fill(127);
    stroke(200);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape();
    pop();
};
