var data = [];

var m = 0;
var b = 0;

function setup() {
    createCanvas(400, 400);
}

function gradientDescent() {
    var learningRate = 0.05;
    for (let i = 0; i < data.length; i++) {
        var x = data[i].x;
        var y = data[i].y;

        var guess = m * x + b;
        var error = y - guess;

        m = m + (error * x) * learningRate;
        b = b + (error * learningRate);
        console.log(m, b);

    }
}


// function linearRegression() {
//     var xSum = 0;
//     var yYum = 0;
//     for (let i = 0; i < data.length; i++) {
//         xSum += data[i].x;
//         yYum += data[i].y;
//     }
//     var xMean = xSum / data.length;
//     var yMean = yYum / data.length;
//
//     var num = 0;
//     var den = 0;
//     for (let i = 0; i < data.length; i++) {
//         var x = data[i].x;
//         var y = data[i].y;
//         num += (x - xMean) * (y - yMean);
//         den += (x - xMean) * (x - xMean);
//     }
//     m = num / den;
//     b = yMean - m * xMean;
// }

function drawLine() {
    var x1 = 0;
    var y1 = m * x1 + b;
    var x2 = 1;
    var y2 = m * x2 + b;

    x1 = map(x1, 0, 1, 0, width);
    y1 = map(y1, 0, 1, height, 0);
    x2 = map(x2, 0, 1, 0, width);
    y2 = map(y2, 0, 1, height, 0);
    stroke(255, 0, 255);
    line(x1, y1, x2, y2);

}

function mousePressed() {
    var x = map(mouseX, 0, width, 0, 1);
    var y = map(mouseY, 0, height, 1, 0);

    var point = createVector(x, y,);
    data.push(point);
}

function draw() {
    background(51);
    for (var i = 0; i < data.length; i++) {
        var x = map(data[i].x, 0, 1, 0, width);
        var y = map(data[i].y, 0, 1, height, 0);
        fill(255);
        stroke(255);
        ellipse(x, y, 8, 8,);
    }
    if (data.length > 1) {
        gradientDescent();
        drawLine()
    }
}

/*

Least squares :
y = mx + b
m = sum i = {0...n) [(xi - X)(yi - Y) / sum i = {0...n} [(xi - X)^2]
X, Y - sum i= {0...n) (xi) / n
b = Y - mX
 */
