app.controller('accessController', function($scope, $state, $rootScope, $window, accessFunctions, residentsFunctions, commonMethods, vehiculesFunctions, officersFunctions, residentsAccionsController, housesFunctions) {
    commonMethods.validateLetters();
    commonMethods.validateNumbers();
    commonMethods.validateSpecialCharacters();
    var residentsPrueba, vehiculesPrueba, housesPrueba, emergencyList, visitorsList;
    var emergency_id;
    var attended = 0;

    var house_number, securityKey, emergencyKey;
    $scope.show = 4;
    getHomeServices = function() {
        accessFunctions.getNotes().success(function(data) {
            $scope.notes = $scope.formatHouses(data);
            $scope.notesQuantity = data.length;
        });
    }

    residentsFunctions.getAll().success(function(list) {
        residentsPrueba = list;
    });
    vehiculesFunctions.getAll().success(function(list) {
        vehiculesPrueba = list;
    });
    housesFunctions.getAll().success(function(houses) {
        $scope.houses = houses;
        housesPrueba = houses;
    })
    accessFunctions.getVisitors().success(function(visitors) {
        $scope.visitors = visitors;
        visitorsList = visitors;
    })

    $("#loadingIconaa").fadeIn(0);
    getInfo = function() {
        if ($rootScope.user.signedIn && $rootScope.user.permission_level == 3) {

            residentsFunctions.getAll().success(function(list) {
                residentsPrueba = list;
            });
            vehiculesFunctions.getAll().success(function(list) {
                vehiculesPrueba = list;
            });
            accessFunctions.getVisitors().success(function(visitors) {
                $scope.visitors = visitors;
                visitorsList = visitors;
            })
        }

    }

    $scope.hideEmergencyForm = 1
    getEmergency = function() {
        if ($rootScope.user.signedIn && $rootScope.user.permission_level == 3 && attended == 0) {

            accessFunctions.getEmergency().success(function(emergency) {

                if (emergency.isAttended == 1) {
                    attended = 1;
                    angular.forEach(housesPrueba, function(itemHouse, index) {
                        if (itemHouse.id == emergency.house_id) {
                            $scope.house_number_emergency = itemHouse.house_number;

                        }
                    });

                    $scope.hideRegisterForm = 1;
                    $scope.hideEmergencyForm = 2;
                    $scope.show = 7;
                    emergency_id = emergency.id;
                    colorDark();

                    function colorDark() {
                        $("#emergencyContainer").animate({
                            backgroundColor: '#DF0101',

                        }, 200, function() {
                            colorLight();
                        });
                    }

                    function colorLight() {
                        $("#emergencyContainer").animate({
                            backgroundColor: '#8A0808',

                        }, 200, function() {
                            colorDark();
                        });
                    }
                }


            });
        }
    }
    $scope.getVehicule = function() {
        $scope.id_number = "";
        if ($scope.id_vehicule != "") {
            $("#vehicule_license_plate").css("text-transform", "uppercase");
        } else {
            $("#vehicule_license_plate").css("text-transform", "none");
            $("#vehicule_license_plate").attr("placeholder", "Número placa (sin guiones)");

        }
        if ($scope.id_vehicule == "") {
            $scope.show = 4;
        } else {
            $scope.show = 3;
            angular.forEach(vehiculesPrueba, function(item, index) {
                if (item.license_plate == $scope.id_vehicule) {
                    $scope.vehiculeRegisteredTitle = "Vehiculo registrado";
                    $scope.colorVehiculeRegistered = "green-font";
                    $scope.imageVehiculeState = "success-car-image";
                    $("#vehiculeAccess").fadeIn(100);
                    $scope.show = 2;
                    $scope.license_plate = item.license_plate;
                    $scope.SelectedBrand = item.brand;
                    $scope.color = item.color;
                    angular.forEach(housesPrueba, function(itemHouse, index) {
                        if (itemHouse.id == item.house_id) {
                            house_number = itemHouse.house_number;
                            $scope.SelectedHouse = house_number;
                            securityKey = itemHouse.securityKey;
                            emergencyKey = itemHouse.emergencyKey;
                        }
                    });
                    if (item.enabled == 0) {
                        $scope.vehiculeRegisteredTitle = "Vehiculo no habilitado";
                        $scope.colorVehiculeRegistered = "red-font";
                        $scope.imageVehiculeState = "disabled-car-image";
                    }
                }
            });

        }

    };
    $scope.getResident = function() {
        $("#loadingIconnn").show();
        $scope.id_vehicule = "";
        $("#vehicule_license_plate").css("text-transform", "none");
        $("#vehicule_license_plate").attr("placeholder", "Número placa (sin guiones)");
        if ($scope.id_number == "") {
            $scope.show = 4;
        } else {
            $scope.show = 3;
            angular.forEach(residentsPrueba, function(item, index) {
                if (item.identification_number == $scope.id_number) {
                    $scope.residentRegisteredTitle = "Residente registrado"
                    $scope.colorResidentRegistered = "green-font"
                    console.log(item.enabled)
                    $("#residentAccess").fadeIn(100);
                    $scope.show = 1;
                    $scope.name = item.name + " " + item.last_name + " " + item.second_last_name;
                    $scope.indentification = item.identification_number;
                    angular.forEach(housesPrueba, function(itemHouse, index) {
                        if (itemHouse.id == item.house_id) {
                            house_number = itemHouse.house_number;
                            $scope.house_number = house_number;
                            securityKey = itemHouse.securityKey;
                            emergencyKey = itemHouse.emergencyKey;
                        }
                    });
                    if (item.enabled == 0) {
                        $scope.residentRegisteredTitle = "Residente no habilitado";
                        $scope.colorResidentRegistered = "red-font";
                    }
                }
            });

            if ($scope.id_number.length > 6) {

                accessFunctions.findRegisteredVisitant($scope.id_number).success(function(data) {

                    if (data == 0) {

                    } else {
                        $("#loadingIconnn").fadeOut(0);
                        $("#visitantInvitedtAccess").fadeIn(0);
                        $scope.show = 10;
                        $scope.invited_visitant_name = data.name
                        $scope.invited_visitant_last_name = data.last_name;
                        $scope.invited_visitant_second_last_name = data.second_last_name;
                        $scope.invited_visitant_house_number = data.id_house;
                        $scope.invited_visitant_indentification = data.identification_number;
                        if (data.license_plate == null) {
                            $scope.invited_visitant_license_plate = "Ninguna";

                        } else {
                            $scope.invited_visitant_license_plate = data.license_plate;
                        }


                    }
                });
            }
        }
    };
    $scope.getKeys = function() {
        if (securityKey == null || emergencyKey == null) {
            toastr["error"]("Esta casa aún no tiene claves de seguridad asignadas");
        } else {
            bootbox.dialog({
                message: '<div class="text-center gray-font font-20"> <h1 class="font-30">Casa número <span class="font-30" id="key_id_house"></span></h1></div>\
                <div class="text-center gray-font font-20"> <h1 class="font-20">Clave de seguridad: <span class="font-20 bold" id="security_key">1134314</span></h1></div>\
                  <div class="text-center gray-font font-20"> <h1 class="font-20">Clave de emergencia: <span class="font-20 bold" id="emergency_key">1134314</span></h1></div>',
                closeButton: false,
                buttons: {
                    confirm: {
                        label: 'Ocultar',
                        className: 'btn-success'
                    }
                },
            })
            document.getElementById("key_id_house").innerHTML = "" + house_number;
            document.getElementById("security_key").innerHTML = "" + securityKey;
            document.getElementById("emergency_key").innerHTML = "" + emergencyKey;
        }
    }
    $scope.getVisitor = function() {
        if ($scope.visitor_id_number == "") {
            clearInputs();
        } else {

            angular.forEach(visitorsList, function(itemVisitor, index) {
                if (itemVisitor.identification_number == $scope.visitor_id_number && itemVisitor.is_invited == 0) {

                    $scope.visitor_name = itemVisitor.name;
                    $scope.visitor_last_name = itemVisitor.last_name;
                    $scope.visitor_second_last_name = itemVisitor.second_last_name;
                    $scope.visitor_license_plate = itemVisitor.license_plate;

                    $scope.houses = housesPrueba;
                    var house = $scope.houses.filter(function(el) {
                        return el.id == itemVisitor.id_house;
                    });
                    $scope.house = house[0];

                }
            });
        }
    }
    $scope.getOfficials = function() {

        $scope.officersLinked = []
        $scope.hideRegisterForm = 1;
        $scope.show = 6;
        officersFunctions.getAll().success(function(list) {
            $scope.officers = list;
            $("#loadingIconaa").fadeOut(0);
            setTimeout(function() {
                $("#officers_turn_container").fadeIn(700);
            }, 100)

        });


    }
    $scope.getKeyInformation = function() {
        angular.forEach(housesPrueba, function(item, index) {
            if (item.securityKey == $scope.security_key) {
                $scope.show = 9;
                $scope.emergencySecurityKeyTitle = "Clave de seguridad";
                $scope.emergency_security_key = item.emergencyKey;
                residentsAccionsController.getResidents(item.id).success(function(residents) {
                    $scope.residents = residents;
                })
                $scope.key_house_number = item.house_number;
                residentsAccionsController.getVehicules(item.id).success(function(vehicules) {
                        $scope.vehicules = vehicules;
                    })
                    // $scope.residentRegisteredTitle = "Residente registrado"
                    // $scope.colorResidentRegistered = "green-font"
                    // console.log(item.enabled)
                    // $("#residentAccess").fadeIn(100);
                    // $scope.show = 1;
                    // $scope.name = item.name + " " + item.last_name + " " + item.second_last_name;
                    // $scope.indentification = item.identification_number;
                    // angular.forEach(housesPrueba, function(itemHouse, index) {
                    //     if (itemHouse.id == item.house_id) {
                    //         house_number = itemHouse.house_number;
                    //         $scope.house_number = house_number;
                    //         securityKey = itemHouse.securityKey;
                    //         emergencyKey = itemHouse.emergencyKey;
                    //     }
                    // });
                    // if (item.enabled == 0) {
                    //     $scope.residentRegisteredTitle = "Residente no habilitado";
                    //     $scope.colorResidentRegistered = "red-font";
                    // }

            } else if (item.emergencyKey == $scope.security_key) {
                $scope.show = 9;
                $scope.emergencySecurityKeyTitle = "Clave de emergencia";
                $scope.emergency_security_key = item.securityKey;
                residentsAccionsController.getResidents(item.id).success(function(residents) {
                    $scope.residents = residents;
                })
                residentsAccionsController.getVehicules(item.id).success(function(vehicules) {
                    $scope.vehicules = vehicules;
                })
                $scope.key_house_number = item.house_number;

            }
        });


    }
    cleanNotes = function() {
        accessFunctions.cleanNotes();
    }
    cleanNotes();
    setInterval(getHomeServices, 5000);
    setInterval(getEmergency, 5000);
    setInterval(cleanNotes, 500000);
    setInterval(getInfo, 12000);
    $scope.hideRegisterForm = 2;
    $scope.officersLinked = []
    $scope.moveToLink = function(officers) {
        commonMethods.moveToLink(officers, $scope.officers, $scope.officersLinked);
    }
    $scope.moveToLinked = function(officers) {
        commonMethods.moveToLinked(officers, $scope.officers, $scope.officersLinked);
    }
    $scope.reportTurn = function() {
        if ($scope.officersLinked.length == 0) {
            toastr["error"]("Debe elegir al menos un oficial para reportar el turno");
        } else {
            commonMethods.waitingMessage();
            accessFunctions.reportTurn({
                company_id: 3,
                officers: $scope.officersLinked,
                access_door_id: 1
            }).success(function() {
                bootbox.hideAll();
                toastr["success"]("Se registró el turno correctamente");
                $scope.hideRegisterForm = 2;
            });
        }
    }

    $scope.formatHouses = function(data) {
        for (var i = 0; i < data.length; i++) {
            data[i].creation_time = moment(data[i].creation_date).fromNow();
            for (var e = 0; e < housesPrueba.length; e++) {
                if (data[i].house_id == housesPrueba[e].id) {
                    data[i].house_id = housesPrueba[e].house_number;
                }
            }
        }
        return data;
    }

    $scope.searchVisitor = function() {
        $scope.show = 5;
        clearInputs();

        if ($scope.id_number == undefined || $scope.id_number == "") {

        } else {

            $scope.visitor_id_number = $scope.id_number;
            angular.forEach(visitorsList, function(itemVisitor, index) {
                if (itemVisitor.identification_number == $scope.visitor_id_number && itemVisitor.is_invited == 0) {

                    $scope.visitor_name = itemVisitor.name;
                    $scope.visitor_last_name = itemVisitor.last_name;
                    $scope.visitor_second_last_name = itemVisitor.second_last_name;
                    $scope.visitor_license_plate = itemVisitor.license_plate;

                    $scope.houses = housesPrueba;
                    var house = $scope.houses.filter(function(el) {
                        return el.id == itemVisitor.id_house;
                    });
                    $scope.house = house[0];

                }
            });
        }

        if ($scope.id_vehicule == undefined || $scope.id_vehicule == "") {} else {

            $scope.visitor_license_plate = $scope.id_vehicule;
            angular.forEach(visitorsList, function(itemVisitor, index) {
                if (itemVisitor.license_plate == $scope.visitor_license_plate && itemVisitor.is_invited == 0) {
                    $scope.visitor_name = itemVisitor.name;
                    $scope.visitor_last_name = itemVisitor.last_name;
                    $scope.visitor_second_last_name = itemVisitor.second_last_name;
                    $scope.visitor_license_plate = itemVisitor.license_plate;
                    $scope.visitor_id_number = itemVisitor.identification_number;
                    $scope.houses = housesPrueba;
                    var house = $scope.houses.filter(function(el) {
                        return el.id == itemVisitor.id_house;
                    });
                    $scope.house = house[0];

                }
            });
        }
    }


    $scope.attendEmergency = function() {
        accessFunctions.reportEmergency(emergency_id, {
            isAttended: 0
        }).success(function(dataResident) {
            attended = 0;
            $scope.hideRegisterForm = 2;
            $scope.hideEmergencyForm = 1;
        });

    }


    $scope.handleSignOutBtnClick = function() {
        $auth.signOut();
    };

    $rootScope.$on('auth:logout-success', function(ev) {
        $state.go('login');
    });

    $rootScope.$on('auth:logout-error', function(ev, reason) {
        bootbox.alert("Logout error", function() {});
    });
    if ($rootScope.user.signedIn) {
        commonMethods.validatePermisson(3);
    } else {
        $state.go('login');
    }

    $rootScope.container = false;
    $scope.access = function() {
        $auth.submitLogin($scope.accessForm);
    }


    $scope.insert_visitant_invited = function() {

        commonMethods.waitingMessage();
        accessFunctions.insertVisitor({
            name: $scope.invited_visitant_name,
            last_name: $scope.invited_visitant_last_name,
            second_last_name: $scope.invited_visitant_second_last_name,
            company_id: 3,
            identification_number: $scope.invited_visitant_indentification,
            license_plate: $scope.invited_visitant_license_plate,
            id_house: $scope.invited_visitant_house_numberd,
            is_invited: 0
        }).success(function() {
            $scope.id_number = "";
            $scope.id_vehicule = "";
            bootbox.hideAll();
            $scope.show = 4;
            toastr["success"]("Se ha registrado el visitante correctamente");

        });


    }

    $scope.capitalize = function() {
        if ($scope.visitor_license_plate != "") {
            $("#license_plate").css("text-transform", "uppercase");
        } else {
            $("#license_plate").css("text-transform", "none");
            $("#license_plate").attr("placeholder", "Número placa (sin guiones)");

        }
    }
    $scope.deleteResidentVehiculeSpots = function() {
        $("#vehicule_license_plate").css("text-transform", "none");
        $("#vehicule_license_plate").attr("placeholder", "Número placa (sin guiones)");
        $scope.id_number = "";
        $scope.id_vehicule = "";
        $scope.show = 4;

    }
    clearInputs = function() {
        $scope.visitor_id_number = ""
        $scope.visitor_name = ""
        $scope.visitor_last_name = "";
        $scope.visitor_second_last_name = "";
        $scope.visitor_license_plate = "";
        $scope.house = "";
    }

    $scope.insertVisitor = function() {
        commonMethods.waitingMessage();
        accessFunctions.insertVisitor({
            name: $scope.visitor_name,
            last_name: $scope.visitor_last_name,
            second_last_name: $scope.visitor_second_last_name,
            company_id: 3,
            identification_number: $scope.visitor_id_number,
            license_plate: $scope.visitor_license_plate,
            id_house: $scope.house.id,
            is_invited: 0
        }).success(function() {
            $scope.id_number = "";
            $scope.id_vehicule = "";
            bootbox.hideAll();
            $scope.show = 4;
            toastr["success"]("Se ha registrado el visitante correctamente");

        });

    }


});

