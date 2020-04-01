const constants = require('./constants');

class Rules {
	constructor(){}

	/*
	*	Determine if placing the current value on the grid is valid
	*	@param {int} - x position
	*	@param {int} - y position
	* 	@param {int} - value to be tested
	*	@return {boolean}
	*/
	isValid(grid, x, y, value){
		if (!this.checkRow(grid, y, value) || 
			!this.checkColumn(grid, x, value) || 
			!this.checkBlock(grid, x, y, value)){
			return false;
		}
		return true;
	}

	checkRow(grid, y, value){
		for (let i = 0; i < constants.GRID_SIZE; i++){
			if (grid[y][i] == value){
				return false;
			}
		}
		return true;
	}

	checkColumn(grid, x, value){
		for (let i = 0; i < constants.GRID_SIZE; i++){
			if (grid[i][x] == value){
				return false;
			}
		}
		return true;
	}

	checkBlock(grid, x, y, value){
		let x0 = Math.floor(x/constants.SUB_SIZE)*constants.SUB_SIZE;
		let y0 = Math.floor(y/constants.SUB_SIZE)*constants.SUB_SIZE;
		for (let blockY = 0; blockY < constants.SUB_SIZE; blockY++){
			for (let blockX = 0; blockX < constants.SUB_SIZE; blockX++){
				if (grid[y0+blockY][x0+blockX] == value){
					return false;
				}
			}
		}
		return true;
	}
}

exports.SudukoSolver = class {

	/*
	*	@param {[Array[int]]} - grid
	*/
	constructor(grid, maxSolutions){
		this.maxSolutions = maxSolutions || constants.MAX_SOLUTIONS;
		this.solutionCount = 0;
		this.grid = grid;
		this.solutions = [];
		this.rules = new Rules();
		this.solve();
	}

	/*
	*	Solves sudoku grid by traversing the grid while
	*	saving the last state in the current stack in case
	*	the current path trace is wrong.
	*/
	solve(){
		if (this.solutionCount >= this.maxSolutions){
			return;
		}
		for (let y = 0; y < constants.GRID_SIZE; y++){
			for (let x = 0; x < constants.GRID_SIZE; x++){
				if (this.grid[y][x] == constants.BLANK){
					for (var i of this.nextNumber()){
						if (this.rules.isValid(this.grid, x, y, i)){
							this.grid[y][x] = i;
							this.solve();
							this.grid[y][x] = constants.BLANK;
						}
					}
					return;
				}
			}
		}
		this.solutionCount++;
		this.solutions.push(this.snapshot(this.grid));
	}

	*nextNumber(){
		for (var i = 1; i <= constants.MAX_NUMBERS; i++){
			yield i;
		}
	}

	/*
	*	@param {[Array[int]]} - grid
	*	@return {[Array[int]]} - copy of grid
	*/
	snapshot(grid){
		return grid.map((row) => row.slice());
	}
}