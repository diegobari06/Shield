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
            url: "/nuevo/residente",
            views: {
              "header": {templateUrl: '../admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: '../admin/new_resident.html', controller: 'residentController'},
              "menu":  {templateUrl: '../admin/menu.html', controller: 'menuController'}
            }
      })
  });

  app.controller('homeController',function(){

  })
  app.controller('menuController',function(){

  })

    app.controller('residentController',function(){

  })
