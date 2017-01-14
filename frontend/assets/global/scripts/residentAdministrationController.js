'use strict';
app.controller('CondominosListController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions, housesFunctions, usersFunctions, commonMethods) {
    $rootScope.active = "residentsHouses";
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        residentsAccionsController.getResidents(data.house_id).success(function(residents) {
            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#residents_container").fadeIn(700);
            }, 100)
            $scope.buttonDisabledEnabled = "Residentes deshabilitados";
            $scope.titleCondominosIndex = "Residentes de la filial";
            $scope.titleDisabledButton = "Deshabilitar residente";
            $scope.iconDisabled = "fa fa-user-times";
            $scope.color = "red";
            $scope.residents = residents;

            housesFunctions.get(data.house_id).success(function(dataHouse) {
                if (dataHouse.securitykey == null && dataHouse.emergencyKey == null) {
                    bootbox.confirm({
                        message: '<div class="gray-font font-15">Sus claves de seguridad aun no han sido definidas, recuerde que el tener establecidas las claves le provee mayor seguridad.</div>',
                        closeButton: false,

                        buttons: {
                            confirm: {
                                label: 'Establecer ahora',
                                className: 'btn-success'
                            },
                            cancel: {
                                label: 'Recordarmelo luego',
                                className: 'btn-danger'
                            }
                        },
                        callback: function(result) {
                            if (result) {
                                $state.go('keysConguration');
                            }

                        }
                    })
                }
            })
        });
    });

    $scope.isUser = function(resident) {
        if ($rootScope.user.id == resident.user_id) return true;
        return false;
    }
    var enabledOptions = true;
    $scope.swithEnabledDisabledResidentes = function() {
        enabledOptions = !enabledOptions;
        $("#loadingIcon").fadeIn(0);
        $("#residents_container").fadeOut(0);
        if (enabledOptions) {
            $scope.buttonDisabledEnabled = "Residentes deshabilitados";
            $scope.titleCondominosIndex = "Residentes de la filial ";
            $scope.titleDisabledButton = "Deshabilitar residente";
            $scope.iconDisabled = "fa fa-user-times";
            $scope.color = "red";
            residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
                residentsAccionsController.getResidents(data.house_id).success(function(residents) {
                    $("#loadingIcon").fadeOut(0);
                    setTimeout(function() {
                        $("#residents_container").fadeIn(700);
                    }, 100)
                    $scope.residents = residents;
                });
            });
        } else {
            $scope.buttonDisabledEnabled = "Residentes habilitados";
            $scope.titleCondominosIndex = "Habitantes de la filial (deshabilitados)";
            $scope.iconDisabled = "fa fa-undo";
            $scope.color = "green";
            residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
                residentsAccionsController.getResidentsDisabled(data.house_id).success(function(residents) {
                    $("#loadingIcon").fadeOut(0);
                    setTimeout(function() {
                        $("#residents_container").fadeIn(700);
                    }, 100)

                    $scope.residents = residents;
                    $scope.titleDisabledButton = "Habilitar residente";

                })
            })
        }

    }
    $scope.disableEnabledResident = function(id, house_id, name, last_name, user_id, is_owner, company_id) {
        var correctMessage;
        if (enabledOptions) {
            correctMessage = "¿Está seguro que desea deshabilitar al residente " + name + " " + last_name + "?";
        } else {
            correctMessage = "¿Está seguro que desea habilitar al residente " + name + " " + last_name + "?";
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
                        residentsFunctions.update(id, {
                            enabled: 0
                        }).success(function() {
                            residentsAccionsController.getResidents(house_id).success(function(residents) {
                                $scope.residents = residents;
                                bootbox.hideAll();
                                toastr["success"]("Se ha desabilitado el residente correctamente");
                            })
                            if (is_owner == 1) {
                                usersFunctions.update_sign_up(user_id, {
                                    id_company: company_id,
                                    enabled: 0
                                })
                            }




                        });
                    } else {
                        residentsFunctions.update(id, {
                            enabled: 1
                        }).success(function() {

                            residentsAccionsController.getResidentsDisabled(house_id).success(function(residents) {
                                $scope.residents = residents;
                                bootbox.hideAll();
                                toastr["success"]("Se ha habilitado el residente correctamente");
                            })
                            if (is_owner == 1) {
                                usersFunctions.update_sign_up(user_id, {
                                    id_company: company_id,
                                    enabled: 1
                                })
                            }

                        });
                    }

                }
            }
        });


    };
});

