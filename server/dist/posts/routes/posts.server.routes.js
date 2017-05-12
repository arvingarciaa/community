'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _postsServer=require('../controllers/posts.server.controller'),_postsServer2=_interopRequireDefault(_postsServer);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var postsRoutes=function(a){a.route('/api/posts').get(_postsServer2.default.list).post(_postsServer2.default.post),a.route('/api/posts/category/:category').get(_postsServer2.default.listByCategory),a.route('/api/posts/group-belonged/:handle').get(_postsServer2.default.listByGroupBelonged),a.route('/api/posts/group-belonged/:handle/category/:category').get(_postsServer2.default.listByGroupBelongedAndCategory),a.route('/api/posts/my-groups/:myGroups').get(_postsServer2.default.listByMyGroups),a.route('/api/posts/my-groups/:myGroups/category/:category').get(_postsServer2.default.listByMyGroupsAndCategory),a.route('/api/posts/user/:userID').get(_postsServer2.default.listByUser),a.route('/api/posts/user/:userID/length').get(_postsServer2.default.listLengthByUser),a.route('/api/posts/user/:userID/category/:category').get(_postsServer2.default.listByUserAndCategory),a.route('/api/posts/:id').get(_postsServer2.default.listOne).delete(_postsServer2.default.removeOne),a.route('/api/posts/reactions/:id').put(_postsServer2.default.updateReactions)};exports.default=postsRoutes;
//# sourceMappingURL=posts.server.routes.js.map