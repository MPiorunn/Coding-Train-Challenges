var data;


function preload() {
    data = loadJSON('movies.json')
}

function setup() {
    noCanvas();
    var users = {};
    var dropdown1 = createSelect('');
    var dropdown2 = createSelect('');
    for (let i = 0; i < data.users.length; i++) {
        var name = data.users[i].name;
        dropdown1.option(name);
        dropdown2.option(name);
        users[name] = data.users[i]
    }

    var button = createButton('submit');
    button.mousePressed(euclideanSimilarity);

    function euclideanSimilarity() {
        var name1 = dropdown1.value();
        var name2 = dropdown2.value();
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
        var similarity = 1 / (1 + sqrtDiff);
        createP(similarity);

    }
}