app.controller('keyConfigurationController', function($scope, $state, $rootScope, $window, $stateParams, residentsAccionsController, housesFunctions, commonMethods, residentsFunctions) {
    $rootScope.active = "keysConguration";
    commonMethods.validatePermisson(1);
    commonMethods.validateSpecialCharacters();
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        housesFunctions.get(data.house_id).success(function(data) {
            $scope.securityKey = data.securityKey;
            $scope.emergencyKey = data.emergencyKey;
            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#register_edit_form").fadeIn(300);
            }, 200)
        })
    });
    $scope.actionButton = function() {

        if ($scope.securityKey == $scope.emergencyKey) {
            toastr["error"]("Las claves no pueden ser iguales");
        } else {
            commonMethods.waitingMessage();
            residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
                housesFunctions.update(data.house_id, {
                    securityKey: $scope.securityKey,
                    emergencyKey: $scope.emergencyKey
                }).success(function() {
                    bootbox.hideAll();
                    $state.go('condominos');
                    toastr["success"]("Se establecieron las claves de seguridad correctamente");


                });
            });
        }
    }
})

app.controller('emergencyController', function($scope, $state, $rootScope, $window, $stateParams, residentsAccionsController, housesFunctions, commonMethods, residentsFunctions) {
    $rootScope.active = "reportemergencyactive";
    commonMethods.validatePermisson(1);

    var id_house;
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        id_house = data.house_id;
    });
    $scope.reportEmergency = function() {
        bootbox.confirm({
            message: '<div class="gray-font font-15">¿Seguro que desea reportar una emergencia?</div>',
            closeButton: false,

            buttons: {
                confirm: {
                    label: 'Reportar emergencia',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger'
                }
            },
            callback: function(result) {
                if (result) {
                    bootbox.dialog({
                        message: '<div class="text-center gray-font font-15"><img src="../../assets/global/img/4.gif" style="width: 20px; height: 20px;"/> Reportando emergencia</div>',
                        closeButton: false,
                    })
                    residentsAccionsController.reportEmergency({
                        company_id: 3,
                        isAttended: 1,
                        house_id: id_house
                    }).success(function() {
                        bootbox.hideAll();
                        toastr["success"]("Se ha reportado la emergencia, enseguida será notificada a los oficiales");

                    });
                }
            }
        })
    }


})

