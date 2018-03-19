const markdown = require("markdown").markdown;

const Lesson = require('../models').Lesson;

let controller = {

  getNewLesson: (req, res)=>{
    res.render('admin/lessonEditor', {
      mode: 'new'
    })
  },

}
module.exports = controller;
