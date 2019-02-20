function Graph() {
    this.nodes = [];
    this.graph = {};
}

Graph.prototype.addNode = function (n) {
    // Putting node into array
    this.nodes.push(n);
    var title = n.value;
    // putting node into 'hash table'
    this.graph[title] = n;
};

Graph.prototype.getNode = function (actor) {
    return this.graph[actor];
};