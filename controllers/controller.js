const User = require('../models/user')

let controller = {
  getModuleList: (req, res)=>{


    User.create({
      id: 3543,
      username: "fjkwl",
      password: "gjkelw;"
    })
      .then(user => console.log(user))
      .catch(error => console.log(error));


    // User.findAll()
    //   .then((result)=>{
    //     console.log(result)
    //   })
    //   .catch((err)=>[
    //     console.log(err)
    //   ])

    // res.send('Module list view')
    res.render('moduleList', {
      htmlLang: false,
      govukTemplateAssetPath: "",
      bodyClasses: false,
      skipLinkMessage: false,
      headerClass: false,
      homepageUrl: false,
      logoLinkTitle: false,
      globalHeaderText: "DDaT Codelabs",
      crownCopyrightMessage: false
    })
  },
  getModuleDetail: (req, res)=>{
    res.send(`You are on module ${req.params.moduleId}`)
  },
  getLessonDetail: (req, res)=>{
    res.send(`You are on resource ${req.params.lessonId}`)
  }
}
module.exports = controller;