var data;
var users = {};
var resultDivs = [];
const notSeen = 'Not seen';

function preload() {
    data = loadJSON('movies.json')
}

function setup() {
    noCanvas();
    var dropdowns = [];
    var titles = data.titles;
    for (let i = 0; i < titles.length; i++) {
        var div = createDiv(titles[i]);
        var dropdown = createSelect('');
        dropdown.title = titles[i];
        dropdown.parent(div);
        dropdown.option(notSeen);
        for (let j = 1; j < 6; j++) {
            dropdown.option(j);
        }
        dropdowns.push((dropdown))
    }

    var button = createButton('submit');

    button.mousePressed(predictRatings);

    function predictRatings() {
        var newUser = {};
        for (let i = 0; i < dropdowns.length; i++) {
            var title = dropdowns[i].title;
            var rating = dropdowns[i].value();
            if (rating === notSeen) {
                rating = null;
            }
            newUser[title] = rating;
        }

        findNearestNeighbors(newUser)
    }

    function findNearestNeighbors(user) {

        for (let i = 0; i < resultDivs.length; i++) {
            resultDivs[i].remove()
        }

        resultDivs = [];

        var similarityScores = {};
        for (let i = 0; i < data.users.length; i++) {
            let other = data.users[i];
            similarityScores[other.name] = euclideanDistance(user, other);
        }

        data.users.sort(compareSimilarity);

        // function in a function in a function xD
        function compareSimilarity(a, b) {
            var score1 = similarityScores[a.name];
            var score2 = similarityScores[b.name];
            return score2 - score1
        }

        for (let i = 0; i < data.titles.length; i++) {
            var t = data.titles[i];
            if (user[t] === null) {

                var k = 5;
                // var sum = 0;
                var weightedSum = 0;
                var similaritySum = 0;
                for (let j = 0; j < k; j++) {
                    var ratings = data.users[j];
                    var name = ratings.name;
                    var score = similarityScores[name];
                    var rating = ratings[t];
                    // sum += rating;
                    if (rating !== null) {
                        weightedSum += rating * score;
                        similaritySum += score;
                    }
                }
                // var stars = nf(sum / k, 1, 2);
                var stars = nf(weightedSum / similaritySum, 1, 2);
                var div = createDiv(t + " : " + stars);
                resultDivs.push(div);
            }
        }


    }

}

function euclideanDistance(ratings1, ratings2) {

    var titles = data.titles;

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

