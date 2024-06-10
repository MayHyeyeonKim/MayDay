const express = require("express")
const router = express.Router()

const userController = require("../controllers/user.controller")
const authController = require("../controllers/auth.controller")

router.get('/me', authController.authenticate, userController.getUser) 
router.post("/", userController.createUser)

module.exports = router;