app.controller('CreateCondominoController', function($scope, $state, $rootScope, $window, Upload, cloudinary, $stateParams, residentsAccionsController, residentsFunctions, commonMethods) {
    $rootScope.active = "residentsHouses";
    $scope.title = "Registrar residente";
    $scope.button = "Registrar";
    commonMethods.validateLetters();
    commonMethods.validateNumbers();

    var id_house;
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        id_house = data.house_id;
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#edit_resident_form").fadeIn(300);
        }, 200)
    });
    $scope.uploadFiles = function(files) {
        $scope.files = files;
        if (!$scope.files) return;
        angular.forEach(files, function(file) {
            var formData = new FormData();
            formData.append("file", file);
            console.log(formData.get('file'));
            if (file && !file.$error) {
                file.upload = Upload.upload({
                    url: "https://api.cloudinary.com/v1_1/lighthousesoftware/upload",
                    data: {
                        upload_preset: "vtt33a4m",
                        tags: 'myphotoalbum',
                        context: 'photo=' + $scope.title,
                        file: formData.get('file')
                    }
                }).success(function(data, status, headers, config) {
                    console.log("success");
                }).error(function(data, status, headers, config) {
                    console.log("fail");
                });
            }
        });
    };
    $scope.actionButton = function() {
        residentsFunctions.getAll().success(function(residents) {
            $scope.residents = residents
            if (commonMethods.validateRepeat($scope.residents, $scope.identification_number, 1)) {
                toastr["error"]("La cédula ingresada ya existe");
            } else if (commonMethods.validateRepeat($scope.residents, $scope.email, 2)) {
                toastr["error"]("El correo ingresado ya existe");
            } else {
                commonMethods.waitingMessage();
                // console.log($("#imgInp")[0].files[0]);
                // $scope.uploadFiles($("#imgInp")[0].files);
                $scope.title = "Image (" + $scope.identification_number + " - " + $scope.name + $scope.last_name + ")";
                residentsFunctions.insert({
                    name: $scope.name,
                    last_name: $scope.last_name,
                    second_last_name: $scope.second_last_name,
                    company_id: $rootScope.user.company_id,
                    identification_number: $scope.identification_number,
                    birthday: $scope.birthday,
                    email: $scope.email,
                    house_id: id_house,
                    phone_number: $scope.phone_number
                }).success(function(dataResident) {
                    $state.go('condominos');
                    bootbox.hideAll();

                });
            }
        });
    }
});
app.controller('editCondominoController', function($scope, $auth, $state, $rootScope, $window, $stateParams, residentsAccionsController, residentsFunctions, commonMethods, usersFunctions) {
    $rootScope.active = "residentsHouses";
    $scope.title = "Editar residente";
    $scope.button = "Editar";
    $scope.lastDate = $scope.birthday;
    $scope.keepDate = function() {
        if ($scope.birthday == undefined) {
            $scope.birthday = $scope.lastDate;
        }
    }
    commonMethods.validateLetters();
    commonMethods.validateNumbers();
    var user_id, company_id, email, identification_number, is_owner;
    residentsFunctions.get($stateParams.id).success(function(data) {
        $scope.keepDate();
        $scope.name = data.name;
        $scope.residentId = data.id;
        $scope.residentName = data.name;
        $scope.last_name = data.last_name;
        $scope.second_last_name = data.second_last_name;
        $scope.identification_number = data.identification_number;
        $scope.birthday = moment(data.birthday).format("DD-MM-YYYY");
        $scope.lastDate = moment(data.birthday).format("DD-MM-YYYY");
        $scope.email = data.email;
        $scope.phone_number = data.phone_number;
        user_id = data.user_id;
        company_id = data.company_id;
        email = data.email;
        is_owner = data.is_owner;
        identification_number = data.identification_number;
        if (user_id == $rootScope.user.id) {
            $scope.showSpan = 1;
        }
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#edit_resident_form").fadeIn(300);
        }, 200)
    });

    $scope.actionButton = function() {
        residentsFunctions.getAll().success(function(residents) {
            $scope.residents = residents;
            if (commonMethods.validateRepeat($scope.residents, $scope.identification_number, 1) && $scope.identification_number != identification_number) {
                toastr["error"]("La cédula ingresada ya existe");
            } else if (commonMethods.validateRepeat($scope.residents, $scope.email, 2) && $scope.email != email) {
                toastr["error"]("El correo ingresado ya existe");
            } else {
                commonMethods.waitingMessage();
                residentsFunctions.update($scope.residentId, {
                    name: $scope.name,
                    last_name: $scope.last_name,
                    second_last_name: $scope.second_last_name,
                    company_id: company_id,
                    identification_number: $scope.identification_number,
                    birthday: $scope.birthday,
                    email: $scope.email,
                    phone_number: $scope.phone_number
                }).success(function(dataResident) {

                    if (is_owner == 1 && $scope.email != email) {

                        if (user_id == $rootScope.user.id) {
                            $auth.signOut();
                            $state.go('login');
                            toastr["success"]("Se editó el perfil correctamente, inicie sesión con el nuevo email");
                            setTimeout(function() {

                                usersFunctions.update_sign_up($rootScope.user.id, {
                                    id_company: $rootScope.user.company_id,
                                    enabled: 1,
                                    email: $scope.email
                                });

                            }, 400);
                        } else {
                            // <<<<<<< HEAD
                            toastr["success"]("Se ha editado el residente correctamente");
                            $state.go('condominos');
                            // =======
                            //
                            // >>>>>>> origin/master
                            usersFunctions.update_sign_up($rootScope.user.id, {
                                id_company: $rootScope.user.company_id,
                                enabled: 1,
                                email: $scope.email
                            });
                        }
                    } else {
                        toastr["success"]("Se ha editado el residente correctamente");
                        $state.go('condominos');
                    }


                    bootbox.hideAll();
                });

            }
        });
    }
});
app.controller('CondominosVehiculesListController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions, commonMethods, vehiculesFunctions) {
    $rootScope.active = "vehiculesHouses";
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        residentsAccionsController.getVehicules(data.house_id).success(function(vehicules) {
            $scope.buttonDisabledEnabledVehicules = "Vehículos deshabilitados";
            $scope.titleVehiculeIndex = "Mis vehículos";
            $scope.titleDisabledButton = "Deshabilitar vehículo";
            $scope.iconDisabled = "fa fa-user-times";
            $scope.color = "red";
            if (vehicules == null) {
                $scope.noVehiculeResult = 1;
            } else {
                $scope.noVehiculeResult = 0;
            }
            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#vehicules_container").fadeIn(700);
            }, 100)
            $scope.vehicules = vehicules;
        })
    });
    var enabledOptions = true;
    $scope.swithEnabledDisabledResidentes = function() {
        enabledOptions = !enabledOptions;
        $("#loadingIcon").fadeIn(0);
        $("#vehicules_container").fadeOut(0);
        if (!enabledOptions) {
            $scope.buttonDisabledEnabledVehicules = "Vehículos habilitados";
            $scope.titleVehiculeIndex = "Mis vehículos (deshabilitados)";
            $scope.titleDisabledButton = "Habilitar vehículo";
            $scope.iconDisabled = "fa fa-undo";
            $scope.color = "green";


            residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
                residentsAccionsController.getVehiculesDisabled(data.house_id).success(function(vehicules) {
                    if (vehicules.length == 0) {
                        $scope.noVehiculeResult = 1;
                    } else {
                        $scope.noVehiculeResult = 0;
                    }
                    $("#loadingIcon").fadeOut(0);
                    setTimeout(function() {
                        $("#vehicules_container").fadeIn(700);
                    }, 100)
                    $scope.vehicules = vehicules;
                });
            });
        } else {
            $scope.buttonDisabledEnabledVehicules = "Vehículos deshabilitados";
            $scope.titleVehiculeIndex = "Mis vehículos";
            $scope.titleDisabledButton = "Deshabilitar vehículo";
            $scope.iconDisabled = "fa fa-user-times";
            $scope.color = "red";
            residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
                residentsAccionsController.getVehicules(data.house_id).success(function(vehicules) {

                    if (vehicules.length == 0) {
                        $scope.noVehiculeResult = 1;
                    } else {
                        $scope.noVehiculeResult = 0;
                    }

                    $("#loadingIcon").fadeOut(0);
                    setTimeout(function() {

                        $("#vehicules_container").fadeIn(900);
                    }, 100)

                    $scope.vehicules = vehicules;


                })
            })
        }

    }

    $scope.disableEnabledVehicule = function(id, house_id, license_plate) {
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
                            residentsAccionsController.getVehicules(house_id).success(function(vehicules) {
                                $scope.vehicules = vehicules;
                                bootbox.hideAll();
                                toastr["success"]("Se ha desabilitado el vehiculo correctamente");
                            })
                        });
                    } else {
                        vehiculesFunctions.update(id, {
                            enabled: 1
                        }).success(function() {
                            residentsAccionsController.getVehiculesDisabled(house_id).success(function(vehicules) {
                                $scope.vehicules = vehicules;
                                bootbox.hideAll();
                                toastr["success"]("Se ha habilitado el vehiculo correctamente");
                            })
                        });
                    }

                }
            }
        });


    };


    $scope.deleteVehicule = function(id, house_id, license_plate) {
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
                        residentsAccionsController.getVehicules(house_id).success(function(vehicules) {
                            $scope.vehicules = vehicules;
                            bootbox.hideAll();
                            toastr["success"]("Se ha eliminado el vehículo correctamente");
                        })
                    });
                }
            }
        });


    };
});

