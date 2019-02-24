var cols;
var rows;
var size = 40;
var cells = [];

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;
// currently visited cell
var current;
var stack = [];

function setup() {
    createCanvas(800, 800);
    cols = floor(width / size);
    rows = floor(height / size);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            cells.push(new Cell(i, j));
        }
    }
    // frameRate(5);
    current = cells[0];
}

function draw() {
    background(51);
    for (let i = 0; i < cells.length; i++) {
        cells[i].show();
    }

    current.visited = true;
    current.highlight();
    // STEP 1.1 - pick a random neighbor
    var next = current.checkNeighbors();
    if (next) {
        next.visited = true;
        // STEP 1.2 - push current to stack
        stack.push(current);
        // STEP 1.3 - remove the wall between current and neighbor
        removeWalls(current, next);
        // STEP 1.4
        current = next;
    }
    // STEP 2
    else if (stack.length > 0) {
        //STEP 2.1 pop from stack
        //STEP 2.2 set it as current
        current = stack.pop();
    }
}


//removing walls between Cells a,b
function removeWalls(a, b) {
    var x = a.x - b.x;

    // a is right to b
    if (x === 1) {
        a.walls[LEFT] = false;
        b.walls[RIGHT] = false;
    }
    // a is left to b
    else if (x === -1) {
        a.walls[RIGHT] = false;
        b.walls[LEFT] = false;
    }

    var y = a.y - b.y;
    // a is below b
    if (y === 1) {
        a.walls[TOP] = false;
        b.walls[BOTTOM] = false;
    }
    // a is above b
    else if (y === -1) {
        a.walls[BOTTOM] = false;
        b.walls[TOP] = false;

    }

}