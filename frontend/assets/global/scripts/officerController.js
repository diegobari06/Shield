app.controller('OfficersListController',function($scope,$state,$rootScope,$window,officersFunctions){

      officersFunctions.getAll().success(function(officers){
          $scope.officers = officers;})

          $scope.deleteOfficer=function(id){
              bootbox.confirm("Are you sure?", function(result) {
                  if(result){
                      officersFunctions.delete(id).success(function(){
                          officersFunctions.getAll().success(function(officers){
                              $scope.officers = officers;})
                          });
                  }
              });
        }
});

app.controller('OfficersCreateController',function($scope,$http,$rootScope,$state,officersFunctions){

      $scope.title = "Registrar oficial";
        $scope.button = "Registrar";
      $scope.actionButton = function(){

           officersFunctions.getAll().success(function(officer){
              //  if(commonMethods.validateName(residents,$scope.residentName)){
                    officersFunctions.insert({name: $scope.name, last_name: $scope.last_name, second_last_name: $scope.second_last_name, company_id: 3,identification_number: $scope.identification_number, license: $scope.license}).success(function(){
                          $state.go('officers');
                          // popUp.success("Resident has been created successfully");
                    })
              //  } else {
              //       popUp.show("Resident name already exist.");
              //  }

           });
     }
});


app.controller('OfficersEditController',function($scope,$http,$state,$rootScope,$stateParams,$timeout,officersFunctions){
      var residentName;

      $scope.title = "Editar oficial";
      $scope.button = "Editar";

      officersFunctions.get($stateParams.id).success(function(data) {
        $scope.name = data.name;
        $scope.officerId = data.id;
        $scope.residentName = data.name;
        $scope.last_name = data.last_name;
        $scope.second_last_name = data.second_last_name;
        $scope.identification_number = data.identification_number;


      });

      $scope.actionButton = function(){
           housesFunctions.getAll().success(function(houses){
              //  if(commonMethods.validateName(residents,$scope.residentName)){
                    housesFunctions.update($scope.house_id,{house_number: $scope.house_number,extension: $scope.extension}).success(function(){

                          $state.go('houses');
                          // popUp.success("Resident has been created successfully");
                    })
              //  } else {
              //       popUp.show("Resident name already exist.");
              //  }

           });
     }


});

app.factory('officersFunctions', function($http){
     return {
        insert: function(data){
          return $http({
            url: "http://localhost:3000/companies/3/officers",
            method: 'POST',
            data: data
            });
        },
        update: function(id,data){
          return $http({
              url: "http://localhost:3000/companies/3/officers/"+id,
              method: 'PUT',
              data: data
            })
        },
        delete: function(id){
          return $http({
              url: "http://localhost:3000/companies/3/officers/"+id,
              method: 'DELETE'
            });
        },
        getAll: function(){
          return $http.get('http://localhost:3000/companies/3/officers');
        },
        get: function(id){
          return $http.get('http://localhost:3000/companies/3/officers/'+id)
        }
      };
});
