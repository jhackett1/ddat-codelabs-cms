let routes = function(express){
  let router = express.Router();
  let controller = require('../controllers/controller');
  let userController = require('../controllers/userController');
  let pageController = require('../controllers/pageController');

  // Inject menu data into all routes
  router.use(pageController.getMenu)

  // Module list view
  router.route('/')
    .get(controller.getModuleList)

  // Module detail view
  router.route('/module/:moduleId')
    .get(controller.getModuleDetail)

  // Lesson detail view
  router.route('/module/:moduleId/lesson/:lessonId')
    .get(controller.getLessonDetail)

  router.route('/feedback')
    .get(controller.getFeedbackForm)
    .post(controller.postFeedbackForm)

  // Login form
  router.route('/login')
    .get(userController.getLogin)
    .post(userController.postLogin)

  // Other pages
  router.route('/:pageSlug')
    .get(pageController.getPage)

  return router;
}

module.exports = routes;
