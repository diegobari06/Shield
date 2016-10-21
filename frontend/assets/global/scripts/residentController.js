'use strict';

app.controller('ResidentsListController', function($scope, $state, $rootScope, $window, residentsFunctions, usersFunctions, commonMethods) {
    commonMethods.validatePermisson(2);
    $rootScope.active = "residents";
    residentsFunctions.getAll().success(function(residents) {
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#tableData").fadeIn(300);
        }, 200)

        $scope.residents = residents;

    });

    residentsFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    })
    $scope.deleteResident = function(id, name, last_name) {
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar al residente " + name + " " + last_name + "?",
            buttons: {
                confirm: {
                    label: 'Aceptar',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger'
                }
            },
            callback: function(result) {
                if (result) {
                    commonMethods.waitingMessage();
                    residentsFunctions.delete(id).success(function() {
                        residentsFunctions.getAll().success(function(residents) {
                            $scope.residents = residents;
                            bootbox.hideAll();
                            toastr["success"]("Se ha eliminado el residente correctamente");
                        })
                    });
                }
            }
        });


    };

});
app.controller('ResidentsViewController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, residentsFunctions) {
    $rootScope.active = "residents";
    residentsFunctions.getAll().success(function(residents) {
        $scope.residents = residents;
    })
});
app.controller('ResidentsCreateController', function($scope, $http, $rootScope, $state, residentsFunctions, usersFunctions, commonMethods) {
    commonMethods.validatePermisson(2);
    $rootScope.active = "residents";
    $scope.permisson = 2;
    $scope.title = "Nuevo residente";
    $scope.button = "Registrar";
    commonMethods.validateLetters();
    commonMethods.validateNumbers();
    residentsFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    })
    $scope.actionButton = function() {

        residentsFunctions.getAll().success(function(residents) {
            $scope.residents = residents
            if (commonMethods.validateRepeat($scope.residents, $scope.identification_number, 1)) {
                toastr["error"]("La cédula ingresada ya existe");
            } else if (commonMethods.validateRepeat($scope.residents, $scope.email, 2)) {
                toastr["error"]("El correo ingresado ya existe");
            } else {
                commonMethods.waitingMessage();
                var number = 0;
                residentsFunctions.insert({
                    name: $scope.name,
                    last_name: $scope.last_name,
                    second_last_name: $scope.second_last_name,
                    company_id: $rootScope.user.company_id,
                    identification_number: $scope.identification_number,
                    birthday: $scope.birthday,
                    email: $scope.email,
                    house_id: $scope.house.id,
                    phone_number: $scope.phone_number,
                    isOwner: number
                }).success(function(dataResident) {
                    if ($scope.isOwner) {
                        usersFunctions.sign_up({
                            email: $scope.email,
                            confirm_success_url: "/",
                            permission_level: 1,
                            id_company: 3,
                            resident_id: dataResident.id
                        }).success(function(data) {
                            residentsFunctions.update(dataResident.id, {
                                user_id: data.id,
                                is_owner: 1,
                                number: 1
                            }).success(function(data) {
                                bootbox.hideAll();
                                $state.go('residents');
                                toastr["success"]("Se ha registrado el usuario correctamente");
                            });
                        });
                    } else {
                        bootbox.hideAll();
                        $state.go('residents');
                        toastr["success"]("Se ha registrado el usuario correctamente");
                    }
                })
            }
        });
    }
});


