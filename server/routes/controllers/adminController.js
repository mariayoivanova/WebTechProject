const Post = require('../models/Post');
const User = require('../models/User');
const adminLayout = '../views/layouts/admin';

const admin = async (req, res) => {
    try {
      const locals = {
        title: "Admin",
        description: "Blog"
      };
  
      res.render("admin/index", {locals, layout: adminLayout});
    } catch (error) {
      console.log(error);
    }
  };

const checkLogin = async (req, res) => {
    try {
      const {username, password} = req.body;
      if(req.body.username === 'admin' && req.body.password === 'password') {
         res.send('You are logged in.')
         } else {
          res.send('Wrong username or password');
     }
        
         } catch (error) {
     console.log(error);
     }
    }
  
  module.exports = { 
    admin,
    checkLogin
  };

