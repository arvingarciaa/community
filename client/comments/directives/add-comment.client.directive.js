(() => {
	'use strict';
	
	angular
		.module('comments')
		.directive('addComment', addComment);

	function addComment () {

		const directive = {
			restrict: 'E',
			templateUrl: '/comments/views/add-comment.client.view.html',
			controller: 'CommentController'
		}

		return directive;
	}

})();

