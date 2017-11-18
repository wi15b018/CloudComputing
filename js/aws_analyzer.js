'use strict';

var controllers = angular.module('controllers', []);

controllers.controller('UploadController',['$scope', function($scope) {
  $scope.sizeLimit      = 10585760; // 10MB in Bytes
  $scope.uploadProgress = 0;
  $scope.creds          = {};
  
  $scope.postCall = function () {
	AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
	var params = {
	  'Image': {
	   'S3Object': {'Bucket' : $scope.creds.bucket, 
					'Name' 	 : $scope.file.name }
	  },
	  'Attributes' : ['ALL']
	 };

	var rekognition = new AWS.Rekognition();
	rekognition.detectFaces(params, function (err, data) {
	}).on('success', function(response) {
	   $scope.postCallResult = response.data;
	});
	
  };
  
  $scope.upload = function() {
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    AWS.config.region = 'us-east-1';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
    
    if($scope.file) {
        // Perform File Size Check First
        var fileSize = Math.round(parseInt($scope.file.size));
        if (fileSize > $scope.sizeLimit) {
          toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
          return false;
        }
        var uniqueFileName = $scope.file.name;

        var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

        bucket.putObject(params, function(err, data) {
          if(err) {
            toastr.error(err.message,err.code);
            return false;
          }
          else {
            // Upload Successfully Finished
            toastr.success('File Uploaded Successfully', 'Done');

            // Reset The Progress Bar
            setTimeout(function() {
              $scope.uploadProgress = 0;
              $scope.$digest();
            }, 4000);
          }
        })
        .on('httpUploadProgress',function(progress) {
          $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
          $scope.$digest();
        });
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    }

    $scope.fileSizeLabel = function() {
    // Convert Bytes To MB
    return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
  };

}]);
