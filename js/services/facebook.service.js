angular.module('dpay')

.factory('facebookService', function($q, $window, $log) {
    return {
        getFriendList: function(uid, accessToken) {
            var deferred = $q.defer();
            $window.FB.api('/'+uid+'/friends', {
              access_token: accessToken
            }, function(response) {
                if (!response || response.error) {
                    $log.log(response);
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
});
