
angular.module('dpay')

.controller('ConfirmacaoPagamentoCtrl', function($rootScope, $scope, $routeParams, $firebaseAuth, $firebaseObject, $firebaseArray, $log, $location) {

  $scope.transactionId = $routeParams.transactionId;

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  var ref = firebase.database().ref();

  var transactionObj = $firebaseObject(ref.child('transactions').child($scope.transactionId));
  transactionObj.$bindTo($scope, 'transaction');

  transactionObj.$loaded().then(function() {

  });


  var paymentsList = $firebaseArray(ref.child('payments').orderByChild('transactionId').equalTo($scope.transactionId));

  $scope.payments = paymentsList;

  paymentsList.$loaded().then(function() {

    for(var i=0;i<paymentsList.length;i++) {

      paymentsList[i].user = $firebaseObject(ref.child('users').child(paymentsList[i].origId));

      // userObj.$loaded().then(function(userObj) {
      //   // $log.log(userObj);
      // });

    }

  });

  $scope.safeChild = function(obj, key, def) {
    if(obj && key in obj) {
      // $log.log(obj);
      return obj[key];
    }

    if(def == undefined) {
      return '';
    }

    return def;
  };

  $scope.getSituacao = function(payment) {

    if(payment && payment.status) {
      return 'Pagamento Efetuado';
    }

    return 'Aguardando Pagamento...';

  };
  $scope.getSituacaoColor = function(payment) {

    if(payment && payment.status) {
      return '#27AE60';
    }

    return '#d35400';

  };

  $scope.getRestante = function() {
    var total = $scope.transaction.valorTotal;
    var acumulado = 0;

    for(var i=0;i<$scope.payments.length;i++) {
      if($scope.payments[i].status === true) {
        acumulado += $scope.payments[i].valorParcial;
      }
    }

    return total - acumulado;

  };

});
