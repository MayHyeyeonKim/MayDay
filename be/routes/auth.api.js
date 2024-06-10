const express = require("express");
const authController = require("../controllers/auth.controller")
const userController = require("../controllers/user.controller");
const router = express.Router();

router.get('/me', authController.authenticate, userController.getUser)
router.post('/login', authController.loginWithEmail);
router.post('/google', authController.loginWithGoogle);


module.exports = router;