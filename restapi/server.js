var restify = require('restify'),
	mongoose = require('mongoose'),
	configDB = require('./config/database'),
	user = require('./route/user'),
	port = process.env.PORT || 3001;

var db = mongoose.connect(configDB.url);

db.connection.on('error', function(error){
	console.log("Database connection error: " + error);
});

db.connection.on('open', function(error){
	console.log("Database connection success!");
});

var server = restify.createServer({
	name: 'user registration handler'
});

server.use(function(req, res, next) {
	console.log(req.method + " " + req.url);
	return next();
});

server.use(restify.bodyParser());

server.use(restify.CORS());

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

server.get('api/user', user.get);
server.get('api/user/:id', user.getById);
server.post('api/user', user.post);
server.del('api/user/:id', user.del);

server.listen(port, function(){
	console.log("api running at " + port);
});