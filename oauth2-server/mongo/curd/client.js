var clientModel = require('../model/client');

var clientInsert = function(clientInfo,callback){
  const {clientId,clientSecret}=clientInfo
	if(clientId&&clientSecret){
		clientModel.findOne({clientId}, function(err, client) {
			if (!client){
				var client = new clientModel({
					id: clientId,
					clientId: clientId,
					clientSecret: clientSecret,
					grants: [
						'password',
						'refresh_token'
					],
					redirectUris: []
				});
				client.save(function(err, client) {
			
					if (err) {
						return console.error(err);
					}
					callback(client);
				});
			}else{
				callback(clientId+'已存在')
			}
		});
	}
}

module.exports = {
  clientInsert
}