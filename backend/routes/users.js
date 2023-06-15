var express = require('express');
var router = express.Router();
const { signUp, forgotPassword, resetPassword, login } = require('../controllers/userController')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signUp)
router.post('/login', login)
router.post('/password/forgot', forgotPassword)
router.put('/reset-password/:token', resetPassword)
module.exports = router;
