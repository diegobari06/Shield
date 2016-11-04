app.controller('watchesController', function($scope, $state, $rootScope, $window, watchesApi) {
    $rootScope.active = "residentsVisitors";
    $scope.title = "Visitantes del mes";
    $scope.isConsulting = false;
    $scope.showCleanBtn = false;
    $scope.showBackBtn = false;
    $scope.currentTurn= true;
    setWatch = function(data){
      $scope.showTable = false;
      $scope.currentTurn= false;
      $scope.showBackBtn = true;
      $scope.watch = data;
      $scope.day = moment(data).format('LL');
      $scope.initial_time = moment(data.initial_time).format('h:mm a');
      if (data.final_time === null) {
          $scope.final_time = 'Aún en progreso'
      } else {
          $scope.final_time = moment(data.final_time).format('h:mm a');
      }
      $scope.officers = data.officers;
    }
    $scope.getCurrentWatch = function(){
      $("#data").fadeOut(0);
      setTimeout(function() {
          $("#loadingData").fadeIn(300);
      }, 200)
      watchesApi.getCurrentWatch().success(function(data) {
        $("#loadingData").fadeOut(0);
        setTimeout(function() {
            $("#data").fadeIn(300);
        }, 200)
          setWatch(data);
          $scope.currentTurn= true;
          $scope.showBackBtn = false;
          $scope.showCleanBtn = false;
          $scope.consulting_initial_time = "";
          $scope.consulting_final_time = "";
          $("#loadingIcon").fadeOut(0);
          setTimeout(function() {
              $("#tableData").fadeIn(300);
          }, 200)
      });
    }
   $scope.getCurrentWatch();
   $scope.getWatch = function(watch){
     $("#data").fadeOut(0);
     setTimeout(function() {
         $("#loadingData").fadeIn(300);
     }, 200)
     watchesApi.find(watch.id).success(function(data){
       $("#loadingData").fadeOut(0);
       setTimeout(function() {
           $("#data").fadeIn(300);
       }, 200)
       setWatch(data);
     })
   }
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

    $scope.filterWatches = function() {
      $("#data").fadeOut(0);
      setTimeout(function() {
          $("#loadingData").fadeIn(300);
      }, 200)
        watchesApi.filterWatches({
            consulting_initial_time: $scope.consulting_initial_time,
            consulting_final_time: $scope.consulting_final_time
        }).success(function(data) {
          $("#loadingData").fadeOut(0);
          setTimeout(function() {
              $("#data").fadeIn(300);
          }, 200)
            $scope.showCleanBtn = true;
            $scope.showTable = true;
            $scope.showBackBtn = false;
            var watchesFilter = data;
            $scope.watches = [];
            for (var i = 0; i < watchesFilter.length; i++) {
                var watch = watchesFilter[i];
                watch.initial_time = moment(watch.initial_time).format('LL h:mm a');
                if (watch.final_time == null) {
                    watch.final_time = "Aún en progreso."
                } else {
                    watch.final_time = moment(watch.final_time).format('LL h:mm a');
                }
                $scope.watches.push(watch);
            }
        })
    }

    // for (var i = 0; i < visitors.length; i++) {
    //     visitors[i].date_time = moment(visitors[i].date_time).format("DD-MM-YYYY HH:MM")
    //     var fixingDate = visitors[i].date_time.split(" ");
    //     visitors[i].date_time = $scope.revertRenderDate(fixingDate[0], fixingDate[1]);
    //     if (visitors[i].license_plate === null) {
    //         visitors[i].license_plate = "No ingreso en vehículo"
    //     }
    // }

});
