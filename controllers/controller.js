let controller = {
  getModuleList: (req, res)=>{
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
