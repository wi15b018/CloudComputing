angular.module("mainModule", [])
  .controller("mainController", function ($scope, $http, jsonFilter)
  {
	$scope.postCall = function () {
	  var params = {"visualFeatures": "Categories,Description,Color",
			  		"language": "en"	};
	  var header = { 'Content-Type'				 : 'application/json',
			  	  	 'Ocp-Apim-Subscription-Key' : $scope.api.key };
      var url = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze';
      var config = {
        method: 'POST',
        headers : header,
        params: params
      };
	  var data = { 'url' : $scope.getParam1 };
	  
	  $scope.inputImage2 = $scope.getParam1;

      $http.post(url, data, config)
        .then(function successCallback(response) {
		$scope.postCallResult = response.data;
		}, function errorCallback(response) {
		});
    };
  });