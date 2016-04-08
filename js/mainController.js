var tweetApp = angular.module('tweetApp', ['ngRoute']);

tweetApp.directive('tweetData', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
        template: 'Hello, Class/>',
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
});

tweetApp.directive('tweetHeader', function () {
    return {
        restrict: 'E', 
        template: '<div id="">This is the header</div>" />',
        link: function ($scope, element, attrs) { } //DOM manipulation
    }
});

tweetApp.directive('stupidClick', function(){
	return{
		link: function ($scope, element, attrs){
			element.bind('mouseenter', function(){
				element.css('color','blue');
			})
			element.bind('mouseleave', function(){
				element.css('color','black');
			})
		}
	}
});


tweetApp.factory('myFactory', function($http, $q){
	var service = {};
	var baseUrl = 'http://digitalcrafts.com/students/twitter/hashtag.php';
	var _hash = '';
	var finalUrl = '';

	var buildUrl = function(){
		queryStringStart = '?hash=';
		finalUrl = baseUrl + queryStringStart + _hash;
		return finalUrl;
	}
	
	service.setHash = function (hash, secondHash){
		_hash = {
			hash: hash,
			secondHash: secondHash
		}
	}

	service.getHash = function(){
		return _hash;
	}

	service.callTwitter = function(){
		buildUrl();
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: finalUrl
		}).success(function(data){
			deferred.resolve(data);
		}).error(function(){
			deferred.reject('Sorry. I encountered an error.');
		});
		return deferred.promise;
	}
	return service;
});

tweetApp.controller('mainController', function($scope, $http, $routeParams, $interval, myFactory){

	$scope.data = {};
	$scope.updateHash = function(userHash){
		myFactory.setHash(userHash);
	};

	 function submitHash(){
		myFactory.callTwitter().then(function(data){
			$scope.data = data.statuses;
		}, function(data){
			alert(data);
		});
	}

	myFactory.setHash('trump')
	submitHash();

	myFactory.getHash();

	// $http.get(url).success(function(data){

	// 	console.log(data);
	// 	$scope.data = data.statuses;
	// 	for(i=0; i<$scope.data.length; i++){
	// 		var time = $scope.data[i].created_at;
	// 		var tweetTime = new Date(time);
	// 		$scope.data[i].tweetSeconds = tweetTime.getTime()/1000;
	// 		// console.log($scope.data[i].tweetSeconds);
	// 		console.log($scope.data[i]);

	// 		$interval(function(){
	// 			for(i=0; i<$scope.data.length; i++){
	// 				var currentDate = new Date();
	// 				var currentTimeInSeconds = currentDate.getTime()/1000;
	// 				$scope.data[i].sinceTweeted = Math.floor(currentTimeInSeconds - $scope.data[i].tweetSeconds);

	// 			};
	// 		},1000);

	// 	}
	// 	// console.log(data.statuses);
	// });


});
