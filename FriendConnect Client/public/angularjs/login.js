
var login = angular.module('login', []);
//defining the login controller
login.controller('login', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	//$scope.invalid_login = true;
	//$scope.unexpected_error = true;
	$scope.user_added=true;
	$scope.user_exists=true;
	$scope.invalid_login=true;
	
	
	$scope.submit = function() {
		
		$http({
			method : "POST",
			url : '/after_sign_in',
			data : {
				"username" : $scope.username,
				"password" : $scope.password
			}
		}).success(function(response) {
			//checking the response data for statusCode
			if (response.login == "Fail") {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
				$scope.user_added=true;
				
			}
			else if(response.login == "Success")
				{
				//Making a get call to the '/redirectToHomepage' API
				
				console.log("in status code 200");
				window.location.assign("/wall"); 
				//window.location.assign("/myprofile");
				//window.location.assign("/profile1");
				
				}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
			$scope.user_added=true;
		});
	};
	
	//Function for sign up
	$scope.signup =function(){
		
	$http({
		
		method : "POST",
		url : '/doSignUp',
		data : {
			
			"firstname" : $scope.firstname,
			"lastname"  : $scope.lastname,
			"email"     :$scope.email,
			"password"	:$scope.password
		}
	}).success(function(response){
		
		if (response.signup == "Success") {
			$scope.user_added=false;
		}
		else
			{
			
			$scope.user_added=true;
			$scope.user_exists=false;
			//window.location.assign("/facebooklogin"); 
			
			}
		
		
	}).error(function(error){
		
		//$scope.unexpected_error = false;
		//$scope.invalid_login = true;
		$scope.user_added=true;
		
	});
		
		
	};
	
	
	
	$scope.about = function() {
		$http({
			method : "GET",
			url : '/getprofile',
			data : {
				
			}
		}).success(function(response) {
			//checking the response data for statusCode
			
			
			
			if (response.login == "Fail") {
			
				//do nothing
				window.location.assign("/fail_login");
			
			}
			else if(response.login == "Success")
				{
				
				console.log("in status code 200");
				//do nothing								
				window.location.assign("/about");
				//window.location.assign("/about");
					
				}
		}).error(function(error) {
			
		alert("error ahe");
		
		});
	};
	
	
	$scope.friends =function(){
		
		$http({
			
			method : "GET",
			url : '/getprofile',
			data : {
				
				
			}
		}).success(function(response){
			
			if (response.login == "Success") {
				
				window.location.assign("/friends");
			}
			else
				{
				
				window.location.assign("/fail_login"); 
				
				}
			
			
		}).error(function(error){
			
			//$scope.unexpected_error = false;
			//$scope.invalid_login = true;
			$scope.user_added=true;
			
		});
			
			
		};
		

		
		$scope.interests =function(){
			
			$http({
				
				method : "GET",
				url : '/getprofile',
				data : {
					
					
				}
			}).success(function(response){
				
				if (response.login == "Success") {
					
					window.location.assign("/interests");
				}
				else
					{
					
					window.location.assign("/fail_login"); 
					
					}
				
				
			}).error(function(error){
				
				//$scope.unexpected_error = false;
				//$scope.invalid_login = true;
				$scope.user_added=true;
				
			});
				
				
			};
	
			
			
			
			$scope.groups =function(){
				
				$http({
					
					method : "GET",
					url : '/getprofile',
					data : {
						
						
					}
				}).success(function(response){
					
					if (response.login == "Success") {
						
						window.location.assign("/groups");
					}
					else
						{
						
						window.location.assign("/fail_login"); 
						
						}
					
					
				}).error(function(error){
					
					//$scope.unexpected_error = false;
					//$scope.invalid_login = true;
					$scope.user_added=true;
					
				});
					
					
				};
	
	
	
})
