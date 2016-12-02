'use strict';
app.controller('VehiculesListController', function($scope, $state, $rootScope, $window, vehiculesFunctions, commonMethods) {
    var enabledOptions = true;
    commonMethods.validatePermisson(2);
    $rootScope.active = "vehicules";
    $scope.loadVehiculesEnabled = function() {
        $scope.changesTitles();
        $("#tableData").fadeOut(0);
        setTimeout(function() {
            $("#loadingIcon").fadeIn(300);
        }, 200)
        vehiculesFunctions.getEnabledVehicules().success(function(vehicules) {
            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#tableData").fadeIn(300);
            }, 200)

            $scope.vehicules = $scope.formatVehicules(vehicules);
        });
    }
    $scope.changesTitles = function() {
        if (enabledOptions) {
            $scope.title = "Vehiculos habilitados";
            $scope.buttonTitle = "Ver vehiculos deshabilitados";
            $scope.actionButtonTitle = "Deshabilitar";
        } else {
            $scope.title = "Vehiculos deshabilitados";
            $scope.buttonTitle = "Ver vehiculos habilitados";
            $scope.actionButtonTitle = "Habilitar";
        }
    }
    $scope.findVehiculesByHouse = function(house) {
        var vehiculesByHouse = [];
        if (house == undefined) {
            if (enabledOptions) {
                $scope.loadVehiculesEnabled();
            } else {

                $scope.loadVehiculesDisabled();
            }

        } else {
            $("#tableData").fadeOut(0);
            setTimeout(function() {
                $("#loadingIcon").fadeIn(300);
            }, 200)
            if (enabledOptions) {
                $scope.changesTitles();
                vehiculesFunctions.getEnabledVehicules().success(function(vehicules) {
                    $("#loadingIcon").fadeOut(0);
                    setTimeout(function() {
                        $("#tableData").fadeIn(300);
                    }, 200)
                    $scope.vehicules = vehicules;
                    for (var i = 0; i < $scope.vehicules.length; i++) {
                        console.log($scope.vehicules[i].house_id);
                        if (house.id === $scope.vehicules[i].house_id) {
                            vehiculesByHouse.push($scope.vehicules[i])
                        }
                    }
                    $scope.vehicules = $scope.formatVehicules(vehiculesByHouse);
                });
            } else {
                $scope.changesTitles();
                vehiculesFunctions.getDisabledVehicules().success(function(vehicules) {
                    $("#loadingIcon").fadeOut(0);
                    setTimeout(function() {
                        $("#tableData").fadeIn(300);
                    }, 200)
                    $scope.vehicules = vehicules;

                    for (var i = 0; i < $scope.vehicules.length; i++) {

                        if (house.id === $scope.vehicules[i].house_id) {
                            vehiculesByHouse.push($scope.vehicules[i])
                        }
                    }
                    $scope.vehicules = $scope.formatVehicules(vehiculesByHouse);
                });


            }
        }
    }
    $scope.disableEnabledVehicule = function(id, license_plate) {
        var correctMessage;
        if (enabledOptions) {
            correctMessage = "¿Está seguro que desea deshabilitar al vehículo " + license_plate + "?";
        } else {
            correctMessage = "¿Está seguro que desea habilitar al vehículo " + license_plate + "?";
        }
        bootbox.confirm({

            message: correctMessage,

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
                    if (enabledOptions) {
                        vehiculesFunctions.update(id, {
                            enabled: 0
                        }).success(function() {
                            $scope.loadVehiculesEnabled();
                            bootbox.hideAll();
                            toastr["success"]("Se ha deshabilitado el vehículo correctamente");

                        });
                    } else {
                        vehiculesFunctions.update(id, {
                            enabled: 1
                        }).success(function() {
                            $scope.loadVehiculesDisabled();
                            bootbox.hideAll();
                            toastr["success"]("Se ha habilitado el vehículo correctamente");

                        });
                    }

                }
            }
        });


    };


    vehiculesFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
        $scope.loadVehiculesEnabled();
    })
    $scope.loadVehiculesDisabled = function() {
        $("#tableData").fadeOut(0);
        setTimeout(function() {
            $("#loadingIcon").fadeIn(300);
        }, 200)
        $scope.changesTitles();
        vehiculesFunctions.getDisabledVehicules().success(function(vehicules) {
            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#tableData").fadeIn(300);
            }, 200)
            $scope.vehicules = $scope.formatVehicules(vehicules);
        });
    }
    $scope.switchEnabledDisabledVehicules = function() {
        enabledOptions = !enabledOptions;
        $scope.findVehiculesByHouse($scope.house);
    }
    $scope.formatVehicules = function(vehicules) {
        for (var i = 0; i < vehicules.length; i++) {
            for (var e = 0; e < $scope.houses.length; e++) {
                if (vehicules[i].house_id == $scope.houses[e].id) {
                    vehicules[i].house_id = $scope.houses[e].house_number;
                }
            }
        }
        return vehicules;
    }
    $scope.deleteVehicule = function(id, license_plate) {
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar al vehículo " + license_plate + "?",
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
                    vehiculesFunctions.delete(id).success(function() {
                        if (enabledOptions) {
                            $scope.loadVehiculesEnabled();
                            bootbox.hideAll();

                        } else {
                            $scope.loadVehiculesEnabled();
                            bootbox.hideAll();


                        }
                    });
                }
            }
        });


    };

});

