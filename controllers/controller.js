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
    Module.findOne({where: {number: req.params.moduleNumber}})
      .then((result)=>{
        res.render('module', {
          module: result
        })
      })
      .catch(err => res.status(401).send(err))
  },

  getLessonDetail: (req, res)=>{
    res.send(`You are on resource ${req.params.lessonNumber} of module ${req.params.moduleNumber}`)
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
