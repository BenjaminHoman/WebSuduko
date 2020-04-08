const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const game = require('./src/game');
const app = express();
const port = 3001;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({secret: 'insecure'}));

app.use(function(req, res, next){
	if (!req.session.init){
		req.session.game = new game.Game();
		req.session.init = true;
	}
	next();
});

app.get('/', function(req, res){
	res.render('index', {title: 'Suduko'});
});

app.get('/gridvalues', function(req, res){
	req.session.game = new game.Game();
	res.status(200).json(req.session.game.grid);
});

app.post('/check', function(req, res){
	res.status(200).json({});
});

app.listen(port, () => console.log(`App listening on port ${port}`));