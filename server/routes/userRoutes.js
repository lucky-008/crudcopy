const express = require('express');
const userController= require('../controllers/userController')

const router = express.Router();

 router.get('/stats',userController.getStats);
 router.get('/search/:query',userController.searchUsers);
 router.get('/',userController.getAllUsers);
 router.get('/:id',userController.getUserById) ; 
  
 module.exports = router;