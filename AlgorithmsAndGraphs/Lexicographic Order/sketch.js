var vals = [0, 1, 2, 3, 4, 5, 6];

function setup() {
    createCanvas(400, 300);
}

function draw() {
    background(0);
    console.log(vals);
    var largestI = -1;
    //1
    for (var i = 0; i < vals.length - 1; i++) {
        if (vals[i] < vals[i + 1]) {
            largestI = i;
        }
    }

    if (largestI == -1) {
        noLoop();
        console.log("FINISHED")
    }
    //2
    var largestJ = -1;
    for (var j = 0; j < vals.length; j++) {
        if (vals[j] > vals[largestI]) {
            largestJ = j;
        }
    }
    //3
    swap(vals, largestI, largestJ);
    //4 reverse from largestI + 1 to the end of the array
    // take the end of the array
    var endArray = vals.splice(largestI + 1);
    // reverse its elements
    endArray.reverse();
    // add them back
    vals = vals.concat(endArray);

    textSize(64);
    var s = '';
    for (var j = 0; j < vals.length; j++) {
        s += vals[j]
    }

    fill(255);
    text(s, 20, height / 2);

}

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}

