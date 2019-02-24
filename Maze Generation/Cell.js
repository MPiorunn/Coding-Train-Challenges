function Cell(x, y) {
    this.x = x;
    this.y = y;

    this.show = function () {
        var x = this.x * size;
        var y = this.y * size;
        stroke(255);

        //walls     [top,right,bottom,left]
        this.walls = [true, true, true, true];
        //top
        if (this.walls[0])
            line(x, y, x + size, y);

        //right
        if (this.walls[1])
            line(x + size, y, x + size, y + size);

        //bottom
        if (this.walls[2])
            line(x + size, y + size, x, y + size);

        //left
        if (this.walls[3])
            line(x, y + size, x, y);

        // noFill();
        // rect(x, y, size, size);
    }
}

