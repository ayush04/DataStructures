function Node(data, left, right, parent) {
    this.data = data;
    this.left = left;
    this.right = right;
	this.parent = parent;
}

function AVL() {
	_this = this;
	_this.root = null;
	_this.insert = insert;
	_this.inorder = inorder;
	_this.preorder = preorder;
		
	function insert(data) {
		var node = new Node(data, null, null, null);
		if(_this.root === null) {
			_this.root = node;
			return;
		}
		else {
			var currentNode = _this.root;
			var parentNode;

			while(currentNode !== null) {
				parentNode = currentNode;
				if(data > currentNode.data) {
					currentNode = currentNode.right;
				}
				else {
					currentNode = currentNode.left;
				}
			}
			if(parentNode.data > data) {
				parentNode.left = node;
			}
			else {
				parentNode.right = node;
			}
			node.parent = parentNode;
			// verify if balancing is needed
			let leftHeight = _nodeHeight(_this.root.left);
			let rightHeight = _nodeHeight(_this.root.right);
			//If we are inserting node in the left side subtree and the value of the node is smaller than the value of its left side child, 
			//we do a right rotation otherwise a left right rotation.
			if(leftHeight - rightHeight > 1) {
				if(parentNode.data > data) {
					_rightRotation(node.parent);
				}
				else {
					_leftRightRotation(node);
				}
			}
			//If we are inserting node in the right side subtree and the value of the node is larger than the value of its right side child, 
			//we do a left rotation otherwise a right left rotation.
			else if(rightHeight - leftHeight > 1) {
				if(parentNode.data < data) {
					_leftRotation(node.parent);
				}
				else {
					_rightLeftRotation(node);
				}
			}
		}
	}

	// Currently prints the tree in sorted order
	function inorder(node) {
		if(node) {
			_this.inorder(node.left);
			console.log(node.data);
			_this.inorder(node.right);
		}
	}

	function preorder(node) {
		if(node) {
			console.log(node.data);
			_this.preorder(node.left);
			_this.preorder(node.right);
		}
	}

	// Balance factor
	function _nodeHeight(node) {
		if(node === null) {
			return -1;
		}
		return Math.max(_nodeHeight(node.left), _nodeHeight(node.right)) + 1;
	}

	function _leftRotation(node) {
		let tmp = node.parent;
		tmp.right = node.left;
		if(node.left) {
			node.left.parent = tmp;
		}
		node.parent = tmp.parent;
		if(tmp.parent) {
			tmp.parent.left = node;
		}
		if(tmp.parent === null) {
			_this.root = node;
		}
		tmp.parent = node;
		node.left = tmp;
	}

	function _rightRotation(node) {
		let tmp = node.parent;
		tmp.left = node.right;
		if(node.right) {
			node.right.parent = tmp;
		}
		node.parent = tmp.parent;
		if(tmp.parent) {
			tmp.parent.right = node;
		}
		if(tmp.parent === null) {
			_this.root = node;
		}
		tmp.parent = node;
		node.right = tmp;
	}

	function _leftRightRotation(node) {
		_leftRotation(node);
		_rightRotation(node);
	}

	function _rightLeftRotation(node) {
		_rightRotation(node);
		_leftRotation(node);
	}
}