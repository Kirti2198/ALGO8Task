const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.home= function(req,res){
  return res.render('home');
}


//  sign in and create a session for the user
module.exports.createSession = async function (req, res) {
  try {
    console.log("Inside create session");
    console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username or password"
      });
    } 
    return  res.json(200, {
        message: "Sign in succesful, here is your token please keep it safe",
        data: {
          token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' })
        }
     })
    
  }
  catch (err) {
    console.log("***********", err);
    return res.json(500, {
      message: "Internal Server Error"
    });
  }

}