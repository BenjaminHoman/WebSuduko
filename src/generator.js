const solver = require('./solver');
const constants = require('./constants');

class SudukoGenerator extends solver.SudukoSolver {
	constructor(){

	}

	randomInt(max) {
  		return Math.floor(Math.random() * Math.floor(max));
	}

	generate(){

	}
}