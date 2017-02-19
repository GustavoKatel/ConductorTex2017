
angular.module('dpay')

.controller('DadosPagamentoCtrl', function($rootScope, $scope, $routeParams, $firebaseAuth, $firebaseObject, $firebaseArray, $log, $location, facebookService) {

  $scope.transactionId = $routeParams.transactionId;

  if(!$rootScope.user) {
    $location.path('/login');
    return;
  }

  var ref = firebase.database().ref();

  var transactionObj = $firebaseObject(ref.child('transactions').child($scope.transactionId));
  transactionObj.$bindTo($scope, 'transaction');

  transactionObj.$loaded().then(function() {

    var destObj = $firebaseObject(ref.child('users').child($scope.transaction.destId));
    destObj.$bindTo($scope, 'dest');

    destObj.$loaded().then(function() {

      facebookService.getFriendList('me', $rootScope.user.accessToken).then(function(response) {
        var friends = response.data;
        for(var i in friends) {
          var obj = {
            fid: friends[i].id,
            valor: 0.0,
            photoURL: 'http://graph.facebook.com/'+friends[i].id+'/picture?type=square',
            displayName: friends[i].name
          };
          $scope.friendList.push(obj);
        }
      }).catch(function(err) {
        $log.log(err);
      });

    });

  });

  $scope.friendList = [

    /*
    {
      uid: 'asdlqkjelkqweqwe',
      photoURL: 'https://',
      valor: 10.02,
      displayName: ''
    }
    */

  ];

  $scope.selectedFriends = [];

  $scope.busca = '';

  $scope.totalRestante = function() {
    var acumulado = 0;
    for(var i in $scope.selectedFriends) {
      acumulado += $scope.selectedFriends[i].valor;
    }

    if(!$scope.transaction || !$scope.transaction.valorTotal) {
      return 0;
    }

    var restante = $scope.transaction.valorTotal - acumulado;

    return restante;
  };

  $scope.valorSugerido = function() {
    var acumulado = 0;
    for(var i in $scope.selectedFriends) {
      acumulado += $scope.selectedFriends[i].valor;
    }

    if(!$scope.transaction || !$scope.transaction.valorTotal) {
      return 0;
    }

    var sugerido = $scope.transaction.valorTotal - acumulado;
    return sugerido / 2;
  };

  $scope.friendListFiltered = function() {

    var list = [];

    var add = true;
    for(var i in $scope.friendList) {

      if(!($scope.busca === '') && !$scope.friendList[i].displayName.toLowerCase().startsWith($scope.busca.toLowerCase())) {
        add = false;
        break;
      }

      for(var j in $scope.selectedFriends) {
        if($scope.friendList[i].fid == $scope.selectedFriends[j].fid) {
          add = false;
          break;
        }
      }
      if(add) {
        list.push($scope.friendList[i]);
      }
      add = true;
    }

    return list;

  };

  $scope.selectFriend = function(friend) {
    if($scope.selectedFriends.length <= 10) {
      if(!$scope.valor) {
        friend.valor = $scope.valorSugerido();
      } else {
        friend.valor = parseInt($scope.valor);
      }
      $scope.valor = '';
      $scope.selectedFriends.push(friend);
    }
  };

  $scope.removeFriend = function(index) {
    $scope.selectedFriends.splice(index, 1);
  };

  $scope.confirmarCompartilhada = function() {

    for(var i in $scope.selectedFriends) {
      var friend = $scope.selectedFriends[i];

      var userObj = ref.child('users').orderByChild('fid').equalTo(friend.fid);
      var list = $firebaseArray(userObj);
      list.$loaded().then(function(list) {

        // one payment for each friend
        var pid = (new Date).getTime();
        var paymentObj = $firebaseObject(ref.child('payments').child(pid));
        paymentObj.$loaded().then(function(paymentObj) {

          var oid = 'email';
          if(list.length>0) {
            oid = list[0].uid;
          }

          paymentObj.data = (new Date).toISOString();
          paymentObj.destId = $scope.transaction.destId;
          paymentObj.origId = oid;
          paymentObj.status = false;
          paymentObj.tipo = 'compartilhada';
          paymentObj.transactionId = $scope.transaction.id;
          paymentObj.valorParcial = friend.valor;
          paymentObj.valorTotal = $scope.transaction.valorTotal;
          paymentObj.id = pid;
          paymentObj.forma = '';
          paymentObj.$save();

        });

      });

    }

    // frist user payment
    var pid = (new Date).getTime();
    var paymentObj = $firebaseObject(ref.child('payments').child(pid));
    paymentObj.$loaded().then(function(paymentObj) {

      paymentObj.data = (new Date).toISOString();
      paymentObj.destId = $scope.transaction.destId;
      paymentObj.origId = $rootScope.user.uid;
      paymentObj.status = false;
      paymentObj.tipo = 'compartilhada';
      paymentObj.transactionId = $scope.transaction.id;
      paymentObj.valorParcial = $scope.totalRestante();
      paymentObj.valorTotal = $scope.transaction.valorTotal;
      paymentObj.id = pid;
      paymentObj.forma = '';
      paymentObj.$save().then(function() {

        $location.path('/formaPagamento/'+paymentObj.id);

      });

    });

  }; // confirmarCompartilhada

  $scope.confirmarIndividual = function() {
    var pid = (new Date).getTime();
    var paymentObj = $firebaseObject(ref.child('payments').child(pid));
    paymentObj.$loaded().then(function(paymentObj) {

      paymentObj.data = (new Date).toISOString();
      paymentObj.destId = $scope.transaction.destId;
      paymentObj.origId = $rootScope.user.uid;
      paymentObj.status = false;
      paymentObj.tipo = 'individual';
      paymentObj.transactionId = $scope.transaction.id;
      paymentObj.valorParcial = $scope.transaction.valorTotal;
      paymentObj.valorTotal = $scope.transaction.valorTotal;
      paymentObj.id = pid;
      paymentObj.forma = '';
      paymentObj.$save().then(function() {

        $location.path('/formaPagamento/'+paymentObj.id);

      });

    });
  };

});
