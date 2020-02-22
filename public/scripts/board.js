
Vue.component('tile', {
	data: function(){
		return {
			id: "tile"
		}
	},
	props: ['value'],
	template: 
	`<li>
		<input type="text" v-if="value !== 0" v-model="value" readonly></input>
		<input type="text" v-else></input>
	</li>`
});

function getHost(){
	let host = window.location.hostname + (window.location.port ? ':'+window.location.port : '');
	return `http://${host}/`;
}

$(document).ready(function(){
	var board = new Vue({
		el: "#board",
		data: {
			values: []
		},
		mounted(){
			fetch(getHost()+'gridvalues')
				.then(response => response.json())
				.then((data) => {
					this.values = data;
				})
				.catch(error => console.log(error));
		}
	});
});