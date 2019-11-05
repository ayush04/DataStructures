function Node(label, weight) {
    this.label = label;
    if(weight === undefined) {
        weight = 1;
    }
    this.weight = weight;
};

function Graph() {
    var vertices = [];
    var adjList = new Dictionary();

    this.addVertex = addVertex;
    this.addEdge = addEdge;
    this.hasVertex = hasVertex;
    this.toString = toString;
    this.bfs = bfs;
    this.shortestPath = shortestPath;
    this.dfs = dfs;
    this.topologicalSort = topologicalSort;
    this.dijkstra = dijkstra;

    function addVertex(vertex) {
        vertices.push(vertex);
        adjList.add(vertex, []);
    };

    function addEdge(from, to, weight) {
        if(!this.hasVertex(from)) {
            this.addVertex(from);
        }
        if(!this.hasVertex(to)) {
            this.addVertex(to)
        }
        adjList.get(from).push(new Node(to, weight));
    };

    function hasVertex(vertex) {
        return vertices.indexOf(vertex) > -1;
    };

    function toString() {
        var str = [];
        for(var i=0; i<vertices.length; i++) {
            str[str.length] = vertices[i];
            str[str.length] = '->';
            var neighbours = adjList.get(vertices[i]);
            for(var j=0; j<neighbours.length; j++) {
                str[str.length] = neighbours[j].label;
                str[str.length] = ' ';
            }
            str[str.length] = '\n';
        }
        return str.join('');
    };

    function initializeColor() {
        var color = {};
        for(var i=0; i<vertices.length; i++) {
            color[vertices[i]] = 'white';
        };
        return color;
    };

    function bfs(node, callback) {
        var queue = new Queue();
        queue.enqueue(node);
        var visited = [];
        var color = initializeColor();
        var distance = {};
        var pred = {};
        for(var i=0; i<vertices.length; i++) {
            distance[vertices[i]] = 0;
            pred[vertices[i]] = null;
        }
        while(!queue.isEmpty()) {
            var currentNode = queue.dequeue();
            visited.push(currentNode);
            var neighbours = adjList.get(currentNode);
            color[currentNode] = 'grey';
            //console.log(color);
            for(var i=0; i<neighbours.length; i++) {
                var n = neighbours[i].label;
                if(color[n] === 'white') {
                    color[n] = 'grey';
                    queue.enqueue(n);
                    distance[n] = distance[currentNode] + 1;
                    pred[n] = currentNode;
                }
            }
            color[currentNode] = 'black';
            //console.log(color);
            if(callback) {
                callback.call(this, currentNode);
            }
        }

        return {
            output: visited,
            distance: distance,
            predecessors: pred
        };
    };

    function shortestPath(from, to) {
        var bfsResult = this.bfs(from);
        var distanceArr = bfsResult.distance;
        var predArr = bfsResult.predecessors;
        var path = new Stack();
        var element = to;
        while(element !== from) {
            path.push(element);
            element = predArr[element];
            if(element == null) {
                break;
            }
        };
        path.push(from);
        while(!path.isEmpty()) {
            console.log(path.pop());
        }
    };

    function dfs(node, callback) {
        var color = initializeColor();
        _dfs(node, color, callback);
    };

    function _dfs(node, color, discoveryTime, finishTime, pred, time, callback) {
        if(color[node] === 'white') {
            color[node] = 'grey';
            if(discoveryTime && time !== undefined) {
                discoveryTime[node] = ++time;
            }
            if(callback) {
                callback.call(this, node);
            };
            var neighbours = adjList.get(node);
            for(var i=0; i<neighbours.length; i++) {
                var n = neighbours[i].label;
                if(color[n] === 'white') {
                    if(pred) {
                        pred[n] = node;
                    }
                    _dfs(n, color, discoveryTime, finishTime, pred, time, callback);
                }
                color[n] = 'black';
            }
            if(finishTime && time !== undefined) {
                finishTime[node] = ++time;
            }
            color[node] = 'black';
        }

    };

    function topologicalSort(callback) {
        var color = initializeColor();
        var discoveryTime = {};
        var finishTime = {};
        var pred = {};
        var time = 0;
        for(var i=0; i<vertices.length; i++) {
            if(color[vertices[i]] === 'white') {
                _dfs(vertices[i], color, discoveryTime, finishTime, pred, time, callback);
            }
        }

        console.log(discoveryTime);
        console.log(finishTime);
        console.log(pred);
        return {
            discovery: discoveryTime,
            finish: finishTime,
            predecessors: pred
        };
    };

    function dijkstra(from) {
        var distance = {};
        var visited = [];
        var queue = new Queue();
        queue.enqueue(from);
        for(var i=0; i<vertices.length; i++) {
            distance[vertices[i]] = Infinity;
        }
        distance[from] = 0;
        while(queue.length() !== 0) {
            var currentNode = queue.dequeue();
            visited.push(currentNode);
            var neighbours = adjList.get(currentNode);
            for(var i=0; i<neighbours.length; i++) {
                if(distance[neighbours[i].label] > distance[currentNode] + neighbours[i].weight) {
                    distance[neighbours[i].label] = distance[currentNode] + neighbours[i].weight;
                }
                if(visited.indexOf(neighbours[i].label) === -1) {
                    queue.enqueue(neighbours[i].label);
                }
            }
        }
        console.log(distance);
    };
};