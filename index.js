const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const generator = require('./src/generator');
const solver = require('./src/solver');
const validator = require('./src/validator');
const utils = require('./src/utils');
const constants = require('./src/constants');
const app = express();
const port = 3001;

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(session({
	secret: 'insecure',
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next){
	if (!req.session.init){
		req.session.grid = new generator.SudukoGenerator().getGrid();
		req.session.init = true;
	}
	next();
});

app.get('/', function(req, res){
	res.render('index', {title: 'Suduko'});
});

app.get('/grid', function(req, res){
	res.status(200).json(req.session.grid.map(n => {
		return {
			digit: n,
			meta: constants.META_NONE
		}
	}));
});

app.post('/check', function(req, res){
	let valid = new validator.SudukoValidator(utils.each_slice(req.body, constants.GRID_SIZE, r => r));
	if (valid.isValid){
		res.status(200).json({answer:true});
	} else {
		res.status(200).json({answer:false, index: valid.lastIndex});
	}
});

app.listen(port, () => console.log(`App listening on port ${port}`));