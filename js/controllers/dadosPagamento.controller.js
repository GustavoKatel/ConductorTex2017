
angular.module('dpay')

.controller('DadosPagamentoCtrl', function($scope, $routeParams, $firebaseObject, $log, facebookService) {

  $scope.transactionId = $routeParams.transactionId;

  var ref = firebase.database().ref();

  var transactionObj = $firebaseObject(ref.child('transactions').child($scope.transactionId));
  transactionObj.$bindTo($scope, 'transaction');

  transactionObj.$loaded().then(function() {

    var destObj = $firebaseObject(ref.child('users').child($scope.transaction.destId));
    destObj.$bindTo($scope, 'dest');

    destObj.$loaded().then(function() {

      facebookService.getFriendList(destObj.fid, destObj.accessToken).then(function(response) {
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

  $scope.friendListFiltered = function() {

    var list = [];

    var add = true;
    for(var i in $scope.friendList) {

      if(!($scope.busca === '') && !$scope.friendList[i].displayName.toLowerCase().startsWith($scope.busca.toLowerCase())) {
        add = false;
        break;
      }

      for(var j in $scope.selectedFriends) {
        if($scope.friendList[i].fib == $scope.selectedFriends[j].fib) {
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
      $scope.selectedFriends.push(friend);
    }
  };

  $scope.removeFriend = function(index) {
    $scope.selectedFriends.splice(index, 1);
  };

});
