app.factory('myFactory', function($http, $q){
	var service = {};
	var baseUrl = 'http://digitalcrafts.com/students/twitter/hashtag.php';
	var _hash = '';
	var finalUrl = '';

	service.buildUrl = function(){
		finalUrl = baseUrl + _hash;
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
		var deferred = $q.derer();
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


