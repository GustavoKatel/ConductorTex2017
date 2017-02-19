
angular.module('dpay')

.controller('LoginCtrl', function($scope, $window, $location, $firebaseAuth, $firebaseObject, $log) {

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

      var ref = firebase.database().ref().child('users').child(firebaseUser.user.uid);
      var obj = $firebaseObject(ref);
      obj.$bindTo($scope, "obj");
      obj.$loaded().then(function() {
        $scope.obj.uid = firebaseUser.user.uid;
        $scope.obj.fid = (firebaseUser.user.providerData[0] || {})['uid'];
        $scope.obj.displayName = firebaseUser.user.displayName;
        $scope.obj.email = firebaseUser.user.email;
        $scope.obj.photoURL = firebaseUser.user.photoURL;
        $scope.obj.accessToken = firebaseUser.credential.accessToken;
        $location.path('/home');
      });

    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  };

});
