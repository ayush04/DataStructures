function Queue() {
    /**
     * Queue ADT implementation
     */
    var data = [];

    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.isEmpty = isEmpty;
    this.clear = clear;
    this.length = length;
    this.hasElement = hasElement;

    function enqueue(element) {
        data.push(element);
    };

    function dequeue() {
        return data.shift();
    };

    function front() {
        return data[0];
    };

    function back() {
        return data[data.length - 1];
    };

    function toString() {
        return data;
    };

    function isEmpty() {
        return data.length === 0;
    };

    function clear() {
        data = [];
    };

    function length() {
        return data.length;
    };

    function hasElement(element) {
        return data.indexOf(element) > -1;
    };
}