import _ from 'lodash/lodash.min';

(() => {
	'use strict';

	angular
		.module('groups')
		.controller('CommunityHomeController', CommunityHomeController);

	CommunityHomeController.$inject = ['$scope', 'UserAuthenticationService', 'GroupService', 'SliderService'];

	function CommunityHomeController ($scope, UserAuthenticationService, GroupService, SliderService) {
		$scope.$watch(() => {
		    return UserAuthenticationService.isLoggedIn();
		}, (isLoggedIn) => {
		    $scope.user.isLoggedIn = isLoggedIn;
		});

		$scope.user = {};
		$scope.user.isLoggedIn = UserAuthenticationService.isLoggedIn();

		if ($scope.user.isLoggedIn){
    		UserAuthenticationService.getCurrentUser()
		    	.then((result)=> {
		    		$scope.user.currentUser = result;
		    		$scope.loadUserGroups($scope.user.currentUser);
		    	});
    	}

		$scope.loadUserGroups = (selectedUser) => {	// used in landing page where count of groups is stated
			if (selectedUser.groupsJoined.length > 0){
				GroupService.getSomeGroups(selectedUser.groupsJoined)
					.then((groups) => {
						$scope.userGroups = groups;
					});
			} else {
				$scope.userGroups = [];
			}
		}

		$scope.sliders = [];

		// Fetch slides from server
		SliderService.getSliders()
			.then((result) => {
				$scope.sliders = result;
			});
	}

})();
