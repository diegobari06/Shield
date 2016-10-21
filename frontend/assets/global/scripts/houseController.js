app.controller('HousesListController', function($scope, $state, $rootScope, $window, housesFunctions, commonMethods) {

    $rootScope.active = "houses";
    housesFunctions.getAll().success(function(houses) {
        $("#loadingIcon").fadeOut(200);
        setTimeout(function() {
            $("#tableData").fadeIn(500);
        }, 600)

        $scope.houses = houses;
    })

    $scope.deleteHouse = function(id, house_number) {
        bootbox.confirm({
            message: "¿Está seguro que desea eliminar la casa " + house_number + "?",
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
                    housesFunctions.delete(id).success(function() {
                        housesFunctions.getAll().success(function(houses) {
                            $scope.houses = houses;
                        })
                        toastr["success"]("Se ha eliminado la casa correctamente");
                    });
                }
            }
        });


    };


});


app.controller('HousesCreateController', function($scope, $http, $rootScope, $state, housesFunctions, commonMethods) {
    commonMethods.validatePermisson(2);
    $rootScope.active = "houses";
    $scope.title = "Registrar casa";
    $scope.button = "Registrar";
    $scope.isLoading = true;
    $scope.actionButton = function() {

        housesFunctions.getAll().success(function(houses) {

            commonMethods.waitingMessage();
            housesFunctions.insert({
                house_number: $scope.house_number,
                extension: $scope.extension,
                company_id: 3
            }).success(function() {
                bootbox.hideAll();
                $state.go('houses');
                toastr["success"]("Se registró la casa correctamente");


            })


        });
    }

});


app.controller('HousesEditController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, housesFunctions, commonMethods) {
    commonMethods.validatePermisson(2);
    $rootScope.active = "houses";
    var residentName;
    $scope.title = "Editar casa";
    $scope.button = "Editar";

    housesFunctions.get($stateParams.id).success(function(data) {
        $scope.house_number = data.house_number;
        $scope.house_id = data.id;
        $scope.extension = data.extension;



    });

    $scope.actionButton = function() {
        housesFunctions.getAll().success(function(houses) {

            housesFunctions.update($scope.house_id, {
                house_number: $scope.house_number,
                extension: $scope.extension
            }).success(function() {

                $state.go('houses');



            });
        });


    };
});
app.factory('housesFunctions', function($http) {
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
        getAll: function() {
            return $http.get('http://localhost:3000/companies/3/houses');
        },
        get: function(id) {
            return $http.get('http://localhost:3000/companies/3/houses/' + id)
        }
    };
});
