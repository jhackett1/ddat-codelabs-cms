const User = require('../models').User;

let controller = {
  getModuleList: (req, res)=>{

    // User.create({
    //   id: 3543,
    //   username: "fjkwl",
    //   password: "gjkelw;"
    // })
    //   .then(user => console.log(user))
    //   .catch(error => console.log(error));

    res.render('index')

    // User.findAll()
    //   .then((result)=>{
    //     console.log(result)
    //
    //
    //   })
    //   .catch((err)=>[
    //     res.send(err)
    //   ])
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
    console.log(req.body)
    res.send('Form submitted');
  }
}
module.exports = controller;
