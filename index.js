const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const port = 3001;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {title: 'Suduko', phrase: 'eat more'});
});

app.get('/gridvalues', function(req, res){
	res.status(200).json([
				0,2,3,1,2,3,1,2,3,
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