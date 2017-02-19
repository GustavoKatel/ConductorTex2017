
angular.module('dpay')

.controller('ReceberCtrl', function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $location, $log) {

  var firebaseUser = $firebaseAuth().$getAuth();

  // $log.log(firebaseUser);

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  $scope.valor = '';
  $scope.descricao = '';

  $scope.getData = function() {

    var obj = {
      destId: $rootScope.user.uid,
      valor: $scope.valor,
      descricao: $scope.descricao
    };
    // $log.log(obj);
    return btoa('teste'); // btoa(JSON.stringify(obj));

  };

});
