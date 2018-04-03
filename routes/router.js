let routes = function(express){
  let router = express.Router();
  let controller = require('../controllers/controller');
  let userController = require('../controllers/userController');
  let pageController = require('../controllers/pageController');

  // Middleware
  router.use(function(req, res, next) {
    if (req.session.user) {
      res.locals.loggedIn = true;
      next()
    } else {
      next()
    }
  })

  // Inject menu data into all routes
  router.use(pageController.getMenu)

  // Module list view
  router.route('/')
    .get(controller.getModuleList)

  // Module detail view
  router.route('/module/:moduleNumber')
    .get(controller.getModuleDetail)

  // Lesson detail view
  router.route('/module/:moduleNumber/lesson/:lessonNumber')
    .get(controller.getLessonDetail)

  // Feedback form
  router.route('/feedback')
    .get(controller.getFeedbackForm)
    .post(controller.postFeedbackForm)

  // Login form
  router.route('/login')
    .get(userController.getLogin)
    .post(userController.postLogin)

  // Logout button
  router.route('/logout')
    .get(userController.logout)

  // Registration
  // router.route('/register')
  //   .post(userController.createUser)

  // Other pages
  router.route('/:pageSlug')
    .get(pageController.getPage)

  return router;
}

module.exports = routes;
