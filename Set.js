function Set() {
    /**
     * Implementation of Set ADT
     * Set is a collection of unique elements
     * Members of set are unordered and no member of a set can occur twice
     */

    var data = [];
    this.add = add;
    this.remove = remove;
    this.size = size;
    this.intersect = intersect;
    this.union = union;
    this.subset = subset;
    this.difference = difference;
    this.display = display;

    var position = 0;
    this.hasNext = hasNext;
    this.next = next;
    this.reset = reset;
    this.contains = contains
    /**
     * Returns a boolean to indicate if the element is added in the set
     * @param {*} element 
     */
    function add(element) {
        if(data.indexOf(element) === -1) {
            data.push(element);
            return true;
        }
        return false;
    };

    function remove(element) {
        var position = data.indexOf(element);
        if(position > -1) {
            data.splice(position, 1);
            return true;
        }
        return false;
    };

    function display() {
        return data;
    };

    function size() {
        return data.length;
    };

    function intersect(set) {
        var tempSet = new Set();
        while(set.hasNext()) {
            var nextElement = set.next();
            if(data.indexOf(nextElement) > -1) {
                tempSet.add(nextElement);
            }
        }
        set.reset();
        return tempSet;
    };

    function clone() {
        var clone = new Set();
        for(var i=0; i<data.length; i++) {
            clone.add(data[i]);
        }
        return clone;
    };

    function union(set) {
        var tempSet = clone();
        while(set.hasNext()) {
            tempSet.add(set.next());
        }
        set.reset();
        return tempSet;
    };

    function subset(set) {
        if(this.size() > set.size()) {
            return false;
        }
        while(this.hasNext()) {
            if(!set.contains(this.next())) {
                this.reset();
                return false;
            }
        }
        return true;
    };

    function difference(set) {
        var tempSet = clone();
        while(set.hasNext()) {
            tempSet.remove(set.next());
        }
        set.reset();
        return tempSet;
    };

    function next() {
        return data[position++];
    };

    function hasNext() {
        return position < data.length;
    };

    function reset() {
        position = 0;
    };

    function contains(element) {
        return data.indexOf(element) > -1;
    };
}