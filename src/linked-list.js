const Node = require('./node');

class LinkedList {

    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    append(data) {
        var node = new Node(data, null, null);

        if (this.length == 0) {
            this._head = node;
            this._tail = node;
        } else {

            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }

        this.length++;
        return this;

    };

    head() {
        if (this._head == null)
            return null;
        return this._head.data;
    }

    tail() {
        if (this._tail == null)
            return null;
        return this._tail.data;
    }

    at(index) {
        if (index > -1 && index < this.length) {
            var current = this._head,
                i = 0;

            while (i++ < index) {
                current = current.next;
            }

            return current.data;
        } else {
            return null;
        }
    }

    _at(index) {
        if (this.length < index) {
            throw new Error("The index of the item that you have selected is more than the length of the list.");
        } else {
            var node = this._head;
            var i = 0;
            while (i != index) {
                node = node.next;
                i++;
            }
            return node;
        }
    }

    insertAt(index, data) {
        if (index <= this.length) {
            if (this.length == 0) {
                return this.append(data);
            } else {
                var node = new Node(data, null, null);

                var nodeCur = this._at(index);
                var nodePrev = nodeCur.prev;
                var nodeNext = nodeCur.next;

                node.prev = nodePrev;
                node.next = nodeNext;
                nodePrev.next = node;
                if (nodeNext != null)
                    nodeNext.prev = node;

                this.length++;

                return this;
            }
        } else {
            throw new Error("The index of the item that you have selected is more than the length of the list.");
        }
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        if (index > -1 && index < this.length) {

            var current = this._head,
                i = 0;

            if (index === 0) {
                this._head = current.next;

                if (!this._head) {
                    this._tail = null;
                } else {
                    this._head.prev = null;
                }

            } else if (index === this.length - 1) {
                current = this._tail;
                this._tail = current.prev;
                this._tail.next = null;
            } else {

                while (i++ < index) {
                    current = current.next;
                }

                current.prev.next = current.next;
                current.next.prev = current.prev;
            }

            this.length--;

            return this;

        } else {
            return null;
        }
    }

    reverse() {
        var node_buf = new Node(null, null, null);

        var node_head = this._head;
        var node_tail = this._tail;

        var i = 0;

        while (i < Math.floor(this.length / 2)) {
            node_buf.data = node_tail.data;
            node_tail.data = node_head.data;
            node_head.data = node_buf.data;
            node_head = node_head.next;
            node_tail = node_tail.prev;
            i++;
        }

        return this;
    }

    indexOf(data) {
        var node = this._head;
        var i = 0;
        while (i != this.length) {
            if (node.data == data) {
                return i;
            }
            node = node.next;
            i++;
        }
        return -1;
    }
}

module.exports = LinkedList;