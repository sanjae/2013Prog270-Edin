/**
 * @author Charlie Calvert
 */


angular.module('elvenApp', ['pres'])
.controller('MyController', function($scope, $http, presidents) {
    $scope.hint = "<p>Start with <strong>node server.js</strong> to retrieve JSON from Server</p>";
    
    // $scope.presidents = presidents;
    $scope.presidents = presidents.query({}, function(users) {
      $scope.presidentsLength = $scope.presidents.length;
      console.log($scope.presidentsLength);
    });
	
	var getDataJson = $http.get('data.json');

	getDataJson.success(function(data, status, headers, config)  {
		$scope.data = data;
	});
	
	getDataJson.error(function(data, status, headers, config) {
		throw new Error('Oh no! An Error!');
	});

});

angular.module('pres', ['ngResource'])
.factory('presidents', function($resource) {
	console.log('Presidents factory called');
	var Presidents = $resource('https://api.mongolab.com/api/1/databasese/sanjadatabase/collections/Prog270/:id', {
      // apiKey:'4fb51e55e4b02e56a67b0b66',
      apiKey:'jK_lEQJS_3zwkXk3r6bLjl-reebhpRpa',
      id:'@_id.$oid'
    });

    Presidents.prototype.getPresidentName = function() {
      return this.firstName;
    };
    
    Presidents.prototype.getTermStart = function() {
    	return this.lastName
    	;
    };
    
    Presidents.prototype.getTermEnd = function() {
    	return this.age;
    };

    return Presidents;    
	 
	// return { a: 2 };		
});
