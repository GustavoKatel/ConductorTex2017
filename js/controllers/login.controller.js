
angular.module('dpay')

.controller('LoginCtrl', function($scope, $window, $location, $firebaseAuth, $log) {

  var firebaseUser = $firebaseAuth().$getAuth();

  if (firebaseUser) {
    $location.path('/home');
  } else {
    $log.log('not logged in');
  }

  $scope.login = function() {
    var auth = $firebaseAuth();

    // login with Facebook
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("user_friends");

    auth.$signInWithPopup(provider).then(function(firebaseUser) {
      $location.path('/home');
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  };

});
