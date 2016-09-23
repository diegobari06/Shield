'use strict';
app.controller('VehiculesListController',function($scope,$state,$rootScope,$window,vehiculesFunctions){
      // $rootScope.headerTitle = "Skills subcategories";
      vehiculesFunctions.getAll().success(function(vehicules){
          $scope.vehicules = vehicules;})

          $scope.deleteVehicule=function(id){
              bootbox.confirm("Are you sure?", function(result) {
                  if(result){
                      vehiculesFunctions.delete(id).success(function(){
                          vehiculesFunctions.getAll().success(function(vehicules){
                              $scope.vehicules = vehicules;})
                          });
                  }
              });
        }
});

app.controller('VehiculesCreateController',function($scope,$http,$rootScope,$state,vehiculesFunctions){
      // $rootScope.headerTitle = "Skills subcategories";
      $scope.title = "Registrar vehículo";
        $scope.button = "Registrar";
      vehiculesFunctions.getAllHouses().success(function(houses){
          $scope.houses = houses;
})

$scope.brands = {
      data:[
        { id: "1",name: "English"},
        { id: "2",name: "Spanish"},
        { id: "3",name: "Mandarin"},
        { id: "4",name: "Portuguese"},
        { id: "5",name: "German"},
        { id: "6",name: "Korean"},
        { id: "7",name: "French"},
        { id: "8",name: "Italian"},
        { id: "9",name: "Japanese"},
        { id: "10",name: "Arabic"},
        { id: "11",name: "Russian"},
        { id: "12",name: "Swedish"},
      ]
    }


      $scope.actionButton = function(){
          console.log($scope.house.id);
           vehiculesFunctions.getAll().success(function(houses){
              //  if(commonMethods.validateName(residents,$scope.residentName)){
                    vehiculesFunctions.insert({license_plate: $scope.license_plate,house_id: $scope.house.id,color: "#3F51B5",brand: $scope.brand.name,company_id:3}).success(function(){

                          $state.go('vehicules');
                          // popUp.success("Resident has been created successfully");
                    })
              //  } else {
              //       popUp.show("Resident name already exist.");
              //  }

           });
     }
});

app.controller('VehiculesEditController',function($scope,$http,$state,$rootScope,$stateParams,$timeout,vehiculesFunctions){
      var residentName;
      // $rootScope.headerTitle = "Skills subcategories";
      $scope.title = "Editar vehículo";
      $scope.button = "Editar";
      $scope.brands = {
            data:[
              { id: "1",name: "English"},
              { id: "2",name: "Spanish"},
              { id: "3",name: "Mandarin"},
              { id: "4",name: "Portuguese"},
              { id: "5",name: "German"},
              { id: "6",name: "Korean"},
              { id: "7",name: "French"},
              { id: "8",name: "Italian"},
              { id: "9",name: "Japanese"},
              { id: "10",name: "Arabic"},
              { id: "11",name: "Russian"},
              { id: "12",name: "Swedish"},
            ]
          }

      vehiculesFunctions.get($stateParams.id).success(function(data) {
        vehiculesFunctions.getAllHouses().success(function(houses){
            $scope.houses = houses;
  })
           $scope.license_plate = data.license_plate;
           $scope.vehiculeId = data.id;
           $scope.SelectedBrand = data.brand;
           $scope.SelectedHouse = data.house_id;



      });

      $scope.actionButton = function(){
           vehiculesFunctions.getAll().success(function(houses){
              //  if(commonMethods.validateName(residents,$scope.residentName)){
                    vehiculesFunctions.update($scope.vehiculeId,{license_plate: $scope.license_plate,house_id: $scope.house.id,color: "#3F51B5",brand: $scope.brand.name,company_id:3}).success(function(){

                          $state.go('vehicules');
                          // popUp.success("Resident has been created successfully");
                    })
              //  } else {
              //       popUp.show("Resident name already exist.");
              //  }

           });
     }


});

app.factory('vehiculesFunctions', function($http){
     return {
        insert: function(data){
          return $http({
            url: "http://localhost:3000/companies/3/vehicules",
            method: 'POST',
            data: data
            });
        },
        update: function(id,data){
          return $http({
              url: "http://localhost:3000/companies/3/vehicules/"+id,
              method: 'PUT',
              data: data
            })
        },
        delete: function(id){
          return $http({
              url: "http://localhost:3000/companies/3/vehicules/"+id,
              method: 'DELETE'
            });
        },
        getAll: function(){
          return $http.get('http://localhost:3000/companies/3/vehicules');
        },
        getAllHouses: function(){
        return $http.get('http://localhost:3000/companies/3/houses');
        },
        get: function(id){
          return $http.get('http://localhost:3000/companies/3/vehicules/'+id);
        }
      };
});
