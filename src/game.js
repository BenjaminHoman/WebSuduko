const generator = require('./generator');

exports.Game = class {
	constructor(){
		this.grid = new generator.SudukoGenerator().getGrid();
	}

	check(values){
		
	}
}