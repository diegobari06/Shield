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

      }).state("example", {
            url: "/example",
            templateUrl : 'example.html',
            views: {
              "header": {templateUrl: 'header.html',  controller: 'homeController'},
              "body":   {templateUrl: 'example.html', controller: 'CategoryListController'}
            }

      })
  });
