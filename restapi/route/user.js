var userTable = require('../dao/userTable');

function userHandler(){
	
	handler = this;
	
	handler.get = function(req, res, next){
		userTable.find({}).exec(function(err, users) {
			if(err) {
				res.send('error finding ' + err);
			} else {
				res.send(200, users);
			}
			return next();
		});
	};
	
	handler.getById = function(req, res, next){
		userTable.findOne({_id: req.params.id}).exec(function(err, user) {
			if(err) {
				res.send('error finding ' + err);
			} else {
				res.send(200, user);
			}
			return next();
		});
	};
	
	handler.post = function(req, res, next){
		userTable.create(req.body, function(err, user) {
			if (err) {
				res.send('error saving ' + err);
			} else{
				res.send(201, user);
			}
			return next();
		});
	};
	
	handler.del = function(req, res, next){
		userTable.findOneAndRemove({_id: req.params.id}, function(err, user){
			if (err) {
				res.send('error deleting ' + err);
			} else{
				res.send(204, user);
			}
			return next();
		});
	};
	
}

module.exports = new userHandler();