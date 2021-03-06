// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object
var maxFitness = 0;

class Population {
    constructor(p, m, num) {

        this.population = []; // Array to hold the current population
        // this.matingPool = []; // ArrayList which we will use for our "mating pool"
        this.generations = 0; // Number of generations
        this.finished = false; // Are we finished evolving?
        this.target = p; // Target phrase
        this.mutationRate = m; // Mutation rate
        this.perfectScore = 1;

        this.best = "";


        for (let i = 0; i < num; i++) {
            this.population[i] = new DNA(this.target.length);
        }

        this.calcFitness();
    }

    // Fill our fitness array with a value for every member of the population
    calcFitness() {
        for (let i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(target);
        }
    }

    // Generate a mating pool
    naturalSelection() {
        // Clear the ArrayList
        // we remove a mating pool
        // this.matingPool = [];

        // we move this to generate function
        // let maxFitness = 0;
        // for (let i = 0; i < this.population.length; i++) {
        //     if (this.population[i].fitness > maxFitness) {
        //         maxFitness = this.population[i].fitness;
        //     }
        // }

        // Based on fitness, each member will get added to the mating pool a certain number of times
        // a higher fitness = more entries to mating pool = more likely to be picked as a parent
        // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
        // for (let i = 0; i < this.population.length; i++) {
        //     let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
        //     let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
        //     for (let j = 0; j < n; j++) { // and pick two random numbers
        //         this.matingPool.push(this.population[i]);
        //     }
        // }
    }

    // Create a new generation
    generate() {
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > maxFitness) {
                maxFitness = this.population[i].fitness;
            }
        }

        var newPopulation = [];

        // Refill the population with children from the mating pool
        for (let i = 0; i < this.population.length; i++) {
            // let a = floor(random(this.matingPool.length));
            // let b = floor(random(this.matingPool.length));
            let partnerA = this.acceptReject();
            let partnerB = this.acceptReject();
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newPopulation[i] = child;
        }
        this.population = newPopulation;
        this.generations++;
    }


    getBest() {
        return this.best;
    }

    // Compute the current "most fit" member of the population
    evaluate() {
        let worldrecord = 0.0;
        let index = 0;
        for (let i = 0; i < this.population.length; i++) {
            if (this.population[i].fitness > worldrecord) {
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }

        this.best = this.population[index].getPhrase();
        if (worldrecord >= this.perfectScore) {
            this.finished = true;
        }
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    // Compute average fitness for the population
    getAverageFitness() {
        let total = 0;
        for (let i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }
        return total / (this.population.length);
    }

    allPhrases() {
        let everything = "";

        let displayLimit = min(this.population.length, 50);


        for (let i = 0; i < displayLimit; i++) {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }

    acceptReject() {
        var beSafe = 0;
        while (true) {
            const index = floor(random(0, this.population.length));
            var partner = this.population[index];
            var r = random(0, maxFitness);
            if (r < partner.fitness) {
                return partner;
            }
            beSafe++;
            if (beSafe > 10000) {
                return null;
            }
        }
    }
}

