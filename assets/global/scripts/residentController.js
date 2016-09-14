'use strict';
app.controller('ResidentsListController',function($scope,$state,$rootScope,$window,residentsFunctions){
      // $rootScope.headerTitle = "Skills subcategories";
      residentsFunctions.getAll().success(function(residents){
          $scope.residents = residents;})

          $scope.deleteSResident=function(id){
              bootbox.confirm("Are you sure?", function(result) {
                  if(result){
                      residentsFunctions.delete(id).success(function(){
                          residentsFunctions.getAll().success(function(residents){
                              $scope.residents = residents;})
                          });
                  }
              });
        }
});
app.controller('ResidentsViewController',function($scope,$http,$state,$rootScope,$stateParams,$timeout,residentsFunctions){
      // $rootScope.headerTitle = "View category";
      residentsFunctions.getAll().success(function(residents){
         $scope.residents = residents;
      })
 });
app.controller('ResidentsCreateController',function($scope,$http,$rootScope,$state,residentsFunctions){
      // $rootScope.headerTitle = "Skills subcategories";
      $scope.title = "Nuevo residente";
      $scope.button = "Create";
      $scope.actionButton = function(){
           residentsFunctions.getAll().success(function(residents){
               if(commonMethods.validateName(residents,$scope.residentName)){
                    residentsFunctions.insert({name: $scope.residentName, firstSurname: $scope.firstSurname, secondSurname: $scope.secondSurname, idNumber: $scope.idNumber, birthdate: $scope.birthdate, houseId: $scope.houseId, phoneNumber: $scope.phoneNumber, email: $scope.email}).success(function(){
                          $state.go('residents');
                          popUp.success("Resident has been created successfully");
                    })
               } else {
                    popUp.show("Resident name already exist.");
               }

           });
     }
});






app.controller('ResidentsEditController',function($scope,$http,$state,$rootScope,$stateParams,$timeout,residentsFunctions){
      var residentName;
      // $rootScope.headerTitle = "Skills subcategories";
      $scope.title = "Edit resident";
      $scope.button = "Edit";
      subCategoriesFunctions.get($stateParams.id).success(function(data) {
           residentName = data.name;
           $scope.id = data.id;
           $scope.residentName = data.name;
           $scope.firstSurname = data.firstSurname;
           $scope.secondSurname = data.secondSurname;
           $scope.idNumber = data.idNumber;

      });
      $scope.actionButton = function(){
           residentsFunctions.getAll().success(function(residentsFunctions){
               if(commonMethods.validateName(subcategories,$scope.residentName) == true | $scope.residentName == residentName){
                    subCategoriesFunctions.update({id:$scope.id, name: $scope.residentName, firstSurname: $scope.firstSurname, secondSurname: $scope.secondSurname, idNumber: $scope.idNumber, birthdate: $scope.birthdate, houseId: $scope.houseId, phoneNumber: $scope.phoneNumber, email: $scope.email}).success(function(technicalskills){
                        popUp.success("Resident has been updated successfully");
                        $state.go('residents');
                    });
               } else {
                    popUp.show("Resident name already exist.");
              }

          });
     }


 });
 app.factory('residentsFunctions', function($http){
      return {
         insert: function(data){
           return $http({
             url: "http://localhost:3000/subcategories",
             method: 'POST',
             data: data
             });
         },
         update: function(id,data){
           return $http({
               url: "http://localhost:3000/subcategories/"+id,
               method: 'PUT',
               data: data
             })
         },
         delete: function(id){
           return $http({
               url: "http://localhost:3000/subcategories/"+id,
               method: 'DELETE'
             });
         },
         getAll: function(){
           return $http.get('http://localhost:3000/subcategories.json');
         },
         get: function(id){
           return $http.get('http://localhost:3000/subcategories/'+id)
         }
       };
 });
