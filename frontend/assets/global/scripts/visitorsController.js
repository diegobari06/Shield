app.controller('VisitorsListController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "adminVisitors";
    $scope.title = "Visitantes del mes";
    $scope.isConsulting = false;
    $scope.myVisitors;


    $scope.findVisitorsByHouse = function(house) {
        $("#prueba").fadeOut(0);
        setTimeout(function() {
            $("#loadingIcon").fadeIn(300);
        }, 200)
        if ($scope.consulting_final_time == undefined) {
            residentsAccionsController.getVisitors(-999999).success(function(visitors) {
                showingVisitorByDay(visitors, house);
            })
        } else {
            residentsAccionsController.getVisitors(-999999, {
                consulting_initial_time: $scope.consulting_initial_time,
                consulting_final_time: $scope.consulting_final_time
            }).success(function(visitors) {
                showingVisitorByDay(visitors, house);
            })
        }
    }

    showingVisitorByDay = function(visitors, house) {
        for (var i = 0; i < visitors.length; i++) {
            visitors[i].date_time = moment(visitors[i].date_time).format("LL h:mm a");
            if (visitors[i].license_plate === "") {
                visitors[i].license_plate = "No ingreso en vehículo"
            }
        };
        $scope.visitors = $scope.formatResidents(visitors);
        if (house != undefined) {
            var visitorsByHouse = [];
            for (var i = 0; i < $scope.visitors.length; i++) {
                if (house.house_number === $scope.visitors[i].id_house) {
                    visitorsByHouse.push($scope.visitors[i]);
                }
            }
            $scope.visitors = visitorsByHouse;
        }
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#prueba").fadeIn(300);
        }, 200)
    }
    $scope.formatResidents = function(residents) {
            var formattedResidents = [];
            for (var i = 0; i < residents.length; i++) {
                for (var e = 0; e < $scope.houses.length; e++) {
                    if (residents[i].id_house == $scope.houses[e].id) {
                        residents[i].id_house = $scope.houses[e].house_number;
                    }
                }
                residents[i].name = residents[i].name + " " + residents[i].last_name;
            }

            return residents;
        }
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
        residentsAccionsController.getVisitors(-999999, {
            consulting_initial_time: $scope.consulting_initial_time,
            consulting_final_time: $scope.consulting_final_time
        }).success(function(visitors) {
            $("#loadingIcon").fadeOut(100);
            setTimeout(function() {
                $("#prueba").fadeIn(1000);
            }, 400)
            $scope.title = "Visitantes entre:";
            $scope.titleConsult = $scope.consulting_initial_time + "  y  " + $scope.consulting_final_time;
            $scope.isConsulting = true;
            for (var i = 0; i < visitors.length; i++) {
                visitors[i].date_time = moment(visitors[i].date_time).format("LL h:mm a");
                if (visitors[i].license_plate === "") {
                    visitors[i].license_plate = "No ingreso en vehículo"
                }
            }
            if (visitors != undefined) {
                $scope.visitors = $scope.formatResidents(visitors);
            }
            if ($scope.house != undefined) {
                showingVisitorByDay(visitors, $scope.house)
            }
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
        residentsAccionsController.getVisitors(-999999).success(function(visitors) {
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
            if (visitors.length == 0) {
                $scope.noVisitorsResult = 1;
            } else {
                $scope.noVisitorsResult = 0;
            }
            $scope.myVisitors = visitors;
            residentsFunctions.getAllHouses().success(function(houses) {
                $scope.houses = houses;

                $scope.visitors = $scope.formatResidents(visitors);
            });
        })
    }
    $scope.getResidents();
});
