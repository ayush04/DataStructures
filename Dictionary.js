function Dictionary() {
    /**
     * Implementation of Dictionary ADT
     */
    var data = {};
    this.add = add;
    this.get = get;
    this.remove = remove;
    this.display = display;
    this.clear = clear;
    this.count = count;
    this.has = has;

    function add(key, value) {
        data[key] = value;
    };

    function get(key) {
        return data[key];
    };

    function remove(key) {
        delete data[key];
    };

    function display() {
        Object.keys(data).forEach(function(key) {
            console.log(key + " : " + data[key]);
        });
    };

    function clear() {
        data = {};
    };

    function count() {
        return Object.keys(data).length;
    };

    function has(key) {
        return key in data;
    };
}