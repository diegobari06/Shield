 var app = angular.module('app', ['ng-token-auth', 'ui.router', 'ngResource','cloudinary','ngFileUpload']).config(function($authProvider, $locationProvider, $urlRouterProvider) {
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
         "showDuration": "4000",
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

             }

         }).state("registerProfile", {
             url: "/registrar_perfil",
             views: {
                 "login": {
                     templateUrl: '../Login/register_profile.html',
                     controller: 'userRegisterProfileController'
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
         }).state("viewResident", {
             url: "/residentes/:id/detalle",
             views: {
                 "header": {
                     templateUrl: '../../templates/admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: 'resident/info.html',
                     controller: 'ResidentsViewController'
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
             url: "/casas",
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
             url: "/casas/nuevo",
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
             url: "/casas/:id/editar",
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
             url: "/vehiculos",
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
             url: "/vehiculos/nuevo",
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
             resolve: {
                 auth: function($auth) {
                     return $auth.validateUser();
                 }
             }

         }).state("editVehicule", {
             url: "/vehiculos/:id/editar",
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
             url: "/oficiales",
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
             url: "/oficiales/nuevo",
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


         }).state("editOfficer", {
             url: "/oficiales/:id/editar",
             views: {
                 "header": {
                     templateUrl: '../../templates/admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../admin/officer/form.html',
                     controller: 'OfficersEditController'
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
             url: "/usuarios/nuevo",
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
         }).state("users", {
             url: "/usuarios",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Users/users.html',
                     controller: 'UsersListController'
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
             url: "/puertaAcceso",
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
             url: "/condomino/vehiculos/nuevo",
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
         }).state("editCondominoVehicule", {
             url: "/condomino/vehiculos/editar/:id",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Residents/formVehicule.html',
                     controller: 'EditCondominoVehiculeController'
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
         }).state("condominoInvitedVisitors", {
             url: "/condomino/visitantes/invitados",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Residents/index_invited_visitors.html',
                     controller: 'CondominosInvitedVisitorsListController'
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
             url: "/condomino/reportar/visitantes",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Residents/formVisitor.html',
                     controller: 'CreateCondominosVisitorsController'
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
         }).state("reportEmergency", {
             url: "/condomino/reportar/emergencia",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Residents/emergency.html',
                     controller: 'emergencyController'
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
         }).state("keysConguration", {
             url: "/condomino/configuracion/claves",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Residents/keyConfiguration.html',
                     controller: 'keyConfigurationController'
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
         }).state("editProfile", {
             url: "/usuario/perfil/editar/:id",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Users/user_profile.html',
                     controller: 'userEditProfileController'
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
         }).state("watches", {
             url: "/condomino/turnos/consultar",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../admin/watches/index.html',
                     controller: 'watchesController'
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
         }).state("homeService", {
             url: "/condomino/serviciodomicilio",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Residents/home_service.html',
                     controller: 'homeServiceController'
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
         }).state("homeAbsence", {
             url: "/condomino/ausencia",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../Residents/home_absence.html',
                     controller: 'homeAbsenceController'
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
         }).state("adminVisitors", {
             url: "/visitantes",
             views: {
                 "header": {
                     templateUrl: '../admin/header.html',
                     controller: 'homeController'
                 },
                 "body": {
                     templateUrl: '../admin/visitors/index.html',
                     controller: 'VisitorsListController'
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

 app.controller('homeController', function($scope, $auth, $location, $rootScope, $timeout, $state, $window, residentsFunctions, housesFunctions, companiesFunctions) {

     if ($rootScope.user.signedIn && $rootScope.user.permission_level == 1) {

         residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
             $rootScope.user.profile_name = data.name + " " + data.last_name;
             housesFunctions.get(data.house_id).success(function(house) {
                 $rootScope.user.house_or_condominum_name = "Casa " + house.house_number;

             })

         });
     } else if ($rootScope.user.signedIn && $rootScope.user.permission_level == 2) {

         $rootScope.user.profile_name = $rootScope.user.name + " " + $rootScope.user.last_name;
         companiesFunctions.get($rootScope.user.company_id).success(function(company) {
             $rootScope.user.house_or_condominum_name = company.name;

         })

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

 app.factory('commonMethods', function($rootScope, $state, residentsFunctions, vehiculesFunctions) {

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
                     message: '<div class="text-center gray-font font-15"><img src="../../assets/global/img/4.gif" style="width: 20px; height: 20px;"/>  Por favor espere...</div>',
                     closeButton: false,
                 })
                 // var box = bootbox.dialog({
                 //     message: '<div class="text-center gray-font font-15"><img src="../../assets/global/img/loading-circle.gif" style="width:40%; height 40%;" /></div>'
                 //
                 // })
                 // box.find('.modal-content').css({
                 //     'background': 'rgba(0, 0, 0, 0.0)',
                 //     'border': '0px solid',
                 //     'box-shadow': '0px 0px 0px #999'
                 // });
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
         validateSpecialCharacters: function() {
             jQuery('.specialCharacters').keypress(function(tecla) {
                 if ((tecla.charCode < 48) || (tecla.charCode > 90 && tecla.charCode < 97) || (tecla.charCode > 122 && tecla.charCode < 126) || (tecla.charCode > 57 && tecla.charCode < 65)) return false;
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
                 switch (criteria) {
                     case 1:
                         if (item.identification_number == itemToValidate) {
                             condition = true;
                         }
                         break;
                     case 2:
                         if (item.email.toUpperCase() == itemToValidate.toUpperCase()) {
                             condition = true;
                         }
                         break;
                     case 3:
                         if (item.house_number == itemToValidate) {
                             condition = true;
                         }
                         break;
                     case 4:
                         if (item.license_plate == itemToValidate) {
                             condition = true;
                         }
                         break;
                     case 5:
                         if (item.email.toUpperCase() == itemToValidate.toUpperCase()) {
                             condition = true;
                         }
                         break;
                 }


             });
             return condition;
         },
         validatePermisson: function(permission_level) {
             if ($rootScope.user.permission_level != permission_level) {
                 $state.go('home');
             }

         },
         moveToLinked: function(item, itemsToLink, itemsLinked) {
             var index = itemsToLink.indexOf(item);
             itemsToLink.splice(index, 1);
             var item = {
                 id: item.id,
                 name: item.name,
                 last_name: item.last_name,
                 second_last_name: item.second_last_name,
                 identification_number: item.identification_number
             }
             itemsLinked.push(item);

         },
         moveToLink: function(item, itemsToLink, itemsLinked) {
             var index = itemsLinked.indexOf(item);
             itemsLinked.splice(index, 1);
             itemsToLink.push(item);
         }
     };
 })
