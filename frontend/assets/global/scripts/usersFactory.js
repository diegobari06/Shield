app.factory('usersFunctions', function($http, $rootScope) {
    var superserver = "http://localhost:3000/api/companies/";
    var server = superserver + $rootScope.user.company_id;
    return {
        update: function(id, data) {
            return $http({
                url: server + "/users/" + id,
                method: 'PUT',
                data: data
            })
        },
        getAll: function() {
            return $http.get(server + '/users');
        },
        delete: function(id, data) {
            return $http({
                url: server + "/users/" + id,
                method: 'DELETE'
            });
        },
        get: function(id) {
            return $http.get(server + '/users/' + id)
        },
        permissions: function() {
            return [{
                value: 1,
                name: "Employee"
            }, {
                value: 2,
                name: "Administrator"
            }, {
                value: 3,
                name: "Super Administrator"
            }];
        },
        sign_up: function(data) {
            console.log(data);
            return $http({
                url: server + "/users/",
                method: 'POST',
                data: data
            });
        },
        update_sign_up: function(id, data) {
            return $http({
                url: server + "/users/" + id,
                method: 'PUT',
                data: data
            })
        },
        sign_in_count: function(id) {
            return $http.get(superserver + '/0/users/' + id + '/sign_in_count')
        }
    };
});
