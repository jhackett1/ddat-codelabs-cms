const bcrypt = require('bcrypt');

const User = require('../models').User;

// Return the SHA1 hash of a string




let controller = {

  createUser: (req, res)=>{
    bcrypt.hash(req.body.password, 10)
      .then((hash)=>{
        // Process user-supplied form data, and hash password
        let newUser = {
          email: req.body.email.toLowerCase(),
          password: hash
        }
        // Save new user to DB
        User.create(newUser)
          .then(module => res.status(201).json({status: 'User successfully created'}))
          .catch(error => res.status(401).json({error: error}));
      })
      .catch((err)=>{
        console.log(err)
      })
  },

  getLogin: (req, res)=>{
    // Send the user straight to the dashboard if logged in
    if (req.session.user) return res.redirect('/admin')
    res.render('login')
  },

  postLogin: (req, res)=>{


    // Search the database for a user matching the email supplied
    User.findOne({where: {email: req.body.email.toLowerCase()}})
      .catch((err)=>{
        console.log(err)
      })
      .then((result)=>{
        if(result !== null){
          // User WAS found
          bcrypt.compare(req.body.password, result.password)
            .then(function(answer) {
              if(answer){
                // Password matches
                req.session.user = {email: result.email}
                res.redirect('/admin');
              } else {
                // Password incorrect
                res.render('login', {
                  error: {
                    summary: "Your username or password is incorrect",
                    detail: "Please check and try again."
                  }
                })
              }
            })
            .catch((err)=>{
              console.log(err)
            })
        } else {
          // User was NOT found
          res.render('login', {
            error: {
              summary: "Your username or password is incorrect",
              detail: "Please check and try again."
            }
          })
        }
      })



  },

  logout: (req, res, next)=>{
    delete req.session.user;
    res.redirect('/login')
  }

}
module.exports = controller;
