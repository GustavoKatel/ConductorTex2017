
angular.module('dpay')

.controller('LoginCtrl', function($scope, $window, $firebaseAuth, $log) {

  // TODO: localstorage
  var firebaseUser = $firebaseAuth().$getAuth();

  if (firebaseUser) {
    $window.location.href = '#/home';
  } else {
    $log.log('not logged in');
  }

  $scope.login = function() {
    var auth = $firebaseAuth();

    // login with Facebook
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope("user_friends");

    auth.$signInWithPopup(provider).then(function(firebaseUser) {
      $window.location.href = '#/home';
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  };

});
