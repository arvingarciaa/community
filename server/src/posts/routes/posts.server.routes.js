import postCtrl from '../controllers/posts.server.controller';

const postsRoutes = (app) => {

  app.route('/api/posts')
    .get(postCtrl.list)
    .post(postCtrl.post);

  app.route('/api/posts/category/:category')
    .get(postCtrl.listByCategory);

  app.route('/api/posts/group-belonged/:handle')
    .get(postCtrl.listByGroupBelonged);

  app.route('/api/posts/group-belonged/:handle/category/:category')
    .get(postCtrl.listByGroupBelongedAndCategory);

  app.route('/api/posts/my-groups/:myGroups')
    .get(postCtrl.listByMyGroups);

  app.route('/api/posts/my-groups/:myGroups/category/:category')
    .get(postCtrl.listByMyGroupsAndCategory);

  app.route('/api/posts/user/:userID')
    .get(postCtrl.listByUser);

  app.route('/api/posts/user/:userID/length')
    .get(postCtrl.listLengthByUser);

  app.route('/api/posts/user/:userID/category/:category')
    .get(postCtrl.listByUserAndCategory);

  app.route('/api/posts/:id')
  	.get(postCtrl.listOne)
  	.delete(postCtrl.removeOne);

  app.route('/api/posts/reactions/:id')
  	.put(postCtrl.updateReactions);

};

export default postsRoutes;