app.controller('ResidentsEditController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, residentsFunctions, usersFunctions, commonMethods) {
    $rootScope.active = "residents";
    $scope.permisson = 2;
    var residentName, isOwner, user_id, company_id, email, identification_number;
    $scope.title = "Editar residente";
    $scope.button = "Editar";
    commonMethods.validateLetters();
    commonMethods.validateNumbers();
    $scope.selectedOption = {};
    residentsFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    });
    residentsFunctions.get($stateParams.id).success(function(data) {
        $scope.name = data.name;
        $scope.residentId = data.id;
        $scope.residentName = data.name;
        $scope.last_name = data.last_name;
        $scope.second_last_name = data.second_last_name;
        $scope.identification_number = data.identification_number;
        $scope.birthday = data.birthday;
        $scope.email = data.email;
        $scope.house_id = data.house_id;
        $scope.phone_number = data.phone_number;
        isOwner = data.is_owner;
        user_id = data.user_id;
        company_id = data.company_id;
        email = data.email;
        identification_number = data.identification_number;
        if (data.is_owner == 1) {
            $("#checkbox1").prop("checked", true);
        }
        setTimeout(function() {
            var house = $scope.houses.filter(function(el) {
                return el.id == data.house_id;
            });
            $scope.house = house[0];
            $scope.$apply();
        }, 700);


    });

    $scope.actionButton = function() {


        residentsFunctions.getAll().success(function(residents) {
            $scope.residents = residents
            if (commonMethods.validateRepeat($scope.residents, $scope.identification_number, 1) && $scope.identification_number != identification_number) {
                toastr["error"]("La cédula ingresada ya existe");
            } else if (commonMethods.validateRepeat($scope.residents, $scope.email, 2) && $scope.email != email) {
                toastr["error"]("El correo ingresado ya existe");
            } else {
                commonMethods.waitingMessage();
                var number;
                var makeAcccion;
                if ($scope.isOwner && isOwner == 0) {
                    number = 1;
                    makeAcccion = 1;
                } else if ($('#checkbox1').prop('checked') == false && isOwner == 1) {
                    makeAcccion = 2;
                    number = 0;
                }
                residentsFunctions.update($scope.residentId, {
                    name: $scope.name,
                    last_name: $scope.last_name,
                    second_last_name: $scope.second_last_name,
                    company_id: company_id,
                    identification_number: $scope.identification_number,
                    birthday: $scope.birthday,
                    email: $scope.email,
                    house_id: $scope.house.id,
                    phone_number: $scope.phone_number,
                    is_owner: number
                }).success(function(dataResident) {
                    if (makeAcccion == 1) {
                        if (user_id != null) {
                            usersFunctions.update_sign_up(user_id, {
                                id_company: company_id,
                                enabled: 1,
                                email: $scope.email
                            });
                            residentsFunctions.goResident();
                        } else {
                            usersFunctions.sign_up({
                                email: $scope.email,
                                confirm_success_url: "/",
                                permission_level: 1,
                                id_company: company_id,
                                resident_id: dataResident.id
                            }).success(function(data, status) {
                                residentsFunctions.update(dataResident.id, {
                                    user_id: data.id,
                                    is_owner: 1
                                }).success(function(data) {
                                    residentsFunctions.goResident();
                                });
                            });
                        }
                    } else if (makeAcccion == 2) {
                        usersFunctions.update_sign_up(user_id, {
                            id_company: company_id,
                            enabled: 0,
                            email: $scope.email
                        });
                        residentsFunctions.goResident();
                    } else {
                        residentsFunctions.goResident();
                    }


                });
            };
        });


    };

});
app.factory('residentsFunctions', function($http, $state) {
    return {
        insert: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/residents",
                method: 'POST',
                data: data
            });
        },
        update: function(id, data) {
            return $http({
                url: "http://localhost:3000/companies/3/residents/" + id,
                method: 'PUT',
                data: data
            });
        },
        delete: function(id) {
            return $http({
                url: "http://localhost:3000/companies/3/residents/" + id,
                method: 'DELETE'
            });
        },
        getAll: function() {
            return $http.get('http://localhost:3000/companies/3/residents');
        },
        getAllHouses: function() {
            return $http.get('http://localhost:3000/companies/3/houses');
        },
        get: function(id) {
            return $http.get('http://localhost:3000/companies/3/residents/' + id)
        },
        deleteUser: function(id) {
            return $http({
                url: 'http://localhost:3000/companies/3/users/deleteByResident/' + id,
                method: 'DELETE'
            });

        },
        goResident: function() {
            $state.go('residents');
            bootbox.hideAll();
            setTimeout(function() {
                toastr["success"]("Se ha actualizado el usuario correctamente");
            }, 200)

        }
    };
});
app.factory('residentsFunctions', function($http, $state) {
    return {
        insert: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/residents",
                method: 'POST',
                data: data
            });
        },
        update: function(id, data) {
            return $http({
                url: "http://localhost:3000/companies/3/residents/" + id,
                method: 'PUT',
                data: data
            });
        },
        delete: function(id) {
            return $http({
                url: "http://localhost:3000/companies/3/residents/" + id,
                method: 'DELETE'
            });
        },
        getAll: function() {
            return $http.get('http://localhost:3000/companies/3/residents');
        },
        getAllHouses: function() {
            return $http.get('http://localhost:3000/companies/3/houses');
        },
        get: function(id) {
            return $http.get('http://localhost:3000/companies/3/residents/' + id)
        },
        deleteUser: function(id) {
            return $http({
                url: 'http://localhost:3000/companies/3/users/deleteByResident/' + id,
                method: 'DELETE'
            });

        },
        goResident: function() {
            $state.go('residents');
            bootbox.hideAll();
            setTimeout(function() {
                toastr["success"]("Se ha actualizado el usuario correctamente");
            }, 200)

        }
    };
});
