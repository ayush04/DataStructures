function Matrix(row, column) {
	var _matrix = [];
	_this = this;
	_this.initialize = _initialize;
	_this.getMatrix = _getMatrix;
	_this.transpose = _transpose;
	_this.multiply = _multiply;
	_this.add = _add;
	_this.getNumberOfRows = _numberOfRows;
	_this.getNumberOfColumns = _numberOfColumns;
	_this.random = _random;
	_this.zeros = _zeros;

	function _initialize(elements) {
		if(!elements || elements.length !== row * column) {
			console.log('Number of elements passed is not correct');
			return;
		}
		else {
			for(var i=0; i<row; i++) {
				var _tempArr = elements.splice(0, column);
				_matrix.push(_tempArr);
			}
		}
	}

	function _getMatrix() {
		return _matrix;
	}

	function _numberOfRows() {
		return row;
	}

	function _numberOfColumns() {
		return column;
	}

	function _transpose() {
		var _tempMatrix = [];
		for(var i=0; i<column; i++) {
			_tempMatrix.push([]);
		}
		
		for(var i=0; i<_matrix.length; i++) {
			for(var j=0; j<_matrix[i].length; j++) {
				_tempMatrix[j][i] = _matrix[i][j];
			}
		}
		return _tempMatrix;
	}

	function _arrayMult(arr1, arr2) {
		var result = 0;
		arr1.forEach(function(element1, index) {
			result += element1 * arr2[index];
		});
		return result;
	}

	function _arrayAdd(arr1, arr2) {
		var result = [];
		arr1.forEach(function(element1, index) {
			result.push(element1 + arr2[index]);
		});
		return result;
	}

	function _multiply(matrix) {
		var matrixT = matrix.transpose();
		var _tempMatrix = new Matrix(row, matrix.getNumberOfColumns());
		var arr = [];
		for(var i=0; i<row; i++) {
			for(var j=0; j<matrixT.length; j++) {
				arr.push(_arrayMult(_matrix[i], matrixT[j]));
			}
		}
		_tempMatrix.initialize(arr);
		return _tempMatrix;
	}

	function _add(matrix) {
		var _tempMatrix = new Matrix(row, column);
		matrix = matrix.getMatrix();
		var arr = [];
		for(var i=0; i<row; i++) {
			arr = arr.concat(_arrayAdd(_matrix[i], matrix[i]));
		}
		_tempMatrix.initialize(arr);
		return _tempMatrix;
	}

	function _random() {
		var elements = [];
		for(var i=0; i< row * column; i++) {
			elements.push(Math.random());
		}
		_initialize(elements);
	}

	function _zeros() {
		var elements = [];
		for(var i=0; i< row * column; i++) {
			elements.push(0);
		}
		_initialize(elements);
	}
}