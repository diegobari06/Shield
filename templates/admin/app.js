var app = angular.module("app", ['ui.router']);

angular.module('app').config(function($stateProvider, $httpProvider) {
    console.log('asdasd');
    $stateProvider.state("home", {
        url: "/home",
        templateUrl: 'home.html',
        views: {
            "header": {
                templateUrl: 'header.html',
                controller: 'homeController'
            }
        },
        controller: 'homeController',
        resolve: {
            auth: function($auth) {
                return $auth.validateUser();
            }
        }
    }).state("residents", {
        url: "/residents",
        views: {
            "header": {
                templateUrl: '../../templates/admin/header.html',
                controller: 'homeController'
            },
            "body": {
                templateUrl: 'resident/index_resident.html',
                controller: 'ResidentsCreateController'
            },
            "menu": {
                templateUrl: '../../templates/admin/menu.html',
                controller: 'menuController'
            }
        }
    }).state("newResident", {
        url: "/residents/new",
        views: {
            "header": {
                templateUrl: '../../templates/admin/header.html',
                controller: 'homeController'
            },
            "body": {
                templateUrl: 'resident/new_resident.html',
                controller: 'ResidentsCreateController'
            },
            "menu": {
                templateUrl: '../../templates/admin/menu.html',
                controller: 'menuController'
            }
        }
    }).state("newVehicule", {
        url: "/vehicules/new",
        views: {
            "header": {
                templateUrl: '../admin/header.html',
                controller: 'homeController'
            },
            "body": {
                templateUrl: '../admin/new_car.html',
                controller: 'vehiculeController'
            },
            "menu": {
                templateUrl: '../admin/menu.html',
                controller: 'menuController'
            }
        }
    })
});

app.controller('homeController', function() {

})
app.controller('menuController', function() {

})

app.controller('residentController', function($scope) {

})

app.controller('vehiculeController', function() {

})
