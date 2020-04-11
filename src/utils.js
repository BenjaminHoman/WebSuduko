const constants = require('./constants');

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