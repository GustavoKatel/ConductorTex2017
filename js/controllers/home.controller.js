
angular.module('dpay')

.controller('HomeCtrl', function($scope, $firebaseAuth, $firebaseObject, $location, $log) {

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

  var paymentsObj = $firebaseObject(ref.child('payments').orderByChild('origId').equalTo(firebaseUser.uid));

  obj.$loaded().then(function() {

  });
  paymentsObj.$loaded().then(function() {

  });

  obj.$bindTo($scope, "data");
  paymentsObj.$bindTo($scope, "payments");

});
