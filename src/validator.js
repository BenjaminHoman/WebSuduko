const solver = require('./solver');
const constants = require('./constants');
const utils = require('./utils');

exports.SudukoValidator = class extends solver.SudukoSolver {
	constructor(grid, guess){
		super(utils.merge(grid, guess), 1);
		this.grid = grid;
		this.guess = guess;
		this.lastIndex = -1;
		this.isValid = true;
		this.validate();
	}

	validate(){
		for (let y = 0; y < constants.GRID_SIZE; y++){
			for (let x = 0; x < constants.GRID_SIZE; x++){
				if (this.grid[y][x] == constants.BLANK && this.guess[y][x] != constants.BLANK){
					let temp = this.guess[y][x];
					this.guess[y][x] = constants.BLANK;
					if (!this.rules.isValid(utils.merge(this.grid, this.guess), x, y, temp)){
						this.lastIndex = utils.toIndex(x, y);
						this.isValid = false;
						return;
					}
					this.guess[y][x] = temp;
				}
			}
		}
		if (this.solutions.length > 0){
			this.isValid = true;
		} else {
			this.isValid = false;
		}
	}
}