app.controller('CreateCondominoVehiculeController', function($scope, $state, $rootScope, $window, $stateParams, residentsAccionsController, residentsFunctions, housesFunctions, vehiculesFunctions, commonMethods) {
    var val
    $rootScope.active = "vehiculesHouses";
    $scope.title = "Registrar vehículo";
    $scope.button = "Registrar";
    commonMethods.validateSpecialCharacters();
    $scope.submitColour = function() {
        val = $('#color-rgb').css('background-color');

    }

    var id_house;
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        id_house = data.house_id;
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#register_edit_form").fadeIn(300);
        }, 200)
    });

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
            $scope.vehicules = vehicules;
            if (commonMethods.validateRepeat($scope.vehicules, $scope.license_plate, 4)) {
                toastr["error"]("El número de placa ingresado ya existe");
            } else {
                commonMethods.waitingMessage();
                vehiculesFunctions.getAll().success(function(houses) {
                    vehiculesFunctions.insert({
                        license_plate: $scope.license_plate,
                        house_id: id_house,
                        color: val,
                        brand: $scope.brand.name,
                        company_id: 3
                    }).success(function() {
                        $state.go('residents_vehicules');
                        bootbox.hideAll();
                        toastr["success"]("Se creó el vehículo correctamente");
                    })


                });

            }
        });
    }
});

