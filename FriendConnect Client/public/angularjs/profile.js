var profile = angular.module('profile', []);
//defining the login controller
profile.controller('profile', function($scope, $http) {
	
	
	$scope.about = function() {
		$http({
			method : "GET",
			url : '/getprofile',
			data : {
				
			}
		}).success(function(response) {
			//checking the response data for statusCode
			
			alert("This is the JSON response");
			//alert(JSON.stringify(response));
			//String Jstring=JSON.stringify(response);
			//alert(Jstring);
			
			if (response.login == "Fail") {
			
				window.location.assign("/fail_login");
			
			}
			else if(response.login == "Success")
				{
				
				console.log("in status code 200");
				
				
				
				//window.location.assign("/about");
				window.location.assign("/about");
					
				}
		}).error(function(error) {
			
		alert("error ahe");
		
		});
	};
	
});