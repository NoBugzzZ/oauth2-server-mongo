var userModel = require('../model/user');
var SHA256 = require("crypto-js/sha256");

var userInsert = function(userInfo,callback){
  var {username,password}=userInfo
	if(username&&password){
		userModel.findOne({username}, function(err, user) {
			if (!user){
				password = SHA256(userInfo.password)
				var user = new userModel({
					username,
					password
				});
				user.save(function(err, user) {
					if (err) {
						res.send(err)
						return console.error(err);
					}
					callback(user);
				});
			}else{
				callback(username+'已存在')
			}
		});
	}
}

module.exports={
  userInsert
}