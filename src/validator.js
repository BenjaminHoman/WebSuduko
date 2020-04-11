const solver = require('./solver');
const constants = require('./constants');
const utils = require('./utils');

exports.SudukoValidator = class extends solver.SudukoSolver {
	constructor(grid){
		super(grid, 1);
		this.isValid = true;
		this.validate();
	}

	validate(){
		for (let y = 0; y < constants.GRID_SIZE; y++){
			for (let x = 0; x < constants.GRID_SIZE; x++){
				if (this.grid[y][x] != constants.BLANK){
					let temp = this.grid[y][x];
					this.grid[y][x] = constants.BLANK;
					if (!this.rules.isValid(this.grid, x, y, temp)){
						this.lastIndex = utils.toIndex(x, y);
						this.isValid = false;
						return;
					}
					this.grid[y][x] = temp;
				}
			}
		}
		this.solve();
		if (this.solutions.length == 0){
			this.isValid = false;
		}
	}
}