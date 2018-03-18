const Module = require('../models').Module;

let controller = {
  getModuleList: (req, res)=>{

    Module.findAll()
      .then((results)=>{
        console.log(results)
        res.render('admin/index', {
          modulesList: results
        })
      })
      .catch((err)=>[

        res.send(err)
      ])

  },
  getNewModule: (req, res)=>{
    res.render('admin/moduleEditor')
  },
  postNewModule: (req, res)=>{

    let newModule = {
      number: req.body.number,
      title: req.body.title,
      description: req.body.description,
      availableFrom: req.body['available-from'],
      availableTo: req.body['available-to']
    }

    console.log(newModule)

    Module.create(newModule)
      .then(module => res.status(201).redirect('/admin'))
      .catch(error => res.status(401).send(error));

  },
  getEditModule: (req, res)=>{
    res.render('admin/moduleEditor')
  },
  getNewLesson: (req, res)=>{
    res.send(`New lesson form`)
  },
  getEditLesson: (req, res)=>{
    res.send(`You are on resource ${req.params.lessonId}`)
  }
}
module.exports = controller;
