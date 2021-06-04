const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const generator = require('./src/generator');
const solver = require('./src/solver');
const validator = require('./src/validator');
const utils = require('./src/utils');
const models = require('./src/models');
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
		req.session.grid = new generator.SudukoGenerator(5).getGrid();
		req.session.init = true;
	}
	next();
});

app.get('/', function(req, res){
	res.render('index');
});

app.get('/grid', function(req, res){
	res.status(200).json(req.session.grid);
});

app.post('/reset', function(req, res){
	req.session.grid = new generator.SudukoGenerator(20).getGrid();
	req.session.init = true;
	res.status(200).json(req.session.grid);
});

app.post('/check', function(req, res){
	var valid = new validator.SudukoValidator(utils.combine(req.session.grid), 
												utils.combine(req.body));
	if (valid.isValid){
		res.status(200).json({answer:true});
	} else {
		if (valid.lastIndex != -1)
			res.status(200).json({answer:false, index: valid.lastIndex});
		else
			res.status(200).json({answer:false, index: valid.lastTry});
	}
});

app.listen(port, () => console.log(`App listening on port ${port}`));