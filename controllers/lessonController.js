const Module = require('../models').Module;
const Lesson = require('../models').Lesson;

let controller = {

  getNewLesson: (req, res)=>{
    Module.findAll({order: ['number']})
      .then((results)=>{
        res.render('admin/lessonEditor', {
          mode: 'new',
          modules: results
        })
      })
      .catch((err)=>{res.send(err)})
  },

  postNewLesson: (req, res)=>{
    // Process user-supplied form data
    let newLesson = {
      title: req.body.title,
      number: req.body.number,
      content: req.body.content,
      lessonType: req.body.lessonType,
      difficulty: req.body.difficulty,
      moduleId: req.body.moduleId
    }
    // Save new module to DB
    Lesson.create(newLesson)
      .then(module => res.status(201).redirect('/admin'))
      .catch(error => console.log(error));
  },

  getEditLesson: (req, res)=>{
    let modules = Module.findAll()
    let module = Module.findOne({
      include: [{
        model: Lesson,
        as: 'lessons'
      }],
      where: {
        number: req.params.moduleNumber
      },
      order: ['number']
    })
    Promise.all([module, modules])
      .then((results)=>{
        let lessons = results[0].lessons.filter((lesson)=>{
          if(lesson.number === parseInt(req.params.lessonNumber)){
            return true;
          }
        })
        res.render('admin/lessonEditor', {
          mode: 'edit',
          lesson: lessons[0],
          modules: results[1],
          thisModule: results[0]
        })
      })
      .catch(err => console.log(err))
  },

  postEditLesson: (req, res)=>{
    // Process user-supplied form data
    let updatedLesson = {
      title: req.body.title,
      number: req.body.number,
      difficulty: req.body.difficulty,
      lessonType: req.body.lessonType,
      content: req.body.content,
      moduleId: req.body.moduleId
    }
    Lesson.findById(req.params.lessonId)
      .then((result)=>{
        let oldResult = result;
        result.updateAttributes(updatedLesson)
          .then(lesson => res.status(200).redirect('back'))
          .catch(error => res.status(401).send(error));
      })
      .catch(err => console.log(err))
  },

  deleteEditLesson: (req, res)=>{
    Lesson.findById(req.params.lessonId)
      .then((result)=>{
        result.destroy()
          .then(module => res.status(200).redirect('/admin'))
          .catch(error => res.status(401).send(error));
      })
      .catch(err => console.log(err))
  }

}
module.exports = controller;