app.controller('homeServiceController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, residentsFunctions, usersFunctions, residentsAccionsController, commonMethods) {
    $rootScope.active = "reportHomeService"
    $scope.actionButton = function() {
        var data = {
            description: $scope.note,
            company_id: $rootScope.user.company_id,
            note_type: 1
        }
        commonMethods.waitingMessage();
        residentsFunctions.get($rootScope.user.resident_id).success(function(pdata) {
            data.house_id = pdata.house_id;
            residentsAccionsController.insertNote(data).success(function(data) {
                $state.go('condominos');
                bootbox.hideAll()
                toastr["success"]("Se ha reportado el servicio a domicilio correctamente");
            })
        })
    }
});

app.controller('EditCondominoVehiculeController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, vehiculesFunctions, commonMethods) {
    $rootScope.active = "vehiculesHouses";
    var residentName, val, licence_plate;
    $scope.title = "Editar vehículo";
    commonMethods.validateSpecialCharacters();
    $scope.button = "Editar";
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

        $scope.license_plate = data.license_plate;
        $scope.vehiculeId = data.id;
        $scope.color = data.color;

        $scope.brand = $scope.brands.data[1];
        setTimeout(function() {
            var brand = $scope.brands.data.filter(function(el) {
                return el.name == data.brand;
            })
            $scope.brand = brand[0];
            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#register_edit_form").fadeIn(300);
            }, 200)
        }, 300);

        licence_plate = $scope.license_plate;




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
                    color: $scope.color,
                    brand: $scope.brand.name,
                    company_id: 3
                }).success(function() {
                    bootbox.hideAll();
                    $state.go('residents_vehicules');
                    toastr["success"]("Se editó el vehículo correctamente");
                })
            }
        });
    }


});


app.controller('CondominosVisitorsListController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "residentsVisitors";
    $scope.title = "Visitantes del mes";
    $scope.isConsulting = false;
    var id_house;
    $scope.myVisitors;
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        id_house = data.house_id;
        residentsAccionsController.getVisitors(id_house).success(function(visitors) {
            if (visitors.length == 0) {
                $scope.noVisitorsResult = 1;
            } else {
                $scope.noVisitorsResult = 0;
            }
            $scope.myVisitors = visitors;
        });
    });
    // $scope.revertRenderDate = function(date, hours) {
    //   console.log(date);
    //     var splitted = hours.split(":");
    //     var hour = splitted[0];
    //     var minute = splitted[1];
    //     var am_pm;
    //     if (hour > 12) {
    //         hour = hour - 12;
    //         am_pm = "PM";
    //     } else {
    //         am_pm = "AM"
    //     }
    //     return date + "   " + hour + ":" + minute + " " + am_pm;
    // }
    $scope.isDisableButton = function() {
        if ($scope.consulting_initial_time == undefined && $scope.consulting_final_time == undefined) return true;
        return false;
    }

    $scope.consultVisitors = function() {
        $("#loadingIcon").fadeIn("slow");
        $("#prueba").hide();
        residentsAccionsController.getVisitors(id_house, {
            consulting_initial_time: $scope.consulting_initial_time,
            consulting_final_time: $scope.consulting_final_time
        }).success(function(visitors) {
            $("#loadingIcon").fadeOut(100);
            setTimeout(function() {
                $("#prueba").fadeIn(1000);
            }, 400)
            $scope.title = "Visitantes entre:";
            $scope.titleConsult = $scope.consulting_initial_time + " y " + $scope.consulting_final_time;
            $scope.isConsulting = true;
            for (var i = 0; i < visitors.length; i++) {
                visitors[i].date_time = moment(visitors[i].date_time).format("LL h:mm a");
                if (visitors[i].license_plate === "") {
                    visitors[i].license_plate = "No ingreso en vehículo"
                }
            }
            $scope.visitors = visitors;
        });
    }
    $scope.stopConsulting = function() {
        $("#loadingIcon").fadeIn("slow");
        $("#prueba").hide();
        $scope.consulting_final_time = undefined;
        $scope.consulting_initial_time = undefined;
        $scope.isConsulting = false;
        $scope.getResidents();
        $scope.title = "Visitantes del mes"
        $scope.titleConsult = "";
    }

    $scope.getResidents = function() {
        residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
            residentsAccionsController.getVisitors(data.house_id).success(function(visitors) {
                for (var i = 0; i < visitors.length; i++) {
                    visitors[i].date_time = moment(visitors[i].date_time).format("LL h:mm a");
                    if (visitors[i].license_plate === "") {
                        visitors[i].license_plate = "No ingreso en vehículo"
                    }
                }
                $("#loadingIcon").fadeOut(0);
                setTimeout(function() {
                    $("#prueba").fadeIn(700);
                }, 100)

                $scope.visitors = visitors;
            })
        });
    }
    $scope.getResidents();
});

