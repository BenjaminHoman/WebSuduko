const solver = require('./solver');
const constants = require('./constants');
const shuffle = require('shuffle-array');

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
		super(BLANK, 1);
	}

	*nextNumber() {
		for (var n of shuffle([1,2,3,4,5,6,7,8,9])){
			yield n;
		}
	}
}