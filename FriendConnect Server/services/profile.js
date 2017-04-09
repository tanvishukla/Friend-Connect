var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbuser";

var session= require('client-sessions');

function handle_prequest(msg,callback){
	
	var res={}; 
	
	console.log("-------------in profile function--------------------");
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbuser');
		
			
		console.log("in profile connect function");
		coll.findOne({email: msg.username}, function(err, user){
			if (user) {
				
				console.log("User is correct !!!!!!!");
				res.code = "200";
				res.value = "Succes Login";
				res.user=user;
				console.log(res.user);
				
				
			
			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";

			}
			
			
			console.log("Res after if else");
			console.log(res.user);
			callback(null, res);	
		});
	
			
		
	});

	
	
	
}

exports.handle_prequest = handle_prequest;