app.controller('CondominosInvitedVisitorsListController', function($scope, $state, commonMethods, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "residentsInvitedVisitors";
    $scope.title = "Visitantes invitados";
    $scope.isConsulting = false;
    $scope.formshowing = false;
    var id_house;
    $scope.myVisitors;

    $scope.hasPermission = function(visitor) {
        var currentTime = new Date().getTime();
        var intiTime = new Date(visitor.invitation_starting_time).getTime();
        var finalTime = new Date(visitor.invitation_limit_time).getTime();
        if (visitor.is_invited == 3) {
            return false;
        }
        if (intiTime <= currentTime && currentTime <= finalTime) {
            return true;
        }
        return false;
    }
    $scope.properDate = function() {
        return moment(new Date()).format("DD-MM-YYYY");
    }
    $scope.renderHours = function(config) {
        var currentdate = new Date();
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var myHours;
        var calc = minutes % 5;
        if (calc <= 5) {
            minutes = minutes - calc
        } else {
            minutes = minutes + (5 - calc);
        }
        if (config == 2) {
            minutes += 30;
            if (minutes >= 60) {
                hours += 1;
                minutes = minutes - 60;
            }
        }
        var myMinutes;
        var am_pm;
        if (parseInt(hours) > 12) {
            myHours = parseInt(hours) - 12;
            am_pm = " PM";
        } else {
            myHours = hours;
            am_pm = " AM";
        }
        if (Math.round(parseInt(minutes)) < 10) {
            myMinutes = "0" + Math.round(parseInt(minutes));

        } else {
            myMinutes = Math.round(minutes);
        }
        var datetime = myHours + ":" +
            myMinutes + am_pm;
        return datetime;
    }

    $scope.parseDate = function(date, hour) {
        var splitted1 = hour.split(" ");
        var splitted2 = hour.split(":");
        var am_pm = splitted1[1];
        var hour = parseInt(splitted2[0]);
        var minute = splitted2[1].split(" ")[0];
        var finalHour;
        if (am_pm === "PM") {
            finalHour = hour + 12;
            finalHour = finalHour + ":" + minute + ":00";
        } else {
            finalHour = "0" + hour + ":" + minute + ":00";
        }
        return date + ' ' + finalHour;
    }
    $scope.showForm = function(visitor) {
        $('#prueba').fadeOut(300);
        setTimeout(function() {
            $('#form').fadeIn(300);
        }, 300);
        $scope.actualVisitor = visitor;
        if ($scope.actualVisitor.license_plate == "No se registró") {
            $scope.actualVisitor.license_plate = "";
        }
    }
    $scope.initial_hour = $scope.renderHours();
    $scope.final_hour = $scope.renderHours(2);
    $scope.initial_date = moment(new Date()).format("DD-MM-YYYY");
    $scope.final_date = moment(new Date()).format("DD-MM-YYYY");
    $scope.hideForm = function() {
        $('#form').fadeOut(300);
        setTimeout(function() {
            $('#prueba').fadeIn(300);
        }, 300);
        if ($scope.actualVisitor.license_plate == "" || $scope.actualVisitor.license_plate == null) {
            $scope.actualVisitor.license_plate = "No se registró";
        }
    }
    $scope.renewInvitation = function(visitor) {
        $('#form').fadeOut(100);
        setTimeout(function() {
            $('#loadingIcon').fadeIn(100);
        }, 100);
        commonMethods.waitingMessage();
        residentsAccionsController.deleteInvitedVisitor($scope.actualVisitor.id).success(function(data) {
            residentsAccionsController.insert({
                name: $scope.actualVisitor.name,
                last_name: $scope.actualVisitor.last_name,
                second_last_name: $scope.actualVisitor.second_last_name,
                company_id: $rootScope.user.company_id,
                identification_number: $scope.actualVisitor.identification_number,
                license_plate: $scope.actualVisitor.license_plate,
                id_house: id_house,
                invitation_starting_time: $scope.parseDate($scope.initial_date, $scope.initial_hour),
                invitation_limit_time: $scope.parseDate($scope.final_date, $scope.final_hour),
                is_invited: 1
            }).success(function() {
                $scope.getResidents();
                bootbox.hideAll();
                toastr["success"]("Se ha renovado la invitación el visitante correctamente");
            });
        });
    }
    $scope.deleteInvitedVisitor = function(visitor) {
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar el registro?",
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
                    $("#prueba").fadeOut(0);
                    $("#loadingIcon").fadeIn(100);
                    commonMethods.waitingMessage();
                    visitor.is_invited = 3;
                    residentsAccionsController.deleteInvitedVisitor(visitor.id).success(function(data) {
                        $scope.getResidents();
                        toastr["success"]("Se ha eliminado el registro correctamente");
                        bootbox.hideAll();
                    })
                }
            }
        });

    }
    $scope.cancelInvitation = function(visitor) {
        bootbox.confirm({
            message: "¿Está seguro que desea cancelar la invitación de " + visitor.name + "?",
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
                    visitor.is_invited = 3;
                    residentsAccionsController.cancelInvitation(visitor).success(function(data) {
                        bootbox.hideAll();
                        toastr["success"]("Se ha cancelado la invitación correctamente");
                    })
                }
            }
        });

    }
    $scope.getResidents = function() {
        residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
            id_house = data.house_id
            residentsAccionsController.getInvitedVisitors(data.house_id).success(function(visitors) {
                console.log(visitors)
                if (visitors.length == 0) {
                    $scope.noVisitorsResult = 1;
                } else {
                    $scope.noVisitorsResult = 0;
                    for (var i = 0; i < visitors.length; i++) {
                        visitors[i].invitation_starting_time = moment(visitors[i].invitation_starting_time).format("LL h:mm a");
                        visitors[i].invitation_limit_time = moment(visitors[i].invitation_limit_time).format("LL h:mm a");
                        if (visitors[i].license_plate == null || visitors[i].license_plate == "") {
                            visitors[i].license_plate = "No se registró"
                        }
                    }
                }
                $("#loadingIcon").fadeOut(0);
                setTimeout(function() {
                    $("#prueba").fadeIn(700);
                }, 100)
                $scope.visitors = visitors;

            })
        });
    }
    $scope.getResidents();
});

