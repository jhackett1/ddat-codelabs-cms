let controller = {
  getLogin: (req, res)=>{
    res.render('login')
  },

  postLogin: (req, res)=>{
    res.redirect('/admin')
  }

}
module.exports = controller;
