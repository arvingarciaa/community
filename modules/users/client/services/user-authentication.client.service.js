(() => {
	'use strict';
	
	angular
		.module('users')
		.factory('UserAuthenticationService', UserAuthenticationService);

	UserAuthenticationService.$inject = ['$http', '$window', '$q', '$state', 'UserService', 'ngToast'];

	function UserAuthenticationService ($http, $window, $q, $state, UserService, ngToast) {

		const saveToken = (token) => {
		  $window.localStorage['pcaarrdcommunity-token'] = token;
		}

		const getToken = () => {
		  return $window.localStorage['pcaarrdcommunity-token'];
		}

		const logout = () => {
		  $window.localStorage.removeItem('pcaarrdcommunity-token');
		  $state.go("login");
		}

		const isLoggedIn = () => {
		  const token = getToken();
		  let payload;

		  if(token){
		    payload = token.split('.')[1];
		    payload = $window.atob(payload);
		    payload = JSON.parse(payload);
		    return payload.exp > Date.now() / 1000;
		  } else {
		    return false;
		  }
		}

		const getCurrentUser = () => {
			if (isLoggedIn()) {
				const deferred = $q.defer();

				const token = getToken();
				let payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				UserService.getOneUser(payload._id)
				    .then((result) => {
						deferred.resolve(result);
					}, (error) => {
						// show 404 not found page
						deferred.reject(result);
					});

				return deferred.promise;
			}
		}

		const register = (userFormData, password, enteredAccessKey) => {
			const deferred = $q.defer();
			const requestBody = {userFormData, password};

			if (userFormData.isAdmin && !enteredAccessKey){
				deferred.reject({data: {message: 'Invalid Access Key!!'}});
				return deferred.promise;
			}
			else if (userFormData.isAdmin)
				requestBody.enteredKey = enteredAccessKey;

			$http.post('/api/users/register/', requestBody)
			.then(response => {
				saveToken(response.data.token);
		    	deferred.resolve(response.data.token);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const login = (userCredentials) => {
			const deferred = $q.defer();

			$http.post('/api/users/login/', userCredentials)
			.then(response => {
				saveToken(response.data.token);
				deferred.resolve(response.data.token);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const allowAdminRegistration = (enteredKey) => {
			const deferred = $q.defer();

			$http.post('api/users/allow-admin-registration', {enteredKey})
			.then((response) => {
				deferred.resolve(response.data.allow);
			}, (response) => {
				deferred.reject(response.data.allow);
			});

			return deferred.promise;
		}

		const loginFirst = () => {
			ngToast.create({
	    		className: 'danger',
	    		content: `You are currently not logged in. Please log in first!`
	    	});

		    $state.go('login');
		}

		return {
		  saveToken,
		  getToken,
		  logout,
		  isLoggedIn,
		  getCurrentUser,
		  register,
		  login,
		  allowAdminRegistration,
		  loginFirst
		};
	}

})();