app.controller('CreateCondominosVisitorsController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions, commonMethods) {
    commonMethods.validateLetters();
    commonMethods.validateNumbers();
    commonMethods.validateSpecialCharacters();
    $rootScope.active = "reportInvitation";
    $scope.title = "Reportar visitante";
    $scope.button = "Reportar";
    var id_house;
    $scope.myVisitors;
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        id_house = data.house_id;
        residentsAccionsController.getVisitors(id_house).success(function(visitors) {
            $scope.myVisitors = visitors;
        });
    });

    $scope.findVisitor = function() {
        var myVisitors = $scope.myVisitors;
        if (myVisitors != undefined) {
            for (var i = 0; i < myVisitors.length; i++) {
                if ($scope.identification_number === myVisitors[i].identification_number) {
                    $scope.name = myVisitors[i].name;
                    $scope.last_name = myVisitors[i].last_name;
                    $scope.license_plate = myVisitors[i].license_plate;
                    $scope.second_last_name = myVisitors[i].second_last_name;
                    $scope.is_invited = myVisitors[i].is_invited;
                } else {
                    $scope.name = "";
                    $scope.last_name = "";
                    $scope.license_plate = "";
                    $scope.second_last_name = "";
                }
            }
        }
    }
    $scope.renderHours = function(config) {
        var currentdate = new Date();
        var hours = currentdate.getHours();
        var minutes = currentdate.getMinutes();
        var myHours;
        var calc = minutes % 5;
        if (calc <= 5) {
            minutes = minutes - calc
        } else {
            minutes = minutes + (5 - calc);
        }
        if (config == 2) {
            minutes += 30;
            if (minutes >= 60) {
                hours += 1;
                minutes = minutes - 60;
            }
        }
        var myMinutes;
        var am_pm;
        if (parseInt(hours) > 12) {
            myHours = parseInt(hours) - 12;
            am_pm = " PM";
        } else {
            myHours = hours;
            am_pm = " AM";
        }
        if (Math.round(parseInt(minutes)) < 10) {
            myMinutes = "0" + Math.round(parseInt(minutes));

        } else {
            myMinutes = Math.round(minutes);
        }
        var datetime = myHours + ":" +
            myMinutes + am_pm;
        return datetime;
    }
    $scope.initial_hour = $scope.renderHours();
    $scope.final_hour = $scope.renderHours(2);
    $scope.initial_date = moment(new Date()).format("DD-MM-YYYY");
    $scope.final_date = moment(new Date()).format("DD-MM-YYYY");
    $scope.parseDate = function(date, hour) {
        var splitted1 = hour.split(" ");
        var splitted2 = hour.split(":");
        var am_pm = splitted1[1];
        var hour = parseInt(splitted2[0]);
        var minute = splitted2[1].split(" ")[0];
        var finalHour;
        if (am_pm === "PM") {
            finalHour = hour + 12;
            finalHour = finalHour + ":" + minute + ":00";
        } else {
            finalHour = "0" + hour + ":" + minute + ":00";
        }
        return date + ' ' + finalHour;
    }

    $scope.actionButton = function() {
        commonMethods.waitingMessage();
        residentsAccionsController.getInvitedVisitor({
            id_house: id_house,
            id: $scope.identification_number
        }).success(function(data) {
            console.log(data)
            if (data != 0) {
                bootbox.confirm({
                    message: "Un visitante con la cédula " + $scope.identification_number + " ya se ha invitado con anterioridad, desea renovar su invitación?",
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
                            residentsAccionsController.deleteInvitedVisitor(data.id).success(function(data) {
                                $scope.insertVisitant();
                            });
                        } else {
                            bootbox.hideAll();
                        }
                    }
                });
            } else {
                $scope.insertVisitant();
            }

        })

    }

    $scope.insertVisitant = function() {
        residentsAccionsController.insert({
            name: $scope.name,
            last_name: $scope.last_name,
            second_last_name: $scope.second_last_name,
            company_id: $rootScope.user.company_id,
            identification_number: $scope.identification_number,
            license_plate: $scope.license_plate,
            id_house: id_house,
            invitation_starting_time: $scope.parseDate($scope.initial_date, $scope.initial_hour),
            invitation_limit_time: $scope.parseDate($scope.final_date, $scope.final_hour),
            is_invited: 1
        }).success(function() {
            $state.go('condominoInvitedVisitors');
            bootbox.hideAll();
            toastr["success"]("Se ha reportado el visitante correctamente");
        });
    }
});
app.factory('residentsAccionsController', function($http, $rootScope) {
    var server = "http://localhost:3000/api/companies/" + $rootScope.user.company_id;
    return {
        insert: function(data) {
            return $http({
                url: server + "/visitants",
                method: 'POST',
                data: data
            });
        },
        update: function(id, data) {
            return $http({
                url: server + "/houses/" + id,
                method: 'PUT',
                data: data
            })
        },
        delete: function(id) {
            return $http({
                url: server + "/houses/" + id,
                method: 'DELETE'
            });
        },
        getVisitors: function(id, data) {
            if (data != undefined) {
                return $http.get(server + '/houses/' + id + '/find/visitants/?consulting_initial_time=' + data.consulting_initial_time + '&consulting_final_time=' + data.consulting_final_time + '')
            } else {
                return $http.get(server + '/houses/' + id + '/find/visitants/');
            }
        },
        deleteInvitedVisitor: function(id) {
            return $http({
                url: server + "/visitants/" + id,
                method: 'DELETE'
            });
        },
        cancelInvitation: function(data) {
            return $http({
                url: server + "/visitants/" + data.id,
                method: 'PUT',
                data: data
            });

        },
        getInvitedVisitors: function(id) {
            return $http.get(server + '/houses/' + id + '/find/invited/visitants');
        },
        getInvitedVisitor: function(data) {
            return $http.get(server + '/houses/' + data.id_house + '/find/invited/visitant/' + data.id);
        },
        getResidents: function(id) {
            return $http.get(server + '/houses/' + id + '/find/residents/enabled');
        },
        getResidentsDisabled: function(id) {
            return $http.get(server + '/houses/' + id + '/find/residents/disabled');
        },
        getVehicules: function(id) {
            return $http.get(server + '/houses/' + id + '/find/vehicules/enabled');
        },
        getVehiculesDisabled: function(id) {
            return $http.get(server + '/houses/' + id + '/find/vehicules/disabled');
        },
        reportEmergency: function(data) {
            return $http({
                url: server + "/emergencies",
                method: 'POST',
                data: data
            });

        },
        getVisitant: function(idHouse, id) {
            return $http.get(server + '/houses/' + idHouse + '/find/visitant/' + id);
        },
        insertNote: function(data) {
            return $http({
                url: server + "/notes",
                method: 'POST',
                data: data
            });
        }

    };
});
