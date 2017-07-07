var app = angular.module('app', ['angular-storage']);
app.run(['$rootScope', 'store', 'UserService', function($rootScope, store, UserService){
	if(!store.get('users')){
		store.set('users', []);
	}

	if(!store.get('offlineTodos')){
		store.set('offlineTodos', []);
	}

	var user = store.get('loggedUser');
	if(user){
		$rootScope.user = UserService.logIn(user.username, user.password).user;
	}

	if(!$rootScope.user){
		$rootScope.user = { todos: store.get('offlineTodos'), offlineMode: true };
	}

	window.onload = function(){
		angular.element(document.body).addClass('ready');
	}

	$rootScope.openModal = function(templateUrl, modalSize){
		$rootScope.modalTemplate = templateUrl;
		$rootScope.modalSize = modalSize + 'px';
		angular.element(document.body).addClass('locked');
	}

	$rootScope.closeModal = function(){
		$rootScope.modalTemplate = null;
		$rootScope.modalSize = null;
		angular.element(document.body).removeClass('locked');
	}

	$rootScope.logout = function(){
		 UserService.logOut();
		$rootScope.user = { todos: store.get('offlineTodos'), offlineMode: true };
	}
}]);