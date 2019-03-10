var data;
var users = {};
var resultDivs = [];

function preload() {
    data = loadJSON('movies.json')
}

function setup() {
    noCanvas();
    var dropdown1 = createSelect('');
    for (let i = 0; i < data.users.length; i++) {
        var name = data.users[i].name;
        dropdown1.option(name);
        users[name] = data.users[i]
    }

    var button = createButton('submit');

    button.mousePressed(findNearestNeighbors);

    function findNearestNeighbors() {
        for (let i = 0; i < resultDivs.length; i++) {
            resultDivs[i].remove()
        }
        resultDivs = [];
        var name = dropdown1.value();

        var similarityScores = {};
        for (let i = 0; i < data.users.length; i++) {
            let other = data.users[i].name;
            if (other !== name) {
                similarityScores[other] = euclideanDistance(name, other);
            } else {
                similarityScores[other] = -1
            }
        }

        data.users.sort(compareSimilarity);

        // function in a function in a function xD
        function compareSimilarity(a, b) {
            var score1 = similarityScores[a.name];
            var score2 = similarityScores[b.name];
            return score2 - score1
        }

        console.log(data.users);

        for (let i = 0; i < 5; i++) {
            var name1 = data.users[i].name;
            resultDivs.push(createDiv(name1 + " : " + similarityScores[name1]));
        }
    }

}

function euclideanDistance(name1, name2) {

    var ratings1 = users[name1];
    var ratings2 = users[name2];

    var titles = Object.keys(ratings1);

    titles.splice(titles.indexOf('name'), 1);
    titles.splice(titles.indexOf('timestamp'), 1);


    var sumSquared = 0;
    for (let i = 0; i < titles.length; i++) {
        var title = titles[i];
        var rating1 = ratings1[title];
        var rating2 = ratings2[title];
        // calculating partial distance for nearest neighbor
        if (rating1 !== null && rating2 !== null) {
            var diff = rating1 - rating2;
            sumSquared += diff * diff;
        }
    }
    // difference in 'tastes'
    var sqrtDiff = sqrt(sumSquared);
    // 0 - far away , 1 - very similar
    return 1 / (1 + sqrtDiff)
}

