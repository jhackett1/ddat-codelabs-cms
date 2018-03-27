const bcrypt = require('bcrypt');

const User = require('../models').User;

// Return the SHA1 hash of a string




let controller = {

  createUser: (req, res)=>{
    bcrypt.hash(req.body.password, 10)
      .then((hash)=>{
        // Process user-supplied form data, and hash password
        let newUser = {
          email: req.body.email,
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
    res.render('login')
  },

  postLogin: (req, res)=>{

    User.findOne({where: {email: req.body.email}})
      .then((result)=>{

      })
      .catch(err=>{
        console.log(err)
      })

      // res.render('login', {
      //   error: {
      //     summary: "Your password is incorrect",
      //     detail: "Please try again"
      //   }
      // })

  }

}
module.exports = controller;
