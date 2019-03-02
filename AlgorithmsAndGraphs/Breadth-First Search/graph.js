function Graph() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
}

Graph.prototype.addNode = function (n) {
    // Putting node into array
    this.nodes.push(n);
    // putting node into 'hash table'
    this.graph[n.value] = n;
};

Graph.prototype.getNode = function (actor) {
    return this.graph[actor];
};

Graph.prototype.setStart = function (actor) {
    this.start = this.graph[actor];
    return this.start;
};

Graph.prototype.setEnd = function (actor) {
    this.end = this.graph[actor];
    return this.end;
};