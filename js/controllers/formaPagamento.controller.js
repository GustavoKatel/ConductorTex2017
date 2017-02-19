
angular.module('dpay')

.controller('FormaPagamentoCtrl', function($rootScope, $scope, $routeParams, $firebaseAuth, $firebaseObject, $firebaseArray, $log, $location) {

  $scope.paymentId = $routeParams.paymentId;

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  var ref = firebase.database().ref();

  var paymentObj = $firebaseObject(ref.child('payments').child($scope.paymentId));
  paymentObj.$bindTo($scope, 'payment');

  paymentObj.$loaded().then(function() {

  });

  $scope.formaPagamento = '';

  $scope.setFormaPagamento = function(fm) {
    $scope.formaPagamento = fm;
  };

  $scope.confirmar = function() {

    $scope.payment.forma = $scope.formaPagamento;
    $scope.payment.status = true;

    if($scope.payment.tipo == 'individual') {
      alert('Pagamento efetuado com sucesso!');
      $location.path('/home');
    } else {
      $location.path('/confirmacaoPagamento/'+$scope.payment.transactionId);
    }

  };

});
