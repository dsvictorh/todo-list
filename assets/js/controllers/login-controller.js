app.controller('LoginController', ['$scope', '$rootScope', 'UserService', 'TodoService', function($scope, $rootScope, UserService, TodoService){
	$scope.username = '';
	$scope.password = '';

	$scope.logIn = function(){
		if(!$scope.submitting && $scope.user.offlineMode){
			$scope.submitting = true;
			$scope.errors = null;
			var result = UserService.logIn($scope.username, $scope.password, $scope.user.todos);

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