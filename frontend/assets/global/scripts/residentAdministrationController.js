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
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {

        residentsAccionsController.getVisitors(data.house_id).success(function(visitors) {

            $("#loadingIcon").fadeOut(0);
            setTimeout(function() {
                $("#prueba").fadeIn(700);
            }, 100)
            $scope.visitors = visitors;
        })
    });
});
app.controller('CreateCondominosVisitorsController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "residentsVisitors";
    $scope.title = "Reportar visitante";
    $scope.button = "Reportar";
    var id_house;
    residentsFunctions.get($rootScope.user.resident_id).success(function(data) {
        id_house = data.house_id;
    });
    $scope.actionButton = function() {

        $scope.insertVisitor = function() {
            accessFunctions.insertVisitor({
                name: $scope.visitor_name,
                last_name: $scope.visitor_last_name,
                second_last_name: $scope.visitor_second_last_name,
                company_id: 3,
                identification_number: $scope.visitor_id_number,
                license_plate: $scope.visitor_license_plate,
                id_house: id_house
            }).success(function() {

            });

        }



    }
});
app.factory('residentsAccionsController', function($http) {
    return {
        insert: function(data) {
            return $http({
                url: "http://localhost:3000/companies/3/houses",
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
        getVisitors: function(id) {
            return $http.get('http://localhost:3000/companies/3/houses/find/visitants/' + id);
        },
        getResidents: function(id) {
            return $http.get('http://localhost:3000/companies/3/houses/find/residents/' + id);
        },
        getVehicules: function(id) {
            return $http.get('http://localhost:3000/companies/3/houses/find/vehicules/' + id);
        }
    };
});
