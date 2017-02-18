
angular.module('dpay')

.controller('HomeCtrl', function($scope, $firebaseAuth, $firebaseObject, $location, $log) {

  var firebaseUser = $firebaseAuth().$getAuth();

  $log.log(firebaseUser);

  if(!firebaseUser) {
    $location.path('/login');
    return;
  }

  $scope.displayName = firebaseUser.displayName;
  $scope.photoURL = firebaseUser.photoURL;

  var ref = firebase.database().ref();
  var obj = $firebaseObject(ref);

  // to take an action after the data loads, use the $loaded() promise
  obj.$loaded().then(function() {
    // obj.compras = [];
    // obj.compras.push({
    //   data: new Date(),
    //   valor: 50.30,
    //   metodoPagamento: 'VISA',
    //   formatoPagamento: 'Compartilhado',
    // });
  });

  // To make the data available in the DOM, assign it to $scope
  $scope.data = obj;

  // For three-way data bindings, bind it to the scope instead
  obj.$bindTo($scope, "data");

});
