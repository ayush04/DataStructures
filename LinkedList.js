function LinkedList() {
    /**
     * Implementation to Linked List ADT
     */
    var head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.insertAfter = insertAfter;
    var end = head;

    function insert(item) {
        var newNode = new Node(item);
        end.next = newNode;
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
        var newNode = new Node(item);
        newNode.next = node.next;
        node.next = newNode;
        if(newNode.next === null) {
            end = newNode;
        }
    };

    function findPrevious(item) {
        var current = head;
        var previous = null;
        while(current.element !== item) {
            previous = current;
            current = current.next;
        }
        return previous;
    };

    function remove(item) {
        var previousNode = findPrevious(item);
        previousNode.next = previousNode.next.next;
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
};