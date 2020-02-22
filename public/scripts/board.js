
Vue.component('tile', {
	data: function(){
		return {
			id: "tile"
		}
	},
	props: ['value'],
	template: 
	`<li><span>{{ value }}</span></li>`
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
			console.log('mounted');
			fetch(getHost()+'gridvalues')
				.then(response => response.json())
				.then((data) => {
					this.values = data;
				});
		}
	});
});