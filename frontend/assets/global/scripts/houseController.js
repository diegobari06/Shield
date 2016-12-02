app.controller('HousesListController', function($scope, $state, $rootScope, $window, housesFunctions, commonMethods) {
    commonMethods.validatePermisson(2);
    $rootScope.active = "houses";
    housesFunctions.getAll().success(function(houses) {
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#tableData").fadeIn(300);
        }, 200)
        $scope.houses = houses;
    })
    $scope.getKeys = function(house_number, securityKey, emergencyKey) {
        housesFunctions.getKeys(house_number, securityKey, emergencyKey);
    };
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
                    commonMethods.waitingMessage();
                    housesFunctions.delete(id).success(function() {
                        housesFunctions.getAll().success(function(houses) {
                            bootbox.hideAll();
                            $scope.houses = houses;
                            toastr["success"]("Se ha eliminado la casa correctamente");
                        })

                    });
                }
            }
        });


    };


});


app.controller('HousesCreateController', function($scope, $http, $rootScope, $state, housesFunctions, commonMethods) {

    $("#loadingIcon").fadeOut(0);
    commonMethods.validatePermisson(2);
    $rootScope.active = "houses";
    $scope.title = "Registrar casa";
    $scope.button = "Registrar";
    $scope.isLoading = true;
    setTimeout(function() {
        $("#edit_house_form").fadeIn(300);
    }, 600)

    $scope.actionButton = function() {

        housesFunctions.getAll().success(function(houses) {
            $scope.houses = houses;
            if (commonMethods.validateRepeat($scope.houses, $scope.house_number, 3)) {
                toastr["error"]("El número de casa ingresado ya existe");
            } else {
                if ($scope.securityKey == "") {
                    $scope.securityKey = null;
                }
                if ($scope.emergencyKey == "") {
                    $scope.emergencyKey = null;
                }
                commonMethods.waitingMessage();
                housesFunctions.insert({
                    house_number: $scope.house_number,
                    extension: $scope.extension,
                    securityKey: $scope.securityKey,
                    emergencyKey: $scope.emergencyKey,
                    company_id: 3
                }).success(function() {
                    bootbox.hideAll();
                    $state.go('houses');
                    toastr["success"]("Se registró la casa correctamente");


                })
            }

        });
    }

});


app.controller('HousesEditController', function($scope, $http, $state, $rootScope, $stateParams, $timeout, housesFunctions, commonMethods) {
    commonMethods.validatePermisson(2);
    $rootScope.active = "houses";
    var house_number;
    $scope.title = "Editar casa";
    $scope.button = "Editar";

    housesFunctions.get($stateParams.id).success(function(data) {
        $scope.house_number = data.house_number;
        $scope.house_id = data.id;
        $scope.extension = data.extension;
        $scope.securityKey = data.securityKey;
        $scope.emergencyKey = data.emergencyKey;
        house_number = data.id;
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#edit_house_form").fadeIn(300);
        }, 200)

    });

    $scope.actionButton = function() {
        housesFunctions.getAll().success(function(houses) {
            $scope.houses = houses;
            if (commonMethods.validateRepeat($scope.houses, $scope.house_number, 3) && $scope.house_number != house_number) {
                toastr["error"]("El número de casa ingresado ya existe");
            } else {
                if ($scope.securityKey == "") {
                    $scope.securityKey = null;
                }
                if ($scope.emergencyKey == "") {
                    $scope.emergencyKey = null;
                }
                commonMethods.waitingMessage();
                housesFunctions.update($scope.house_id, {
                    house_number: $scope.house_number,
                    extension: $scope.extension,
                    securityKey: $scope.securityKey,
                    emergencyKey: $scope.emergencyKey
                }).success(function() {
                    bootbox.hideAll();
                    $state.go('houses');
                    toastr["success"]("Se editó la casa correctamente");


                });
            }
        });


    };
});
app.factory('housesFunctions', function($http, $rootScope) {
    var server = "http://localhost:3000/companies/" + $rootScope.user.company_id;
    return {
        insert: function(data) {
            return $http({
                url: server + "/houses",
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
        getAll: function() {
            return $http.get(server + '/houses');
        },
        get: function(id) {
            return $http.get(server + '/houses/' + id)
        },
        getKeys: function(house_number, securityKey, emergencyKey) {
            if (securityKey == null || emergencyKey == null) {
                toastr["error"]("Esta casa aún no tiene claves de seguridad asignadas");
            } else {
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
        }
    };
});
