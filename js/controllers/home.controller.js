
angular.module('dpay')

.controller('HomeCtrl', function($scope, $firebaseAuth, $firebaseObject, $firebaseArray, $location, $log) {

  var firebaseUser = $firebaseAuth().$getAuth();

  // $log.log(firebaseUser);

  if(!firebaseUser) {
    $location.path('/login');
    return;
  }

  $scope.displayName = firebaseUser.displayName;
  $scope.photoURL = firebaseUser.photoURL;

  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref.child('users').child(firebaseUser.uid));

  var paymentsObj = $firebaseArray(ref.child('payments').orderByChild('origId').equalTo(firebaseUser.uid));
  var receivesObj = $firebaseArray(ref.child('transactions').orderByChild('destId').equalTo(firebaseUser.uid));

  obj.$bindTo($scope, "data");
  $scope.payments = paymentsObj;
  $scope.receives = receivesObj;

  obj.$loaded().then(function() {

  });
  paymentsObj.$loaded().then(function() {
    for(var i=0;i<paymentsObj.length;i++) {
      $scope.rawList.push(paymentsObj[i]);
    }
  });
  receivesObj.$loaded().then(function() {
    for(var i=0;i<receivesObj.length;i++) {
      $scope.rawList.push(receivesObj[i]);
    }
  });

  $scope.rawList = [];

  $scope.getList = function() {

    return $scope.rawList;

  };

  $scope.isEfetuado = function(obj) {
    return obj && 'forma' in obj;
  };

  $scope.isRecebido = function(obj) {
    return obj && 'descricao' in obj;
  };

  $scope.open = function(obj) {

    if(obj && 'status' in obj && obj.status === false) {
      $location.path('/formaPagamento/'+obj.id);
      return;
    }

    if(obj && obj.tipo && obj.tipo === 'compartilhada') {
      $location.path('/confirmacaoPagamento/'+obj.transactionId);
    }

  };

});
