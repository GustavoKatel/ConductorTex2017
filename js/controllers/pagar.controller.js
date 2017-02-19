
angular.module('dpay')

.controller('PagarCtrl', function($rootScope, $scope, $window, $location, $log) {

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  $window.qrcode.callback = function(decodedData) {
    // $log.log(decodedData);
    $location.path('/dadosPagamento/'+decodedData);
  };

  $scope.started = function() {
    // $log.log('started');
  };

  $scope.loaded = function() {
    // $log.log($scope.qrimage);
    $window.qrcode.decode('data:'+$scope.qrimage.filetype+';base64,'+$scope.qrimage.base64);
  };

});
