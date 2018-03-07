let routes = function(express){
  let router = express.Router();
  let adminController = require('../controllers/adminController');

  router.route('/')
    .get(adminController.getModuleList)

  // Module detail view
  router.route('/module/:moduleId')
    .get(adminController.getModuleDetail)

  // Lesson detail view
  router.route('/module/:moduleId/lesson/:lessonId')
    .get(adminController.getLessonDetail)

  return router;
}

module.exports = routes;
