
class Tile {
	constructor(tile){
		this.digit = tile;
		this.inputDigit = null;
		this.error = false;
		this.correct = false;
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

	setCorrect(){
		if (this.inputDigit){
			this.correct = true;
		}
	}

	setIncorrect(){
		this.error = true;
		this.correct = false;
	}
}

class Grid {
	constructor(grid){
		this.tiles = (grid || []).map(tile => new Tile(tile));
	}

	values(){
		return this.tiles.map(tile => tile.value());
	}

	markIncorrect(){
		this.tiles.forEach((tile) => {
			tile.setIncorrect();
		});
	}

	setCorrect(){
		this.tiles.forEach((tile) => {
			tile.setCorrect();
		});
	}

	reset(){
		this.tiles.forEach(function(tile){
			tile.error = false;
		});
	}
}