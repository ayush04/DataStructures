function DLinkedList() {
    /**
     * Implementation of Doubly Linked List ADT
     */
    var head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.insertAfter = insertAfter;
    this.displayReverse = displayReverse;
    var end = head;

    function insert(item) {
        var newNode = new Node(item);
        end.next = newNode;
        newNode.previous = end;
        end = newNode;
    };

    function find(item) {
        var current = head;
        while(current.element !== item) {
            current = current.next;
        }
        return current;
    };

    function insertAfter(item, after) {
        var node = this.find(after);
        var currentNode = new Node(item);
        currentNode.next = node.next;
        /* Check if node is the last element */
        if(node.next !== null) {
            node.next.previous = currentNode;
        }
        else {
            /* Setting end to node as it is the last element */
            end = node;
        }
        node.next = currentNode;
        currentNode.previous = node;
    };

    function display() {
        var node = head;
        var arr = [];
        while(node.next !== null) {
            arr.push(node.element);
            node = node.next;
        }
        arr.push(node.element);
        return arr;
    };

    function remove(item) {
        var node = this.find(item);
        node.previous.next = node.next;
        if(node.next !== null) {
            node.next.previous = node.previous;
        }
        node.next = null;
        node.previous = null;
    };

    function displayReverse() {
        var node = end;
        var arr = [];
        while(node.previous !== null) {
            arr.push(node.element);
            node = node.previous;
        }
        return arr;
    };
}