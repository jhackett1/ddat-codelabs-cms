const Module = require('../models').Module;
const Feedback = require('../models').Feedback;
const Page = require('../models').Page;

let controller = {
  getModuleList: (req, res)=>{
    let modules = Module.findAll();
    let pages = Page.findAll();
    let feedbacks = Feedback.findAll();
    // Wait for both promises to resolve
    Promise.all([modules, pages, feedbacks])
      .then(function(results){
        // Process and sort data
        let sortedModules = results[0].sort((a, b)=>{
          return a.number > b.number
        })
        let sortedPages = results[1].sort((a, b)=>{
          return a.title > b.title
        })
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
          pagesList: sortedPages,
          allFeedback: results[2].length,
          recentFeedback: recentFeedback.length
        })
      })
      .catch(err => res.send(err))
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

  getEditModule: (req, res)=>{
    Module.findById(req.params.moduleId)
      .then((result)=>{
        res.render('admin/moduleEditor', {
          mode: 'edit',
          module: result
        })
      })
      .catch(err => console.log(err))
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
    Module.findById(req.params.moduleId)
      .then((result)=>{
        result.updateAttributes(updatedModule)
          .then(module => res.status(200).redirect('/admin'))
          .catch(error => res.status(401).send(error));
      })
      .catch(err => console.log(err))
  },

  deleteEditModule: (req, res)=>{
    Module.findById(req.params.moduleId)
      .then((result)=>{
        result.destroy()
          .then(module => res.status(200).redirect('/admin'))
          .catch(error => res.status(401).send(error));
      })
      .catch(err => console.log(err))
  }
}
module.exports = controller;
