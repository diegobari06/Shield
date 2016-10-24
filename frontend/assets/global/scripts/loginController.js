app.controller('loginController', function($scope, $auth, $location, $rootScope, $timeout, $state, usersFunctions) {


    $scope.beginSesion = function(loginForm) {
        // var box = bootbox.dialog({
        //     message: '<div class="text-center gray-font font-15"><img src="http://closera.com/skin/frontend/bizarre/skin2_new/images/Loading1.gif" style="width:40%; height 40%;" /></div>',
        //     closeButton: false,
        // })
        // box.find('.modal-content').css({
        //     'background': 'rgba(0, 0, 0, 0.0)',
        //     'border': '0px solid',
        //     'box-shadow': '0px 0px 0px #999'
        // });
        bootbox.dialog({
            message: '<div class="text-center gray-font font-15"><img src="../../assets/global/img/4.gif" style="width: 20px; height: 20px;"/>  Iniciando sesión...</div>',
            closeButton: false
        })
        $auth.submitLogin(loginForm);
    }
    $scope.isRequestiongPassword = false;

    $scope.backTologin = function() {
        $state.go('login');
    }

    $scope.logOut = function() {
        $auth.signOut();
        $state.go('login');
    }

    $scope.requestPassword = function() {
        $state.go('requestPassword');
    }
    $scope.login = function() {

        $auth.submitLogin($scope.loginForm);
    }

    $scope.$on('auth:login-success', function(ev, user) {

        window.user = user.id;
        usersFunctions.sign_in_count(user.id).success(function(data) {
            if (user.enabled == 1) {
                if (data.count == 1) {
                    $state.go('changePassword');
                } else {
                    if (user.permission_level == 3) {
                        $state.go('access');
                    } else if (user.permission_level == 2) {
                        $state.go('home');
                    } else if (user.permission_level == 1) {
                        $state.go('condominos');
                    } else {
                        $state.go('login');
                    }
                }
                bootbox.hideAll();
            } else {
                $auth.signOut();
                toastr["error"]("User disabled");
                $state.go('login');
                bootbox.hideAll();
            }
        })
    });

    $scope.$on('auth:login-error', function(ev, reason) {
        bootbox.hideAll();
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
        bootbox.hideAll();
        toastr["error"]("El correo digitado no pertenece a ningun asociado");
    });

    $scope.handlePwdResetBtnClick = function() {
        $auth.requestPasswordReset($scope.passwordResetForm);
    };

    $scope.$on('auth:password-reset-request-success', function(ev, resp, more, other) {
        toastr["info"]("Se he enviado a " + resp.email + " las instrucciones para recuperar tu contraseña", "Verifica tu correo electrónico")
        $state.go('login');
    });

    $scope.$on('auth:password-reset-request-error', function(ev, resp) {
        bootbox.hideAll();
        toastr["error"]("El correo digitado no pertenece a ningun asociado");
    });
});
