let controller = {
  getModuleList: (req, res)=>{
    res.send('Module list view')
  },
  getModuleDetail: (req, res)=>{
    res.send(`You are on module ${req.params.moduleId}`)
  },
  getLessonDetail: (req, res)=>{
    res.send(`You are on resource ${req.params.lessonId}`)
  }
}
module.exports = controller;
