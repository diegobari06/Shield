app.controller('VisitorsListController', function($scope, $state, $rootScope, $window, residentsAccionsController, residentsFunctions) {
    $rootScope.active = "residentsVisitors";
    $scope.title = "Visitantes del mes";
    $scope.isConsulting = false;
    $scope.myVisitors;
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
    $scope.isDisableButton = function(){
      if($scope.consulting_initial_time == undefined && $scope.consulting_final_time == undefined) return true;
      return false;
    }
    console.log($scope.consulting_initial_time);
    $scope.consultVisitors = function() {
        $("#loadingIcon").fadeIn("slow");
        $("#prueba").hide();
        residentsAccionsController.getVisitors(-999999,{
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
                $scope.visitors = visitors;
            })

    }
    $scope.getResidents();
});