app.factory('accessFunctions', function($http, $rootScope) {
    var server = "http://localhost:3000/companies/" + $rootScope.user.company_id;
    return {
        getResident: function(id) {
            return $http.get(server + '/residents/find/' + id)
        },
        getVisitors: function(id) {
            return $http.get(server + '/visitants')
        },
        getVehicule: function(id) {
            return $http.get(server + '/vehicules/find/' + id)
        },
        getVisitor: function(id) {
            return $http.get(server + '/visitants/find/' + id)
        },
        insertVisitor: function(data) {
            return $http({
                url: server + "/visitants",
                method: 'POST',
                data: data
            });
        },
        getEmergency: function() {
            return $http.get(server + '/emergencies');
        },
        reportEmergency: function(id, data) {
            return $http({
                url: server + "/emergencies/" + id,
                method: 'PUT',
                data: data
            })
        },
        cleanNotes: function() {
            return $http.get(server + '/delete/expired/homeservice')
        },
        getNotes: function(id) {
            return $http.get(server + '/notes')
        },
        findRegisteredVisitant: function(id) {
            return $http.get(server + '/visitants/invited/find/' + id)
        },
        reportTurn: function(data) {
            return $http({
                url: server + "/watches",
                method: 'POST',
                data: data
            })
        }
    };
});
