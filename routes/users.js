const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller')
router.get('/sign-in',usersController.signIn);
router.post('/create-session', passport.authenticate(
  'local',
  {failureRedirect: '/users/sign-in'},
), usersController.createSession);

module.exports = router;