'use strict';
app.controller('ResidentsListController',function($scope,$state,$rootScope,$window,residentsFunctions){
      // $rootScope.headerTitle = "Skills subcategories";
      residentsFunctions.getAll().success(function(residents){
          $scope.residents = residents;})

          $scope.deleteResident=function(id){
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
      residentsFunctions.getAllHouses().success(function(houses){
          $scope.houses = houses;
          angular.forEach(houses, function(value, key) {
            console.log(value.house_number);
      })

})
      $scope.actionButton = function(){

           residentsFunctions.getAll().success(function(residents){
              //  if(commonMethods.validateName(residents,$scope.residentName)){
                    residentsFunctions.insert({name: $scope.name, last_name: $scope.last_name, second_last_name: $scope.second_last_name, company_id: 2,identification_number: $scope.identification_number, birthday: $scope.birthday, email: $scope.email, house_id: 7, phone_number: $scope.phone_number}).success(function(){

                          $state.go('residents');
                          // popUp.success("Resident has been created successfully");
                    })
              //  } else {
              //       popUp.show("Resident name already exist.");
              //  }

           });
     }
});
app.controller('ResidentsEditController',function($scope,$http,$state,$rootScope,$stateParams,$timeout,residentsFunctions){
      var residentName;
      // $rootScope.headerTitle = "Skills subcategories";
      $scope.title = "Edit resident";
      $scope.button = "Edit";
      residentsFunctions.get($stateParams.id).success(function(data) {

           $scope.name = data.name;
           $scope.id = data.id;
           $scope.residentName = data.name;
           $scope.last_name = data.last_name;
           $scope.second_last_name = data.second_last_name;
           $scope.identification_number = data.identification_number;
           $scope.birthday = data.birthday;
           $scope.email = data.email;
           $scope.house_id = data.house_id;
            $scope.phone_number = data.phone_number;


      });


//       function clickOnUpload() {
//   $timeout(function() {
//     angular.element('#form_control_1').trigger('click');
//   });
// };


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

//  app.directive('focus',
// function($timeout) {
//  return {
//  scope : {
//    trigger : '@focus'
//  },
//  link : function(scope, element) {
//   scope.$watch('trigger', function(value) {
//     if (value === "true") {
//       $timeout(function() {
//        element[0]..trigger('click');  angular.element('#foo');
//       });
//    }
//  });
//  }
// };
// });

 app.factory('residentsFunctions', function($http){
      return {
         insert: function(data){
           return $http({
             url: "http://localhost:3000/companies/3/residents",
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
               url: "http://localhost:3000/companies/3/residents/"+id,
               method: 'DELETE'
             });
         },
         getAll: function(){
           return $http.get('http://localhost:3000/companies/3/residents');
         },
         getAllHouses: function(){
        return $http.get('http://localhost:3000/companies/3/houses');
         },
         get: function(id){
           return $http.get('http://localhost:3000/companies/2/residents/'+id)
         }
       };
 });
