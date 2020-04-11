const solver = require('./solver');
const constants = require('./constants');
const utils = require('./utils');
const shuffle = require('shuffle-array');

exports.SudukoGenerator = class extends solver.SudukoSolver {
	constructor(difficulty) {
		// generate 1 random grid
		super(constants.BLANK_GRID, 1);

		// remove answers as needed
		const ANSWERS_TO_REMOVE = (difficulty || constants.DIFFICULTY_EASY);
		this.puzzle = this.removeAnswers(this.snapshot(this.solutions[0]), ANSWERS_TO_REMOVE);
	}

	getGrid(){
		return utils.flatten(this.puzzle);
	}

	*nextNumber() {
		for (let n of shuffle([1,2,3,4,5,6,7,8,9])){
			yield n;
		}
	}

	removeAnswers(grid, numberToRemove){
		let flat_grid = utils.flatten(grid),
			n = flat_grid.length;

		let removedIndices = shuffle(new Array(numberToRemove).fill(0).concat(new Array(n-numberToRemove).fill(1)));

		for (let i = 0; i < flat_grid.length; i++){
			if (removedIndices[i] == constants.BLANK){
				flat_grid[i] = constants.BLANK;
			}
		}
		return utils.each_slice(flat_grid, constants.GRID_SIZE, (arr) => arr);
	}
}