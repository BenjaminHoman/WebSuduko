const constants = require('./constants');

exports.Tile = class {
	constructor(digit, meta, error){
		this.digit = (digit || constants.BLANK);
		this.meta = (meta || constants.META_NONE);
		this.error = (error || constants.ERROR_NONE);
	}

	print(){
		return `${this.digit}`;
	}
}