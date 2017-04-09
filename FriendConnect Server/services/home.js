var ejs=require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbuser";
var mongosURL = "mongodb://localhost:27017/sessions";
var session= require('client-sessions');
var algorithm= 'aes-256-ctr';
var pass = 'd6F3Efeq';


function handle_request(msg, callback){
	
	var res = {};
		
	console.log("In handle request:"+ msg.username);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbuser');
		
			
		
		coll.findOne({email: msg.username, password:msg.password}, function(err, user){
			if (user) {
									
				res.code = "200";
				res.value = "Succes Login";
				res.user = user;
				
				
			
			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";

			}
		
			
			console.log("These are the results in login.js : "+res.user);
			callback(null, res);
			
		});
		
		
	});

			
}


function handle_srequest(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbuser');
		
				
				coll.insert({firstname:msg.firstname, lastname:msg.lastname, email:msg.email, username:msg.username, password:msg.password}, function(err,user){
					
					res.code = "200";
					res.value = "Succes Login";
					console.log("This is the status code at server : "+res.code);					
					callback(null, res);	
			});
				
		});
	
}



function handle_frequest(msg, callback){
	
	var res = {};
	console.log("In handle request:"+ msg.username);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('friends');
		
				
				coll.insert({email:msg.username}, function(err,user){
					
					res.code = "200";
					res.value = "Succes Login";
					console.log("This is the status code at server : "+res.code);					
					callback(null, res);	
			});
				
		});
	
}





function redirectToHomepage(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		
		var getusername=req.session.username;
				console.log("After finding Fname");	
					
				res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				res.render("wall",{username:req.session.username});
				
		
	}
	else
	{
		res.redirect('/');
	}
}


function redirectToLoginpage(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		
		var getusername=req.session.username;
				console.log("After finding Fname");	
					
				res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
				res.render("facebooklogin");
				
		
	}
	else
	{
		res.redirect('/');
	}
}


exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};

	
exports.handle_request=handle_request;
exports.handle_srequest=handle_srequest;
exports.redirectToHomepage=redirectToHomepage;
exports.redirectToLoginpage=redirectToLoginpage;