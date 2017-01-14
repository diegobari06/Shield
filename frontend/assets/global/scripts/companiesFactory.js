app.factory('companiesFunctions', function($http) {
    server = "http://localhost:3000/api/";
    return {
        get: function(id) {
            return $http.get(server + 'companies/' + id + '.json');
        },
        getCompaniesList: function() {
            return $http.get(server + 'companies.json');
        }
    }
});

app.filter('intersect', function() {
    return function(arr1, arr2) {
        return arr1.filter(function(n) {
            return arr2.indexOf(n) != -1
        });
    };
});
