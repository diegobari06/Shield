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
      }).state("new_resident", {
            url: "/resident",
            views: {
              "header": {templateUrl: '../admin/header.html',  controller: 'homeController'},
              "body":   {templateUrl: '../admin/resident/new_resident.html', controller: 'residentController'},
              "menu":   {templateUrl: '../admin/menu.html', controller: 'menuController'}
            }
      }).state("new_vehicule", {
            url: "/new_vehicule",
            views: {
              "header": {templateUrl: '../admin/header.html',  controller: 'homeController'},
              "body":   {templateUrl: '../admin/new_car.html', controller: 'vehiculeController'},
              "menu":   {templateUrl: '../admin/menu.html', controller: 'menuController'}
            }
      })
  });

  app.controller('homeController',function(){

  })
  app.controller('menuController',function(){

  })



  app.controller('vehiculeController',function(){

})