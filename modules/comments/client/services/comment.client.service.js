import _ from 'lodash';

(() => {
	'use strict';
	
	angular
		.module('comments')
		.factory('CommentService', CommentService);

	CommentService.$inject = ['$http', '$q', 'ngToast'];

	function CommentService ($http, $q, ngToast) {

		let commentList = {
			contents: []
		};

		const getCommentList = () => {
			return commentList;
		}

		const getComments = (referredPost) => {
			$http.get(`/api/comments/referredPost/${referredPost}`)
			.then(response => {
				commentList.contents = response.data.comments;
			});
		}

		const getCommentsByUser = (referredPost, userID) => {
			const deferred = $q.defer();

			$http.get(`/api/comments/referredPost/${referredPost}/commentedBy/${userID}`)
			.then((response) => {
				deferred.resolve(response.data.comments);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getCommentsLengthByOneUser = (userID) => {
			const deferred = $q.defer();

			$http.get(`/api/comments/commentedBy/${userID}/length`)
			.then((response) => {
				deferred.resolve(response.data.commentsLength);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const getOneComment = (commentID) => {
			const deferred = $q.defer();
			
			$http.get(`/api/comments/${commentID}`)
			.then((response) => {
				deferred.resolve(response.data.comment);
			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		const submitComment = (addPostCommentData) => {
			$http.post('/api/comments', addPostCommentData)
			.then(response => {
				getComments(addPostCommentData.referredPost);

				ngToast.create({
		    		className: 'success',
		    		content: `Comment was successfully posted. `
		    	});
			});
		}

		const setCommentReaction = (comment, reactionIndex, currentUser) => {
			let reactions = comment.reactions;
			const reactionsLength = reactions.length;
			let duplicateReactionIndex = -1;

			// remove user and count duplicates in reactions
			for (let i = 0; i < reactionsLength; i++){
				if (reactions[i].users.length > 0){
					const removeUserIndex = reactions[i].users.map((user) => user._id).indexOf(currentUser._id);
					if (removeUserIndex >= 0){ // remove duplicate user and count
						duplicateReactionIndex = i;
						reactions[i].users.splice(removeUserIndex, 1);
						reactions[i].count--;
						break;
					}
				}
			}

			// prevent reposting the same reaction
			if (reactionIndex != duplicateReactionIndex){
				// increments the reaction count and adds the user in reaction userlist
				reactions[reactionIndex].count++;
				reactions[reactionIndex].users.push(currentUser);
			}

			$http.put(`/api/comments/reactions/${comment._id}`, {
				reactions
			}).then(response => {

			});
		}

		const deleteCommentsByReferredPost = (postID) => {
			$http.delete(`/api/comments/referredPost/${postID}`)
			.then(response => {	

			});
		}

		const deleteOneComment = (comment) => {
			const deferred = $q.defer();

			$http.delete(`/api/comments/${comment._id}`)
			.then((response) => {	
				getComments(comment.referredPost);

				ngToast.create({
		    		className: 'success',
		    		content: `The comment was successfully deleted.`
		    	});

		    	deferred.resolve(response);

			}, (response) => {
				deferred.reject(response);
			});

			return deferred.promise;
		}

		return {
			getCommentList,
			getComments,
			getCommentsByUser,
			getCommentsLengthByOneUser,
			getOneComment,
			submitComment,
			setCommentReaction,
			deleteCommentsByReferredPost,
			deleteOneComment
		};	
	}

})();

