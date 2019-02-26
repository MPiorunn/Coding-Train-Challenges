function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;
    this.walls = [true, true, true, true];

    this.show = function () {
        var x = this.x * size;
        var y = this.y * size;
        stroke(255);

        //walls     [top,right,bottom,left]
        //top
        if (this.walls[TOP])
            line(x, y, x + size, y);

        //right
        if (this.walls[RIGHT])
            line(x + size, y, x + size, y + size);

        //bottom
        if (this.walls[BOTTOM])
            line(x + size, y + size, x, y + size);

        //left
        if (this.walls[LEFT])
            line(x, y + size, x, y);

        //changing color of the visited cell into nice purple
        if (this.visited) {
            noStroke();
            fill(255, 0, 255, 100);
            rect(x, y, size, size);
        }
    };


    this.checkNeighbors = function () {
        var neighbors = [];


        var top = cells[index(this.x, this.y - 1)];
        var right = cells[index(this.x + 1, this.y)];
        var bottom = cells[index(this.x, this.y + 1)];
        var left = cells[index(this.x - 1, this.y)];

        // if index returns -1 , we will get undefined, so we have to protect against it
        if (top && !top.visited) {
            neighbors.push(top);
        }
        if (right && !right.visited) {
            neighbors.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbors.push(bottom);
        }
        if (left && !left.visited) {
            neighbors.push(left);
        }
        //pick a random neighbor
        if (neighbors.length > 0) {
            return neighbors[floor(random(0, neighbors.length))];
        } else {
            return undefined;
        }
    };

    this.highlight = function () {
        var x = this.x * size;
        var y = this.y * size;
        noStroke();
        fill(255);
        rect(x, y, size, size)
    }
}

// we don't have a 2 dim array :(
function index(i, j) {
    // look for edge indexes
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1)
        return -1;
    return i * cols + j;
}