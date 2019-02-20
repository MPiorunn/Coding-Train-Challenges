var data;

function preload() {
    data = loadJSON('kevinbacon.json');
}

function setup() {
    noCanvas();
    let graph = new Graph();
    let movies = data.movies;

    for (let i = 0; i < movies.length; i++) {
        const movie = movies[i].title;
        const cast = movies[i].cast;
        const movieNode = new Node(movie);
        graph.addNode(movieNode);

        for (let j = 0; j < cast.length; j++) {
            const actor = cast[j];
            let actorNode = graph.getNode(actor);
            if (actorNode === undefined) {
                actorNode = new Node(actor);
            }
            graph.addNode(actorNode);
            movieNode.addEdge(actorNode);
        }
    }
    var start = graph.setStart('Rachel McAdams');
    // var start = graph.setStart('Kevin Bacon'); - found immediately
    var end = graph.setEnd('Kevin Bacon');

    var queue = [];

    start.searched = true;
    queue.push(start);

    while (queue.length > 0) {
        var current = queue.shift();
        if (current === end) {
            console.log("Found! " + current.value);
            break;
        }
        var edges = current.edges;
        for (var i = 0; i < edges.length; i++) {
            var neighbor = edges[i];
            if (!neighbor.searched) {
                neighbor.searched = true;
                neighbor.parent = current;
                queue.push(neighbor);
            }
        }
    }

    var path = [];

    path.push(end);
    var next = end.parent;
    while (next != null) {
        path.push(next);
        next = next.parent
    }
    var txt = '';

    for (i = path.length - 1; i >= 0; i--) {
        var n = path[i];
        txt += n.value;
        if (i != 0) {
            txt += ' --> ';
        }
    }

    console.log(txt);

}

