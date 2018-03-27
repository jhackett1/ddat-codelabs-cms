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
        res.render('index', {
          modules: results
        })
      })
      .catch(err=>console.log(err))
  },


  getModuleDetail: (req, res)=>{
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
      .catch(err => res.status(401).send(err))
  },

  getLessonDetail: (req, res)=>{

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
          res.render('lesson', {
            lesson: lessons[0],
            module: result
          })
        })
        .catch(err => console.log(err))
  },

  getFeedbackForm: (req, res)=>{
    res.render('feedback')
  },

  postFeedbackForm: (req, res)=>{
    let newFeedback = {
      experience: req.body.experience,
      message: req.body.message
    }
    Feedback.create(newFeedback)
      .then(module => res.status(201).redirect('/'))
      .catch(error => res.status(401).send(error));
  }

}
module.exports = controller;
