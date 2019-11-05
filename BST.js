function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
}


function BST() {
    this.root = null;
    this.insert = insert;
    this.inorder = inorder;
    this.preorder = preorder;
    this.postorder = postorder;
    this.findMinimum = findMinimum;
    this.findMaximum = findMaximum;
    this.find = find;
    this.remove = remove;
    this.size = size;

    function insert(data) {
        var node = new Node(data, null, null);
        if(this.root === null) {
            this.root = node;
        }
        else {
            var currNode = this.root;
            var parentNode;
            while(currNode !== null) {
                parentNode = currNode;
                if(currNode.data > data) {
                    currNode = currNode.left;
                }
                else {
                    currNode = currNode.right;
                }
            }
            if(parentNode.data > data) {
                parentNode.left = node;
            }
            else {
                parentNode.right = node;
            }
        }
    };

    function inorder(node, fn) {
        if(node) {
            this.inorder(node.left, fn);
            if(fn) {
                fn.call(this);
            };
            console.log(node.data);
            this.inorder(node.right, fn);
        }
    };

    function preorder(node) {
        if(node) {
            console.log(node.data);
            this.preorder(node.left);
            this.preorder(node.right);
        }
    };

    function postorder(node) {
        if(node) {
            this.postorder(node.left);
            this.postorder(node.right);
            console.log(node.data);
        }
    };

    function findMinimum(node) {
        if(this.root === null) {
            return;
        }
        var currentNode = node || this.root;
        while(currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode.data;
    };

    function findMaximum(node) {
        if(this.root === null) {
            return;
        }
        var currentNode = node || this.root;
        while(currentNode.right !== null) {
            currentNode = currentNode.right;
        }
        return currentNode.data;
    };

    function find(data) {
        var currentNode = this.root;
        while(currentNode !== null) {
            if(currentNode.data > data) {
                currentNode = currentNode.left;
            }
            else if(currentNode.data < data) {
                currentNode = currentNode.right;
            }
            else {
                return currentNode;
            }
        }
        return null;
    };

    function remove(data) {
        if(this.root === null) {
            return;
        }
        /* Find parent of this node */
        var found = false;
        var parent = null;
        var currentNode = this.root;
        var isLeftChild = true;
        while(!found && currentNode !== null) {
            if(currentNode.data > data) {
                parent = currentNode;
                currentNode = currentNode.left;
                isLeftChild = true;
            }
            else if(currentNode.data < data) {
                parent = currentNode;
                currentNode = currentNode.right;
                isLeftChild = false;
            }
            else {
                found = true;
            }
        }
        var childCount = (currentNode.left !== null? 1: 0) + (currentNode.right !== null? 1: 0);
        if(currentNode === this.root) {
            switch(childCount) {
                case 0:
                    this.root = null;
                    break;
                case 1:
                    this.root = (this.root.left === null)? this.root.right: this.root.left;
                    break;
                case 2:
                    // Find min value in right subtree along with its parent
                    var replacement = this.root.right;
                    var replacementParent = null;
                    while(replacement.left !== null) {
                        replacementParent = replacement;
                        replacement = replacement.left;
                    }
                    // If there is a right child in replacement, make it as left child of its parent
                    if(replacement.right !== null) {
                        replacementParent.left = replacement.right;
                    }
                    // Make this node as new root
                    replacement.left = this.root.left;
                    replacement.right = this.root.right;
                    this.root = replacement;
                    break;
            }
        }
        else {
            switch(childCount) {
                case 0:
                    isLeftChild? parent.left = null: parent.right = null;
                    break;
                case 1:
                    if(isLeftChild) {
                        parent.left = currentNode.left !== null? currentNode.left: currentNode.right;
                    }
                    else {
                        parent.right = currentNode.left !== null? currentNode.left: currentNode.right;
                    }
                    break;
                case 2:
                    // Find min value in right subtree along with its parent
                    var replacement = currentNode.right;
                    var replacementParent = null;
                    while(replacement.left !== null) {
                        replacementParent = replacement;
                        replacement = replacement.left;
                    }
                    if(replacementParent.right !== null) {
                        replacementParent.left = replacement.right;
                    }
                    replacement.left = currentNode.left;
                    replacement.right = currentNode.right;
                    (parent.left.data === data)? parent.left = replacement: parent.right = replacement;
                    break;
            }
        }        
    };

    function size() {
        var length = 0;
        this.inorder(this.root, function() {
            length++;
        });
        return length;
    };
}