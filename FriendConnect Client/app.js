var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , home = require('./routes/home')
  , path = require('path');
  var session = require('client-sessions');


var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

var app = express();

// all environments
app.set('port', process.env.PORT || 3011);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//for rendering to facebooklogin page
app.get('/signin',home.sign_in);

//for making request to the server
app.post('/after_sign_in', home.after_sign_in);

//for rendering to pages
app.get('/friends',home.showfriends);
app.get('/about',home.showabout);
app.get('/interests',home.showinterests);
app.get('/groups',home.showgroups);

//for profile page
app.get('/wall', home.success_login);

//for about page
app.get('/about',home.showabout);

app.get('/fail_login', home.fail_login);

//for go to signup page
app.get('/goToSignUp',home.goToSignUp);

//for signup
app.post('/doSignUp',home.doSignUp);

//for logout
app.get('/logout',home.logout);

//for maintaining session
app.get('/getprofile',home.getprofile);


mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});
