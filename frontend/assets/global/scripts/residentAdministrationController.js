'use strict';
app.controller('CondominosListController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "residentsHouses";
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {

        residentsAccionsController.getResidents(data.house_id).success(function(residents) {
            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#residents_container").fadeIn(700);
            }, 100)

            $scope.residents = residents;
        })
    });
});

app.controller('CreateCondominoController', function($scope, $state, $rootScope, $window, $stateParams, residentsAccionsController, residentsFunctions, commonMethods) {
    $rootScope.active = "residentsHouses";
    $scope.title = "Registrar residente";
    $scope.button = "Registrar";
    var id_house;
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        id_house = data.house_id;
    });
    $scope.actionButton = function() {

        residentsFunctions.getAll().success(function(residents) {
            $scope.residents = residents
            if (commonMethods.validateRepeat($scope.residents, $scope.identification_number, 1)) {
                toastr["error"]("La cédula ingresada ya existe");
            } else if (commonMethods.validateRepeat($scope.residents, $scope.email, 2)) {
                toastr["error"]("El correo ingresado ya existe");
            } else {
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
                });
            }
        });
    }
});
app.controller('editCondominoController', function($scope, $state, $rootScope, $window, $stateParams, residentsAccionsController, residentsFunctions, commonMethods) {
    $rootScope.active = "residentsHouses";
    $scope.title = "Editar residente";
    $scope.button = "Editar";
    var user_id, company_id, email, identification_number;
    residentsFunctions.get($stateParams.id).success(function(data) {

        $scope.name = data.name;
        $scope.residentId = data.id;
        $scope.residentName = data.name;
        $scope.last_name = data.last_name;
        $scope.second_last_name = data.second_last_name;
        $scope.identification_number = data.identification_number;
        $scope.birthday = data.birthday;
        $scope.email = data.email;
        $scope.phone_number = data.phone_number;
        user_id = data.user_id;
        company_id = data.company_id;
        email = data.email;
        identification_number = data.identification_number;

    });

    $scope.actionButton = function() {
        residentsFunctions.getAll().success(function(residents) {
            $scope.residents = residents;
            if (commonMethods.validateRepeat($scope.residents, $scope.identification_number, 1) && $scope.identification_number != identification_number) {
                toastr["error"]("La cédula ingresada ya existe");
            } else if (commonMethods.validateRepeat($scope.residents, $scope.email, 2) && $scope.email != email) {
                toastr["error"]("El correo ingresado ya existe");
            } else {
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
                    $state.go('condominos');
                });

            }
        });
    }
});
app.controller('CondominosVehiculesListController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "vehiculesHouses";
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        residentsAccionsController.getVehicules(data.house_id).success(function(vehicules) {

            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#vehicules_container").fadeIn(700);
            }, 100)
            $scope.vehicules = vehicules;
        })
    });
});

app.controller('CreateCondominoVehiculeController', function($scope, $state, $rootScope, $window, $stateParams, residentsAccionsController, residentsFunctions, commonMethods) {
    var val
    $rootScope.active = "vehiculesHouses";
    $scope.title = "Registrar vehículo";
    $scope.button = "Registrar";
    $scope.submitColour = function() {
        val = $('#color-rgb').css('background-color');

    }
    vehiculesFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    })

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
        console.log($scope.house.id);
        vehiculesFunctions.getAll().success(function(houses) {
            vehiculesFunctions.insert({
                license_plate: $scope.license_plate,
                house_id: $scope.house.id,
                color: val,
                brand: $scope.brand.name,
                company_id: 3
            }).success(function() {
                $state.go('vehicules');
            })


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
            $scope.myVisitors = visitors;
        });
    });
    $scope.revertRenderDate = function(date, hours) {
        var splitted = hours.split(":");
        var hour = splitted[0];
        var minute = splitted[1];
        var am_pm;
        if (hour > 12) {
            hour = hour - 12;
            am_pm = "PM";
        } else {
            am_pm = "AM"
        }
        return date + "   " + hour + ":" + minute + " " + am_pm;
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
          $scope.titleConsult = $scope.consulting_initial_time+ " y "+$scope.consulting_final_time;
          $scope.isConsulting = true;
            for (var i = 0; i < visitors.length; i++) {
                visitors[i].date_time = moment(visitors[i].date_time).format("DD-MM-YYYY HH:MM")
                var fixingDate = visitors[i].date_time.split(" ");
                visitors[i].date_time = $scope.revertRenderDate(fixingDate[0], fixingDate[1]);
                if (visitors[i].license_plate === null) {
                    visitors[i].license_plate = "No ingreso en vehículo"
                }
            }
            $scope.visitors = visitors;
        });
    }
    $scope.stopConsulting = function(){
      $("#loadingIcon").fadeIn("slow");
      $("#prueba").hide();
      $scope.consulting_final_time = '';
      $scope.consulting_initial_time ='';
      $scope.isConsulting = false;
      $scope.getResidents();
      $scope.title = "Visitantes del mes"
      $scope.titleConsult= "";
    }
    $scope.getResidents = function(){
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        residentsAccionsController.getVisitors(data.house_id).success(function(visitors) {

            for (var i = 0; i < visitors.length; i++) {
                visitors[i].date_time = moment(visitors[i].date_time).format("DD-MM-YYYY HH:MM")
                var fixingDate = visitors[i].date_time.split(" ");
                visitors[i].date_time = $scope.revertRenderDate(fixingDate[0], fixingDate[1]);
                if (visitors[i].license_plate === null) {
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
app.controller('CreateCondominosVisitorsController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "residentsVisitors";
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
        for (var i = 0; i < myVisitors.length; i++) {
            if ($scope.identification_number === myVisitors[i].identification_number) {
                console.log(myVisitors[i]);
                $scope.name = myVisitors[i].name;
                $scope.last_name = myVisitors[i].last_name;
                $scope.license_plate = myVisitors[i].license_plate;
                $scope.second_last_name = myVisitors[i].second_last_name;
            } else {
                $scope.name = "";
                $scope.last_name = "";
                $scope.license_plate = "";
                $scope.second_last_name = "";
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

        });
    }
});
app.factory('residentsAccionsController', function($http) {
    return {
        insert: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/visitants",
                method: 'POST',
                data: data
            });
        },
        update: function(id, data) {
            return $http({
                url: "http://localhost:3000/companies/3/houses/" + id,
                method: 'PUT',
                data: data
            })
        },
        delete: function(id) {
            return $http({
                url: "http://localhost:3000/companies/3/houses/" + id,
                method: 'DELETE'
            });
        },
        getVisitors: function(id, data) {
            if (data != undefined) {
                return $http.get('http://localhost:3000/companies/3/houses/' + id + '/find/visitants/?consulting_initial_time=' + data.consulting_initial_time + '&consulting_final_time=' + data.consulting_final_time + '')
            } else {
                return $http.get('http://localhost:3000/companies/3/houses/' + id + '/find/visitants/');
            }
        },
        getResidents: function(id) {
            return $http.get('http://localhost:3000/companies/3/houses/' + id + '/find/residents/');
        },
        getVehicules: function(id) {
            return $http.get('http://localhost:3000/companies/3/houses/' + id + '/find/vehicules/');
        },
        getVisitant: function(idHouse, id) {
            return $http.get('http://localhost:3000/companies/3/houses/' + idHouse + '/find/visitant/' + id);
        },
    };
});
