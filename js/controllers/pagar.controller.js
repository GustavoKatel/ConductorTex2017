
angular.module('dpay')

.controller('PagarCtrl', function($rootScope, $scope, $window, $location) {

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  $window.qrcode.callback = function(decodedData) {

  };

});
