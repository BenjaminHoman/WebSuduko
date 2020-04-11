
class Tile {
	constructor(tile){
		this.digit = tile.digit;
		this.inputDigit = null;
	}

	isReadOnly(){
		return this.digit !== 0;
	}

	value(){
		if (this.isReadOnly()){
			return this.digit;

		} else if (this.inputDigit){
			return this.inputDigit;

		} else {
			return 0;
		}
	}
}

class Grid {
	constructor(grid){
		this.tiles = (grid || []).map(tile => new Tile(tile));
	}

	values(){
		return this.tiles.map(tile => tile.value());
	}
}