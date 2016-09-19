var app = angular.module("app", ['ui.router']);

angular.module('app').config(function($stateProvider, $httpProvider) {
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
                controller: 'ResidentsListController'
            },
            "menu": {
                templateUrl: '../../templates/admin/menu.html',
                controller: 'menuController'
            },
            "footer": {
                templateUrl: '../../templates/admin/footer.html'
            }
        }
    }).state("newResident", {
        url: "/residents/new",
        views: {
            "header": {templateUrl: '../../templates/admin/header.html', controller: 'homeController'},
            "body": {templateUrl: 'resident/new_resident.html', controller: 'ResidentsCreateController'},
            "menu": {templateUrl: '../../templates/admin/menu.html',  controller: 'menuController'},
            "footer": {templateUrl: '../../templates/admin/footer.html'}
               }
    }).state("newVehicule", {
        url: "/vehicules/new",
        views: {
            "header": {templateUrl: '../admin/header.html', controller: 'homeController' },
            "body": {templateUrl: '../admin/vehicule/new_vehicule.html',   controller: 'vehiculeController' },
            "menu": { templateUrl: '../admin/menu.html',   controller: 'menuController'   },
            "footer": { templateUrl: '../../templates/admin/footer.html'  }
        }
    }).state("login", {
        url: "/login",
        views: {
            "login": {   templateUrl: '../admin/login.html', controller: 'loginController' }

              }

      }).state("editResident", {
            url: "/resident/:id/edit",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'resident/new_resident.html', controller: 'ResidentsEditController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'}
            }
      }).state("houses", {
            url: "/houses",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'house/index.html', controller: 'HousesListController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'}
            }
      });

});

app.run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams){
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
            ]
    )
app.controller('loginController', function($scope) {
})
app.controller('homeController', function() {

})
app.controller('menuController', function() {

})
app.controller('vehiculeController', function($scope) {})



// <<<<<<< HEAD:frontend/assets/global/scripts/app.js
//         return {
//             validateName: function(items,name){
//              var condition = true;
//               angular.forEach(items, function(item, index) {
//                 if(item.name.toUpperCase()== name.toUpperCase()){
//                    condition = false;
//                 }
//               });
//            return condition;
//            }
//         };
//   })
// =======

// app.factory('commonMethods', function() {
//
//     return {
//         validateName: function(items, name) {
//             var condition = true;
//             angular.forEach(items, function(item, index) {
//                 if (item.name.toUpperCase() == name.toUpperCase()) {
//                     condition = false;
//                 }
//             });
//             return condition;
//         }
//     };
// })
