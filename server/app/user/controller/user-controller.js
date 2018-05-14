const express  = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require("passport");
const User  = require("../model/user");

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

module.exports.getLogout = (req, res) => {
  req.logout();
  res.clearCookie('jwt');
  res.redirect('/api/login')
};