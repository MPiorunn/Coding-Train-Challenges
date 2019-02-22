// function Spot(i, j) {
//     //coordinates
//     this.x = i;
//     this.y = j;
//     //values from equation
//     this.f = 0;
//     this.g = 0;
//     this.h = 0;
//     this.neighbors = [];
//     this.previous = undefined;
//
//     this.wall = random(1) < 0.3;
//
//     this.show = function (color) {
//         fill(color);
//         if (this.wall) {
//             fill(0);
//             noStroke();
//             // rect(this.x * w, this.y * h, w - 1, h - 1);
//             ellipse(this.x * w + w / 2, this.y * h + h / 2, w / 2, h / 2)
//         }
//     };
//
//     this.addNeighbors = function (grid) {
//         var x = this.x;
//         var y = this.y;
//         if (x < cols - 1)
//             this.neighbors.push(grid[x + 1][y]);
//         if (x > 0)
//             this.neighbors.push(grid[x - 1][y]);
//         if (y < rows - 1)
//             this.neighbors.push(grid[x][y + 1]);
//         if (y > 0)
//             this.neighbors.push(grid[x][y - 1]);
//         if (x > 0 && y > 0)
//             this.neighbors.push(grid[x - 1][y - 1]);
//         if (x < cols - 1 && y > 0)
//             this.neighbors.push(grid[x + 1][y - 1]);
//         if (x > 0 && y < rows - 1)
//             this.neighbors.push(grid[x - 1][y + 1]);
//         if (x < cols - 1 && y > rows - 1)
//             this.neighbors.push(grid[x + 1][y + 1]);
//
//     }
//
// }