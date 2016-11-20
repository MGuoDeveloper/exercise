var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	Username: String,
	Password: String,
	First: String,
	Last: String,
	Address: String,
	City: String,
	State: String,
	Zip: String,
	Phone: String
});

module.exports = mongoose.model('userTable', UserSchema);