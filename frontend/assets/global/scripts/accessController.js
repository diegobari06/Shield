app.controller('accessController', function($scope, $state, $rootScope, $window, accessFunctions, residentsFunctions, commonMethods, vehiculesFunctions, officersFunctions, residentsAccionsController, housesFunctions) {
    var residentsPrueba, vehiculesPrueba, housesPrueba, emergencyList;
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


    getInfo = function() {
        if ($rootScope.user.signedIn && $rootScope.user.permission_level == 3) {

            residentsFunctions.getAll().success(function(list) {
                residentsPrueba = list;
            });
            vehiculesFunctions.getAll().success(function(list) {
                vehiculesPrueba = list;
            });
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
    $scope.hideEmergencyForm = 1
    getEmergency = function() {
        accessFunctions.getEmergency().success(function(emergency) {
            if (emergency.isAttended == 1) {
                $scope.hideRegisterForm = 1;
                $scope.hideEmergencyForm = 2;
                $scope.show = 7;
                emergency_id = emergency.id;
            }


        });
    }
    $scope.attendEmergency = function() {
        accessFunctions.reportEmergency(emergency_id, {
            isAttended: 0
        }).success(function(dataResident) {
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
                    housesFunctions.get(item.house_id).success(function(house) {
                        house_number = house.house_number;
                        $scope.house_number = house_number;
                        securityKey = house.securityKey;
                        emergencyKey = house.emergencyKey;
                    });
                }
            });
        }
    };


    $scope.getVehicule = function() {
        $scope.id_number = "";

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
        if ($scope.id_vehicule == "") {
            clearInputs();
        } else {
            accessFunctions.getVisitor($scope.visitor_id_number).success(function(data) {
                if (data == 0) {
                    clearInputs();
                } else {
                    console.log(data)
                    $scope.visitor_name = data.name;
                    $scope.visitor_last_name = data.last_name;
                    $scope.visitor_second_last_name = data.second_last_name;
                    $scope.visitor_license_plate = data.license_plate;


                }

            });
        }
    }
    clearInputs = function() {
        $scope.visitor_name = ""
        $scope.visitor_last_name = "";
        $scope.visitor_second_last_name = "";
        $scope.visitor_license_plate = "";

    }

    $scope.insertVisitor = function() {

        accessFunctions.insertVisitor({
            name: $scope.visitor_name,
            last_name: $scope.visitor_last_name,
            second_last_name: $scope.visitor_second_last_name,
            company_id: 3,
            identification_number: $scope.visitor_id_number,
            license_plate: $scope.visitor_license_plate,
            id_house: $scope.house.id
        }).success(function() {

        });

    }

    $scope.getOfficials = function() {
        $scope.hideRegisterForm = 1;
        $scope.show = 6;
        officersFunctions.getAll().success(function(list) {
            $scope.officials = list;
        });
    }
    $scope.getKeys = function() {
            bootbox.dialog({
                message: '<div class="text-center gray-font font-20"> <h1 class="font-30">Casa numero <span class="font-30" id="key_id_house"></span></h1></div>\
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

    };
});
