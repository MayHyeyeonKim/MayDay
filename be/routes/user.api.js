const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.controller")
const authController = require("../controllers/auth.controller")

//register
router.get('/me', authController.authenticate, userController.getUser) //token is valid?, find user with token and return
router.post("/", userController.createUser)

module.exports = router;
