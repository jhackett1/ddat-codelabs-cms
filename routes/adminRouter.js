let routes = function(express){
  let router = express.Router();
  let adminController = require('../controllers/adminController');

  router.route('/')
    .get(adminController.getModuleList)

  // Module detail view
  router.route('/module/new')
    .get(adminController.getNewModule)
    .post(adminController.postNewModule)
  router.route('/module/:moduleId')
    .get(adminController.getEditModule)

  // Lesson detail view
  router.route('/module/:moduleId/lesson/new')
    .get(adminController.getNewLesson)
  router.route('/module/:moduleId/lesson/:lessonId')
    .get(adminController.getEditLesson)

  return router;
}

module.exports = routes;
