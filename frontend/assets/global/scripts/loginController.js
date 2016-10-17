app.controller('loginController', function($scope, $auth, $location, $rootScope, $timeout, $state, usersFunctions) {

  $scope.isRequestiongPassword = false;

  $scope.backTologin = function(){
    $state.go('login');
  }

  $scope.logOut = function(){
    $auth.signOut();
    $state.go('login');
  }

  $scope.requestPassword =function(){
    $state.go('requestPassword');
  }
    $scope.login = function() {
        $auth.submitLogin($scope.loginForm);
    }

    $scope.$on('auth:login-success', function(ev, user) {
      window.user = user.id;
        usersFunctions.sign_in_count(user.id).success(function(data) {
            if (user.enabled != false) {
                if (data.count == 1) {
                    $state.go('changePassword');
                } else {
                  if (user.permission_level == 3) {
                    $state.go('access');
                  } else {
                    $state.go('home');
                    }
                }
            } else {
                $auth.signOut();
                toastr["error"]("User disabled");
                $state.go('login');
            }
        })
    });

    $scope.$on('auth:login-error', function(ev, reason) {
          toastr["error"]("Porfavor verifique sus credenciales");
    });

    $scope.handleUpdatePasswordBtnClick = function() {
        $auth.updatePassword($scope.updatePasswordForm);
    };

    $scope.$on('auth:password-change-success', function(ev) {
          toastr["success"]("Se ha cambiado tu contraseña exitosamente");
        $state.go('residents');
    });

    $scope.$on('auth:password-change-error', function(ev, reason) {
      toastr["error"]("El correo digitado no pertenece a ningun asociado");
    });

    $scope.handlePwdResetBtnClick = function() {
        $auth.requestPasswordReset($scope.passwordResetForm);
    };

    $scope.$on('auth:password-reset-request-success', function(ev, resp, more, other) {
        toastr["info"]("Se he enviado a "+ resp.email + " las instrucciones para recuperar tu contraseña", "Verifica tu correo electrónico")
        $state.go('login');
    });

    $scope.$on('auth:password-reset-request-error', function(ev, resp) {
          toastr["error"]("El correo digitado no pertenece a ningun asociado");
    });
});
