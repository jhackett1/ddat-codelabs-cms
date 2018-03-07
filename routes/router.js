let routes = function(express){
  let router = express.Router();

  // Module list view
  router.route('/')
    .get((req, res)=>{
      res.send('Module list view')
    })

  // Module detail view
  router.route('/module/:moduleId')
    .get((req, res)=>{
      res.send(`You are on module ${req.params.moduleId}`)
    })

  // Lesson detail view
  router.route('/module/:moduleId/lesson/:lessonId')
    .get((req, res)=>{
      res.send(`You are on resource ${req.params.lessonId}`)
    })

  // Login form
  router.route('/login')
    .get((req, res)=>{
      res.send(`You are on the login page`)
    })

  return router;
}

module.exports = routes;
