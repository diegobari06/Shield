app.controller('accessController',function($scope,$state,$rootScope,$window){
  $rootScope.container = false;
  $scope.access = function() {
      $auth.submitLogin($scope.accessForm);
  }
});
