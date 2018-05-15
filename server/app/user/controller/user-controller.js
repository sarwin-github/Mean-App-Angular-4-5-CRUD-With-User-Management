const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require("passport");
const User     = require("../model/user");
const async    = require('async');

// get login form
module.exports.getLogin = (req, res) => {
  res.status(200).json({ 
    success: true, 
    error  : req.flash('error'),
    message:'Successfully fetched form for login.'
  });
}

// login user
module.exports.postLogin = (req, res, next) => {
  passport.authenticate('passport-login', {session: false}, (err, user, info) => {
      if (err) { 
          req.flash('error', err);
          return next(err); 
      } 
      if (!user) {
          if(!!info){
              req.flash('error', info.message);     
          }
        return res.redirect('/api/login')
      } 

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          const token = jwt.sign(user.toJSON(), process.env.jwt_secret, { expiresIn: '5h' });

          return res.status(200).json({
            success : true,
            message : 'You successfully logged in your account',
            token   : token
          });
      });
  })(req, res, next);
}

module.exports.getSignupForm = (req, res) =>{
  res.status(200).json({ 
    success: true, 
    error  : req.flash('error'),
    message:'Successfully fetched form for signup.'
  });
}

// create new user
module.exports.signUp = (req, res) => {
  passport.authenticate('passport-signup', {session: false}, (err, user, info) => {
      if (err) { 
          req.flash('error', err);
          return next(err); 
      } 
      if (!user) {
          if(!!info){
              req.flash('error', info.message);     
          }
        return res.redirect('/api/signup')
      } 

      req.login(user, {session: false}, (err) => {
          if (err) {
              res.send(err);
          }

          const token = jwt.sign(user.toJSON(), process.env.jwt_secret, { expiresIn: '5h' });

          return res.status(200).json({
            success : true,
            message : 'You successfully logged in your account',
            token   : token
          });
      });
  })(req, res);
}


// get user profile
module.exports.getProfile = (req, res) => {
  res.status(200).json({ 
    user: req.user, 
    message: 'Successfully fetched user profile.'
  });
}

module.exports.updateUserProfile = (req, res) => {
    async.waterfall([
      // find user by id
        (callback) => {
            let query = User.findById({ _id: req.params.id }).select({'__v': 0});

            query.exec((err, user) => {
              if(!user){
              return res.status(404).json({
                sucess  : false,
                message : 'The user you are looking for does not exist.'
              });
            }
              callback(err, user);
            });
        }, 
        // update user
        (user, callback) => {
          user.name     = req.body.name;
          user.address  = req.body.address;

          user.save(err => {
            callback(err, user);
          });
        }], (err) => {
          if(err) {
            return res.status(500).json({ 
              sucess  : false, 
              error   : err, 
              message : 'Server error.'
            });
          }
          req.flash('message', 'Successfully updated a user');
          res.redirect(303, '/api/profile');
    });
}

module.exports.deleteUser = (req, res) => {
  let query = User.findOneAndRemove({ _id: req.params.id });

  query.exec((err, user) => {
    if(err){
      return res.status(500).json({ 
        sucess  : false, 
        error   : err, 
        message : 'Server error.'
      });
    } if(!user){
      return res.status(404).json({
        sucess  : false,
        message : 'The user you are looking for does not exist.'
      });
    }

    req.flash('message', 'User has been successfully deleted.');
    res.status(200).json({
      success: true, 
      message: "User has been successfully deleted."
    });
  });
}

// get list of user
module.exports.getUserList = (req, res) => {
  let query = User.find({}).select({'__v': 0, 'password': 0});

  query.exec((err, users) => {
    if(err){
      return res.status(500).json({ 
        sucess  : false, 
        error   : err, 
        message : 'Server error.'
      });
    } if(!users){
      return res.status(404).json({
        sucess  : false,
        message : 'A list of users does not exist.'
      });
    }

    res.status(200).json({
      success   : true, 
      message   : 'Successfully fetched the list of users.',
      users     : users,
    });
  });
}


module.exports.getLogout = (req, res) => {
  req.logout();
  res.clearCookie('jwt');
  res.redirect('/api/login')
};