var ejs = require("ejs");
var mq_client = require('../rpc/client');
var crypto = require('crypto');
var algorithm= 'aes-256-ctr';
var pass = 'd6F3Efeq';
var bcrypt = require('bcrypt-nodejs');


//Function to get profile if Session is valid
function getprofile(req,res){
	
console.log("In getprofile function"+req.session.username);

if(req.session.username){
	
	console.log("in if !!!!!!!!!!! the profile is ------------------------->");
	console.log(JSON.stringify(req.session.profile));
	
	res.send({"login":"Success"});

}

else{
	
	res.send({"login":"Fail"});
	
}
			

}


function sign_in(req,res) {

	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	ejs.renderFile('./views/facebooklogin.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function after_sign_in(req,res)
{
	// check user already exists
	
	var username = req.param("username");
	var password = req.param("password");
	//var enpass = enrypt(password);
	
	//encryption
	var cipher = crypto.createCipher(algorithm,pass);
	var crypted = cipher.update(password,'utf8','hex');
	crypted+=cipher.final('hex');
	
	console.log("Encrypted msg is : ----------------->"+crypted);
	
	
	var msg_payload = { "username": username, "password": crypted };
		
	console.log("In POST Request = UserName:"+ username+" "+crypted);
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log("at client : "+results.user.email);
		//console.log("********session going on for : ***"+results.username);
		if(err){
			throw err;
			console.log("hello");
		}
		else 
		{
			console.log("Tanvi*******");
			if(results.code == 200){
				console.log("valid Login");	
				
				req.session.username = results.user.email;				
				req.session.profile=results.user;
				
				console.log(JSON.stringify(req.session.profile));			
				res.send({"login":"Success"});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
	
}


function success_login(req,res)
{
	console.log(req.session.username+"*****this is the session username");
	if(req.session.username){
    
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render("wall",{data:req.session.profile});
	
	}
	
	else
		{
					
		res.redirect("/");
		
		}
}


function fail_login(req,res)
{
	ejs.renderFile('./views/fail_login.ejs',function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}


function showabout(req,res)
{
	
	if(req.session.username){
	
	ejs.renderFile('./views/about.ejs',{data : req.session.profile},function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
	
	}
}


function showfriends(req,res)
{
	
	if(req.session.username){
	
	ejs.renderFile('./views/friendlist.ejs',{data : req.session.profile},function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
	
	}
}


function showinterests(req,res)
{
	
	if(req.session.username){
	
	ejs.renderFile('./views/interests.ejs',{data : req.session.profile},function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
	
	}
}



function showgroups(req,res)
{
	
	if(req.session.username){
	
	ejs.renderFile('./views/Groups.ejs',{data : req.session.profile},function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
	
	}
}






function goToSignUp(req,res){
	
	
	ejs.renderFile('./views/signup.ejs', function(err, result) {
        // render on success
        if (!err) {
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
	
	
	
}

function doSignUp(req,res){
	
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var email = req.param("email");
	var username = req.param("username");
	var password = req.param("password");
	
	var cipher = crypto.createCipher(algorithm,pass);
	var crypted = cipher.update(password,'utf8','hex');
	crypted+=cipher.final('hex');
	
	console.log("Encrypted signup password is : ----------------->"+crypted);
	
	
	
	
	var msg_payload = { "firstname":firstname, "lastname":lastname, "email":email, "username": username, "password": crypted };
		
	console.log("In POST Request = Details:"+ email+" "+password+" "+firstname+" "+lastname);
	
	mq_client.make_request('signup_queue',msg_payload, function(err,results){
		
		console.log("These are the results at client, value:"+results.value+" and code : "+results.code);
		if(err){
			throw err;
		}
		else 
		{	
				console.log("valid Login");	
				res.send({"signup":"Success"});
		}  
	});

	
	
	
}


function logout(req,res){
	
	req.session.destroy();
	res.redirect('/');	
}

// function to get about,friends,interests and groups
exports.getprofile=getprofile;

//functions to render to respective ejs pages
exports.showfriends=showfriends;
exports.showabout=showabout;
exports.showinterests=showinterests;
exports.showgroups=showgroups;
//function to go to the facebooklogin page
exports.sign_in=sign_in;

//function which speaks with the server with the help of rabbitmq
exports.after_sign_in=after_sign_in;

exports.success_login=success_login;
exports.fail_login=fail_login;
exports.goToSignUp=goToSignUp;
exports.doSignUp=doSignUp;
exports.logout=logout;