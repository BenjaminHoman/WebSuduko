

Vue.component('grid-tile', {
	methods: {
		isDigit: function(event){
			let keyCode = (event.keyCode ? event.keyCode : event.which);
			//only allow numbers 1-9
			if (![49,50,51,52,53,54,55,56,57].includes(keyCode)){
				event.preventDefault();
			}
		}
	},
	props: ['tile'],
	template: 
	`<li>

			<input type="text" 
			v-if="tile.isReadOnly()" 
			v-model="tile.digit" 
			readonly></input>

		<input type="number" 
			v-else 
			v-model.number="tile.inputDigit" 
			v-model="tile.inputDigit" 
			:maxlength="1" 
			@keypress="isDigit" 
			class="userEntry"
			v-bind:class="{ incorrect: tile.error, correct: tile.correct }"></input>

	</li>`
});

function getHost(){
	let host = window.location.hostname + (window.location.port ? ':'+window.location.port : '');
	return `${window.location.protocol}//${host}/`;
}

function doFetch(path, method, body, callback){
	fetch(getHost()+path, {
		method: method,
		body: body,
		headers: new Headers({'content-type': 'application/json'})
	})
	.then(response => response.json())
	.then(data => callback(data))
	.catch(error => console.error(`Error could not fetch ${path} with ${error}`));
}

function doGet(path, callback){
	doFetch(path, 'get', null, callback);
}

function doPost(path, body, callback){
	doFetch(path, 'post', body, callback);
}

function initGridValues(board){
	doGet('grid', (data) => {
		board.grid = new Grid(data);
	});
}

function resetGridValues(board, mode){
	let path = '';
	if (mode == 'easy')
		path = 'reset-easy';
	else if (mode == 'medium')
		path = 'reset-medium';
	else
		path = 'reset-hard';
	doPost(path, null, (data) => {
		board.grid = new Grid(data);
	});
}

function submit(board){
	doPost('submit', JSON.stringify(board.grid.values()), (data) => {
		if (!data.answer){
			board.grid.markIncorrect();
		} else {
			board.grid.setCorrect();
		}
	})
}

var board = null;
$(document).ready(function(){
	board = new Vue({
		el: "#board",
		data: {
			grid: new Grid()
		},
		mounted(){
			initGridValues(this);
		}
	});

	$(".reset_easy").click(() => {
		resetGridValues(board, 'easy');
	});
	$(".reset_medium").click(() => {
		resetGridValues(board, 'medium');
	});
	$(".reset_hard").click(() => {
		resetGridValues(board, 'hard');
	});
	$(".submit_button").click(() => {
		submit(board);
	});
});