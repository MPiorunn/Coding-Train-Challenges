let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
    bestPhrase = createP("Best phrase:");
    //bestPhrase.position(10,10);
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(600, 10);
    allPhrases.class("all");

    stats = createP("Stats");
    //stats.position(10,200);
    stats.class("stats");

    //createCanvas(640, 360);
    target = "To be or not to be.";
    popmax = 200;
    mutationRate = 0.01;

    // Create a population with a target phrase, mutation rate, and population max
    population = new Population(target, mutationRate, popmax);
}

function draw() {
    // Generate mating pool
    // population.naturalSelection();
    //Create next generation
    population.generate();
    // Calculate fitness
    population.calcFitness();

    population.evaluate();

    // If we found the target phrase, stop
    if (population.isFinished()) {
        //println(millis()/1000.0);
        noLoop();
    }

    displayInfo();
}

function displayInfo() {
    // Display current status of population
    let answer = population.getBest();

    bestPhrase.html("Best phrase:<br>" + answer);

    let statstext = "total generations:     " + population.getGenerations() + "<br>";
    statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
    statstext += "total population:      " + popmax + "<br>";
    statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

    stats.html(statstext);

    allPhrases.html("All phrases:<br>" + population.allPhrases())
}

/*
Generic algorithms :
The result is evolving over the time based on some rule etc. "the strongest survives"
Darwinian Natural Selection Principles :
- Heredity - there must be a process in place by which children receive the properties of their parents
- Variation - there must be a variety of traits present in the population or a means with which to introduce variation
- Selection - there must be a mechanism by which some members of the population have the opportunity to be parents
and pass down their genetic information and some do not.

Guess(evolve) "unicorn" - genetic algorithm
1.  Create a population of N elements with random genetic material:
- unijorm
- pancake
- aaaaaah
- popcorn
2.
a) Calculate fitness of every element in population
Fitness - determines if the element will pass into the next generation
In this example it will be : number of characters that matches the "unicorn" phrase
UNIjORm - 5  / 50%
panCake - 1  / 10%
aaaaaah - 0  / 0%
popCORN - 4  / 40%

b) Reproduction(selection)
N-times:
    b.1 Pick 2 "parents"
        Parents are picked by
        - percentages above (nice idea) - the higher the "fitness" , the bigger probability that the element will be a parent
        - best two ( not a greatest idea) :/
    b.2 Make a new element
        - CROSSOVER
            take half of the genetic information from both of the words
            Uni|jorn && pop|corn
               \           /
                  unicorn
            Bam, it worked :D
            It won't happen often though

            We can also pick letters at random etc. midpoint seems good though

        - MUTATION - doing something random with characters to 'mutate' elements
         For example going +1 in ASCII : 'a' -> 'b'
         Mutation has its percentage rate ex. 1% that we will mutate a character
         This keeps variation in this system, no mutation, system will not evolve and can not work sometimes
         If the mutation rate is higher , this will be more like a brute force :D

        Having a lot of populations not always will give the result in the fastest way
        The larger the population, the more computations we have to perform and it can happen that we will find the solution
        faster with smaller population, which will take less time to compute


More notes than coding.
1. Fitness function - base to the evolution
    ex. the closer you get to the target, the better is the fitness

    Checking 'unicorn' each time is ok, or ' to be or not to be',
     but what if we need 200000chars?
     Our fitness function sucks. :D
     We are looking for a 200000 chars and we picked two elements
     1 . has 39333 chars ok
     2 . has 39334 chars ok
     The 2nd one is better, so we want it to be more likely to be picked in evolution process.
     But 39333/200000 is not that much different from 39334/200000 :(
     How can we made this element to be more likely picked?

     We can make the fitness function exponential instead of linear for example.
2. How do you encode your DNA?
    genotype vs phenotype

    genotype - data itself or encoded
    phenotype - expression (visualisation)
 */