'use strict';
app.controller('ResidentsListController', function($scope, $state, $rootScope, $window, residentsFunctions) {
    $rootScope.active = "residents";
    residentsFunctions.getAll().success(function(residents) {
        $("#loadingIcon").fadeOut(200);
        setTimeout(function() {
            $("#tableData").fadeIn(500);
        }, 600)

        $scope.residents = residents;
    })

    residentsFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    })
    $scope.deleteResident = function(id) {
        bootbox.confirm("Are you sure?", function(result) {
            if (result) {
                residentsFunctions.delete(id).success(function() {
                    residentsFunctions.getAll().success(function(residents) {
                        $scope.residents = residents;
                    })
                });
            }
        });
    }


});

app.controller('ResidentsViewController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, residentsFunctions) {
    $rootScope.active = "residents";
    residentsFunctions.getAll().success(function(residents) {
        $scope.residents = residents;
    })
});
app.controller('ResidentsCreateController', function($scope, $http, $rootScope, $state, residentsFunctions) {
    $rootScope.active = "residents";
    $scope.title = "Nuevo residente";
    $scope.button = "Registrar";
    residentsFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
    })
    $scope.actionButton = function() {

        residentsFunctions.getAll().success(function(residents) {
            $("#loadingIcon").fadeOut("slow");
            //  if(commonMethods.validateName(residents,$scope.residentName))
            residentsFunctions.insert({
                name: $scope.name,
                last_name: $scope.last_name,
                second_last_name: $scope.second_last_name,
                company_id: 3,
                identification_number: $scope.identification_number,
                birthday: $scope.birthday,
                email: $scope.email,
                house_id: 7,
                phone_number: $scope.phone_number
            }).success(function() {
                $state.go('residents');
                // popUp.success("Resident has been created successfully");
            })

            residentsFunctions.insert({
                    name: $scope.name,
                    last_name: $scope.last_name,
                    second_last_name: $scope.second_last_name,
                    company_id: 2,
                    identification_number: $scope.identification_number,
                    birthday: $scope.birthday,
                    email: $scope.email,
                    house_id: 7,
                    phone_number: $scope.phone_number
                }).success(function() {
                    $state.go('residents');
                    // popUp.success("Resident has been created successfully");
                })
                //  } else {
                //       popUp.show("Resident name already exist.");
                //  }

        });
    }
});
app.controller('ResidentsEditController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, residentsFunctions) {
    $rootScope.active = "residents";
    var residentName;
    $scope.title = "Editar residente";
    $scope.button = "Editar";
    $scope.selectedOption = {};
    residentsFunctions.getAllHouses().success(function(houses) {
        $scope.houses = houses;
        console.log(window.user);
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
        setTimeout(function() {
            var house = $scope.houses.filter(function(el) {
                return el.id == data.house_id;
            });
            $scope.selectedOption = house[0];
            $scope.$apply();
        }, 100);

    });

    $scope.actionButton = function() {
        //  residentsFunctions.getAll().success(function(residentsFunctions){
        //  if(commonMethods.validateName(subcategories,$scope.residentName) == true | $scope.residentName == residentName){
        residentsFunctions.update($scope.residentId, {
            name: $scope.name,
            last_name: $scope.last_name,
            second_last_name: $scope.second_last_name,
            company_id: 2,
            identification_number: $scope.identification_number,
            birthday: $scope.birthday,
            email: $scope.email,
            house_id: 7,
            phone_number: $scope.phone_number
        }).success(function() {

            $state.go('residents');
            // popUp.success("Resident has been created successfully");
        });
        //  } else {
        //       popUp.show("Resident name already exist.");
        // }

        // });
    };


});

app.factory('residentsFunctions', function($http) {
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
            return $http.get('http://localhost:3000/companies/2/residents/' + id)
        }
    };
});
