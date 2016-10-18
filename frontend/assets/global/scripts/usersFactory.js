app.factory('usersFunctions', function($http){
  var server = "http://localhost:3000/";
  return {
    update: function(id,data){
      return $http({
          url: server+"users/"+id,
          method: 'PUT',
          data: data
        })
    },
    getAll: function(){
      return $http.get(server+'/users.json');
    },
    delete: function(id,data){
       return $http({
          url: server+"companies/"+data.id_company+"/users/"+id,
           method: 'DELETE'
         });
     },
    get: function(id){
      return $http.get(server+'users/'+id+'.json')
    },
    permissions: function(){
      return [{value: 1, name: "Employee"}, {value: 2, name: "Administrator"}, {value: 3, name: "Super Administrator"}];
    },
    sign_up: function(data){
      console.log(data);
      return $http({
          url: server+"companies/"+data.id_company+"/users/",
          method: 'POST',
          data: data
        });
    },
    update_sign_up: function(id,data){
      return $http({
        url: server+"companies/"+data.id_company+"/users/"+id,
          method: 'PUT',
          data: data
        })
    },
    sign_in_count: function(id){
      return $http.get(server+'companies/0/users/'+id+'/sign_in_count')
    }
  };
});
