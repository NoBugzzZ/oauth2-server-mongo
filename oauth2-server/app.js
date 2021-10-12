var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	OAuth2Server = require('oauth2-server'),
	Request = OAuth2Server.Request,
	Response = OAuth2Server.Response;

var app = express();
var cors = require('cors')

app.use(cors()) 

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// var mongoUri = 'mongodb://root:123456@mongo:27017/oauth?authSource=admin';
var mongoUri = 'mongodb://root:123456@localhost:27017/oauth?authSource=admin';

mongoose.connect(mongoUri, {
	// useCreateIndex: true,
	// useNewUrlParser: true
}, function(err, res) {

	if (err) {
		console.error('Error connecting to "%s":', mongoUri, err);
	}else{
		console.log('Connected successfully to "%s"', mongoUri);
	}
});

	app.oauth = new OAuth2Server({
		model: require('./model.js'),
		accessTokenLifetime: 4 * 60 * 60,
		allowBearerTokensInQueryString: true
	});

var {clientInsert} = require('./mongo/curd/client')

app.post('/client',async function (req, res) {
	clientInsert(req.body,(message)=>{
		res.send(message)
	})
});

var {userInsert} = require('./mongo/curd/user')

app.post('/register',async function (req, res) {
	userInsert(req.body,(message)=>{
		res.send(message)
	})
});

app.all('/oauth/token',function(req,res,next){
	console.log(req.get("Authorization"))
	console.log(req.body)
	next()
}, obtainToken);

app.get('/', authenticateRequest, function(req, res) {
	res.send('Congratulations, you are in a secret area!!!!');
});

app.get('/hello', function(req, res) {
	res.send('hello');
});

app.listen(8123);

function obtainToken(req, res) {

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.token(request, response)
		.then(function(token) {

			res.status(200).json(token);
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

function authenticateRequest(req, res, next) {

	var request = new Request(req);
	var response = new Response(res);

	return app.oauth.authenticate(request, response)
		.then(function(token) {

			next();
		}).catch(function(err) {

			res.status(err.code || 500).json(err);
		});
}

