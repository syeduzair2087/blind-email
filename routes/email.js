var express = require('express');
var router = express.Router();
var emailController = require('../controllers/email');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', emailController.loginPage);
router.get('/googleApi', emailController.getToken);
router.post('/get', emailController.getMessageList);
router.post('/send', emailController.sendMail);
router.get('/logout', emailController.logout);

router.get('/getLableList', emailController.getLableList);
router.get('/getByLableId', emailController.getLableDetail);

router.get('/verifyToken', emailController.verifyToken);

module.exports = router;
