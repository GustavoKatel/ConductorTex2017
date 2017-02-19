
angular.module('dpay')

.controller('ReceberCtrl', function($rootScope, $scope, $firebaseAuth, $firebaseObject, $firebaseArray, $location, $log) {

  var firebaseUser = $firebaseAuth().$getAuth();

  // $log.log(firebaseUser);

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  var ref = firebase.database().ref();

  $scope.valor = '';
  $scope.descricao = '';

  $scope.qrcodeData = '';

  $scope.gerarCodigo = function() {

    var obj = {
      data: new Date().toISOString(),
      destId: $rootScope.user.uid,
      valorTotal: $scope.valor,
      descricao: $scope.descricao,
      transactionId: (new Date()).getTime()
    };

    var transactionObj = $firebaseObject(ref.child('transactions').child(obj.transactionId));

    transactionObj.$loaded().then(function(transactionObj) {
      for(var key in obj) {
        transactionObj[key] = obj[key];
        transactionObj.$save().then(function() {
          $scope.qrcodeData = obj.transactionId;
        });
      }
    });

  };

});
