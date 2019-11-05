function Stack() {
    /**
     * Stack ADT implementation
     */

    var stackSize = 0;
    var data = [];
    var top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.toString = toString;
    this.length = length;
    this.clear = clear;
    this.isEmpty = isEmpty;
        
    function push(element) {
        data[top++] = element;
    };

    function pop() {
        return data.splice(--top, 1);
    }

    function peek() {
        return data[top - 1];
    };

    function toString() {
        return data;
    };

    function length() {
        return top;
    };

    function clear() {
        data = [];
        top = 0;
    };

    function isEmpty() {
        return data.length === 0;
    };
}