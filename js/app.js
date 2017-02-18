
angular.module('dpay', ['ngRoute'])


.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  })
  .when('/receber', {
    templateUrl: 'partials/receber.html',
    controller: 'ReceberCtrl'
  })
  .when('/dadosPagamento', {
    templateUrl: 'partials/dadosPagamento.html',
    controller: 'DadosPagamentoCtrl'
  })
  .otherwise('/');

});
