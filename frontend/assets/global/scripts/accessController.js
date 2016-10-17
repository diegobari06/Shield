
app.controller('accessController',function($scope,$state,$rootScope,$window,accessFunctions,residentsFunctions){

  $rootScope.container = false;
  $scope.access = function() {
      $auth.submitLogin($scope.accessForm);
  }
    $scope.show = 4;

     $scope.getResident = function() {
        if($scope.id_number==""){
            $scope.show = 4;
        } else{
          accessFunctions.getResident($scope.id_number).success(function(data) {
            if(data==0){
              $scope.show = 3;
            }else{
              console.log(JSON.stringify(data));
              var residente = JSON.stringify(data);
               $scope.show = 1;
                 console.log(data[1].name);
               $scope.license_plate = residente.name;
              //  $scope.SelectedBrand = data.brand;
              //  $scope.SelectedHouse = data.house_id;

}
          });
        }
   };
      $scope.getVehicule = function() {

        if($scope.id_vehicule==""){
            $scope.show = 4;
        } else{
          accessFunctions.getVehicule($scope.id_vehicule).success(function(data) {
            if(data==0){
              $scope.show = 3;
              console.log("qeerq")
            }else{
               $scope.show = 2;
               $scope.license_plate = data.license_plate;
               $scope.SelectedBrand = data.brand;
               $scope.SelectedHouse = data.house_id;
               $scope.color = data.color;

            }

          });
        }

      };
      $scope.insertVisitor=function(){
        residentsFunctions.getAllHouses().success(function(houses){
            $scope.houses = houses;
            var selectBox = document.getElementById('rec_mode');
            for(var i = 0, l = houses.length; i < l; i++){
              var option = houses[i];
              selectBox.options.add( new Option(option.house_number, option.id) );
              }
        })
      function myFunction() {
              alert( "Handler for .change() called." );
        }
bootbox.confirm({
    message: '<div class="">\
    						<div class="portlet-title gray-font">\
    							<div class="caption text-center font-19" >\
    							 Registrar visitante\
    							</div>\
    						</div>\
    						<div class="portlet-body form">\
    							<form role="form">\
    								<div class="form-body">\
    									<div class="form-group col-md-offset-1 col-md-10">\
    										<div class="input-group">\
    											<span class="input-group-addon">\
    											<i class="fa fa-user"></i>\
    											</span>\
    											<input type="text" id="name" class="form-control" placeholder="Nombre">\
    										</div>\
    									</div>\
                      <div class="form-group col-md-offset-1 col-md-10">\
                        <div class="input-group">\
                          <span class="input-group-addon">\
                          <i class="fa fa-user"></i>\
                          </span>\
                          <input type="text" class="form-control" id="last_name"  placeholder="Primer apellido">\
                        </div>\
                      </div>\
                      <div class="form-group col-md-offset-1 col-md-10">\
                        <div class="input-group">\
                          <span class="input-group-addon">\
                          <i class="fa fa-user"></i>\
                          </span>\
                          <input type="text" class="form-control" id="second_last_name"  placeholder="Segundo apellido">\
                        </div>\
                      </div>\
                      <div class="form-group col-md-offset-1 col-md-10">\
                        <div class="input-group">\
                          <span class="input-group-addon">\
                          <i class="fa fa-indent"></i>\
                          </span>\
                          <input type="text" class="form-control"  onchange="myFunction()" id="identification_number" placeholder="Cédula">\
                        </div>\
                      </div>\
                      <div class="form-group col-md-offset-1 col-md-10">\
                        <div class="input-group">\
                          <span class="input-group-addon">\
                          <i class="fa fa-car"></i>\
                          </span>\
                          <input type="text" class="form-control" id="license_plate" placeholder="Número de placa (opcional)">\
                        </div>\
                      </div>\
                      <div class="form-group col-md-offset-1 col-md-10 no-padding" >\
                      <label class="col-md-4 col-sm-3 col-xs-5 gray-font">Número de casa</label>\
                      <div class="form-group col-md-8 col-sm-9 col-xs-7">\
                      <select class="form-control gray-font" id="rec_mode">\
                      </select>\
                      </div>\
                  </div>\
    								</div>\
    							</form>\
    						</div>\
    					</div>',

    callback: function (result) {
       var name = document.getElementById("name").value;
       var last_name = document.getElementById("last_name").value;
       var second_last_name = document.getElementById("second_last_name").value;
       var identification_number = document.getElementById("identification_number").value;
       var license_plate = document.getElementById("license_plate").value;
       var id_house = document.getElementById("rec_mode").value;

       accessFunctions.insertVisitor({name: name, last_name: last_name, second_last_name: second_last_name, company_id: 3,identification_number: identification_number, license_plate: license_plate,id_house: id_house}).success(function(){

             // popUp.success("Resident has been created successfully");
       })
    }
});
    }
});





app.factory('accessFunctions', function($http){
     return {
        getResident: function(id){
          return $http.get('http://localhost:3000/companies/3/residents/find/'+id)
        },
        getVehicule: function(id){
          return $http.get('http://localhost:3000/companies/3/vehicules/find/'+id)
        },
        insertVisitor: function(data){
          return $http({
            url: "http://localhost:3000/companies/3/visitants",
            method: 'POST',
            data: data
            });
        }
      };
});
