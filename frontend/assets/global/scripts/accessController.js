app.controller('accessController', function($scope, $state, $rootScope, $window, accessFunctions, residentsFunctions, commonMethods, vehiculesFunctions, officersFunctions, residentsAccionsController, housesFunctions) {
    commonMethods.validateLetters();
    commonMethods.validateNumbers();
    commonMethods.validateSpecialCharacters();
    var residentsPrueba, vehiculesPrueba, housesPrueba, emergencyList, visitorsList;
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
        // accessFunctions.getVisitors().success(function(visitors) {
        //     $scope.visitors = visitors;
        //     visitorsList = visitors;
        // })
    $("#loadingIconaa").fadeIn(0);

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
            accessFunctions.reportTurn({
                company_id: 3,
                officers: $scope.officersLinked,
                access_door_id: 1
            }).success(function() {
                toastr["success"]("Se registró el turno correctamente");
                $scope.hideRegisterForm = 2;
            });
        }
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

    // $scope.$on("emergency", function() {
    //     console.log('EMERGENCIAAAAAAAAAAAAAAAAAAAAAAAA');
    // });
    // console.log("la variable de prueba es =  " + $rootScope.variableDePrueba);
    // var isEmergency = accessFunctions.getEmergency()
    // if (isEmergency == 1) {
    //     console.log('EMERGENCIAAAAAAAAAAAAAAAAAAAAAAAA');
    // }
    // console.log(isEmergency);
    var emergency_id;
    var attended = 0;
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
    $scope.attendEmergency = function() {
        accessFunctions.reportEmergency(emergency_id, {
            isAttended: 0
        }).success(function(dataResident) {
            attended = 0;
            $scope.hideRegisterForm = 2;
            $scope.hideEmergencyForm = 1;
        });

    }
    setInterval(getEmergency, 5000);
    setInterval(getInfo, 12000);
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


    var house_number, securityKey, emergencyKey;
    $scope.show = 4;
    $scope.getResident = function() {
        $scope.id_vehicule = "";

        $("#vehicule_license_plate").css("text-transform", "capitalize");
        if ($scope.id_number == "") {
            $scope.show = 4;
        } else {
            $scope.show = 3;
            angular.forEach(residentsPrueba, function(item, index) {
                if (item.identification_number == $scope.id_number) {
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
                }
            });
            $("#loadingIconnn").fadeIn(0);
            if ($scope.id_number.length > 6) {

                accessFunctions.findRegisteredVisitant($scope.id_number).success(function(data) {

                    if (data == 0) {
                        console.log('no se encuentra');
                    } else {
                        $("#loadingIconnn").fadeOut(100);
                        setTimeout(function() {
                            $("#visitantInvitedtAccess").fadeIn(200);
                        }, 200)
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
            $("#license_plate").css("text-transform", "capitalize");

        }
    }
    $scope.getVehicule = function() {
        $scope.id_number = "";
        if ($scope.id_vehicule != "") {
            $("#vehicule_license_plate").css("text-transform", "uppercase");
        } else {
            $("#vehicule_license_plate").css("text-transform", "capitalize");

        }
        if ($scope.id_vehicule == "") {
            $scope.show = 4;
        } else {
            $scope.show = 3;
            angular.forEach(vehiculesPrueba, function(item, index) {
                if (item.license_plate == $scope.id_vehicule) {
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

                }
            });

        }

    };
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
        //
        //
        //
        //         residentsFunctions.getAllHouses().success(function(houses){
        //             $scope.houses = houses;
        //             var selectBox = document.getElementById('rec_mode');
        //             for(var i = 0, l = houses.length; i < l; i++){
        //               var option = houses[i];
        //               selectBox.options.add( new Option(option.house_number, option.id) );
        //               }
        //         })
        //
        //
        //         function getVisitor() {
        //
        //             var selectBox = document.getElementById('identification_number');
        //             console.log(selectBox);
        //         };
        //
        //         getVisitor = function(){
        //           var selectBox = document.getElementById('identification_number');
        //           console.log(selectBox);
        //         }
        //
        //    bootbox.confirm({
        //     message: '<div class="">\
        //     						<div class="portlet-title gray-font">\
        //     							<div class="caption text-center font-19" >\
        //     							 Registrar visitante\
        //     							</div>\
        //     						</div>\
        //     						<div class="portlet-body form">\
        //     							<form role="form">\
        //     								<div class="form-body">\
        //                     <div class="form-group col-md-offset-1 col-md-10">\
        //                       <div class="input-group">\
        //                         <span class="input-group-addon">\
        //                         <i class="fa fa-indent"></i>\
        //                         </span>\
        //                         <input type="text" onchange="getVisitor()" class="form-control"  id="identification_number" placeholder="Cédula">\
        //                       </div>\
        //                     </div>\
        //     									<div class="form-group col-md-offset-1 col-md-10">\
        //     										<div class="input-group">\
        //     											<span class="input-group-addon">\
        //     											<i class="fa fa-user"></i>\
        //     											</span>\
        //     											<input type="text" id="name" class="form-control" placeholder="Nombre">\
        //     										</div>\
        //     									</div>\
        //                       <div class="form-group col-md-offset-1 col-md-10">\
        //                         <div class="input-group">\
        //                           <span class="input-group-addon">\
        //                           <i class="fa fa-user"></i>\
        //                           </span>\
        //                           <input type="text" class="form-control" id="last_name"  placeholder="Primer apellido">\
        //                         </div>\
        //                       </div>\
        //                       <div class="form-group col-md-offset-1 col-md-10">\
        //                         <div class="input-group">\
        //                           <span class="input-group-addon">\
        //                           <i class="fa fa-user"></i>\
        //                           </span>\
        //                           <input type="text" class="form-control"  id="second_last_name"  placeholder="Segundo apellido">\
        //                         </div>\
        //                       </div>\
        //                       <div class="form-group col-md-offset-1 col-md-10">\
        //                         <div class="input-group">\
        //                           <span class="input-group-addon">\
        //                           <i class="fa fa-car"></i>\
        //                           </span>\
        //                           <input type="text" class="form-control" id="license_plate" placeholder="Número de placa (opcional)">\
        //                         </div>\
        //                       </div>\
        //                       <div class="form-group col-md-offset-1 col-md-10 no-padding" >\
        //                       <label class="col-md-4 col-sm-3 col-xs-5 gray-font">Número de casa</label>\
        //                       <div class="form-group col-md-8 col-sm-9 col-xs-7">\
        //                       <select class="form-control gray-font" id="rec_mode">\
        //                       </select>\
        //                       </div>\
        //                   </div>\
        //     								</div>\
        //     							</form>\
        //     						</div>\
        //     					</div>',
        //
        //     callback: function (result) {
        //
        //        var name = document.getElementById("name").value;
        //        var last_name = document.getElementById("last_name").value;
        //        var second_last_name = document.getElementById("second_last_name").value;
        //        var identification_number = document.getElementById("identification_number").value;
        //        var license_plate = document.getElementById("license_plate").value;
        //        var id_house = document.getElementById("rec_mode").value;
        //
        //        accessFunctions.insertVisitor({name: name, last_name: last_name, second_last_name: second_last_name, company_id: 3,identification_number: identification_number, license_plate: license_plate,id_house: id_house}).success(function(){
        //
        //        })
        //    }
        //
        // });
        //
        //
        //
        //     }
});

app.factory('accessFunctions', function($http, $rootScope) {

    return {
        getResident: function(id) {
            return $http.get('http://localhost:3000/companies/3/residents/find/' + id)
        },
        getVisitors: function(id) {
            return $http.get('http://localhost:3000/companies/3/visitants')
        },
        getVehicule: function(id) {
            return $http.get('http://localhost:3000/companies/3/vehicules/find/' + id)
        },
        getVisitor: function(id) {
            return $http.get('http://localhost:3000/companies/3/visitants/find/' + id)
        },
        insertVisitor: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/visitants",
                method: 'POST',
                data: data
            });
        },
        getEmergency: function() {
            return $http.get('http://localhost:3000/companies/3/emergencies');
        },
        reportEmergency: function(id, data) {
            return $http({
                url: "http://localhost:3000/companies/3/emergencies/" + id,
                method: 'PUT',
                data: data
            })
        },
        findRegisteredVisitant: function(id) {
            return $http.get('http://localhost:3000/companies/3/visitants/invited/find/' + id)
        },
        reportTurn: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/watches",
                method: 'POST',
                data: data
            })
        }
    };
});
