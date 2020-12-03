const express = require('express');
// using express.Router
const router = express.Router();

// require other routes
const users_controller=require('../controllers/users_controller');
const usersApi = require('../controllers/api/v1/users_api');
router.get('/',usersApi.home);

router.use('/users',users_controller.createSession);


router.use('/api', require('./api'));
// for any further routes
//  router.use('/routerName',require('./routerFile);
// console.log('router is loaded');
// export the router
module.exports = router;
