function Tree() {
    this.root = null; // tree root starts as null

}

Tree.prototype.traverse = function () {
    this.root.visit();
};

Tree.prototype.search = function (val) {
    return this.root.search(val);
};

Tree.prototype.addValue = function (value) {
    let node = new Node(value);
    if (this.root == null) {
        this.root = node
    } else {
        this.root.addNode(node);
    }
};