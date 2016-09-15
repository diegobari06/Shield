var app = angular.module("app", ['ui.router']);

angular.module('app').config(function($stateProvider,$httpProvider){
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
      }).state("residents", {
            url: "/residents",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'resident/index_resident.html', controller: 'ResidentsListController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'}
            }
      }).state("newResident", {
            url: "/resident/new",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'resident/new_resident.html', controller: 'ResidentsCreateController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'}
            }
      }).state("editResident", {
            url: "/resident/:id/edit",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'resident/edit_resident.html', controller: 'ResidentsEditController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'}
            }
      })

  });

  app.controller('homeController',function(){

  })
  app.controller('menuController',function(){

  })

  app.factory('commonMethods', function () {

        return {
            validateName: function(items,name){
             var condition = true;
              angular.forEach(items, function(item, index) {
                if(item.name.toUpperCase()== name.toUpperCase()){
                   condition = false;
                }
              });
           return condition;
           }
        };
  })
