const solver = require('./solver');
const constants = require('./constants');
const shuffle = require('shuffle-array');

function flatten(arr){
	return [].concat.apply([], arr);
}

function each_slice(arr, n, fn){
	let result = [];
	for (let i = 0, l = arr.length; i < l; i += n){
    	result.push(fn(arr.slice(i, i + n)));
  	}
  	return result;
}

function zip(arr, ...arrs){
	return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

exports.SudukoGenerator = class extends solver.SudukoSolver {
	constructor() {
		const BLANK = [[0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0],
					 [0,0,0,0,0,0,0,0,0]];

		//generate 1 random grid
		super(BLANK, 1);

		//remove answers as needed
		const ANSWERS_TO_REMOVE = 10;
		this.puzzle = this.removeAnswers(this.snapshot(this.solutions[0]), ANSWERS_TO_REMOVE);
	}

	getGrid(){
		return this.puzzle;
	}

	*nextNumber() {
		for (let n of shuffle([1,2,3,4,5,6,7,8,9])){
			yield n;
		}
	}

	removeAnswers(grid, numberToRemove){
		let flat_grid = flatten(grid),
			n = flat_grid.length;

		let removedIndices = shuffle(new Array(numberToRemove).fill(0).concat(new Array(n-numberToRemove).fill(1)));

		for (let i = 0; i < flat_grid.length; i++){
			if (removedIndices[i] == constants.BLANK){
				flat_grid[i] = constants.BLANK;
			}
		}
		return each_slice(flat_grid, constants.GRID_SIZE, (arr) => arr);
	}
}