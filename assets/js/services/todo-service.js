app.factory('TodoService', ['store', function(store){
	var service = {};

	service.addItem = function(username, text){
		var errors = [];

		if(!text){
			errors.push('Item cannot be empty');
		}
		else{
			var users = store.get('users');
			var user = users.find(function(item){ return item.username == username });
			if(user){
				user.todos.unshift({ text: text});
				store.set('users', users);
			}else{
				var todos = store.get('offlineTodos');
				todos.unshift({ text: text});
				store.set('offlineTodos', todos);
			}
		}

		return {
			errors: errors
		};
	}

	service.changeItem = function(username, index, text){
		var errors = [];

		if(!text){
			errors.push('Item cannot be empty');
		}
		else{
			var users = store.get('users');
			var user = users.find(function(item){ return item.username == username });
			if(user){
				user.todos[index] = {text: text};
				store.set('users', users);
			}else{
				var todos = store.get('offlineTodos');
				todos[index] = {text: text};
				store.set('offlineTodos', todos);
			}
		}

		return {
			errors:	errors
		};
	}

	service.removeItem = function(username, index){
		var users = store.get('users');
		var user = users.find(function(item){ return item.username == username });
		if(user){
			user.todos.splice(index, 1);
			store.set('users', users);
		}else{
			var todos = store.get('offlineTodos');
			todos.splice(index, 1);
			store.set('offlineTodos', todos);
		}
	}

	return{
		addItem: service.addItem,
		changeItem: service.changeItem,
		removeItem: service.removeItem
	}
}]);