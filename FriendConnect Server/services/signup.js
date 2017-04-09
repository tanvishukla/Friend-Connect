var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";

function handle_request(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('login');
		
				
				coll.insert({firstname:msg.firstname, lastname:msg.lastname, email:msg.email, username:msg.username, password:msg.password}, function(err,user){
					
					res.code = "200";
					res.value = "Succes Login";
					console.log("This is the status code : "+res.code);
																
			});
				callback(null, res);
		});
	
}

exports.handle_request = handle_request;