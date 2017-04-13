import groupClassificationCtrl from '../controllers/groups-classification.server.controller';
import groupCtrl from '../controllers/groups.server.controller';

const groupsRoutes = (app) => {

  app.route('/api/groups/classifications')
    .get(groupClassificationCtrl.list)
    .post(groupClassificationCtrl.post);

  app.route('/api/groups/classifications/:id')
    .put(groupClassificationCtrl.updateOne)
    .delete(groupClassificationCtrl.removeOne);

  app.route('/api/groups')
    .get(groupCtrl.list)
    .post(groupCtrl.post);

  app.route('/api/groups/my-groups/:userID')
    .get(groupCtrl.listByMyGroups);

  app.route('/api/groups/discover-groups/:userID')
    .get(groupCtrl.listByDiscoverGroups);

  app.route('/api/groups/:handle')
    .get(groupCtrl.listOne)
    .put(groupCtrl.updateOne)
    .delete(groupCtrl.removeOne);

};

export default groupsRoutes;