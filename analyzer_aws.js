angular.module("mainModule", [])
  .controller("mainController", function ($scope, $http, jsonFilter)
  {
	$scope.postCall = function () {
		
	// Load the SDK and UUID
	var AWS = require('aws-sdk');
	var uuid = require('node-uuid');
		
	var params = { 
	  Image: {
	   S3Object: {
		Bucket: "wi15b018", 
		Name: "Clooney.jpg"
	   }
	  }
	 };

	var rekognition = new AWS.Rekognition();

	rekognition.compareFaces(params, function (err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     $scope.postCallResult = data;  ;           // successful response
	});
	
	/*  var params = {"visualFeatures": "Categories,Description,Color",
			  		"language": "en"	};
	  var header = { 'Content-Type'				 : 'application/x-amz-json-1.1',
			  	  	 'Authorization' : '2a3a5f9078d1497492a271659e23811d' };
      var url = 'https://rekognition.us-west-2.amazonaws.com/';
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
    // called asynchronously if an error occurs
    // or server returns response with an error status.
		});*/
    };
  });