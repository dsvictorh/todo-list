app.controller('TodoController', ['$scope', '$rootScope', 'TodoService', function($scope, $rootScope, TodoService){
	$scope.addItem = function(){
		if(!$scope.newTodo){
			$scope.newTodo = {};
		}
	}

	$scope.editItem = function(index){
		$rootScope.user.todos[index].editting = true;
		$rootScope.user.todos[index].editValue = $rootScope.user.todos[index].text;
	}

	$scope.saveItem = function(index, text){
		if(text){
			var result;
			if(index == null){
				result = TodoService.addItem($rootScope.user.username, text);
				if(!result.errors.length){
					$scope.newTodo = null;
				}
			}else{
				result = TodoService.changeItem($rootScope.user.username, index, text);
				if(result.errors.length){
				}
			}
		}
	}

	$scope.completeItem = function(index){
		if(confirm('Are you sure want to complete this item?')){
			TodoService.removeItem($rootScope.user.username, index);
		}
	}

	$scope.cancelItem = function(index){
		if(index == null){
			$scope.newTodo = null;
		}else{
			$rootScope.user.todos[index].editting = false;
			$rootScope.user.todos[index].editValue = '';
		}
	}
}]);