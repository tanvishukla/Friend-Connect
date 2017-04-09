var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";

function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');

		coll.findOne({username: msg.username, password:msg.password}, function(err, user){
			if (user) {
				res.code = "200";
				res.value = "Succes Login";
				
				
			
			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";

			}
		
			
			console.log("These are the results in login.js : "+res.code+" and the value is : "+res.value);
			callback(null, res);
			
		});
	
		
		
	});

		
	
}

exports.handle_request = handle_request;