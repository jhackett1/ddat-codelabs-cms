const Module = require('../models').Module;
const Feedback = require('../models').Feedback;

let controller = {
  getModuleList: (req, res)=>{
    // Get modules from DB
    Module.findAll()
      .then((results)=>{
        // Sort by order
        let sortedResults = results.sort((a, b)=>{
          return a.number > b.number
        })
        // Render dashboard
        res.render('admin/index', {
          modulesList: sortedResults
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

  getNewLesson: (req, res)=>{
    res.send(`New lesson form`)
  },

  getEditLesson: (req, res)=>{
    res.send(`You are on resource ${req.params.lessonId}`)
  }
}
module.exports = controller;