app.controller('VehiculesCreateController', function($scope, $http, $rootScope, $state, vehiculesFunctions, commonMethods) {
    var val
    commonMethods.validateSpecialCharacters();
    $rootScope.active = "vehicules";
    $scope.title = "Registrar vehículo";
    $scope.button = "Registrar";
    vehiculesFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#register_edit_form").fadeIn(300);
        }, 200)
    })
    $scope.submitColor = function() {
        $scope.color = $('#color').css('background-color');
    }
    $scope.brands = {
        data: [{

            name: "Audi"
        }, {
            name: "Alfa Romeo"
        }, {
            name: "BMW"
        }, {
            name: "BYD"
        }, {
            name: "Chevrolet"
        }, {
            name: "Citroen"
        }, {
            name: "Daewoo"
        }, {
            name: "Daihatsu"
        }, {
            name: "Dodge"
        }, {
            name: "Fiat"
        }, {
            name: "Ford"
        }, {
            name: "Honda"
        }, {
            name: "Hummer"
        }, {
            name: "Hyundai"
        }, {
            name: "Izuzu"
        }, {
            name: "Jaguar"
        }, {
            name: "JAC"
        }, {
            name: "Jeep"
        }, {
            name: "Kia"
        }, {
            name: "Land Rover"
        }, {
            name: "Lexus"
        }, {
            name: "Maserati"
        }, {
            name: "Mazda"
        }, {
            name: "Mercedes Benz"
        }, {
            name: "Mini"
        }, {
            name: "Mitsubishi"
        }, {
            name: "Nissan"
        }, {
            name: "Peugeot"
        }, {
            name: "Porshe"
        }, {
            name: "Renault"
        }, {
            name: "Rolls Royce"
        }, {
            name: "Ssanyong"
        }, {
            name: "Subaru"
        }, {
            name: "Suzuki"
        }, {
            name: "Toyota"
        }, {
            name: "Volkswagen"
        }, {
            name: "Volvo"

        }, ]
    }


    $scope.actionButton = function() {
        vehiculesFunctions.getAll().success(function(vehicules) {
            $scope.vehicules = vehicules
            if (commonMethods.validateRepeat($scope.vehicules, $scope.license_plate, 4)) {
                toastr["error"]("El número de placa ingresado ya existe");
            } else {
                commonMethods.waitingMessage();
                vehiculesFunctions.insert({
                    license_plate: $scope.license_plate,
                    house_id: $scope.house.id,
                    color: $scope.color,
                    brand: $scope.brand.name,
                    company_id: 3
                }).success(function() {
                    bootbox.hideAll();
                    $state.go('vehicules');
                    toastr["success"]("Se creó el vehículo correctamente");
                })

            }
        });
    }
});

