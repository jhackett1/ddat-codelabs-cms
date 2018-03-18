const User = require('../models').User;
const Feedback = require('../models').Feedback;

let controller = {
  getModuleList: (req, res)=>{
    res.render('index')
  },
  getModuleDetail: (req, res)=>{
    res.send(`You are on module ${req.params.moduleId}`)
  },
  getLessonDetail: (req, res)=>{
    res.send(`You are on resource ${req.params.lessonId}`)
  },
  getFeedbackForm: (req, res)=>{
    res.render('feedback')
  },
  postFeedbackForm: (req, res)=>{

    let newFeedback = {
      experience: req.body.experience,
      message: req.body.message
    }

    console.log(newFeedback)

    Feedback.create(newFeedback)
      .then(module => res.status(201).redirect('/'))
      .catch(error => res.status(401).send(error));
  }
}
module.exports = controller;
