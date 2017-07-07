app.controller('SignupController', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService){
	$scope.username = '';
	$scope.password = '';
	$scope.confirmPassword = '';
	$scope.name = '';

	$scope.signUp = function(){
		if(!$scope.submitting && $scope.user.offlineMode){
			$scope.submitting = true;
			$scope.errors = null;
			var result = UserService.signUp({
				username: $scope.username,
				password: $scope.password,
				confirmPassword: $scope.confirmPassword,
				name: $scope.name,
				offlineTodos: $scope.user.todos
			});

			if(result.errors){
				$scope.errors = result.errors;
			}else{
				$rootScope.user = result.user;
				$rootScope.closeModal();
			}

			$scope.submitting = false;
		}
		
		return false;
	}
}]);