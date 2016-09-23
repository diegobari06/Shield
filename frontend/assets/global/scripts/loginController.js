app.controller('loginController', function($scope, $auth, $location, $rootScope, $timeout, $state) {
    $rootScope.headerTitle = "Log in";
    $rootScope.container = false;
    $scope.login = function() {
        $auth.submitLogin($scope.loginForm);
    }

    $scope.$on('auth:login-success', function(ev, user) {
        usersFunctions.sign_in_count(user.id).success(function(data) {
          console.log(data)
            if (user.enabled != false) {
                if (data.count == 1) {
                    $state.go('changePassword');
                } else {
                    $state.go('residents');
                }
            } else {
                $auth.signOut();
                popUp.showdown("User disabled");
                $state.go('login');
            }
        })
    });

    $scope.$on('auth:login-error', function(ev, reason) {
        popUp.showdown("Please check your credentials");
    });

    $scope.handleUpdatePasswordBtnClick = function() {
        $auth.updatePassword($scope.updatePasswordForm);
    };

    $scope.$on('auth:password-change-success', function(ev) {
        popUp.success("Welcome to Skillmatrix");
        $state.go('home');
    });

    $scope.$on('auth:password-change-error', function(ev, reason) {
        popUp.showdown(reason.errors[0]);
    });

    $scope.handlePwdResetBtnClick = function() {
        $auth.requestPasswordReset($scope.passwordResetForm);
    };

    $scope.$on('auth:password-reset-request-success', function(ev, resp, more, other) {
        popUp.success("An email has been sent to " + resp.email + " for resetting your password.");
        $state.go('login');
    });

    $scope.$on('auth:password-reset-request-error', function(ev, resp) {
        popUp.showdown("Password reset request failed: " + resp.errors[0]);
    });

});
