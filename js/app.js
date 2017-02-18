
angular.module('dpay', ['ngRoute', 'firebase'])


.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  })
  .when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginCtrl'
  })
  .when('/criarConta', {
    templateUrl: 'partials/criarConta.html',
    controller: 'CriarContaCtrl'
  })
  .when('/pagar', {
    templateUrl: 'partials/pagar.html',
    controller: 'PagarCtrl'
  })
  .when('/receber', {
    templateUrl: 'partials/receber.html',
    controller: 'ReceberCtrl'
  })
  .when('/dadosPagamento', {
    templateUrl: 'partials/dadosPagamento.html',
    controller: 'DadosPagamentoCtrl'
  })
  .when('/formaPagamento', {
    templateUrl: 'partials/formaPagamento.html',
    controller: 'FormaPagamentoCtrl'
  })
  .when('/confirmacaoPagamento', {
    templateUrl: 'partials/confirmacaoPagamento.html',
    controller: 'ConfirmacaoPagamentoCtrl'
  })
  .otherwise('/login');

});
