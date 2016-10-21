var app = angular.module('app', ['ng-token-auth', 'ui.router', 'ngResource']).config(function($authProvider, $locationProvider, $urlRouterProvider) {
    var url = window.location.href;
    $authProvider.configure({
        apiUrl: 'http://localhost:3000/companies/0',
        tokenValidationPath: '/auth/validate_token',
        signOutUrl: '/auth/sign_out',
        emailRegistrationPath: '/auth',
        accountUpdatePath: '/auth',
        accountDeletePath: '/auth',
        confirmationSuccessUrl: url,
        passwordResetPath: '/auth/password',
        passwordUpdatePath: '/auth/password',
        passwordResetSuccessUrl: url + '/changePassword',
        emailSignInPath: '/auth/sign_in',
        storage: 'sessionStorage'
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
                    return $auth.validateUser();
                }
            }
        }).state("residents", {
            url: "/residentes",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: 'resident/index.html',
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
            url: "/residentes/nuevo",
            views: {

                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: 'resident/form.html',
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

            },
            resolve: {
                auth: function($auth) {
                    return $auth.validateUser();
                }
            }

        }).state("editResident", {
            url: "/residentes/:id/editar",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: 'resident/form.html',
                    controller: 'ResidentsEditController'
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
        }).state("houses", {
            url: "/houses",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: 'house/index.html',
                    controller: 'HousesListController'
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
        }).state("newHouse", {
            url: "/houses/new",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: 'house/form.html',
                    controller: 'HousesCreateController'
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
        }).state("editHouse", {
            url: "/house/:id/edit",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: 'house/form.html',
                    controller: 'HousesEditController'
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
        }).state("vehicules", {
            url: "/vehicules",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: 'vehicule/index.html',
                    controller: 'VehiculesListController'
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
        }).state("newVehicule", {
            url: "/vehicules/new",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../admin/vehicule/new_vehicule.html',
                    controller: 'VehiculesCreateController'
                },
                "menu": {
                    templateUrl: '../admin/menu.html',
                    controller: 'menuController'
                },
                "footer": {
                    templateUrl: '../../templates/admin/footer.html'
                }
            },

        }).state("editVehicule", {
            url: "/vehicule/:id/edit",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../admin/vehicule/new_vehicule.html',
                    controller: 'VehiculesEditController'
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
        }).state("officers", {
            url: "/officers",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../admin/officer/index.html',
                    controller: 'OfficersListController'
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
        }).state("newOfficer", {
            url: "/officers/new",
            views: {
                "header": {
                    templateUrl: '../../templates/admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../admin/officer/form.html',
                    controller: 'OfficersCreateController'
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
        }).state("residents_vehicules", {
            url: "/condomino/vehiculos",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Residents/index_vehicules.html',
                    controller: 'CondominosVehiculesListController'
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
        }).state("condominos", {
            url: "/misCondominos",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Residents/index_residents.html',
                    controller: 'CondominosListController'
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
        }).state("newCondomino", {
            url: "/condominos/nuevo",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Residents/formResident.html',
                    controller: 'CreateCondominoController'
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
        })
        .state("editCondomino", {
            url: "/condominos/editar/:id",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Residents/formResident.html',
                    controller: 'editCondominoController'
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
        })
        .state("newCondominoVehicule", {
            url: "/condomino/vehiculos/editar/:id",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Residents/formVehicule.html',
                    controller: 'CreateCondominoVehiculeController'
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
        }).state("condominoVisitors", {
            url: "/condomino/visitantes",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Residents/index_visitors.html',
                    controller: 'CondominosVisitorsListController'
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
        }).state("condominoRegisterVisitor", {
            url: "/condomino/visitantes/reportar",
            views: {
                "header": {
                    templateUrl: '../admin/header.html',
                    controller: 'homeController'
                },
                "body": {
                    templateUrl: '../Residents/formVisitor.html',
                    controller: 'CondominosVisitorsListController'
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
        })


});
app.run(

    ['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]
)

app.controller('homeController', function($scope, $auth, $location, $rootScope, $timeout, $state, $window, residentsFunctions) {

    if ($rootScope.user.signedIn) {
        residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
            $rootScope.user.profile_name = data.name + " " + data.last_name;
        });
    }

    $rootScope.isAdmin = function() {
        if ($rootScope.user.signedIn && $rootScope.user.permission_level == 2) {
            return true;
        } else {
            return false;
        }
    };
    $rootScope.isResident = function() {
        if ($rootScope.user.signedIn && $rootScope.user.permission_level == 1) {
            return true;
        } else {
            return false;
        }
    };

    $scope.handleSignOutBtnClick = function() {
        $auth.signOut();
    };

    $rootScope.$on('auth:logout-success', function(ev) {
        $state.go('login');
    });

    $rootScope.$on('auth:logout-error', function(ev, reason) {
        bootbox.alert("Logout error", function() {});
    });

});
app.controller('menuController', function() {

})

app.factory('commonMethods', function($rootScope, $state) {

    return {

        validateName: function(items, name) {
            var condition = true;
            angular.forEach(items, function(item, index) {
                if (item.name.toUpperCase() == name.toUpperCase()) {
                    condition = false;
                }
            });
            return condition;
        },
        waitingMessage: function(message) {
            bootbox.dialog({
                message: '<div class="text-center gray-font font-17"><img src="../../assets/global/img/loader4.gif" /> Por favor espere...</div>'
            })

        },
        validateLetters: function() {
            $(".letters").keypress(function(key) {
                if ((key.charCode < 97 || key.charCode > 122) //letras mayusculas
                    &&
                    (key.charCode < 65 || key.charCode > 90) //letras minusculas
                    &&
                    (key.charCode != 45) //retroceso
                    &&
                    (key.charCode != 241) //ñ
                    &&
                    (key.charCode != 209) //Ñ
                    &&
                    (key.charCode != 32) //espacio
                    &&
                    (key.charCode != 225) //á
                    &&
                    (key.charCode != 233) //é
                    &&
                    (key.charCode != 237) //í
                    &&
                    (key.charCode != 243) //ó
                    &&
                    (key.charCode != 250) //ú
                    &&
                    (key.charCode != 193) //Á
                    &&
                    (key.charCode != 201) //É
                    &&
                    (key.charCode != 205) //Í
                    &&
                    (key.charCode != 211) //Ó
                    &&
                    (key.charCode != 218) //Ú

                )
                    return false;
            });
        },
        validateNumbers: function() {
            jQuery('.numbers').keypress(function(tecla) {
                if (tecla.charCode < 48 || tecla.charCode > 57) return false;
            });
        },
        validateRepeat: function(items, itemToValidate, criteria) {
            var condition = false;
            angular.forEach(items, function(item, index) {
                if (item.identification_number == itemToValidate && criteria == 1) {
                    condition = true;
                } else if (criteria == 2 && item.email.toUpperCase() == itemToValidate.toUpperCase()) {
                    condition = true;
                }
            });
            return condition;
        },
        validatePermisson: function(permission_level) {
            if ($rootScope.user.permission_level != permission_level) {
                $state.go('home');
            }

        }

    };
})
