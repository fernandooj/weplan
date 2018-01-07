'use strict';

let User = require('./../models/usersModel.js');

class signInServices {
	post(data, callback){
		User.findOne({email:data.email, password:data.password}, callback)
	}
}

module.exports = new signInServices()