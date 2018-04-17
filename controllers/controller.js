const md = require('markdown-it')({
  html: true
});


const Module = require('../models').Module;
const User = require('../models').User;
const Feedback = require('../models').Feedback;
const Lesson = require('../models').Lesson;

let controller = {

  getModuleList: (req, res)=>{
    Module.findAll({
      include: [{
        model: Lesson,
        as: 'lessons'
      }],
      order: ['number']
    })
      .then((results)=>{
        // Only show currently available modules
        let now = new Date();
        let filteredModules = results.filter((module)=>{
          let availableFrom = new Date(module.availableFrom);
          let availableTo = new Date(module.availableTo);
          if (availableFrom < now && now < availableTo) {
            return true;
          }
        })
        res.render('index', {
          modules: filteredModules
        })
      })
      .catch(err=>console.log(err))
  },

  getModuleDetail: (req, res, next)=>{
    Module.findOne({
      include: [{
        model: Lesson,
        as: 'lessons'
      }],
      where: {number: req.params.moduleNumber}
    })
      .then((result)=>{
        res.render('module', {
          module: result
        })
      })
      .catch(err => next())
  },

  getModuleEval: (req, res)=>{
    res.render('evaluation', {
      moduleNumber: req.params.moduleNumber
    })
  },

  postModuleEval: (req, res)=>{
    let newEvaluation = {
      moduleNumber: req.params.moduleNumber,
      experience: req.body.experience,
      learned: req.body.learned,
      message: req.body.message
    }

    // TODO: Store evaluation form

    res.status(502).send("Not implemented")

  },

  getLessonDetail: (req, res, next)=>{

      Module.findOne({
        include: [{
          model: Lesson,
          as: 'lessons'
        }],
        where: {
          number: req.params.moduleNumber
        }
      })
        .then((result)=>{
          let lessons = result.lessons.filter((lesson)=>{
            if(lesson.number === parseInt(req.params.lessonNumber)){
              return true;
            }
          })
          let lesson = lessons[0];
          lesson.content = md.render(lesson.content);

          res.render('lesson', {
            lesson: lesson,
            module: result
          })
        })
        .catch(err => next())
  },

  getFeedbackForm: (req, res)=>{
    // If the user has gone to the route for a particular module, pass in the module number
    if (req.params.moduleNumber) {
      res.render('feedback', {
        moduleNumber: req.params.moduleNumber
      })
    } else {
      res.render('feedback', {
        moduleNumber: "All"
      })
    }
  },

  postFeedbackForm: (req, res)=>{
    let newFeedback = {
      moduleNumber: req.body.moduleNumber,
      experience: req.body.experience,
      message: req.body.message
    }
    Feedback.create(newFeedback)
      .then(module => res.status(201).redirect('/'))
      .catch(error => res.status(401).send(error));
  }

}
module.exports = controller;
