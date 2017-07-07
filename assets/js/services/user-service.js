app.factory('UserService', ['store', function(store){
	var service = {};

	service.logIn = function(username, password, offlineTodos){
		var errors = [];
		var users = store.get('users');
		var user = users.find(function(item){ return item.username == username && item.password == password });
		if(user){
			if(offlineTodos){
				user.todos = offlineTodos.concat(user.todos);
				store.set('users', users);
				store.set('offlineTodos', []);
			}

			store.set('loggedUser', { username: user.username, password: user.password });
		}else{
			errors.push('User does not exist');
		}

		if(!errors.length){
			return {
				user: user
			}
		}else{
			return {
				errors: errors
			}
		}
	}

	service.logOut = function(){
		store.set('loggedUser', null);
	}

	service.signUp = function(user){
		var errors = [];
		var users = store.get('users');

		if(!user.username){
			errors.push('Username is required');
		}else if(user.username.indexOf(' ') >= 0){
			errors.push('Username cannot have spaces');
		}else if(users.find(function(item){ return item.username == user.username})){
			errors.push('Username is already in use');
		}

		if(!user.password){
			errors.push('Password is required');
		}else if(user.password.indexOf(' ') >= 0){
			errors.push('Password cannot have spaces');
		}else if(user.password != user.confirmPassword){
			errors.push('Passwords do not match');
		}

		if(!user.name){
			errors.push('Name is required');
		}

		if(!errors.length){
			user.todos = user.offlineTodos;
			users.push(user);
			store.set('users', users);
			store.set('offlineTodos', []);
			return {
				user: user
			}
		}else{
			return {
				errors: errors
			}
		}
	}

	return {
		logIn: service.logIn,
		signUp: service.signUp,
		logOut: service.logOut
	}
}]);