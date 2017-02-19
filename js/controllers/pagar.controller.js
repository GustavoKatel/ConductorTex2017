
angular.module('dpay')

.controller('PagarCtrl', function($rootScope, $scope, $window, $location, $log, $route) {

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  $window.qrcode.callback = function(decodedData) {
    $log.log(decodedData);
    if(decodedData != undefined) {
      $route.reload();
      $location.path('/dadosPagamento/'+decodedData);
    } else {
      $window.alert('Não foi possível escanear o QRCode');
    }
  };

  $scope.started = function() {
    // $log.log('started');
  };

  $scope.loaded = function() {
    // $log.log($scope.qrimage);
    $window.qrcode.decode('data:'+$scope.qrimage.filetype+';base64,'+$scope.qrimage.base64);
  };

});
