app.controller('accessController',function($scope,$state,$rootScope,$window,accessFunctions){
  $rootScope.container = false;
  $scope.access = function() {
      $auth.submitLogin($scope.accessForm);
  }
    $scope.show = 4;

     $scope.getResident = function() {
        if ($scope.id_number=="") {
            $scope.show = 4;
        } else{
        if ($scope.id_number=="116060486") {
             console.log($scope.id_number);
               $scope.show = 1;
        } else {
           $scope.show = 2;
        }
        }
        //  accessFunctions.getResident($scope.id_number).success(function(data) {
         //
        //  });
   };
      $scope.getVehicule = function() {
        // if ($scope.id_vehicule=="") {
        //     $scope.show = 4;
        // } else{
        //       if ($scope.id_vehicule=="BCL-448") {
        //        $scope.show = 3;
        //           console.log($scope.id_vehicule + "ada");
        // } else {
        //    $scope.show = 2;
        // }
        // }
        if($scope.id_vehicule==""){
            $scope.show = 4;
        } else{
          accessFunctions.getVehicule($scope.id_vehicule).success(function(data) {
               $scope.show = 3;
               $scope.license_plate = data.license_plate;
               $scope.SelectedBrand = data.brand;
               $scope.SelectedHouse = data.house_id;

          });
        }

      };
      $scope.insertVisitor=function(){

        bootbox.confirm('  <div class="portlet-title">\
        <div class="caption font-green-haze">\
            <i class="fa fa-user font-green-haze"></i>\
            <span class="caption-subject bold uppercase text-center">Regitrar visitante</span>\
        </div>\
          </div>\
            <form role="form">\
        <div class="form-group form-md-line-input">\
    <input ng-model="name" type="text" class="form-control" id="form_control_1">\
      <label for="form_control_1" class="font-15">Nombre</label>\
    </div>\
        </form>', function(result) {


});
    }
});


app.factory('accessFunctions', function($http){
     return {
        getResident: function(id){
          return $http.get('http://localhost:3000/companies/3/houses/'+id)
        },
        getVehicule: function(id){
          return $http.get('http://localhost:3000/companies/3/vehicules/'+id)
        }
      };
});
