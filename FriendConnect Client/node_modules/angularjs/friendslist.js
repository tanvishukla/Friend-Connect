angular.module('myApp', []).controller('myController', function($scope, $http)
{
	$scope.friends=[];
	$scope.displayFriends = function(){
		$http({
			
		}).success(function(data){
			
			$scope.friends=data.data;
			
		}).error(function(error)
		{
			alert("error");
		});	
		
	};
});