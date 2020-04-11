

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

		<input type="text" 
			v-else 
			v-model.number="tile.inputDigit" 
			v-model="tile.inputDigit" 
			:maxlength="1" 
			@keypress="isDigit" 
			class="userEntry"></input>

	</li>`
});

function getHost(){
	let host = window.location.hostname + (window.location.port ? ':'+window.location.port : '');
	return `http://${host}/`;
}

function initGridValues(board){
	fetch(getHost()+'grid')
		.then(response => response.json())
		.then((data) => {
			board.grid = new Grid(data);
		})
		.catch(error => console.log(error));
}

function checkValues(board){
	console.log(board.grid.values());
	fetch(getHost()+'check', {
		method: 'post',
		headers: new Headers({'content-type': 'application/json'}),
		body: JSON.stringify(board.grid.values())
	})
	.then(response => response.json())
	.then((data) => {
		//board.grid = new Grid(data);
		console.log(data);
	})
	.catch(error => console.log(error));
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
});

$(document).keydown(function(event){
	if (event.keyCode == 32){ // space
		initGridValues(board);
		event.preventDefault();

	} else if (event.keyCode == 67){ // c
		checkValues(board);
		event.preventDefault();
	}
});