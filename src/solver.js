const rules = require('./rules');
const constants = require('./constants');

exports.SudukoSolver = class {

	/*
	*	@param {[Array[int]]} - grid
	*/
	constructor(grid, maxSolutions){
		this.maxSolutions = maxSolutions || constants.MAX_SOLUTIONS;
		this.solutionCount = 0;
		this.grid = grid;
		this.solutions = [];
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
					for (let i = 1; i <= constants.MAX_NUMBERS; i++){
						if (rules.isValid(this.grid, x, y, i)){
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

	/*
	*	@param {[Array[int]]} - grid
	*	@return {[Array[int]]} - copy of grid
	*/
	snapshot(grid){
		return grid.map((row) => row.slice());
	}
}