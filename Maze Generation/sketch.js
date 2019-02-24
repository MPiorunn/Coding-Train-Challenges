var cols;
var rows;
var size = 80;
var cells = [];

function setup() {
    createCanvas(800, 800);
    cols = floor(width / size);
    rows = floor(height / size);
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            cells.push(new Cell(i, j));
        }
    }
}

function draw() {
    background(51);
    for (var i = 0; i < cells.length; i++) {
        cells[i].show();
    }
}