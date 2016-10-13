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
            },
            "menu": {
                templateUrl: '../../templates/admin/menu.html',
                controller: 'menuController'
            },
            "footer": {
                templateUrl: '../../templates/admin/footer.html'
            }
        },
        controller: 'homeController',
        resolve: {
            auth: function($auth) {

                 if($auth.validateUser()){
                  return $auth.validateUser();
                }else{
                       $state.go('login');
                }
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
        },
          resolve: {
            auth: function($auth) {
              return $auth.validateUser();
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
        },
          resolve: {
            auth: function($auth) {
              return $auth.validateUser();
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
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
                }
              }
      }).state("houses", {
            url: "/houses",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'house/index.html', controller: 'HousesListController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
                }
              }
      }).state("newHouse", {
            url: "/houses/new",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'house/form.html', controller: 'HousesCreateController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
                }
              }
      }).state("editHouse", {
            url: "/house/:id/edit",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'house/form.html', controller: 'HousesEditController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
                }
              }
      }).state("vehicules", {
            url: "/vehicules",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
              "body":  {templateUrl: 'vehicule/index.html', controller: 'VehiculesListController'},
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
                }
              }
      }).state("newVehicule", {
          url: "/vehicules/new",
          views: {
              "header": {templateUrl: '../admin/header.html', controller: 'homeController' },
              "body": {templateUrl: '../admin/vehicule/new_vehicule.html',   controller: 'VehiculesCreateController' },
              "menu": { templateUrl: '../admin/menu.html',   controller: 'menuController'   },
              "footer": { templateUrl: '../../templates/admin/footer.html'  }
          },
            resolve: {
              auth: function($auth) {
                return $auth.validateUser();
              }
            }
      }).state("editVehicule", {
            url: "/vehicule/:id/edit",
            views: {
              "header": {templateUrl: '../../templates/admin/header.html',  controller: 'homeController'},
                "body": {templateUrl: '../admin/vehicule/new_vehicule.html',   controller: 'VehiculesEditController' },
              "menu":  {templateUrl: '../../templates/admin/menu.html', controller: 'menuController'},
                "footer": { templateUrl: '../../templates/admin/footer.html'  }
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
                }
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
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
                }
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
              },
                resolve: {
                  auth: function($auth) {
                    return $auth.validateUser();
                  }
                }
        }).state("access", {
            url: "/access",
            views: {
                "access": {
                    templateUrl: '../Officers/access_door.html',
                    controller: 'accessController'
                }
            },
              resolve: {
                auth: function($auth) {
                  return $auth.validateUser();
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

app.controller('homeController', function($scope,$auth,$location,$rootScope,$timeout,$state,$window) {



if($rootScope.user.signedIn){
    console.log("ha iniciado sesion");
}
console.log($rootScope.user);
  $rootScope.isAdmin = function(){
    if($rootScope.user.signedIn && $rootScope.user.permission_level == 2){
        return true;
    }else{
        return false;
   }
};

  $scope.handleSignOutBtnClick  = function(){
    $auth.signOut();
  };

  $rootScope.$on('auth:logout-success', function(ev){
   $state.go('login');
  });

  $rootScope.$on('auth:logout-error', function(ev, reason) {
    bootbox.alert("Logout error", function() {
              });
  });

});
app.controller('menuController', function() {

})
