function Node(val) {
    this.value = val; // value at node
    this.left = null; // left node
    this.right = null; // right note
}

Node.prototype.visit = function () {
    if (this.left != null) this.left.visit();
    console.log(this.value);
    if (this.right != null) this.right.visit();
};

Node.prototype.search = function (val) {
    if (this.value === val) {
        return val;
    } else if (val < this.value && this.left != null) {
        return this.left.search(val);
    } else if (val > this.value && this.right != null) {
        return this.right.search(val);
    }
};

Node.prototype.addNode = function (node) {
    if (node.value < this.value) {
        if (this.left == null) this.left = node;
        else this.left.addNode(node); // recursion
    } else {
        if (this.right == null) this.right = node;
        else this.right.addNode(node); // recursion
    }


};