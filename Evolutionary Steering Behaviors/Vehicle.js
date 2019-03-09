// Create a new vehicle
function Vehicle(x, y) {

    // All the physics stuff
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 4;
    this.maxspeed = 8;
    this.maxforce = 0.5;
    this.dna = [];
    //food weight
    this.dna[0] = random(-2, 2);
    //poison weight
    this.dna[1] = random(-2, 2);
    //food perception
    this.dna[2] = random(0, 100);
    //poison perception
    this.dna[3] = random(0, 100);

    this.health = 1;

    this.behaviors = function (good, bad) {
        var steerGood = this.eat(good, 0.1, this.dna[2]);
        var steerBad = this.eat(bad, -0.5, this.dna[3]);

        steerGood.mult(this.dna[0]);
        steerBad.mult(this.dna[1]);

        this.applyForce(steerGood);
        this.applyForce(steerBad);
    };

    this.eat = function (list, nutrition, perception) {
        var record = Infinity;
        var closestIndex = null;
        for (var i = 0; i < list.length; i++) {
            var d = this.position.dist(list[i]);
            if (d < record && d < perception) {
                record = d;
                closestIndex = i;
            }
        }

        if (record < 5) {
            list.splice(closestIndex, 1);
            console.log("ENEN")
            console.log(nutrition)
            console.log(this.health)
            this.health += nutrition;
            console.log(this.health)
            console.log("ENEN")
        } else if (closestIndex > 0) {
            return this.seek(list[closestIndex]);
        }

        return createVector(0, 0);
    };

    this.dead = function () {
        dd = this.health < 0;
        if (dd) {
            console.log("Dying :(");
            console.log(this.health);
            return true;
        }
        return false;
    };


// Method to update location
    this.update = function () {
        this.health += -0.001;
        // Update velocity
        this.velocity.add(this.acceleration);
        // Limit speed
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        // Reset acceleration to 0 each cycle
        this.acceleration.mult(0);
    };

// Add force to acceleration
    this.applyForce = function (force) {
        this.acceleration.add(force);
    };

// A method that calculates a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
    this.seek = function (target) {

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


    this.display = function () {
        // Draw a triangle rotated in the direction of velocity
        var angle = this.velocity.heading() + 3.14 / 2;
        push();
        translate(this.position.x, this.position.y);
        rotate(angle);
        noFill();
        stroke(0, 255, 0);
        strokeWeight(3);
        ellipse(0, 0, this.dna[2] * 2);
        line(0, 0, 0, -this.dna[0] * 25);
        stroke(255, 0, 0);
        strokeWeight(2);
        line(0, 0, 0, -this.dna[1] * 25);
        ellipse(0, 0, this.dna[3] * 2);

        // Draw the vehicle itself

        var green = color(0, 255, 0);
        var red = color(255, 0, 0);
        var col = lerpColor(red, green, this.health);
        fill(col);
        stroke(col);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape();
        pop();
    };

    this.boundaries = function () {
        var d = -25;

        var desired = null;

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }


        if (this.position.y < d) {
            desired = createVector(this.velocity.y, this.maxspeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.y, -this.maxspeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }
}