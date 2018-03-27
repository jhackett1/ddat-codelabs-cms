let routes = function(express){
  let router = express.Router();
  let moduleController = require('../controllers/moduleController');
  let pageController = require('../controllers/pageController');
  let lessonController = require('../controllers/lessonController');

  // Middleware
  router.use(function(req, res, next){
    res.locals.loggedIn = true;
    next()
  })
  // Inject menu data into all routes
  router.use(pageController.getMenu)

  // Dashboard
  router.route('/')
    .get(moduleController.getModuleList)

  // Module editors
  router.route('/module/new')
    .get(moduleController.getNewModule)
    .post(moduleController.postNewModule)
  router.route('/module/:moduleNumber')
    .get(moduleController.getEditModule)
    .post(moduleController.postEditModule)
  router.route('/module/:moduleNumber/delete')
    .post(moduleController.deleteEditModule)

  // Lesson editors
  router.route('/lesson/new')
    .get(lessonController.getNewLesson)
    .post(lessonController.postNewLesson)
  router.route('/module/:moduleNumber/lesson/:lessonNumber')
    .get(lessonController.getEditLesson)
  router.route('/lesson/:lessonId/submit')
    .post(lessonController.postEditLesson)
  router.route('/lesson/:lessonId/delete')
    .post(lessonController.deleteEditLesson)

  // Page editors
  router.route('/page/new')
    .get(pageController.getNewPage)
    .post(pageController.postNewPage)
  router.route('/page/:pageId')
    .get(pageController.getEditPage)
    .post(pageController.postEditPage)
  router.route('/page/:pageId/delete')
    .post(pageController.deleteEditPage)

  return router;
}

module.exports = routes;
