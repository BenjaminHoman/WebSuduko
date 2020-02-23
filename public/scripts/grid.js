
class Tile {
	constructor(digit){
		this.digit = digit;
		this.inputDigit = null;
	}

	isReadOnly(){
		return this.digit !== 0;
	}
}

class Grid {
	constructor(grid){
		this.tiles = (grid || []).map(value => new Tile(value));
	}
}