const constants = require('./constants');

/*
*	Determine if placing the current value on the grid is valid
*	@param {int} - x position
*	@param {int} - y position
* 	@param {int} - value to be tested
*	@return {boolean}
*/
exports.isValid = function(grid, x, y, value){
	if (!checkRow(grid, y, value) || 
		!checkColumn(grid, x, value) || 
		!checkBlock(grid, x, y, value)){
		return false;
	}
	return true;
}

function checkRow(grid, y, value){
	for (let i = 0; i < constants.GRID_SIZE; i++){
		if (grid[y][i] == value){
			return false;
		}
	}
	return true;
}

function checkColumn(grid, x, value){
	for (let i = 0; i < constants.GRID_SIZE; i++){
		if (grid[i][x] == value){
			return false;
		}
	}
	return true;
}

function checkBlock(grid, x, y, value){
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