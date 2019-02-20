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
    console.log(graph);
}

function Node(value) {
    this.value = value;
    this.edges = [];
    this.searched = false;
    this.parent = null;
}

Node.prototype.addEdge = function (neighbor) {
    this.edges.push(neighbor);
    // both directions
    neighbor.edges.push(this)
};
