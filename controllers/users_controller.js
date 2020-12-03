const User = require('../models/user');


module.exports.signIn=function(req,res){
  return res.render('userSignIn');
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
}

