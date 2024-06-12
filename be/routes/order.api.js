const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller")
const orderController = require("../controllers/order.controller")


router.post('/', authController.authenticate, orderController.creatOrder);
router.get('/me', authController.authenticate, orderController.getOrder);
router.get("/", authController.authenticate, orderController.getOrderList);
router.put("/:id", authController.authenticate, authController.checkAdminPermission, orderController.updateOrder);
router.delete("/:id", authController.authenticate, orderController.deleteOrder)

module.exports = router;