const { Signup, Login, getUserfromToken } = require('../controllers/AuthController');
const{userVerification }=require("../middlewares/AuthMiddleware");
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.post('/',userVerification)
router.get('/getUserdata',getUserfromToken);


module.exports = router