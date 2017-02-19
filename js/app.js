
angular.module('dpay', ['ngRoute', 'firebase', 'facebook', 'naif.base64'])


.config(function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
  })
  .when('/home', {
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
  .when('/dadosPagamento/:transactionId', {
    templateUrl: 'partials/dadosPagamento.html',
    controller: 'DadosPagamentoCtrl'
  })
  .when('/formaPagamento/:paymentId', {
    templateUrl: 'partials/formaPagamento.html',
    controller: 'FormaPagamentoCtrl'
  })
  .when('/confirmacaoPagamento/:transactionId', {
    templateUrl: 'partials/confirmacaoPagamento.html',
    controller: 'ConfirmacaoPagamentoCtrl'
  })
  .otherwise('/login');

})

.run(function($window) {

  $window.fbAsyncInit = function() {
    FB.init({
      appId: '417738848566321',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.4'
    });
  };

});
