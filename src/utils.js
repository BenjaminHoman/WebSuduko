const constants = require('./constants');
const models = require('./models');

exports.flatten = function(arr){
	return [].concat.apply([], arr);
}

exports.each_slice = function(arr, n, fn){
	let result = [];
	for (let i = 0, l = arr.length; i < l; i += n){
    	result.push(fn(arr.slice(i, i + n)));
  	}
  	return result;
}

exports.zip = function(arr, ...arrs){
	return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}

exports.toIndex = function(x, y){
	return (y * constants.GRID_SIZE) + x;
}

exports.gridToTile = function(grid){
	return grid.map(row => row.map(d => new models.Tile(d)));
}

exports.combine = function(arr){
	return exports.each_slice(arr, constants.GRID_SIZE, a => a);
}

exports.format = function(grid){
	var rows = [];
	grid.forEach((row) => {
		rows.push(row.map((tile) => `${tile.print()}`).join('|'));
	});
	return rows.join('\n');
}

exports.merge = function(grid, guess){
	return exports.zip(grid, guess).map(row => exports.zip(row[0], row[1]).map(pair => {
		if (pair[0] == constants.BLANK && pair[1] != constants.BLANK){
			return pair[1];

		} else {
			return pair[0];
		}
	}));
}