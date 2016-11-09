app.controller('newUsersController', function($scope, $auth, $rootScope, $http, $state, usersFunctions, companiesFunctions) {
    $rootScope.headerTitle = "Users accounts";
    $scope.title = "Crear administrador";
    $scope.button = "Crear";
    $scope.permissions = usersFunctions.permissions();

    companiesFunctions.getCompaniesList().success(function(companies) {
        $scope.companies = companies;
    });

    $scope.actionButton = function() {
        usersFunctions.sign_up({
                email: $scope.email,
                confirm_success_url: "/",
                permission_level: 3,
                id_company: $scope.companySelected.id
            }).success(function(data, status) {
                $state.go('users');
            })
            .error(function(data, status) {
                alert('adfad')
            });
    }

});

app.controller('UsersListController', function($scope, $state, $http, $rootScope, $window, residentsFunctions, usersFunctions, commonMethods) {

    $http.get('http://localhost:3000/companies/3/users').success(function(users) {
        $("#loadingIcon").fadeOut(0);
        setTimeout(function() {
            $("#tableData").fadeIn(300);
        }, 200)
        console.log(users);
        $scope.users = users;


    });
});
//
// angular.module('authApp').controller('usersController', function($scope,$auth,$location,$rootScope,$http){
//   $rootScope.headerTitle = "Users accounts";
//   $scope.onLabel = "Yes";
//   $scope.offLabel = "No";
//   $scope.showEnabled = true;
//   $scope.switch = {};
//   $scope.disabledUsers = [];
//   $scope.enabledUsers = [];
//   $scope.tempUsers = {};
//
//   function updateUsers(){
//     $scope.disabledUsers = [];
//     $scope.enabledUsers = [];
//     angular.forEach($scope.tempUsers, function(value,key){
//       if(value.enabled == false){
//         $scope.disabledUsers.push(value);
//       }else{
//         $scope.enabledUsers.push(value);
//       }
//       $scope.switch[value.id] = value.enabled;
//     });
//   }
//   usersFunctions.getAll().success(function(users){
//     $scope.tempUsers = users;
//     updateUsers();
//     $scope.users = $scope.enabledUsers;
//     $scope.viewLabel = "View disabled users";
//   });
//
//   $scope.changeState = function (user) {
//     var enabled = user.enabled;
//     bootbox.confirm("Are you sure?", function(result) {
//     if(result){
//       updateValue($scope.users,user,!enabled);
//     }else{
//       $scope.switch[user.id] = user.enabled;
//       $scope.$apply();
//     }
//     });
//   };
//
//   $scope.changeView = function(){
//     if($scope.showEnabled){
//       $scope.users = $scope.disabledUsers;
//       $scope.showEnabled = false;
//       $scope.viewLabel = "View enabled users";
//     }else{
//       updateUsers();
//       $scope.users = $scope.enabledUsers;
//       $scope.showEnabled = true;
//       $scope.viewLabel = "View disabled users";
//     }
//
//   }
//
//   function updateValue(array,obj,val){
//     angular.forEach(array,function(value, key){
//         if(value.id == obj.id){
//           $scope.users[key].enabled = val;
//           usersFunctions.update(value.id,{enabled: val}).error(function(data, status){
//             popUp.show("Error updating");
//           });
//         }
//     });
//     updateUsers();
//   }
//   $scope.permissions = usersFunctions.permissions();
//
// });
//
// angular.module('authApp').controller('editUsersController', function($scope,$auth,$stateParams,$http,$state,$rootScope,usersFunctions,rolesFunctions){
//     $rootScope.headerTitle = "Users accounts";
//     $scope.title = "Edit user";
//     $scope.button = "Edit";
//     $scope.roleSelected = {};
//     $scope.permissionSelected = {};
//
//     var id = $stateParams.id;
//
//     $scope.permissions = usersFunctions.permissions();
//     $scope.permissionSelected = $scope.permissions;
//
//     rolesFunctions.getRolList().success(function(roles) {
//           $scope.roles = roles;
//     });
//
//     usersFunctions.get(id).success(function(user) {
//         $scope.rolSelected = {};
//         $scope.permissionLevel = {};
//         $scope.edituser = user;
//         $scope.roleSelected.id = user.rol_id;
//         $scope.permissionSelected.value = user.permission_level;
//         $scope.email = user.email.replace("@sapiensdev.com","");
//     });
//
//     $scope.actionButton = function () {
//      usersFunctions.update($scope.edituser.id,{email: $scope.email + '@sapiensdev.com', permission_level: $scope.permissionSelected.value, rol_id: $scope.roleSelected.id});
//      $state.go('users');
//     }
//
// });
//
// angular.module('authApp').controller('personalInformationController', function($scope,$auth,$stateParams,$http,$state,$rootScope,$timeout,profileFunctions){
//   $rootScope.headerTitle = "Personal data";
//
//   var id = $rootScope.user.id;
//
//   $timeout(function() {
//        if($rootScope.user.profile != null){
//       $scope.personal_data = $rootScope.user.profile;
//       $scope.identification = $scope.personal_data.identification;
//       $scope.name = $scope.personal_data.name;
//       $scope.lastName = $scope.personal_data.last_name;
//       $scope.phoneNumber = parseInt($scope.personal_data.phone_number);
//       $scope.extract = $scope.personal_data.extract;
//   }
//   }, 300);
//
//
//
//
//   $scope.actionButton = function () {
//     data = {name: $scope.name, last_name: $scope.lastName, phone_number: $scope.phoneNumber, identification: $scope.identification, extract: $scope.extract};
//
//     if($scope.personal_data != null){ profileFunctions.update_personal_data(id,data,$scope.personal_data.id).success(function (data,status){
//                 $rootScope.user.profile = data;
//                 popUp.success("Changes saved");
//                 $state.go('educationalInformation',{id: id});
//     });
//     }else{
//       profileFunctions.save_personal_data(id,data)
//         .success(function (data,status){
//           $rootScope.user.profile = data;
//           $state.go('educationalInformation',{id: id});
//         })
//         .error(function (data,status){
//           popUp.show("Error saving your data");
//         });
//     }
//   };
// });
//
//
//
// angular.module('authApp').controller('languageController', function($scope,$auth,$stateParams,$http,$timeout,$state,$rootScope,profileFunctions){
//   if($rootScope.user.profile == null){
//       popUp.show("Please complete your personal information");
//       $state.go('newPersonalData');
//   }
//
//   $scope.show=0;
//
//     $scope.slider = {
//       value: 1,
//       options: {
//         showTicksValues: true,
//         stepsArray: [
//           {value: 1, legend: 'Basic'},
//           {value: 2, legend: 'Intermediate'},
//           {value: 3, legend: 'Advanced'},
//           {value: 4, legend: 'Native'},
//         ]
//       }
//     };
//     $timeout(function(){
//       $scope.$broadcast('reCalcViewDimensions');
//     },1)
//
//     clearInputs = function(){
//      $scope.language= null;
//      $scope.slider.value=1;
//      $scope.button ="Add";
//      $scope.show=0;
//    }
//
//     $scope.languages = {
//       data:[
//         { id: "1",name: "English"},
//         { id: "2",name: "Spanish"},
//         { id: "3",name: "Mandarin"},
//         { id: "4",name: "Portuguese"},
//         { id: "5",name: "German"},
//         { id: "6",name: "Korean"},
//         { id: "7",name: "French"},
//         { id: "8",name: "Italian"},
//         { id: "9",name: "Japanese"},
//         { id: "10",name: "Arabic"},
//         { id: "11",name: "Russian"},
//         { id: "12",name: "Swedish"},
//       ]
//     }
//
//     $scope.defineLevel = function (level) {
//       result=""
//         switch (level) {
//             case '1':
//                 result="Basic";
//                 break;
//             case '2':
//                 result="Intermediate";
//                 break;
//             case '3':
//                 result="Advanced";
//             break;
//             case '4':
//                 result="Native";
//             break;
//             default:
//         }
//       return result;
//     };
//     var idUser = $rootScope.user.id;
//     var idLanguage;
//
//     $rootScope.headerTitle = "Language information";
//     $scope.button = "Add";
//
//     $scope.userProfile = $rootScope.user.profile;
//
//     profileFunctions.getLanguages(idUser).success(function (languages){
//           $scope.languagesElements = languages;
//     });
//
//   $scope.actionButton = function () {
//     var state;
//     if($scope.language==null && $scope.show==0){
//       popUp.show("Please select a lenguage");
//     }else{
//         if($scope.show==0){
//             var data = {language: $scope.language.name,level: $scope.slider.value, state: state, profile_id: $scope.userProfile.id, related_changes: null};
//           }else{
//             var data = {language: $scope.languageEdit,level: $scope.slider.value, state: state, profile_id: $scope.userProfile.id, related_changes: null};
//         }
//         if($scope.button == "Add"){
//             data.state = 1;
//             profileFunctions.add_languages(idUser,data).success(function (data){
//                 clearInputs();
//                 $scope.languagesElements.push(data);
//                 popUp.success("Language information added successfully");
//             }).error(function(error,status){
//                 if(status == 422){
//                     popUp.show("Language already exist");
//                 }
//             });
//           } else {
//         if($scope.id_related!=null){
//             $scope.show=0;
//             clearInputs();
//             popUp.show("Pending changes to aprove");
//             clearInputs();
//             $scope.button = "Add";
//       } else {
//             $scope.show=1;
//             data.state = 1;
//             data.related_changes = idLanguage
//             data.language = $scope.languageEdit;
//             var data_pending = {state: 2}
//             profileFunctions.save_languages(idLanguage,idUser,data,data_pending).success(function (data){
//                 clearInputs();
//                 profileFunctions.getLanguages(idUser).success(function (languages){
//                     $scope.show=0;
//                     $scope.languagesElements = languages;
//                     popUp.success("Language information updated successfully");
//                 });
//             }).error(function(error,status){
//                 if(status == 422){
//                     popUp.show("Language already exist");
//                 }
//             });
//          }
//       }
//    }
// }
//       $scope.edit = function (language) {
//         $scope.show=1;
//         setTimeout(function() {
//              $scope.languageEdit = language.language;
//              $scope.slider.value=parseInt(language.level);
//              $scope.id_related = language.related_changes;
//              console.log($scope.languageEdit)
//              $scope.$apply(); //this triggers a $digest
//          }, 1);
//             idLanguage = language.id;
//             $scope.button = "Save";
//       }
//
//       $scope.delete = function(object_language) {
//         bootbox.confirm("Are you sure?", function(result) {
//         if(result){
//           profileFunctions.delete_language(object_language.id,idUser).success(function (object_language){
//                 if(object_language.related_changes!=null){
//                     profileFunctions.delete_language(object_language.related_changes,idUser);
//                 }
//                 profileFunctions.getLanguages(idUser).success(function (languages){
//                     $scope.languagesElements = languages;
//               });
//           });
//             clearInputs();
//           }
//      });
//    }
// });
//
// angular.module('authApp').controller('educationController', function($scope,$auth,$stateParams,$http,$state,$rootScope,profileFunctions){
//     if($rootScope.user.profile == null){
//         popUp.show("Please complete your personal information");
//         $state.go('newPersonalData');
//     }
//     var idUser = $rootScope.user.id;
//     var idEducation;
//     $rootScope.headerTitle = "Educational information";
//     $scope.button = "Add";
//
//     $scope.userProfile = $rootScope.user.profile;
//
//     profileFunctions.getEducations(idUser).success(function (educations){
//         $scope.educationElements = educations;
//     });
//     $scope.edit = function (education) {
//         $scope.institutionName = education.university;
//         $scope.degreeName = education.university_degree;
//         $("#year").val(education.year);
//         $scope.id_related = education.related_changes;
//         idEducation = education.id;
//         $scope.button = "Save";
//     }
//
//   $scope.actionButton = function () {
//     year = $('#year').val();
//     var data = {university: $scope.institutionName, university_degree: $scope.degreeName, year: year, state: 1, profile_id: $scope.userProfile.id, related_changes: null};
//     if($scope.button == "Add"){
//         profileFunctions.add_educational_information(idUser,data).success(function (data){
//             clearInputs();
//             $scope.educationElements.push(data);
//         }).error(function(error,status){
//             if(status == 422){
//                 popUp.show("Degree already exist");
//             }
//         });
//     } else {
//       if($scope.id_related!=null){
//         popUp.show("Pending changes to aprove");
//           clearInputs();
//           $scope.button = "Add";
//       } else {
//       data.state = 1;
//       data.related_changes = idEducation
//       var data_pending = {state: 2}
//       profileFunctions.save_educational_information(idEducation,idUser,data,data_pending).success(function (data){
//           clearInputs();
//           $scope.button ="Add";
//           profileFunctions.getEducations(idUser).success(function (educations){
//               $scope.educationElements = educations;
//           });
//       }).error(function(error,status){
//           if(status == 422){
//               popUp.show("Certification already exist");
//           }
//         });
//   }
//     }
//
//   }
//   $scope.delete = function(object_education) {
//     bootbox.confirm("Are you sure?", function(result) {
//     if(result){
//
//       profileFunctions.delete_educational_information(object_education.id,idUser).success(function (education){
//         if(object_education.related_changes!=null){
//             profileFunctions.delete_educational_information(object_education.related_changes,idUser);
//         }
//         profileFunctions.getEducations(idUser).success(function (educations){
//             $scope.educationElements = educations;
//         });
//         clearInputs();
//       });
//     }
// });
//
//   };
//   clearInputs = function(){
//    $scope.degreeName = "";
//    $scope.institutionName = "";
//      $("#year").val("");
//   }
//
// });
//
// angular.module('authApp').controller('certificationsTrainingsController', function($scope,$auth,$stateParams,$http,$state,$rootScope,profileFunctions){
//   if($rootScope.user.profile == null){
//       popUp.show("Please complete your personal information");
//       $state.go('newPersonalData');
//   }
//
//   var idUser = $rootScope.user.id;
//   var idCertification;
//   $rootScope.headerTitle = "Certifications/Trainings";
//   $scope.button = "Add";
//
//   $scope.userProfile = $rootScope.user.profile;
//
//   profileFunctions.getCertifications(idUser).success(function (certifications){
//         $scope.certificationsElements = certifications;
//   });
//
// $scope.actionButton = function () {
//   year = $('#year').val();
//   var state;
//
//   var data = {title: $scope.titleName, year: year, state: state, place: $scope.institutionName, profile_id: $scope.userProfile.id, related_changes: null};
//
//   if($scope.button == "Add"){
//         data.state = 1;
//         profileFunctions.add_certifications(idUser,data).success(function (data){
//             clearInputs();
//             $scope.certificationsElements.push(data);
//               popUp.success("Certification information added successfully");
//         }).error(function(error,status){
//             if(status == 422){
//                 popUp.show("Certification already exist");
//             }
//         });
//    } else {
//       if($scope.id_related!=null){
//         popUp.show("Pending changes to aprove");
//           clearInputs();
//           $scope.button = "Add";
//       } else {
//         data.state = 1;
//         data.related_changes = idCertification
//         var data_pending = {state: 2}
//         profileFunctions.save_certifications(idCertification,idUser,data,data_pending).success(function (data){
//             clearInputs();
//
//             profileFunctions.getCertifications(idUser).success(function (certifications){
//                 $scope.certificationsElements = certifications;
//                 popUp.success("Certification information updated successfully");
//             });
//         }).error(function(error,status){
//             if(status == 422){
//                 popUp.show("Certification already exist");
//             }
//           });
//       }
//   }
//   }
//     clearInputs = function(){
//      $scope.titleName = "";
//      $scope.institutionName = "";
//        $("#year").val("");
//          $scope.button ="Add";
//     }
//     $scope.edit = function (certification) {
//
//         $scope.titleName = certification.title;
//         $scope.id_related = certification.related_changes;
//           $scope.institutionName = certification.place;
//            $("#year").val(certification.year);
//             idCertification = certification.id;
//               $scope.button = "Save";
//
//     }
//     $scope.delete = function(object_certification) {
//
//       bootbox.confirm("Are you sure?", function(result) {
//
//       if(result){
//
//         profileFunctions.delete_certification(object_certification.id,idUser).success(function (certification){
//           if(object_certification.related_changes!=null){
//               profileFunctions.delete_certification(object_certification.related_changes,idUser);
//           }
//           profileFunctions.getCertifications(idUser).success(function (certifications){
//               $scope.certificationsElements = certifications;
//           });
//         });
//           clearInputs();
//       }
//   });
//
//
//     }
//
// });
//
// app.filter('changesTableFilter', function () {
//     return function (items) {
//         var result = [];
//
//         if (items) {
//             items.forEach(function (item) {
//                 if (item.state < 2) {
//                     result.push(item);
//                 }
//             });
//         }
//   return result;
// }
// });
//
// angular.module('authApp').controller('softSkillsInformationController', function($timeout,$scope,$auth,$stateParams,$http,$state,$rootScope,profileFunctions){
//
//   if($rootScope.user.profile == null){
//       popUp.show("Please complete your personal information");
//       $state.go('newPersonalData');
//   }
//   var idUser = $rootScope.user.id;
//   $rootScope.headerTitle = "Soft skills";
//   $scope.button = "Save";
//   $scope.values = {};
//
//   profileFunctions.getProfile(idUser).success(function (data){
//     $scope.userProfile = profileFunctions.getCurrentProfile(data);
//   });
//   var originalSoftSkills = [];
//
//
//   $scope.userProfile = $rootScope.user.profile;
//
//
// >>>>>>> origin/Sprint2
//   profileFunctions.getSoftskills(idUser).success(function (softskills){
//         $scope.softskillsElements = softskills;
//         originalSoftSkills = softskills;
//         angular.forEach(softskills, function(item, index) {
//            item.confirmation=1;
//             $scope.values[item.id] = item.level;
//         });
//           originalSoftSkills = softskills;
//   });
//   $scope.slider = {
//     value: 3,
//       options: {
//         floor: 0,
//         ceil: 5,
//           showSelectionBar: true,
//           showTicksValues: true,
//           showTicks: true,
//           getSelectionBarColor: function(value) {
//               if (value <= 1)
//                   return 'red';
//               if (value <= 3)
//                   return 'orange';
//               if (value == 4)
//                       return '#FFEB3B';
//               if (value == 5)
//                   return '#2AE02A';
//               return '#d8e0f3';
//           }
//       }
//   };
//
//
// $scope.addSoftSkill = function(name){
//   var data = {description: $scope.softSkillName, level: 0, state: 1, profile_id: $scope.userProfile.id };
//   profileFunctions.add_softskill(idUser,data).success(function (data){
//     $scope.values = {};
//     profileFunctions.getSoftskills(idUser).success(function (softskills){
//           $scope.softskillsElements = softskills;
//           angular.forEach(softskills, function(item, index) {
//               $scope.values[item.id] = item.level;
//               item.confirmation=1;
//               $scope.softSkillName = "";
//           });
//
//     });
//   }).error(function(error,status){
//     });
// }
// $scope.cancelSoftSkill = function(soft_skill){
//     soft_skill.confirmation = 1;
//     moveToOriginalLevel(soft_skill);
//
//
// }
//
// moveToOriginalLevel = function(soft_skill){
// angular.forEach(originalSoftSkills, function(item, index) {
//     console.log(item.id);
//     if(item.id==soft_skill.id){
//       setTimeout(function() {
//       $scope.values[soft_skill.id] = item.level;
//       $scope.$apply();
//       }, 1);
//     }
//
// });
// }
//
// $scope.editSoftskill = function(soft_skill){
//   if(soft_skill.related_changes!=null){
//         popUp.show("Pending changes to aprove");
//         soft_skill.confirmation = 1;
//         moveToOriginalLevel(soft_skill);
//       } else {
//         var data = {description: soft_skill.description, level: $scope.values[soft_skill.id], state: 1, profile_id: $scope.userProfile.id, related_changes: soft_skill.id}
//         bootbox.confirm("Are you sure?", function(result) {
//             if(result){
//               var data_pending = {state: 2}
//                 profileFunctions.save_softskills(soft_skill.id,idUser,data,data_pending).success(function (data){
//                     soft_skill.confirmation = 1;
//                     soft_skill.related_changes = soft_skill.id;
//                 }).error(function(error,status){
//                   });
//             }
//
//         });
//
//       }
// }
//
// $scope.changeScope = function(soft_skill){
//       soft_skill.confirmation = 2
// }
// $scope.deleteSoftSkill = function(object_softskill) {
//   bootbox.confirm("Are you sure?", function(result) {
//   if(result){
//     profileFunctions.delete_softskill(object_softskill.id,idUser).success(function (softskill){
//       if(object_softskill.related_changes!=null){
//           profileFunctions.delete_softskill(object_softskill.related_changes,idUser);
//       }
//       profileFunctions.getSoftskills(idUser).success(function (softskills){
//           $scope.softskillsElements = softskills;
//           angular.forEach(softskills, function(item, index) {
//              item.confirmation=1;
//           });
//       });
//     });
//
//   }
// });
//
//
// }
//
//   $timeout(function(){
//     $scope.$broadcast('reCalcViewDimensions');
//   },1)
// });
//
//
// angular.module('authApp').controller('technicalSkillsInformationController', function($timeout,$scope,$auth,$stateParams,$http,$state,$rootScope,profileFunctions){
//   $rootScope.headerTitle = "Technical skills";
//   $scope.button = "Save";
// });
//
// angular.module('authApp').controller('projectHistoryInformationController', function(commonMethods,$timeout,$scope,$auth,$stateParams,$http,$state,$rootScope,profileFunctions){
//   $rootScope.headerTitle = "Project history";
// <<<<<<< HEAD
//   $scope.button = "Add";
//
//   profileFunctions.getProfile(idUser).success(function (data){
//     $scope.userProfile = profileFunctions.getCurrentProfile(data);
//   });
//   profileFunctions.getProjectHistories(idUser).success(function (projectHistories){
//         $scope.projectHistoriesElements = projectHistories;
//   });
//
// $scope.actionButton = function () {
//   year = $('#year').val();
//   var state;
//   var data = {client: $scope.client, project_name: $scope.projectName, role: $scope.role, state: state, url: $scope.url, profile_id: $scope.userProfile.id, related_changes: null};
//
//   if($scope.button == "Add"){
//         data.state = 1;
//         profileFunctions.add_project_history(idUser,data).success(function (data){
//             clearInputs();
//             $scope.projectHistoriesElements.push(data);
//               popUp.success("Project history information added successfully");
//         }).error(function(error,status){
//             if(status == 422){
//                 popUp.show("Project history information already exist");
//             }
//         });
//    } else {
//       if($scope.id_related!=null){
//         popUp.show("Pending changes to aprove");
//           clearInputs();
//           $scope.button = "Add";
//       } else {
//         data.state = 1;
//         data.related_changes = idProjectHistory
//         var data_pending = {state: 2}
//         profileFunctions.save_certifications(idProjectHistory,idUser,data,data_pending).success(function (data){
//             clearInputs();
//
//             profileFunctions.getProjectHistories(idUser).success(function (projectHistories){
//                 $scope.projectHistoriesElements = projectHistories;
//                 popUp.success("Project history information updated successfully");
//             });
//         }).error(function(error,status){
//             if(status == 422){
//                 popUp.show("Project history already exist");
//             }
//           });
//       }
//   }
//   }
//     clearInputs = function(){
//      $scope.client = "";
//      $scope.projectName = "";
//      $scope.role = "";
//      $scope.url = "";
//       //  $("#year").val("");
//          $scope.button ="Add";
//     }
//     $scope.edit = function (project_history) {
//
//         $scope.client = project_history.client;
//         $scope.id_related = project_history.related_changes;
//           $scope.projectName = project_history.projectName;
//             $scope.role = project_history.role;
//               $scope.url = project_history.url;
//           //  $("#year").val(certification.year);
//             idCertification = certification.id;
//               $scope.button = "Save";
//
//     }
//     $scope.delete = function(object_certification) {
//
//       bootbox.confirm("Are you sure?", function(result) {
//
//       if(result){
//
//         profileFunctions.delete_project_history(object_certification.id,idUser).success(function (certification){
//           if(object_certification.related_changes!=null){
//               profileFunctions.delete_certification(object_certification.related_changes,idUser);
//           }
//           profileFunctions.getCertifications(idUser).success(function (certifications){
//               $scope.certificationsElements = certifications;
//           });
//         });
//           clearInputs();
//       }
//   });
//
//
//     }
//
//
//
// =======
//   $scope.button = "Save";
//     var idUser = $rootScope.user.id;
//     $timeout(function(){
//            $scope.userProfile=$scope.userProfile = $rootScope.user.profile;
//     },010)
//
//
//     console.log(idUser)
//     $scope.technologyKnown =   $scope.userProfile.technical_skills
//     $scope.technicalskillsUsed=[]
//
//   $scope.moveToLink = function(technicalskill){
//        commonMethods.moveToLink(technicalskill,$scope.technologyKnown,$scope.technicalskillsUsed);
//   }
//   $scope.moveToLinked = function(technicalskill){
//        commonMethods.moveToLinked(technicalskill,$scope.technologyKnown,$scope.technicalskillsUsed);
//   }
//     var idProject;
//     $scope.button = "Add";
//   $scope.actionButton = function () {
//     var state;
//     var init_date = $('#startDate').val();
//     var final_date = $('#finalDate').val();
//     var arquitecture = $scope.technicalskillsUsed.join();
//     // var data = {project_name: $scope.project_name, init_date: init_date, final_date: final_date,rol: $scope.rol ,state:state, profile_id: $scope.userProfile.id, related_changes: null, arquitecture: arquitecture};
//    console.log(data)
//     if($scope.button == "Add"){
//           data.state = 1;
//           profileFunctions.add_certifications(idUser,data).success(function (data){
//               clearInputs();
//               $scope.certificationsElements.push(data);
//                 popUp.success("Certification information added successfully");
//           }).error(function(error,status){
//               if(status == 422){
//                   popUp.show("Certification already exist");
//               }
//           });
//      } else {
//         if($scope.id_related!=null){
//           popUp.show("Pending changes to aprove");
//             clearInputs();
//             $scope.button = "Add";
//         } else {
//           data.state = 1;
//           data.related_changes = idCertification
//           var data_pending = {state: 2}
//           profileFunctions.save_certifications(idCertification,idUser,data,data_pending).success(function (data){
//               clearInputs();
//
//               profileFunctions.getCertifications(idUser).success(function (certifications){
//                   $scope.certificationsElements = certifications;
//                   popUp.success("Certification information updated successfully");
//               });
//           }).error(function(error,status){
//               if(status == 422){
//                   popUp.show("Certification already exist");
//               }
//             });
//         }
//     }
//     }
//       clearInputs = function(){
//        $scope.titleName = "";
//        $scope.institutionName = "";
//          $("#year").val("");
//            $scope.button ="Add";
//       }
//       $scope.edit = function (certification) {
//
//           $scope.titleName = certification.title;
//           $scope.id_related = certification.related_changes;
//             $scope.institutionName = certification.place;
//              $("#year").val(certification.year);
//               idCertification = certification.id;
//                 $scope.button = "Save";
//
//       }
//       $scope.delete = function(object_certification) {
//
//         bootbox.confirm("Are you sure?", function(result) {
//
//         if(result){
//
//           profileFunctions.delete_certification(object_certification.id,idUser).success(function (certification){
//             if(object_certification.related_changes!=null){
//                 profileFunctions.delete_certification(object_certification.related_changes,idUser);
//             }
//             profileFunctions.getCertifications(idUser).success(function (certifications){
//                 $scope.certificationsElements = certifications;
//             });
//           });
//             clearInputs();
//         }
//     });
// }
// });
//
// angular.module('authApp').controller('profileController', function($timeout,$scope,$auth,$stateParams,$http,$state,$rootScope,profileFunctions){
//   $rootScope.headerTitle = "My profile";
// >>>>>>> origin/Sprint2
// });
