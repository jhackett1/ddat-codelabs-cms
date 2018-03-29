const slugs = require("slugs");
const md = require('markdown-it')({
  html: true
});

const Page = require('../models').Page;


let controller = {

  getPage: (req, res)=>{
    Page.findOne({where: {slug: req.params.pageSlug}})
      .then((result)=>{

        res.render('page', {
          page: {
            id: result.id,
            title: result.title,
            slug: result.slug,
            content: md.render(result.content)
          }
        })
      })
      .catch(err => res.status(401).send(err))
  },

  getMenu: (req, res, next)=>{
    Page.findAll()
      .then((results)=>{
        let sortedPages = results.sort((a, b)=>{
          return a.title > b.title
        })
        res.locals.menu = sortedPages;
        next()
      })
      .catch(err => res.status(401).send(err))
  },

  getNewPage: (req, res)=>{
    res.render('admin/pageEditor', {
      mode: 'new'
    })
  },

  postNewPage: (req, res)=>{
    // Process user-supplied form data
    let newPage = {
      title: req.body.title,
      slug: slugs(req.body.title),
      content: req.body.content,
    }
    // Save new module to DB
    Page.create(newPage)
      .then(module => res.status(201).redirect('/admin'))
      .catch(error => res.status(401).send(error));
  },

  getEditPage: (req, res)=>{
    Page.findById(req.params.pageId)
      .then((result)=>{
        res.render('admin/pageEditor', {
          mode: 'edit',
          page: result
        })
      })
      .catch(err => console.log(err))
  },

  postEditPage: (req, res)=>{
    // Process user-supplied form data
    let updatedPage = {
      title: req.body.title,
      slug: slugs(req.body.title),
      content: req.body.content,
    }
    Page.findById(req.params.pageId)
      .then((result)=>{
        result.updateAttributes(updatedPage)
          .then(page => res.status(200).redirect('back'))
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err))
  },

  deleteEditPage: (req, res)=>{
    Page.findById(req.params.pageId)
      .then((result)=>{
        result.destroy()
          .then(module => res.status(200).redirect('/admin'))
          .catch(error => res.status(401).send(error));
      })
      .catch(err => console.log(err))
  }

}
module.exports = controller;
