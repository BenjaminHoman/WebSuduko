
class Tile {
	constructor(digit){
		this.digit = digit;
		this.inputDigit = null;
	}

	isReadOnly(){
		return this.digit !== 0;
	}

	value(){
		return this.isReadOnly() ? this.digit : this.inputDigit;
	}
}

class Grid {
	constructor(grid){
		this.tiles = (grid || []).map(value => new Tile(value));
	}

	values(){
		return this.tiles.map(tile => tile.value());
	}
}