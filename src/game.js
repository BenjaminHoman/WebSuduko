const generator = require('./generator');

function flatten(arr){
	return [].concat.apply([], arr);
}

exports.Game = class {
	constructor(){
		this.grid = flatten(new generator.SudukoGenerator().getGrid());
	}
}