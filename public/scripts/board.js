

Vue.component('grid-tile', {
	methods: {
		isReadOnly: function(tile){
			return tile.isReadOnly();
		},
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
		<input type="text" v-if="isReadOnly(tile)" v-model="tile.digit" readonly></input>
		<input type="text" v-else v-model.number="tile.inputDigit" v-model="tile.inputDigit" :maxlength="1" 
				@keypress="isDigit" class="userEntry"></input>
	</li>`
});

function getHost(){
	let host = window.location.hostname + (window.location.port ? ':'+window.location.port : '');
	return `http://${host}/`;
}

var board = null;
$(document).ready(function(){
	board = new Vue({
		el: "#board",
		data: {
			grid: new Grid()
		},
		mounted(){
			fetch(getHost()+'gridvalues')
				.then(response => response.json())
				.then((data) => {
					this.grid = new Grid(data);
				})
				.catch(error => console.log(error));
		}
	});
});

$(document).keydown(function(event){
	if(event.keyCode == 32){ //space
		fetch(getHost()+'gridvalues')
				.then(response => response.json())
				.then((data) => {
					board.grid = new Grid(data);
				})
				.catch(error => console.log(error));
		event.preventDefault();
	}
});