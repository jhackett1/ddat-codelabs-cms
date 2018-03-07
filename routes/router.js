let routes = function(express){
  let router = express.Router();
  let controller = require('../controllers/controller');
  let userController = require('../controllers/userController');

  // Module list view
  router.route('/')
    .get(controller.getModuleList)

  // Module detail view
  router.route('/module/:moduleId')
    .get(controller.getModuleDetail)

  // Lesson detail view
  router.route('/module/:moduleId/lesson/:lessonId')
    .get(controller.getLessonDetail)

  // Login form
  router.route('/login')
    .get(userController.getLogin)

  return router;
}

module.exports = routes;