app.controller('VehiculesEditController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, vehiculesFunctions, commonMethods) {
    $rootScope.active = "vehicules";
    var residentName, val, licence_plate;
    $scope.title = "Editar vehículo";
    $scope.button = "Editar";
    commonMethods.validateSpecialCharacters();
    $scope.submitColor = function() {
        $scope.color = $('#color').css('background-color');
    }
    $scope.brands = {
        data: [{

            name: "Audi"
        }, {
            name: "Alfa Romeo"
        }, {
            name: "BMW"
        }, {
            name: "BYD"
        }, {
            name: "Chevrolet"
        }, {
            name: "Citroen"
        }, {
            name: "Fiat"
        }, {
            name: "Ford"
        }, {
            name: "Honda"
        }, {
            name: "Hyundai"
        }, {
            name: "Izuzu"
        }, {
            name: "Jaguar"
        }, {
            name: "Jeep"
        }, {
            name: "Kia"
        }, {
            name: "Land Rover"
        }, {
            name: "Lexus"
        }, {
            name: "Maserati"
        }, {
            name: "Mazda"
        }, {
            name: "Mercedes Benz"
        }, {
            name: "Mitsubishi"
        }, {
            name: "Nissan"
        }, {
            name: "Peugeot"
        }, {
            name: "Porshe"
        }, {
            name: "Renault"
        }, {
            name: "Ssanyong"
        }, {
            name: "Subaru"
        }, {
            name: "Suzuki"
        }, {
            name: "Toyota"
        }, {
            name: "Volkswagen"
        }, {
            name: "Volvo"

        }, ]
    }


    vehiculesFunctions.get($stateParams.id).success(function(data) {
        vehiculesFunctions.getAllHouses().success(function(houses) {
            $scope.houses = houses;

            $scope.license_plate = data.license_plate;
            $scope.vehiculeId = data.id;
            $scope.color = data.color;

            $scope.brand = $scope.brands.data[1];
            setTimeout(function() {
                var brand = $scope.brands.data.filter(function(el) {
                    return el.name == data.brand;
                })
                $scope.brand = brand[0];
            }, 100);

            licence_plate = $scope.license_plate;
            setTimeout(function() {
                var house = $scope.houses.filter(function(el) {
                    return el.id == data.house_id;
                });



                $scope.house = house[0];
                $scope.$apply();
                $("#loadingIcon").fadeOut(0);
                setTimeout(function() {
                    $("#register_edit_form").fadeIn(300);
                }, 200)
            }, 100);
        })
    });


    $scope.actionButton = function() {
        vehiculesFunctions.getAll().success(function(vehicules) {
            $scope.vehicules = vehicules
            if (commonMethods.validateRepeat($scope.vehicules, $scope.license_plate, 4) && $scope.license_plate != licence_plate) {
                toastr["error"]("El número de placa ingresado ya existe");
            } else {
                commonMethods.waitingMessage();
                vehiculesFunctions.update($scope.vehiculeId, {
                    license_plate: $scope.license_plate,
                    house_id: $scope.house.id,
                    color: $scope.color,
                    brand: $scope.brand.name,
                    company_id: 3
                }).success(function() {
                    bootbox.hideAll();
                    $state.go('vehicules');
                    toastr["success"]("Se editó el vehículo correctamente");
                })
            }
        });
    }


});

app.factory('vehiculesFunctions', function($http, $rootScope) {
    var server = "http://localhost:3000/companies/" + $rootScope.user.company_id;
    return {
        insert: function(data) {
            return $http({
                url: server + "/vehicules/",
                method: 'POST',
                data: data
            });
        },
        update: function(id, data) {
            return $http({
                url: server + "/vehicules/" + id,
                method: 'PUT',
                data: data
            })
        },
        delete: function(id) {
            return $http({
                url: server + "/vehicules/" + id,
                method: 'DELETE'
            });
        },
        getEnabledVehicules: function() {
            return $http.get(server + '/vehicules/find/enabled');
        },
        getDisabledVehicules: function() {
            return $http.get(server + '/vehicules/find/disabled');
        },
        getAll: function() {
            return $http.get(server + '/vehicules');
        },
        getAllHouses: function() {
            return $http.get(server + '/houses');
        },
        get: function(id) {
            return $http.get(server + '/vehicules/' + id);
        }
    };
});
