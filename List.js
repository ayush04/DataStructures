function List() {
    /**
     * List ADT implementation
     */
    this.listSize = 0;
    var pos = 0;
    var data = [];
    var hasNextElement = true;

    this.append = append;
    this.find = find;
    this.remove = remove;
    this.length = length;
    this.toString = toString;
    this.insert = insert;
    this.insertAfter = insertAfter;
    this.clear = clear;
    this.contains = contains;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.hasNext = hasNext;
    
    function append(element) {
        data[this.listSize++] = element;
    };

    function find(element) {
        return data.indexOf(element);
    };

    function remove(element) {
        var position = find(element);
        if(position > -1) {
            data.splice(position, 1);
            this.listSize--;
            return true;
        }
        return false;
    };

    function length() {
        return this.listSize;
    };

    function toString() {
        return data;
    };

    function insert(element, position) {
        data.splice(position, 0, element);
        this.listSize++;
        return true;
    };

    function insertAfter(element, after) {
        var position = find(after);
        if(position > -1) {
            return insert.call(this, element, position+1);
        }
        return false;
    };

    function clear() {
        data = [];
        this.listSize = 0;
        pos = 0;
    };

    function contains(element) {
        return (find(element) > -1)? true: false;
    };

    function front() {
        pos = 0;
    };
    
    function end() {
        pos = this.listSize - 1;
    };

    function prev() {
        if(pos > 0) {
            pos--;
        }
    };

    function next() {
        if(pos < this.listSize - 1) {
            pos++;
        }
        else {
            hasNextElement = false;
        }
    };
    
    function currPos() {
        return pos;
    };

    function moveTo(position) {
        pos = position;
    };

    function getElement() {
        return data[pos];
    };

    function hasNext() {
        return hasNextElement;
    };
}