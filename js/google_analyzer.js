angular.module("mainModule", [])
  .controller("mainController", function ($scope, $http, jsonFilter)
  {
	$scope.postCall = function () {
		
		var config =  {
			"requests":[ {
			  "image":{ "source":{ "imageUri": $scope.getParam1 } },
			  "features":[ { "type":"FACE_DETECTION",
							 "maxResults":10 } ] 
						} ]	}
	  var header = { 'Content-Type'	: 'application/json' };
      var url = 'https://vision.googleapis.com/v1/images:annotate?key='+$scope.api.key;  
	  
	  $scope.inputImage2 = $scope.getParam1;
      $http.post(url,config)
        .then(function successCallback(response) {
		$scope.postCallResult = response.data;
		}, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
		});
    };
  });