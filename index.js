const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const port = 3001;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {title: 'Suduko'});
});

function getRandomInt(max) {
  	return Math.floor(Math.random() * Math.floor(max));
}

app.get('/gridvalues', function(req, res){
	let n0 = getRandomInt(9);
	let n1 = getRandomInt(9);
	let n2 = getRandomInt(9);
	let n3 = getRandomInt(9);
	res.status(200).json([
				0,n0,n1,n2,n3,3,1,2,3,
				4,5,6,4,5,6,4,5,6,
				7,8,9,7,8,9,7,8,9,
				1,2,3,1,2,3,1,2,3,
				4,5,6,4,5,6,4,5,6,
				7,8,9,7,8,9,7,8,9,
				1,2,3,1,2,3,1,2,3,
				4,5,6,4,5,6,4,5,6,
				7,8,9,7,8,9,0,0,0
			]);
});

app.listen(port, () => console.log(`App listening on port ${port}`));