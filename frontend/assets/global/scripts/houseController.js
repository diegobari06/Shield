app.controller('HousesListController',function($scope,$state,$rootScope,$window,housesFunctions){
      // $rootScope.headerTitle = "Skills subcategories";
      housesFunctions.getAll().success(function(houses){
          $scope.houses = houses;})

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

app.factory('housesFunctions', function($http){
     return {
        insert: function(data){
          return $http({
            url: "http://localhost:3000/companies/2/residents",
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
          return $http.get('http://localhost:3000/companies/2/houses');
        },
        get: function(id){
          return $http.get('http://localhost:3000/companies/2/residents/'+id)
        }
      };
});
