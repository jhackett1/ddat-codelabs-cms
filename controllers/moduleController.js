const arraySort = require('array-sort');

const Module = require('../models').Module;
const Lesson = require('../models').Lesson;
const Feedback = require('../models').Feedback;
const Page = require('../models').Page;

let controller = {
  getModuleList: (req, res)=>{
    let modules = Module.findAll();
    let lessons = Lesson.findAll({
      include: [{
        model: Module,
        as: 'Module',
      }]
    });
    let pages = Page.findAll();
    let feedbacks = Feedback.findAll();
    // Wait for both promises to resolve
    Promise.all([modules, pages, feedbacks, lessons])
      .then(function(results){
        // Display modules in their order
        let sortedModules = arraySort(results[0], ['number'])
        let sortedPages = results[1].sort((a, b)=>{
          return a.title > b.title
        })
        // Sort lessons by module order, then by lesson order
        let sortedLessons = arraySort(results[3], ['Module.number', 'number'])
        // Pull out only feedback submissions from last 7 days
        let cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 7);
        let recentFeedback = results[2].filter((feedback)=>{
          if(feedback.createdAt > cutoff){
            return true;
          }
        })
        // Render dashboard
        res.render('admin/index', {
          modulesList: sortedModules,
          lessonsList: sortedLessons,
          pagesList: sortedPages,
          feedbackList: recentFeedback,
          allFeedback: results[2].length,
          recentFeedback: recentFeedback.length
        })
      })
      .catch(err => console.log(err))
  },

  getNewModule: (req, res)=>{
    res.render('admin/moduleEditor', {
      mode: 'new'
    })
  },

  postNewModule: (req, res)=>{
    // Process user-supplied form data
    let newModule = {
      number: req.body.number,
      title: req.body.title,
      description: req.body.description,
      availableFrom: req.body['available-from'],
      availableTo: req.body['available-to']
    }
    // Save new module to DB
    Module.create(newModule)
      .then(module => res.status(201).redirect('/admin'))
      .catch(error => res.status(401).send(error));
  },

  getEditModule: (req, res, next)=>{
    Module.findOne({where: {number: req.params.moduleNumber}})
      .then((result)=>{
        res.render('admin/moduleEditor', {
          mode: 'edit',
          module: result
        })
      })
      .catch(err => next())
  },

  postEditModule: (req, res)=>{
    // Process user-supplied form data
    let updatedModule = {
      number: req.body.number,
      title: req.body.title,
      description: req.body.description,
      availableFrom: req.body['available-from'],
      availableTo: req.body['available-to']
    }
    Module.findOne({where: {number: req.params.moduleNumber}})
      .then((result)=>{
        result.updateAttributes(updatedModule)
          .then(module => res.status(200).redirect('back'))
          .catch(error => res.status(401).send(error));
      })
      .catch(err => console.log(err))
  },

  deleteEditModule: (req, res)=>{
    Module.findOne({where: {number: req.params.moduleNumber}})
      .then((result)=>{
        result.destroy()
          .then(module => res.status(200).redirect('/admin'))
          .catch(error => res.status(401).send(error));
      })
      .catch(err => console.log(err))
  }
}
module.exports = controller;
