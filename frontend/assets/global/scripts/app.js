var app = angular.module('app', ['ng-token-auth','ui.router','ngResource']).config(function($authProvider,$locationProvider, $urlRouterProvider) {
        var url = window.location.href;
        $authProvider.configure({
            apiUrl: 'http://localhost:3000/companies/0',
            tokenValidationPath:     '/auth/validate_token',
            signOutUrl:              '/auth/sign_out',
            emailRegistrationPath:   '/auth',
            accountUpdatePath:       '/auth',
            accountDeletePath:       '/auth',
            confirmationSuccessUrl:  url,
            passwordResetPath:       '/auth/password',
            passwordUpdatePath:      '/auth/password',
            passwordResetSuccessUrl:  url +'/changePassword',
            emailSignInPath:         '/auth/sign_in',
            storage:                 'sessionStorage'
        });
    });


angular.module('app').config(function($stateProvider, $httpProvider) {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "2000",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
    }

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
            },
            "footer": {
                templateUrl: '../../templates/admin/footer.html'
            }
        }
    }).state("login", {
        url: "/login",
        views: {
            "login": {
                templateUrl: '../Login/login.html',
                controller: 'loginController'
            }
        }
    }).state("requestPassword", {
        url: "/requestPassword",
        views: {
            "login": {
                templateUrl: '../Login/forgot_password.html',
                controller: 'loginController'
            }
        }

    }).state("changePassword", {
        url: "/changePassword",
        views: {
            "login": {
                templateUrl: '../Login/change_password.html',
                controller: 'loginController'
            }

        }

      }).state("editResident", {
            url: "/resident/:id/edit",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'resident/new_resident.html', controller: 'ResidentsEditController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }
      }).state("houses", {
            url: "/houses",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'house/index.html', controller: 'HousesListController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }
      }).state("newHouse", {
            url: "/houses/new",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'house/form.html', controller: 'HousesCreateController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }
      }).state("editHouse", {
            url: "/house/:id/edit",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'house/form.html', controller: 'HousesEditController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }
      }).state("vehicules", {
            url: "/vehicules",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'vehicule/index.html', controller: 'VehiculesListController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }
      }).state("newVehicule", {
          url: "/vehicules/new",
          views: {
              "header": {templateUrl: '../admin/header.html', controller: 'homeController' },
              "body": {templateUrl: '../admin/vehicule/new_vehicule.html',   controller: 'VehiculesCreateController' },
              "menu": { templateUrl: '../admin/menu.html',   controller: 'menuController'   },
              "footer": { templateUrl: '../../templates/admin/footer.html'  }
          }
      }).state("editVehicule", {
            url: "/vehicule/:id/edit",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
                "body": {templateUrl: '../admin/vehicule/new_vehicule.html',   controller: 'VehiculesEditController' },
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }
      }).state("officers", {
            url: "/officers",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
                "body": {templateUrl: '../admin/officer/index.html',   controller: 'OfficersListController' },
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }
      }).state("newOfficer", {
            url: "/officers/new",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
                "body": {templateUrl: '../admin/officer/form.html',   controller: 'OfficersCreateController' },
               "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            }


    }).state("newUser", {
              url: "/users/new",
              views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Users/create_user_acount.html',
                    controller: 'newUsersController'
                },
                "menu": {
                    templateUrl: '../admin/menu.html',
                    controller: 'menuController'
                },
                "footer": {
                    templateUrl: '../../templates/admin/footer.html'
                }
              }
        }).state("access", {
            url: "/access",
            views: {
                "access": {
                    templateUrl: '../Officers/access_door.html',
                    controller: 'accessController'
                }
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

app.controller('homeController', function() {

})
app.controller('menuController', function() {

})

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


//
// app.controller('loginController',function($scope,$auth,$location,$rootScope,$timeout,$state){
//   $rootScope.headerTitle = "Log in";
//   $rootScope.container = false;
//   $scope.login = function() {
//     $auth.submitLogin($scope.loginForm);
//   }
//
//   $scope.$on('auth:login-success', function(ev, user) {
//     usersFunctions.sign_in_count(user.id).success(function (data){
//       if(user.enabled != false){
//         if(data.count == 1){
//           $state.go('changePassword');
//         }else{
//           $state.go('home');
//         }
//       }else{
//         $auth.signOut();
//         popUp.showdown("User disabled");
//         $state.go('login');
//       }
//     })
//
//   });
//
//   $scope.$on('auth:login-error', function(ev, reason) {
//         popUp.showdown("Please check your credentials");
//   });
//
//   $scope.handleUpdatePasswordBtnClick = function() {
//       $auth.updatePassword($scope.updatePasswordForm);
//   };
//
//   $scope.$on('auth:password-change-success', function(ev) {
//     popUp.success("Welcome to Skillmatrix");
//     $state.go('home');
//   });
//
//   $scope.$on('auth:password-change-error', function(ev, reason) {
//     popUp.showdown(reason.errors[0]);
//   });
//
//   $scope.handlePwdResetBtnClick = function() {
//       $auth.requestPasswordReset($scope.passwordResetForm);
//     };
//
//   $scope.$on('auth:password-reset-request-success', function(ev, resp, more, other) {
//     popUp.success("An email has been sent to "+resp.email+" for resetting your password.");
//     $state.go('login');
//   });
//
//   $scope.$on('auth:password-reset-request-error', function(ev, resp) {
//     popUp.showdown("Password reset request failed: " + resp.errors[0]);
// });
//
// });
//
//             app.controller('homeController', function() {
//
//             })
//             app.controller('menuController', function() {
//
//             })
//             app.controller('vehiculeController', function($scope) {})



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
