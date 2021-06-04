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
const appRouter = express.Router();
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

appRouter.use(function(req, res, next){
	if (!req.session.init){
		req.session.grid = new generator.SudukoGenerator(5).getGrid();
		req.session.init = true;
	}
	next();
});

function reset(req, res, amount){
	req.session.grid = new generator.SudukoGenerator(amount).getGrid();
	req.session.init = true;
	res.status(200).json(req.session.grid);
}

appRouter.get('/', function(req, res){
	res.render('index');
});

appRouter.get('/grid', function(req, res){
	res.status(200).json(req.session.grid);
});

appRouter.post('/reset-easy', function(req, res){
	reset(req, res, 6);
});

appRouter.post('/reset-medium', function(req, res){
	reset(req, res, 50);
});

appRouter.post('/reset-hard', function(req, res){
	reset(req, res, 70);
});

appRouter.post('/submit', function(req, res){
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

app.use('/sudoku', appRouter);
app.listen(port, () => console.log(`App listening on port ${port}`));