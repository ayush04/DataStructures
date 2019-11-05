function HashTable() {
    /**
     * Implementation of HashTable ADT
     */

    var table = new Array(137); // Prime number - 137
    //this.simpleHash = simpleHash;
    this.put = put;
    this.display = display;
    this.get = get;

    /* This hash function should be used when the keys are String values.
     * It adds the ASCII values of characters in key and does a modulo of array size.
     */
    function simpleHash(key) {
        var total = 0;
        for(var i=0; i<key.length; i++) {
            total += key.charCodeAt(i);
        }
        return total % table.length;
    };

    /**
     * Uses Horner's method
     * http://makble.com/hash-function-algorithm-modular-arithmetic-and-horners-method
     */
    function betterHash(key) {
        const H = 37;
        var total = 0;
        for(var i=0; i<key.length; i++) {
            total = H * total + key.charCodeAt(i);
        }
        return total % table.length;        
    }

    function put(key, value) {
        var hash = betterHash(key);
        if(table[hash] === undefined) {
            var values = new Array();
            values.push(new Data(key, value));
            table[hash] = values;
        }
        else {
            table[hash].push(new Data(key, value));
        }
    };

    function display() {
        for(var i=0; i<table.length; i++) {
            if(table[i] !== undefined) {
                console.log(i + " : " + table[i].toString());
            }
        }
    };

    function get(key) {
        var hash = betterHash(key);
        var valueArr = table[hash];
        if(valueArr) {
            for(var i=0; i<valueArr.length; i++) {
                if(valueArr[i].key === key) {
                    return valueArr[i].value;
                }
            }
        }
        return null;
    };
}

function Data(key, value) {
    this.key = key;
    this.value = value;
    this.toString = function() {
        return this.key + ' : ' + this.value;
    }
};