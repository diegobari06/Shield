var app = angular.module("app", ['ui.router']);

angular.module('app').config(function($stateProvider,$httpProvider){
  console.log('asdasd');
      $stateProvider.state("home", {
        url: "/home",
        templateUrl : 'home.html',
        views: {
              "header": {templateUrl: 'header.html',  controller: 'homeController'}
            },
        controller  : 'homeController',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          }
        }
      }).state("example", {
            url: "/example",
            views: {
              "header": {templateUrl: '../admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: '../admin/example.html', controller: 'CategoryListController'}
            }
      })
  });

  app.controller('homeController',function(){

  })

    app.controller('CategoryListController',function(){

  })
