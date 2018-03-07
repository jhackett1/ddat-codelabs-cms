let routes = function(express){
  let router = express.Router();

  router.route('/')
    .get((req, res)=>{
      res.send('You are on the admin view')
    })

  // Module detail view
  router.route('/module/:moduleId')
    .get((req, res)=>{
      res.send(`You are editing module ${req.params.moduleId}`)
    })

  // Lesson detail view
  router.route('/module/:moduleId/lesson/:lessonId')
    .get((req, res)=>{
      res.send(`You are editing resource ${req.params.lessonId}`)
    })

  return router;
}

module.exports = routes;
