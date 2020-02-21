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

app.listen(port, () => console.log(`App listening on port ${port}`));